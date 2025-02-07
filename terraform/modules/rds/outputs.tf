output "endpoint" {
  value = aws_db_instance.database.endpoint
}

output "database_name" {
  value = aws_db_instance.database.db_name
}
output "db_instance_id" {
  description = "The ID of the RDS instance"
  value       = aws_db_instance.database.id
}