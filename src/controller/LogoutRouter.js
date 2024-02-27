//imports
const express = require('express');
const { logger } = require("../util/logger");
const { logoutUser } = require('../service/Registration_LoginService');

const router = express.Router();

// ========= HTTP REQUESTS =========

// ========= Logout Feature =========

//TODO verify they are logged in to logout

// OPTIONAL
// PUT Request: User Logout
router.put('/logout', async (req, res) => {
    //Check if user did not enter a username or password
    let logoutAccount = await logoutUser();
    if(logoutAccount) {
        logger.info('Successful Logout!')
        res.json(`Successful Logout!`);
    } else {
        logger.error('Unsuccessful Logout!')
        res.json(`Unsuccessful Logout!`);
    }
})

module.exports = router;