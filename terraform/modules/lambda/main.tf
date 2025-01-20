resource "aws_lambda_function" "api" {
  function_name = "${var.app_name}-api-${var.environment}"
  role = aws_iam_role.lambda_exec.arn
  package_type = "Image"
  image_uri = "${var.ecr_repository_url}:${var.ecr_image_tag}"
  
  vpc_config {
    subnet_ids = var.subnet_ids
    security_group_ids = [aws_security_group.lambda.id]
  }
  
  environment {
    variables = {
      SPRING_PROFILES_ACTIVE = var.environment
      DB_URL = "jdbc:postgresql://${var.rds_endpoint}/${var.db_name}"
      DB_USERNAME = var.db_username
      DB_PASSWORD = var.db_password
    }
  }
}

