const { postTicket } = require('../repository/TicketsDAO');
const { logger } = require('../util/logger');
const { v4 } = require('uuid');
//get the current user to validate the user can send tickets

// function to post a ticket
async function postEmployeeTicket(data) {
    //User should be logged in to access this (Authorized through POST method)
    //create a ticket object
    let uuid = v4();

    //get the current time
    const date = new Date();
    let seconds, minutes, hours;
    //check if there needs to be a 0 infront of a single digit
    if(date.getSeconds() < 10) {
        seconds = `0${date.getSeconds()}`
    } else {
        seconds = date.getSeconds();
    }
    if(date.getMinutes() < 10) {
        minutes = `0${date.getMinutes()}`
    } else {
        minutes = date.getMinutes();
    }
    if(date.getHours() < 10) {
        hours = `0${date.getHours()}`
    } else {
        hours = date.getHours();
    }
    const time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${hours}:${minutes}:${seconds}`

    let newTicket = {
        ticket_id: uuid,
        description: data.description,
        amount: data.amount,
        employee_id: data.user_id,
        ticket_status: "Pending",
        time_submitted: time,
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