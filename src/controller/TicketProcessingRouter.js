//imports
const express = require('express');
const { logger } = require("../util/logger");
const service = require('../service/TicketProcessingService');
const { authenticateManagerToken } = require('./LoginRouter');

const router = express.Router();

//gets all of the tickets that have yet to be processed
router.get('/', authenticateManagerToken,  async(req,res) => {
    const data = await service.getAllUnprocTickets();
    if(data) {
        logger.info('Displaying all Unprocessed Tickets');
        res.json({
            message: "Here are all the unprocessed tickets",
            tickets: data
        })
    } else {
        res.json({message: "Unable to get tickets"})
    }
})

//Approve a ticket
router.put('/approveTicket', authenticateManagerToken, async(req,res) => {
    //call the getallUnprocTickets to get most updated list
    await service.getAllUnprocTickets();
    //call the approve function in order to approve the first message in the array
    const data = await service.approveTicket();
    //call the getAllUnprocTickets again to get the new list
    const ticketsLeft = await service.getAllUnprocTickets();
    res.json({
        ticket_approved: data,
        tickets_in_queue: ticketsLeft
    })
})

//Deny a ticket
router.put('/denyTicket', authenticateManagerToken, async(req,res) => {
    //call the getallUnprocTickets to get most updated list
    await service.getAllUnprocTickets();
    //call the approve function in order to approve the first message in the array
    const data = await service.denyTicket();
    //call the getAllUnprocTickets again to get the new list
    const ticketsLeft = await service.getAllUnprocTickets();
    res.json({
        ticket_approved: data,
        tickets_in_queue: ticketsLeft
    })
})

module.exports = router;