resource "aws_security_group" "database" {
  name_prefix = "${var.environment}-database-"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [var.app_security_group_id]
  }
}

resource "aws_db_subnet_group" "database" {
  name       = "${var.environment}-database"
  subnet_ids = var.private_subnet_ids

  tags = {
    Environment = var.environment
  }
}

resource "aws_db_instance" "database" {
  identifier        = "${var.environment}-database"
  engine            = "postgres"
  engine_version    = "14"
  instance_class    = var.db_instance_class
  allocated_storage = 20

  db_name  = "nocountrydb"
  username = "dbadmin"
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.database.name
  vpc_security_group_ids = [aws_security_group.database.id]

  skip_final_snapshot     = true
  
  tags = {
    Environment = var.environment
  }
}