//imports
const express = require('express');
const { logger } = require("../util/logger");
const { postEmployeeTicket } = require('../service/TicketSubmissionService');

const router = express.Router();

// ========= HTTP REQUESTS =========

// ========= Ticket Submission Feature =========

//POST Request: Ticket Submission
router.post('/postTicket', async (req, res) => {
    const data = req.body;
    //Check if user did not enter a username or password
    if(!data.amount || !data.description) {
        logger.error("No amount or description entered.");
        res.json(`Please Enter an amount and/or description`);
    }
    else {
        let postTicket = await postEmployeeTicket(data);
        if(postTicket) {
            res.json(`Successfully posted your Ticket`);
        } else {
            res.json(`Failure to post your Ticket`);
        }
    }
})

module.exports = router;