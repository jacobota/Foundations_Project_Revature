//imports
const express = require('express');
const { logger } = require('./src/util/logger');
//Routers
const regRouter = require('./src/controller/RegisterRouter');
const { router: loginRouter } = require('./src/controller/LoginRouter');
const ticketSubmit = require('./src/controller/TicketSubmitRouter');
const ticketProcess = require('./src/controller/TicketProcessingRouter');
const viewPrevTickets = require('./src/controller/ViewPrevTicketsRouter');
const logoutRouter = require('./src/controller/LogoutRouter');
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
// Registration Feature
app.use('/register', regRouter);

// Login Feature
app.use('/user', loginRouter);

//Logout Feature
app.use('/user', logoutRouter);

// Ticket Submission Feature
app.use('/ticketSubmit', ticketSubmit);

// Ticket Review Feature
app.use('/ticketProcessing', ticketProcess);

// View Past Tickets Feature
app.use('/viewMyTickets', viewPrevTickets);

// Debug
app.use('/view', debugRouter);