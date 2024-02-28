//imports
const express = require('express');
const service = require('../service/TicketProcessingService');
const { logger } = require('../util/logger');
const { authenticateManagerToken } = require('./LoginRouter');

const router = express.Router();

//gets all of the tickets that have yet to be processed
router.get('/', authenticateManagerToken,  async(req,res) => {
    const data = await service.getAllUnprocTickets();
    if(data) {
        res.status(200).json({
            message: "Here are all the unprocessed tickets",
            tickets: data
        })
    } else {
        res.status(404).json({message: "Unable to get tickets"})
    }
})

//Approve a ticket
router.put('/approveTicket', authenticateManagerToken, async(req,res) => {
    const manager = req.user;
    //call the getallUnprocTickets to get most updated list
    const tickets = await service.getAllUnprocTickets();
    if(tickets.length === 0) {
        logger.error("Queue is empty");
        res.status(404).json({message: "No more messages in queue"});
    } else {
        //call the approve function in order to approve the first message in the array
        const data = await service.approveTicket();
        if(data) {
            //call the getAllUnprocTickets again to get the new list
            const ticketsLeft = await service.getAllUnprocTickets();
            res.status(200).json({
                approved_by: manager.username,
                ticket_approved: data,
                tickets_in_queue: ticketsLeft
            })
        } else {
            res.status(404).json({message: "Unable to approve next ticket"});
        }
    }
})

//Deny a ticket
router.put('/denyTicket', authenticateManagerToken, async(req,res) => {
    const manager = req.user;
    //call the getallUnprocTickets to get most updated list
    const ticket = await service.getAllUnprocTickets();
    if(ticket.length === 0) {
        logger.error("Queue is empty");
        res.status(404).json({message: "No more messages in queue"});
    } else {
        //call the approve function in order to approve the first message in the array
        const data = await service.denyTicket();
        if(data) {
            //call the getAllUnprocTickets again to get the new list
            const ticketsLeft = await service.getAllUnprocTickets();
            res.status(200).json({
                denied_by: manager.username,
                ticket_approved: data,
                tickets_in_queue: ticketsLeft
            })
        } else {
            res.status(404).json({message: "Unable to deny next ticket"});
        }
    }
})

module.exports = router;