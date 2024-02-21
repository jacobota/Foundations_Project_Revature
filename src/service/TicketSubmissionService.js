const { postTicket } = require('../repository/TicketsDAO');
const { logger } = require('../util/logger');
//get the current user to validate the user can send tickets
const { currentUser } = require('../repository/UsersDAO');

// function to post a ticket
async function postEmployeeTicket(data) {
    //If the user is not an employee or not logged in then 
    if(currentUser[0].userRole !== "Employee" || currentUser.length === 0) {
        return false;
    } else {
        //
        return true;
    }
}

module.exports = {
    postEmployeeTicket
}