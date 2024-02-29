const { createQueueOfTickets, approveTicketDAO, denyTicketDAO } = require('../repository/TicketsDAO');

//Function to get all unprocessed tickets
//Will call this function before and after approve/deny calls to get most updated list
async function getAllUnprocTickets() {
    return await createQueueOfTickets();
}

// Function to approve a ticket
async function approveTicket(username) {
    return await approveTicketDAO(username);
}

//Function to deny a ticket
async function denyTicket(username) {
    return await denyTicketDAO(username);
}

module.exports = {
    getAllUnprocTickets,
    approveTicket, 
    denyTicket
}