resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
}

resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_cloudwatch_metric_alarm" "ec2_inactivity" {
  alarm_name          = "${var.environment}-ec2-inactivity"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 60
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 60
  statistic           = "Average"
  threshold           = 1
  alarm_actions       = [aws_sns_topic.shutdown_topic.arn]
  dimensions = {
    InstanceId = var.ec2_instance_id
  }
}

resource "aws_sns_topic" "shutdown_topic" {
  name = "${var.environment}-shutdown-topic"
}

resource "aws_lambda_function" "shutdown_instances" {
  filename      = "shutdown_lambda.zip"
  function_name = "${var.environment}-shutdown-instances"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"

  environment {
    variables = {
      EC2_INSTANCE_ID = var.ec2_instance_id
      RDS_INSTANCE_ID = var.rds_instance_id
    }
  }
}

resource "aws_sns_topic_subscription" "lambda_subscription" {
  topic_arn = aws_sns_topic.shutdown_topic.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.shutdown_instances.arn
}
resource "aws_iam_role" "lambda_role" {
  name = "${var.environment}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "lambda_policy" {
  name       = "${var.environment}-lambda-policy"
  roles      = [aws_iam_role.lambda_role.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
