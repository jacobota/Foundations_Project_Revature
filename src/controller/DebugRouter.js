//imports
const express = require('express');
const { logger } = require("../util/logger");
const { getEmployees, getManagers, getAllTickets } = require('../service/DebugService');
const { authenticateToken } = require('./LoginRouter');

const router = express.Router();

// ========= HTTP REQUESTS =========

//GET Request: Employee List for debugging purposes
router.get('/employeeList', authenticateToken, async (req, res) => {
    logger.info("Displaying Employees");
    res.json(await getEmployees());
});

//GET Request: Manager List for debugging purposes
router.get('/managerList', authenticateToken, async (req, res) => {
    logger.info("Displaying Managers");
    res.json(await getManagers());
});

//GET Request: Current User for debugging purposes
router.get('/currentUser', authenticateToken, async (req, res) => {
    logger.info("Displaying Current User");
    res.json(req.user);
})

//GET Request: All tickets that have been submitted
router.get('/ticketList', authenticateToken, async(req,res) => {
    logger.info("Displaying Tickets");
    res.json(await getAllTickets());
})

module.exports = router;