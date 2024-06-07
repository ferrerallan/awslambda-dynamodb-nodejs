// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'sa-east-1'});


function getClient() {
    return new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
}

class GuitarRepository {
    constructor() {
    }
    async get(event) {
        const docClient = getClient();

        var params = {
            TableName: 'Guitars',
            Key: {"id": event.pathParameters.id}
        };

        var body;

        try {
            const data = await docClient.get(params).promise();

            body = data.Item;

        } catch (err) {
            body = err;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(body)
        }

        return response
    }

    async list(event) {
        const docClient = getClient();

        var params = {
            TableName: 'Guitars'
        };

        var body;

        try {
            const data = await docClient.scan(params).promise();

            body = data.Items;

        } catch (err) {
            body = err;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(body)
        }

        return response
    }

    async create(event) {
        const docClient = getClient();

        var params = {
            TableName: 'Guitars',
            Item: JSON.parse(event.body)
        };

        var body;

        try {
            const data = await docClient.put(params).promise();

            body = params.Item;

        } catch (err) {
            body = err;
        }

        const response = {
            statusCode: 201,
            body: JSON.stringify(body)
        }

        return response
    }

    async delete(event) {
        const docClient = getClient();

        var params = {
            TableName: 'Guitars',
            Key: {"id": event.pathParameters.id}
        };

        var body;

        try {
            const data = await docClient.delete(params).promise();

            body = params.Item;

        } catch (err) {
            body = err;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(body)
        }

        return response
    }

    async update(event) {
        const docClient = getClient();
        const request = JSON.parse(event.body);
        var params = {
            TableName: 'Guitars',
            Key: {"id": event.pathParameters.id},
            UpdateExpression: "set brand = :brand",
            ExpressionAttributeValues: {
                ":brand": request.brand
            }
        };

        var body;

        try {
            const data = await docClient.update(params).promise();

            body = params.Item;

        } catch (err) {
            body = err;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(body)
        }

        return response
    }
}

module.exports = {GuitarRepository};