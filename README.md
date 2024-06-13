
# AWS Lambda DynamoDB Node.js Example

## Description

This repository demonstrates how to set up an AWS Lambda function to perform CRUD operations on an Amazon DynamoDB table using Node.js. It includes the necessary Lambda function code and deployment instructions.

## Requirements

- AWS account
- Node.js
- AWS CLI

## Mode of Use

1. Clone the repository:
   ```bash
   git clone https://github.com/ferrerallan/awslambda-dynamodb-nodejs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd awslambda-dynamodb-nodejs
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Update the Lambda function code (`index.js`) with your DynamoDB table name and other configurations.
5. Deploy the Lambda function:
   ```bash
   ./deploy.bat
   ```

## Use Case

This repository can be used as a reference for building serverless applications that interact with DynamoDB. It is particularly useful for scenarios such as:

- Managing user data
- Storing application logs
- Implementing real-time data processing

## Example of Use

### Lambda Function Code

The `index.js` file contains code for handling CRUD operations:

```javascript
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { httpMethod, body, pathParameters } = event;
  let response;

  switch (httpMethod) {
    case 'GET':
      response = await getItem(pathParameters.id);
      break;
    case 'POST':
      response = await createItem(JSON.parse(body));
      break;
    case 'PUT':
      response = await updateItem(pathParameters.id, JSON.parse(body));
      break;
    case 'DELETE':
      response = await deleteItem(pathParameters.id);
      break;
    default:
      response = {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
  }

  return response;
};

const getItem = async (id) => {
  const params = {
    TableName: 'YourDynamoDBTable',
    Key: { id },
  };
  const data = await dynamoDB.get(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(data.Item),
  };
};

const createItem = async (item) => {
  const params = {
    TableName: 'YourDynamoDBTable',
    Item: item,
  };
  await dynamoDB.put(params).promise();
  return {
    statusCode: 201,
    body: JSON.stringify(item),
  };
};

const updateItem = async (id, updates) => {
  const params = {
    TableName: 'YourDynamoDBTable',
    Key: { id },
    UpdateExpression: 'set #name = :name',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: { ':name': updates.name },
    ReturnValues: 'UPDATED_NEW',
  };
  const data = await dynamoDB.update(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(data.Attributes),
  };
};

const deleteItem = async (id) => {
  const params = {
    TableName: 'YourDynamoDBTable',
    Key: { id },
  };
  await dynamoDB.delete(params).promise();
  return {
    statusCode: 204,
  };
};
```

## License

This project is licensed under the MIT License.
