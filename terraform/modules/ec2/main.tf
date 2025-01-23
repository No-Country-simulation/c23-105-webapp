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

resource "aws_instance" "app_server" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = var.instance_type

  subnet_id                   = var.public_subnet_ids[0]
  vpc_security_group_ids      = [aws_security_group.app_server.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo amazon-linux-extras install java-openjdk21
              EOF

  tags = {
    Name        = "${var.environment}-app-server"
    Environment = var.environment
  }
}