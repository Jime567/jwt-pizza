# CS 329 Curiosity Report

My curiosity was pinged by an ever increasing AWS bill as well as a bank account on its last few dollars. In an attempt to save myself, I decided to explore Terraform with the mission of automating my AWS infrastructure so that I could tear it down and redeploy at a whim. 

The first things I added into Terraform were the ECS Cluster, ECS Service, ALB Load Balancer, ALB Target Group, and ALB Listener. I had to write all of the resources into a main.tf file. Then using Terraform, I imported the existing resources in to get the fine details which was really easy. I used the state to check that all the information was there. It looked good. In my main.tf file I had the overarching structure and in the terraform.tfstate file I had the details of the resources.

After asking ChatGPT like seven times in seven different ways if I was safe to now destroy the resources, it gave a green light, assuring me that everything would persist. I destroyed the resources and found that Terraform actually deletes the contents of the terraform.tfstate. Instead of being a success, it destroyed all my work. After confronting ChatGPT about this, it conceded that it had tricked me. Fortunately, I had been using some VCS magic and was able to get all the state back. Confident I was in the clear, I redeployed, only to be met with stupid errors. It seems that importing existing resources into Terraform instead of building them first with Terraform is not the best way. If you want it to be the same everytime, it really all needs to be in the main.tf. 

I was not really interested in figuring all of this out for these resources since we already have our CloudFormation template for them. Thus satisfied, I turned my sights to the AWS RDS service: the other major suck of money.

This time I took the approach of creating the RDS instance straight from the instructions instead of importing it as an existing resource from AWS. I had snapshots of my database in case I was not successful. After a bit of struggling and further consultation with ChatGPT to get the security stuffs set up, I was able to get the RDS instance up and running. The final config that I used is at the bottom of this file.


## The Process: Setting Up AWS CLI
### Create User
IAM > Users > Create user

Attach policies directly
- ElasticLoadBalancingFullAccess
- AmazonRDSFullAccess
- AmazonECS_FullAccess

Create User

### Configure AWS CLI
Users > AWSCli329 > Security credentials > Create access key

Command Line Interface

Copy Access Key ID and Secret Access Key

Done 

```
aws configure
AWS Access Key ID [None]: AKIA...
AWS Secret Access Key [None]: ...
Default region name [None]: us-east-1
Default output format [None]: 
```
## Setting Up Terraform
Open your directory for terraform and run
```
terraform init
```

### Import into Terraform
Get the name for the Elastic Container Service
Amazon Elastic Container Service > jwt-pizza-service

main.tf
```
provider "aws" {
  region = "us-east-1"  # Update this to your desired region
}

resource "aws_ecs_cluster" "jwt-pizza-service-cluster" {
  name = "jwt-pizza-service-cluster"
}
```

Run the following command replacing cluster-name with the name
```
terraform import aws_ecs_cluster.example_cluster <cluster-name>
```

Now add 
```
resource "aws_ecs_service" "jwt-pizza-service" {
  name            = "jwt-pizza-service"
}
```
run 
```
terraform import aws_ecs_service.jwt-pizza-service jwt-pizza-service/jwt-pizza-service
```

```
terraform state show aws_ecs_service.jwt-pizza-service
```

add to main.tf

I got the subnets from EC2 > Load Balancers > jwt-pizza-service > Details > Availability Zones
```
// Load Balancer
resource "aws_lb" "jwt-pizza-service" {
    name = "jwt-pizza-service"
    subnets            = [
    "subnet-0518a646b9c01e00a",
    "subnet-04bf09e76ef772b8a",
    "subnet-081a418b0f11d71c3",
    "subnet-0feea09877fb8f270",
    "subnet-088a8a7118b7b72b2",
    "subnet-02a1a867a2829c7fc"
  ]
}
```

```
terraform import aws_lb.jwt-pizza-service arn:aws:elasticloadbalancing:us-east-1:612055051303:loadbalancer/app/jwt-pizza-service/a3f56209d93fcd75
```

do this stuff all again for all the resources ^

## Taking a Snapshot of the RDS
Go to Aurora and RDS > DB Instances > jwt-pizza-service-db > Actions > Take snapshot

```
DB Instance:
jwt-pizza-service-db-1

Snapshot Name:
jwt-pizza-service-db-1 
```

Take snapshot

## Add the snapshot to Terraform

```
data "aws_db_snapshot" "latest" {
  db_instance_identifier = "jwt-pizza-service-db-1"
  most_recent            = true
}
```

## Add the database to Terraform
```
resource "aws_db_instance" "rds" {
  identifier     = "jwt-pizza-service-db-1"
  instance_class = "db.t4g.micro"
  }
```

## Import the existing resource
run
```
terraform import aws_db_instance.rds jwt-pizza-service-db-1
```

## Get Details and Cleanup
run 
```
terraform show -no-color > main.tf
```

run 
```
terraform plan
```

remove anything causing errors


## The RDS Config File (main.tf)
```hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "pizza_service" {
  name        = "jwt-pizza-service"
  description = "JWT Pizza Service"

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "pizza_db" {
  name        = "jwt-pizza-db"
  description = "JWT Pizza Service Database"

  ingress {
    description     = "Allow MySQL from pizza service"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.pizza_service.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_subnet_group" "pizza_db_subnet_group" {
  name       = "pizza-db-subnet-group"
  subnet_ids = data.aws_subnets.default.ids

  tags = {
    Name = "Pizza DB Subnet Group"
  }
}

resource "aws_db_instance" "pizza_db" {
  identifier              = "jwt-pizza-service-db"
  engine                  = "mysql"
  engine_version          = "8.0"
  instance_class          = "db.t4g.micro"
  allocated_storage       = 20
  storage_type            = "gp2"
  username                = "admin"
  password                = var.db_password
  db_subnet_group_name    = aws_db_subnet_group.pizza_db_subnet_group.name
  vpc_security_group_ids  = [aws_security_group.pizza_db.id]
  availability_zone       = data.aws_availability_zones.available.names[0]
  publicly_accessible     = false
  skip_final_snapshot     = true
  deletion_protection     = false

  tags = {
    Name = "JWT Pizza RDS MySQL"
  }
}


variable "db_password" {
  description = "The password for the RDS admin user"
  type        = string
  sensitive   = true
}


data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}


```

applying it 
```
terraform apply -var="my_secure_password_that_is_def_not_password"
```
