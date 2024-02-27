const { postTicket } = require('../repository/TicketsDAO');
const { logger } = require('../util/logger');
const { v4 } = require('uuid');
//get the current user to validate the user can send tickets
const { currentUser } = require('../repository/UsersDAO');

// function to post a ticket
async function postEmployeeTicket(data) {
    //User should be logged in to access this (Authorized through POST method)
    //create a ticket object
    let uuid = v4();

    let newTicket = {
        ticket_id: uuid,
        description: data.description,
        amount: data.amount,
        employee_id: data.user_id,
        ticket_status: "Pending",
        ticket_processed: false
    };

    //push that employee item
    if(await postTicket(newTicket)) {
        logger.info("Successfully added the Ticket");
        return newTicket;
    }else {
        return false;
    }     
}

module.exports = {
    postEmployeeTicket
}