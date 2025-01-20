resource "aws_db_instance" "main" {
  identifier = "${var.app_name}-${var.environment}"
  engine = "postgres"
  engine_version = "13.7"
  instance_class = var.instance_class
  db_name = var.db_name
  username = var.db_username
  password = var.db_password
  
  allocated_storage = 20
  storage_type = "gp2"
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name = aws_db_subnet_group.main.name
  
  skip_final_snapshot = true
  
  tags = {
    Environment = var.environment
  }
}