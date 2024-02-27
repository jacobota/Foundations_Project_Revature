const { createQueueOfTickets, approveTicketDAO, denyTicketDAO } = require('../repository/TicketsDAO');
const { logger } = require('../util/logger');

//Function to get all unprocessed tickets
//Will call this function before and after approve/deny calls to get most updated list
async function getAllUnprocTickets() {
    return await createQueueOfTickets();
}

// Function to approve a ticket
async function approveTicket() {
    return await approveTicketDAO();
}

//Function to deny a ticket
async function denyTicket() {
    return await denyTicketDAO();
}

module.exports = {
    getAllUnprocTickets,
    approveTicket, 
    denyTicket
}