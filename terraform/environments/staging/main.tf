terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = "your-terraform-state-bucket"
    key    = "c23-105/staging/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "../../modules/vpc"
  environment = var.environment
  app_name = var.app_name
}

module "rds" {
  source = "../../modules/rds"
  environment = var.environment
  app_name = var.app_name
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnet_ids
  instance_class = var.rds_instance_class
  db_name = var.db_name
  db_username = var.db_username
  db_password = var.db_password
}

module "s3" {
  source = "../../modules/s3"
  environment = var.environment
  app_name = var.app_name
}

module "lambda" {
  source = "../../modules/lambda"
  environment = var.environment
  app_name = var.app_name
  ecr_repository_url = "418295719584.dkr.ecr.${var.aws_region}.amazonaws.com/java21"
  ecr_image_tag = var.ecr_image_tag
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnet_ids
  rds_endpoint = module.rds.endpoint
  db_name = var.db_name
  db_username = var.db_username
  db_password = var.db_password
}