const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { logger } = require('../util/logger');
const { currentUser } = require('./UsersDAO');

const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: fromIni({profile: "user1"})
});

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "FP_Ticket";

// CREATE
// function to post a ticket to the FP_Ticket table
async function postTicket(Item) {
    const command = new PutCommand({
        TableName,
        Item
    })

    try {
        await documentClient.send(command);
        return true;
    } catch(err) {
        logger.error(err);
        return false;
    }
}

// READ 
// function to get all tickets that have yet to be processed and put them in a queue
async function createQueueOfTickets() {
    // this scan command gets every ticket that has not been processed yet
    const command = new ScanCommand({
        TableName,
        FilterExpression: '#ticket_processed = :val',
        ExpressionAttributeNames: {
            '#ticket_processed' : 'ticket_processed'
        },
        ExpressionAttributeValues: {
            ':val' : false
        }
    })

    try {
        const data = documentClient.send(command);
        return data;
    } catch(err) {
        return err;
    }
}

// UPDATE
// function to approve the next ticket in the queue


// UPDATE
// function to deny the next ticket in the queue


// READ
// function to get past employee tickets they submitted
async function viewPrevTickets() {
    // command to get all tickets submitted by an employee
    const command = new ScanCommand({
        TableName,
        FilterExpression: '#employee_id = :val',
        ExpressionAttributeNames: {
            '#employee_id' : 'employee_id'
        },
        ExpressionAttributeValues: {
            ':val' : currentUser[0].user_id
        }
    })

    try {
        const data = await documentClient.send(command);
        return data.Items;
    } catch(err) {
        logger.error(err);
    }
}



module.exports = {
    postTicket,
    createQueueOfTickets,
    viewPrevTickets
}
