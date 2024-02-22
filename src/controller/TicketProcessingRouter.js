//imports
const express = require('express');
const { logger } = require("../util/logger");

const router = express.Router();

router.get('/', async(req,res) => {
    res.json(await createQueueOfTickets());
})

module.exports = router;