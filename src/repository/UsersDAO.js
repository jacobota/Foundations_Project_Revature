const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { DynamoDBDocumentClient, PutCommand, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { logger } = require('../util/logger');

const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: fromIni({profile: "user1"})
});

//Hold the current user here
const currentUser = [];

//getting the documentClient
const documentClient = DynamoDBDocumentClient.from(client);

// READ (Also READS are located in Debug.DAO)
//check if username exists (Registration Check)
async function checkUsername(username) {
    //query command to get the whole table
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
        const data = await documentClient.send(command);
        //return true if there does exist account with same username
        return data.Count > 0;
    } catch(err) {
        logger.error(err);
        return false;
    }
}

// CREATE
// function to register a user account to Dynamo
async function registerUser(item) {
    // put command to put the item into the FP_Users table
    const command = new PutCommand({
        TableName: 'FP_Users',
        Item: item,
    })

    try {
        await documentClient.send(command);
        return true;
    } catch (err) {
        logger.error(err);
        return false;
    }
}

// UPDATE
// function to login a user account to Dynamo
async function loginUser(data) {
    //query command to get the whole table
    const command = new QueryCommand({
        TableName: 'FP_Users',
        IndexName: 'username-index',
        KeyConditionExpression: 'username = :value',
        FilterExpression: 'password = :pass',
        ExpressionAttributeValues: {
            ':value': data.username,
            ':pass' : data.password
        }
    });

    try {
        const data = await documentClient.send(command);
        //return true if there does exist account with same username
        if(data.Count == 1) {
            //Have helper function set user to logged in and push to current user
            helperLogin(data);
            currentUser.push(data.Items[0]);
            console.log(currentUser);
            return true;
        } else {
            logger.error("User not found")
            return false;
        }
    } catch(err) {
        logger.error(err);
        return false;
    }
}

// UPDATE Helper Function for Login
async function helperLogin(data) {
    //update command to update the value of LoggedIn
    const command = new UpdateCommand({
        TableName: 'FP_Users',
        Key: {'user_id' : data.Items[0].user_id},
        UpdateExpression: "SET loggedIn = :val",
        ExpressionAttributeValues: {
            ':val' : true
        }
    })

    try {
        await documentClient.send(command);
    } catch (err) {
        logger.error(err);
    }
}

module.exports = {
    checkUsername: checkUsername,
    registerUser: registerUser,
    loginUser: loginUser,
    currentUser: currentUser
}