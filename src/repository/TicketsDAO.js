const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { DynamoDBDocumentClient, PutCommand, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { logger } = require('../util/logger');

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


module.exports = {
    postTicket
}
