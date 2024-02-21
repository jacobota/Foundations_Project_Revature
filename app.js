//imports
const express = require('express');
const { logger } = require('./src/util/logger');
//Routers
const reg_logRouter = require('./src/controller/UserRouter');
const ticketSubmit = require('./src/controller/TicketSubmitRouter');
const debugRouter = require('./src/controller/DebugRouter');

//create the server on PORT 3000
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    logger.info(`Started the server on Port ${PORT}`);
});

//middleware and logger
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`Incoming ${req.method}: ${req.url}`);
    next();
})

// ========= ROUTERS =========
// Registration and Login Feature
app.use('/users', reg_logRouter);

// Ticket Submission Feature
app.use('/ticketSubmit', ticketSubmit);

// Ticket Review Feature

// View Past Tickets Feature

// Debug
app.use('/view', debugRouter);