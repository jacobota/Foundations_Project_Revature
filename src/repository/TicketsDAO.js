const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');
const { logger } = require('../util/logger');

const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: fromIni({profile: "user1"})
});

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "FP_Ticket";

//array to hold the list of tickets
let ticketsToBeProcessed = [];

// CREATE
// function to post a ticket to the FP_Ticket table
async function postTicket(Item) {
    const command = new PutCommand({
        TableName,
        Item
    })

    try {
        await documentClient.send(command);
        logger.info("Successfully added the Ticket");
        return true;
    } catch(err) {
        logger.error(err);
        return false;
    }
}

// READ 
// function to get all tickets that have yet to be processed and put them in a queue
async function createQueueOfTickets() {
    ticketsToBeProcessed = [];
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
        const data = await documentClient.send(command);
        //push the tickets and then sort them with .sort(a,b) method
        for(let item of data.Items) {
            ticketsToBeProcessed.push(item);
        }
        ticketsToBeProcessed.sort((a, b) => a.time_submitted.localeCompare(b.time_submitted));
        logger.info("Tickets Received and Sorted by Time");
        return ticketsToBeProcessed;
    } catch(err) {
        logger.error(err);
        return false;
    }
}

// UPDATE
// function to approve the next ticket in the queue
async function approveTicketDAO(username) {
    const ticket = ticketsToBeProcessed.shift();
    const command = new UpdateCommand({
        TableName,
        Key: {
            'ticket_id': ticket.ticket_id,
            'time_submitted': ticket.time_submitted
        },
        UpdateExpression: "SET  ticket_status = :statVal, ticket_processed = :procVal",
        ExpressionAttributeValues: {
            ':statVal' : 'Approve',
            ':procVal' : true
        }
    })

    const addManagerNameCommand = new UpdateCommand({
        TableName,
        Key: {
            'ticket_id': ticket.ticket_id,
            'time_submitted': ticket.time_submitted
        },
        UpdateExpression: "SET  manager_processed = :val",
        ExpressionAttributeValues: {
            ':val' : username,
        }
    })


    try {
        await documentClient.send(command);
        logger.info('Approved Ticket!');
        await documentClient.send(addManagerNameCommand);
        const data = await getTicket(ticket);
        return data;
    }catch(err) {
        logger.error(err);
        return false;
    }
}


// UPDATE
// function to deny the next ticket in the queue
async function denyTicketDAO(username) {
    const ticket = ticketsToBeProcessed.shift();
    const command = new UpdateCommand({
        TableName,
        Key: {
            'ticket_id': ticket.ticket_id,
            'time_submitted': ticket.time_submitted
        },
        UpdateExpression: "SET  ticket_status = :statVal, ticket_processed = :procVal",
        ExpressionAttributeValues: {
            ':statVal' : 'Deny',
            ':procVal' : true
        }
    })

    const addManagerNameCommand = new UpdateCommand({
        TableName,
        Key: {
            'ticket_id': ticket.ticket_id,
            'time_submitted': ticket.time_submitted
        },
        UpdateExpression: "SET  manager_processed = :val",
        ExpressionAttributeValues: {
            ':val' : username,
        }
    })


    try {
        await documentClient.send(command);
        logger.info('Denied Ticket!');
        await documentClient.send(addManagerNameCommand);
        const data = await getTicket(ticket);
        return data;
    }catch(err) {
        logger.error(err);
        return false;
    }
}

//helper function to get the ticket that was approved/denied
async function getTicket(ticket) {
    const command = new GetCommand({
        TableName,
        Key: {
            'ticket_id': ticket.ticket_id,
            'time_submitted': ticket.time_submitted
        }
    });

    try {
        const data = await documentClient.send(command);
        logger.info("Get ticket");
        return data.Item;
    }catch(err) {
        logger.error(err);
        return false;
    }
}


// READ
// function to get past employee tickets they submitted
async function viewPrevTickets(user_id) {
    let userTickets = [];
    // command to get all tickets submitted by an employee
    const command = new ScanCommand({
        TableName,
        FilterExpression: '#employee_id = :val',
        ExpressionAttributeNames: {
            '#employee_id' : 'employee_id'
        },
        ExpressionAttributeValues: {
            ':val' : user_id
        }
    })

    try {
        const data = await documentClient.send(command);
        //push the tickets and then sort them with .sort(a,b) method
        for(let item of data.Items) {
            userTickets.push(item);
        }
        userTickets.sort((a, b) => a.time_submitted.localeCompare(b.time_submitted));
        logger.info("Retrieved Tickets from Dynamo");
        return userTickets;
    } catch(err) {
        logger.error(err);
        return false;
    }
}



module.exports = {
    postTicket,
    createQueueOfTickets,
    viewPrevTickets,
    approveTicketDAO,
    denyTicketDAO
}
