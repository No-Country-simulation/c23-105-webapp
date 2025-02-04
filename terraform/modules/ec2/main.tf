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

  # User data para instalar Docker Compose y configurar ECR
  user_data = <<-EOF
              #!/bin/bash
              # Actualizar el sistema
              sudo yum update -y

              # Instalar Docker
              sudo amazon-linux-extras install docker -y
              sudo service docker start
              sudo usermod -aG docker ec2-user

              # Instalar Docker Compose
              sudo curl -L "https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose

              # Configurar acceso a ECR
              aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${var.ecr_registry}

              # Crear un script para reiniciar el contenedor
              cat <<EOL > /home/ec2-user/restart_container.sh
              #!/bin/bash
              docker pull ${var.ecr_registry}/${var.ecr_repository}:latest
              docker stop adapptado-backend || true
              docker rm adapptado-backend || true
              docker run -d \\
                --name adapptado-backend \\
                -p 8080:8080 \\
                -e SPRING_DATASOURCE_URL=jdbc:postgresql://${var.rds_endpoint}/nocountrydb \\
                -e SPRING_DATASOURCE_USERNAME=dbadmin \\
                -e SPRING_DATASOURCE_PASSWORD=${var.db_password} \\
                ${var.ecr_registry}/${var.ecr_repository}:latest
              EOL

              # Hacer ejecutable el script
              chmod +x /home/ec2-user/restart_container.sh
              EOF

  tags = {
    Name = "${var.environment}-app-server"
    Environment = var.environment
  }
}