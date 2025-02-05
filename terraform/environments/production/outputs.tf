output "vpc_id" {
  value = module.vpc.vpc_id
}

output "ec2_public_ip" {
  value = module.ec2.public_ip
}

output "rds_endpoint" {
  value = module.rds.endpoint
  sensitive = true
}

output "s3_bucket_name" {
  value = module.s3.bucket_name
}
