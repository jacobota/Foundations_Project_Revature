//imports
const express = require('express');
const { viewMyTickets } = require('../service/ViewPrevTicketsService');
const { authenticateEmployeeToken } = require('./LoginRouter');

const router = express.Router();

// ========= HTTP REQUESTS =========

// ========= View all Previous Tickets Submitted =========
router.get('/', authenticateEmployeeToken, async (req, res) => {
    const user = req.user;
    const tickets = await viewMyTickets(user.user_id);
    if(tickets) {
        res.status(200).json({
            message: `User: ${user.username}`,
            previous_tickets_submitted: tickets
        })
    } else {
        res.status(404).json({message: "Error Returning Tickets!"})
    }
})

module.exports = router;