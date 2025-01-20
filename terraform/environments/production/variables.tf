variable "aws_region" {
    default = "us-east-1"    
}
variable "environment" {
    default = "production"    
}
variable "app_name" {
    default = "FriendlySpot"    
}
variable "ecr_image_tag" {
  default = "latest"
}
variable "rds_instance_class" {
  default = "db.t4g.micro"
}
variable "db_name" {
  default = "prod_db"
}
variable "db_username" {
  description = "Database administrator username"
  type        = string
  sensitive   = true
}
variable "db_password" {
  description = "Database administrator password"
  type        = string
  sensitive   = true
}