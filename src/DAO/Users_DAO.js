const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { v4 } = require('uuid');

const { DynamoDBDocumentClient, PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: fromIni({profile: "user1"})
});

//getting the documentClient
const documentClient = DynamoDBDocumentClient.from(client);

//check if username exists (Registration Check)
async function checkUsername(username) {
    //scan command to get the whole table
    const command = new QueryCommand({
        TableName: 'FP_Users',
        IndexName: 'username-index',
        KeyConditionExpression: '#username = :value',
        ExpressionAttributeNames: {
            '#username' : 'username'
        },
        ExpressionAttributeValues: {
            ':value': username
        }
    });

    try {
        const data = await client.send(command);
        //return true if there does exist account with same username
        return data.Count > 0
    } catch(err) {
        console.error(err);
        return err;
    }
}

//function to register a user account to Dynamo
async function registerUser(item) {
    const command = new PutCommand({
        TableName: 'FP_Users',
        Item: item,
    })

    try {
        await documentClient.send(command);
        return true;
    } catch (err) {
        return false;
    }
}

//function to login a user account to Dynamo
async function loginUser(data) {
    //scan command to get the whole table
    const command = new QueryCommand({
        TableName: 'FP_Users',
        KeyConditionExpression: 'username = :value AND password = :pass',
        ExpressionAttributeValues: {
            ':value': data.username,
            ':pass' : data.password
        }
    });

    try {
        const data = await documentClient.send(command);
        //return true if there does exist account with same username
        if(data.Count == 1) {
            //TODO: Update loggedIn to true
            return true;
        } else {
            return false;
        }
    } catch(err) {
        return err;
    }
}

module.exports = {
    checkUsername: checkUsername,
    registerUser: registerUser,
    loginUser: loginUser
}