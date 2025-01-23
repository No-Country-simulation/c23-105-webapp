output "endpoint" {
  value = aws_db_instance.database.endpoint
}

output "database_name" {
  value = aws_db_instance.database.db_name
}
