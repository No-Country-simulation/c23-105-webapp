variable "environment" {
  type = string
}

variable "app_name" {
  type = string
}

variable "ecr_repository_url" {
  type = string
  description = "URL of the ECR repository"
}

variable "ecr_image_tag" {
  type = string
  description = "Tag of the Docker image to deploy"
}

variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "rds_endpoint" {
  type = string
}

variable "db_name" {
  type = string
}

variable "db_username" {
  type = string
  sensitive = true
}

variable "db_password" {
  type = string
  sensitive = true
}