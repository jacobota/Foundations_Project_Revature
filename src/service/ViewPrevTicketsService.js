const { viewPrevTickets } = require('../repository/TicketsDAO');
const { logger } = require('../util/logger');

async function viewMyTickets(user_id) {
    //simply just calling the viewPrevTickets function in the DAO
    return await viewPrevTickets(user_id);
}

module.exports = {
    viewMyTickets
}