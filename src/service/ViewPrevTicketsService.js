const { viewPrevTickets } = require('../repository/TicketsDAO');
const { currentUser } = require('../repository/UsersDAO');
const { logger } = require('../util/logger');

async function viewMyTickets() {
    //If the user is not an employee or not logged in then 
    if(currentUser === undefined) {
        logger.error("No user logged in");
        return "No user logged in, log in as employee to continue!";
    } else if(currentUser.length === 0) {
        logger.error("No user logged in");
        return "No user logged in, log in as employee to continue!";
    }else if(currentUser[0].userRole !== "Employee") {
        logger.error("Need to be employee to submit ticket");
        return "Managers cannot view tickets!";
    } else {
        return await viewPrevTickets();
    }
}

module.exports = {
    viewMyTickets
}