//imports
const express = require('express');
const { getEmployees, getManagers, getAllTickets } = require('../service/DebugService');
const { authenticateToken } = require('./LoginRouter');

const router = express.Router();

// ========= HTTP REQUESTS =========

//GET Request: Employee List for debugging purposes
router.get('/employeeList', authenticateToken, async (req, res) => {
    const data = await getEmployees();
    if(data) {
        res.status(200).json({
            message: "Here are the Employees Registered",
            list_of_employees: data
        });
    } else {
        res.status(404).json({message: "Failure to get Employees"})
    }
});

//GET Request: Manager List for debugging purposes
router.get('/managerList', authenticateToken, async (req, res) => {
    const data = await getManagers();
    if(data) {
        res.status(200).json({
            message: "Here are the Managers Registered",
            list_of_managers: data
        });
    }else {
        res.status(404).json({message: "Failure to get Managers"})
    }
});

//GET Request: Current User for debugging purposes
router.get('/currentUser', authenticateToken, async (req, res) => {
    //need to have been authenticated to show this so wont have flow control check on it
    res.status(200).json(req.user);
})

//GET Request: All tickets that have been submitted
router.get('/ticketList', authenticateToken, async(req,res) => {
    const data = await getAllTickets();
    if(data) {
        res.status(200).json({
            message: "Here are the Tickets that have been sent",
            list_of_tickets: data
        });
    }else {
        res.status(404).json({message: "Failure to get Tickets"})
    }
})

module.exports = router;