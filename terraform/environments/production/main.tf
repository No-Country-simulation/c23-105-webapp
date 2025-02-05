terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "../../modules/vpc"

  environment = var.environment
  vpc_cidr    = var.vpc_cidr
}

module "ec2" {
  source = "../../modules/ec2"

  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  instance_type     = var.instance_type
  app_name          = var.app_name
  key_name          = var.key_name
  github_ssh_key    = var.github_ssh_key
  aws_region        = var.aws_region
  ecr_registry      = var.ecr_registry
  ecr_repository    = var.ecr_repository
  rds_endpoint      = module.rds.endpoint
  db_password       = var.db_password
}

module "rds" {
  source = "../../modules/rds"

  environment           = var.environment
  vpc_id                = module.vpc.vpc_id
  private_subnet_ids    = module.vpc.private_subnet_ids
  db_instance_class     = var.db_instance_class
  db_password           = var.db_password
  app_security_group_id = module.ec2.security_group_id
}

module "s3" {
  source = "../../modules/s3"

  environment = var.environment
  bucket_name = var.bucket_name
}
