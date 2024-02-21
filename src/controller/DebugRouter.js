//imports
const express = require('express');
const { logger } = require("../util/logger");
const { getEmployees, getManagers } = require('../service/DebugService');
const { currentUser } = require('../repository/UsersDAO');

const router = express.Router();

// ========= HTTP REQUESTS =========

//GET Request: Employee List for debugging purposes
router.get('/employeeList', async (req, res) => {
    res.json(await getEmployees());
});

//GET Request: Manager List for debugging purposes
router.get('/managerList', async (req, res) => {
    res.json(await getManagers());
});

//GET Request: Current User for debugging purposes
router.get('/currentUser', async (req, res) => {
    logger.info("Displaying Current User");
    //TODO: Get current User working
    console.log(currentUser);
    res.json(currentUser);
})

module.exports = router;