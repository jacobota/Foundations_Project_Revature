const { postTicket } = require('../repository/TicketsDAO');
const { logger } = require('../util/logger');
const { v4 } = require('uuid');
//get the current user to validate the user can send tickets
const { currentUser } = require('../repository/UsersDAO');

// function to post a ticket
async function postEmployeeTicket(data) {
    //If the user is not an employee or not logged in then 
    if(currentUser[0].userRole !== "Employee" || currentUser.length === 0) {
        return false;
    } else {
        //if it is not present from the check above then:
        //create an employee object
        let uuid = v4();

        let newTicket = {
            ticket_id: uuid,
            description: data.description,
            amount: data.amount,
            employee_id: currentUser[0].user_id,
            ticket_status: "Pending"
        };

        //push that employee item
        if(await postTicket(newTicket)) {
            logger.info("Successfully added the Ticket");
            return true;
        }else {
            return false;
        }
    }
}

module.exports = {
    postEmployeeTicket
}