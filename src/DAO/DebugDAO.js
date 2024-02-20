const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');

const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: fromIni({profile: "user1"})
});

//getting the documentClient
const documentClient = DynamoDBDocumentClient.from(client);

//Get all the employee from DB (Useful for Debugging Purposes)
async function getEmployees() {
    //scan command to get the whole table
    const scanCommand = new ScanCommand({
        TableName: 'FP_Users',
        FilterExpression: 'userRole = :value',
        ExpressionAttributeValues: {
            ':value': 'Employee' 
        }
    });

    try {
        const data = await documentClient.send(scanCommand);
        return data.Items;
    } catch(err) {
        return err;
    }
}

//Get all the Managers from the DB (Useful for Debugging Purposes)
async function getManagers() {
    //scan command to get the whole table
    const scanCommand = new ScanCommand({
        TableName: 'FP_Users',
        FilterExpression: 'userRole = :value',
        ExpressionAttributeValues: {
            ':value': 'Manager' 
        }
    });

    try {
        const data = await documentClient.send(scanCommand);
        return data.Items;
    } catch(err) {
        return err;
    }
}

//Get all the Managers from the DB (Useful for Debugging Purposes)
async function getCurrentUser() {
    //scan command to get the whole table
    const scanCommand = new ScanCommand({
        TableName: 'FP_Users',
        FilterExpression: 'loggedIn = :value',
        ExpressionAttributeValues: {
            ':value': true
        }
    });

    try {
        const data = await documentClient.send(scanCommand);
        return data.Items;
    } catch(err) {
        return err;
    }
}

module.exports = {
    getEmployees: getEmployees,
    getManagers: getManagers,
    getCurrentUser: getCurrentUser
}