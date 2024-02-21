//imports
const express = require('express');
const { logger } = require('./src/util/logger');
//Routers
const reg_logRouter = require('./src/controller/userRouter');
//const { submitTicket } = require('./src/service/Ticket_Submit_Feature');
//DynamoDB debugging methods
//const { getEmployees, getManagers } = require('./src/repository/DebugDAO');

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
// ========= Registration-Login Features =========
app.use('/users', reg_logRouter);

// ========= Ticket Submission Feature =========

// app.post('/submitTicket', (req, res) => {
//     logger.info("Attempting to Submit a Ticket");
//     const data = req.body;
//     //Check if any of the data is missing
//     if(!data.description || !data.amount) {
//         logger.error("No description or amount given");
//         res.json(`Please Enter a Amount and/or Description`);
//     } else {
//         if(submitTicket(data)) {
//             logger.info("Successfully submitted ticket");
//             res.json(`Successfully submitted ticket`)
//         } else {
//             logger.error("Tried to submit ticket as Manager");
//             res.json(`Cannot submit ticket as a Manager`);
//         }
//     }
// })


// ========= DEBUG GET REQUESTS =========

//GET Request: Employee List for debugging purposes
// app.get('/employeeList', async (req, res) => {
//     logger.info("Displaying Employee List");
//     res.json(await getEmployees());
// });

// //GET Request: Manager List for debugging purposes
// app.get('/managerList', async (req, res) => {
//     logger.info("Displaying Manager List");
//     res.json(await getManagers());
// });

// //GET Request: Current User for debugging purposes
// app.get('/currentUser', async (req, res) => {
//     logger.info("Displaying Current User");
//     //TODO: Get current User working
//     res.json();
// })