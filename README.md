# AWS SAM Demo Project

## Overview

This AWS SAM (Serverless Application Model) demo project illustrates the deployment of a straightforward serverless application. AWS SAM simplifies the development process of serverless applications by providing a framework for defining resources such as AWS Lambda functions, Amazon API Gateway APIs, and AWS DynamoDB tables. In this project, we deploy code to a Lambda function and establish an API in API Gateway that links to the Lambda function. The entire deployment process is managed using AWS CloudFormation.

## Functionality

Utilizing API Gateway, we can execute the following operations on items in the DynamoDB table:

- **Get Items**: Retrieve items from the DynamoDB table via API Gateway.
- **Add Items**: Append items to the DynamoDB table via API Gateway.
- **Delete Items**: Remove items from the DynamoDB table via API Gateway.
- **Search Items**: Search for items in the DynamoDB table based on specific attribute types; for instance, searching for items with a price of "200".

## Prerequisites

Before proceeding, ensure you have the following prerequisites installed and configured on your Linux terminal:

- **AWS CLI**: Command-line tool for interacting with AWS services.
  - Installation: `sudo apt install awscli`
  - Configuration: `aws configure`

- **NodeJs**: Nodejs programming language
  - Installation: `sudo apt install npm -y`

- **AWS SAM CLI**: CLI tool for creating and managing serverless applications.
  - Installation: 
    ```
    sudo snap install docker # (if Docker is not installed and if you want to run AWS SAM locally)
    sudo pip3 install aws-sam-cli
    ```

## Build and Deploy SAM Project

To build and deploy the SAM project, follow these steps:

1. **Build SAM Application**: Navigate to your project directory and run the following command:

    ```bash
    sam build
    ```

    This command compiles the source code and dependencies into a distributable format.

2. **Deploy SAM Application**: Deploy the SAM application using the guided deployment:

    ```bash
    sam deploy --guided
    ```

    Follow the prompts to configure your deployment settings. This command deploys your application to AWS Lambda and API Gateway using AWS CloudFormation.

## API Commands

To interact with the deployed API, use the following commands:

- **Get Data**: Retrieve data from the API:
    ```bash
    curl https://abcdef123.execute-api.us-west-2.amazonaws.com/items
    ```

- **Put Data**: Add data to the API:
    ```bash
    curl -X "PUT" -H "Content-Type: application/json" -d "{\"id\": \"123\", \"price\": 12345, \"name\": \"myitem\"}" https://abcdef123.execute-api.us-west-2.amazonaws.com/items
    ```

- **Delete Data**: Remove data from the API:
    ```bash
    curl -X "DELETE" https://abcdef123.execute-api.us-west-2.amazonaws.com/items/123
    ```
- **Search Data**: Search data from the API:
    ```bash
    curl https://abcdef123.execute-api.us-west-2.amazonaws.com/items/{attributeName}/{attributeValue}
    ```
    
## Advanced Features of AWS SAM

AWS SAM offers several advanced features for developing serverless applications, including:

- **Local Development**: Test your functions locally using SAM CLI's local testing capabilities.
- **API Gateway Swagger Integration**: Define your API Gateway APIs using Swagger and integrate them with SAM.
- **Nested Applications**: Organize your SAM projects using nested applications for better modularity.
- **Resource Policies**: Implement resource-level access policies for your serverless resources.
- **Custom Domains**: Configure custom domains for your API Gateway endpoints.
- **Debugging**: Debug your serverless applications using AWS X-Ray integration.

## Support

For any issues or queries related to the Leave Management App, please contact [info@systemintegration.in].

This project facilitates CRUD operations on a DynamoDB table via API Gateway endpoints, seamlessly integrating AWS Lambda functions.
