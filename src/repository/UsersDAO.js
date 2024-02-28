const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { DynamoDBDocumentClient, PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { logger } = require('../util/logger');

const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: fromIni({profile: "user1"})
});

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
        logger.info('Queried for username');
        //return true if there does exist account with same username
        if(data.Count > 0) {
            logger.warn("Username Already Exists");
            return true;
        }else {
            logger.info("Username does not Exist in DB");
            return false;
        }
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
        logger.info("Successfully registered User");
        return true;
    } catch (err) {
        logger.error(err);
        return false;
    }
}

// GET User for the login endpoint, this will effectively get the password to
// compare with the one entered
async function getUserByUsername(username) {
    const command = new QueryCommand({
        TableName: 'FP_Users',
        IndexName: 'username-index',
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username' : username
        }
    });

    try {
        const user = await documentClient.send(command);
        logger.info("Retrived User by Username");
        return user.Items[0];
    }catch(err) {
        logger.error(err);
        return false;
    }
}

module.exports = {
    checkUsername: checkUsername,
    registerUser: registerUser,
    getUserByUsername: getUserByUsername,
}