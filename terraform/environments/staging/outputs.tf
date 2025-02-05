output "vpc_id" {
  value = module.vpc.vpc_id
}

output "rds_endpoint" {
  value = module.rds.endpoint
  sensitive = true
}

output "s3_bucket" {
  value = module.s3.bucket_name
}

output "lambda_function_name" {
  value = module.lambda.function_name
}