//imports
const express = require('express');
const { viewMyTickets } = require('../service/ViewPrevTicketsService');

const router = express.Router();

// ========= HTTP REQUESTS =========

// ========= View all Previous Tickets Submitted =========
router.get('/', async (req, res) => {
    res.json(await viewMyTickets());
})

module.exports = router;