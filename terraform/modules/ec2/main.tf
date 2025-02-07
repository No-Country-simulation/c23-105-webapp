resource "aws_security_group" "app_server" {
  name_prefix = "${var.environment}-app-server-"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    # Permitir ICMP para ping
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
# modules/ec2/main.tf
resource "aws_iam_role" "ec2_role" {
  name = "${var.environment}-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ec2_ecr_access" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "${var.environment}-ec2-profile"
  role = aws_iam_role.ec2_role.name
}

resource "aws_instance" "app_server" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = var.instance_type
  subnet_id     = var.public_subnet_ids[0]
  key_name      = var.key_name
  vpc_security_group_ids = [aws_security_group.app_server.id]
  associate_public_ip_address = true
  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name

  # User data para instalar Docker Compose y configurar ECR
  user_data = <<-EOF
              #!/bin/bash
              # Update system
              sudo yum update -y
              
              # Install Java 21
              sudo amazon-linux-extras install java-openjdk21 -y
              
              # Install Docker
              sudo yum install -y docker
              sudo service docker start
              sudo systemctl enable docker
              sudo usermod -a -G docker ec2-user
              
              # Install AWS CLI
              sudo yum install -y aws-cli
              
              # Create script to run application
              cat <<'SCRIPT' > /home/ec2-user/start-app.sh
              #!/bin/bash
              
              # Get the RDS endpoint from AWS Parameter Store (you'll need to store this)
              RDS_ENDPOINT=$(aws ssm get-parameter --name "/production/rds/endpoint" --region us-east-1 --query "Parameter.Value" --output text)
              
              aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ***.dkr.ecr.us-east-1.amazonaws.com
              
              docker pull ***.dkr.ecr.us-east-1.amazonaws.com/adapptado-backend:latest
              
              docker stop adapptado-backend || true
              docker rm adapptado-backend || true
              
              docker run -d \
                --name adapptado-backend \
                -p 8080:8080 \
                -e SPRING_DATASOURCE_URL="jdbc:postgresql://$RDS_ENDPOINT/nocountrydb" \
                -e SPRING_DATASOURCE_USERNAME=dbadmin \
                -e SPRING_DATASOURCE_PASSWORD=*** \
                ***.dkr.ecr.us-east-1.amazonaws.com/adapptado-backend:latest
              SCRIPT
              
              chmod +x /home/ec2-user/start-app.sh
              EOF

  tags = {
    Name = "${var.environment}-app-server"
    Environment = var.environment
  }
}
