variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "bucket_name" {
  description = "S3 bucket name"
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "Adapptado"
}

variable "key_name" {
  description = "Key pair name for EC2"
  type        = string
  sensitive   = true
}

variable "github_ssh_key" {
  description = "SSH private key to access the private GitHub repository"
  type        = string
  sensitive   = true
}
variable "ecr_registry" {
  description = "ECR Registry URL"
  type        = string
}

variable "ecr_repository" {
  description = "ECR Repository Name"
  type        = string
}
