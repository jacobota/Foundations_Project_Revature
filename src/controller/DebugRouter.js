//imports
const express = require('express');
const { logger } = require("../util/logger");
const { getEmployees, getManagers } = require('../service/DebugService');
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

// router.get('/ticketList', authenticateToken, async(req,res) => {
//     logger.info("Displaying Tickets");
//     res.json(await createQueueOfTickets());
// })

module.exports = router;