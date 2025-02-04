variable "environment" {
  description = "Environment name"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "public_subnet_ids" {
  description = "Public subnet IDs"
  type        = list(string)
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
}

variable "key_name" {
  description = "Key pair name for EC2"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "github_ssh_key" {
  description = "SSH private key to access the private GitHub repository"
  type        = string
  sensitive   = true
}
variable "aws_region" {
  description = "AWS Region"
  type        = string
}

variable "ecr_registry" {
  description = "ECR Registry URL"
  type        = string
}

variable "ecr_repository" {
  description = "ECR Repository Name"
  type        = string
}

variable "rds_endpoint" {
  description = "RDS Endpoint"
  type        = string
}

variable "db_password" {
  description = "Database Password"
  type        = string
  sensitive   = true
}