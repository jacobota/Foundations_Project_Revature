//imports
const express = require('express');
const { logger } = require("../util/logger");
const { postEmployeeTicket } = require('../service/TicketSubmissionService');
const { authenticateEmployeeToken } = require('./LoginRouter');

const router = express.Router();

// ========= HTTP REQUESTS =========

// ========= Ticket Submission Feature =========

//POST Request: Ticket Submission
router.post('/postTicket', authenticateEmployeeToken, async (req, res) => {
    const data = req.body;
    const user = req.user;
    data.user_id = user.user_id;
    //Check if user did not enter a username or password
    if(!data.amount || !data.description) {
        logger.error("No amount or description entered.");
        res.json(`Please Enter an amount and/or description`);
    }
    else {
        let postTicket = await postEmployeeTicket(data);
        if(postTicket) {
            res.json({
                message: "Successfully Posted Reimbursement Ticket",
                user: `Sent By: ${user.username}`,
                ticket: postTicket
            });
        } else {
            res.json(`Failure to post your Ticket`);
        }
    }
})

module.exports = router;