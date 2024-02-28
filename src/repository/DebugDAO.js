const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { logger } = require('../util/logger');

const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: fromIni({profile: "user1"})
});

//getting the documentClient
const documentClient = DynamoDBDocumentClient.from(client);

let allTickets = [];

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
        logger.info("Retrieved all Employees in DB");
        return data.Items;
    } catch(err) {
        logger.error(err);
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
        logger.info("Retrieved all Managers in DB");
        return data.Items;
    } catch(err) {
        logger.error(err);
        return err;
    }
}

//Get all the tickets from the DB (Useful for Debugging Purposes)
async function getTickets() {
    allTickets = [];

    const scanCommand = new ScanCommand({
        TableName: 'FP_Ticket'
    })

    try {
        const data = await documentClient.send(scanCommand);
        //push the tickets and then sort them with .sort(a,b) method
        for(let item of data.Items) {
            allTickets.push(item);
        }
        allTickets.sort((a, b) => a.time_submitted.localeCompare(b.time_submitted));
        logger.info("Tickets Received and Sorted by Time");
        return allTickets;
    } catch(err) {
        logger.error(err);
        return false;
    }
}

module.exports = {
    getEmployees: getEmployees,
    getManagers: getManagers,
    getTickets: getTickets
}