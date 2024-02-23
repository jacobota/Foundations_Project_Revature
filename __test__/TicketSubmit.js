const { postEmployeeTicket } = require('../src/service/TicketSubmissionService');
const { registerEmployeeAccount, registerManagerAccount, loginUser, logoutUser } = require('../src/service/Registration_LoginService');

//Test Suite that works with the Ticket Submission of an employee
// describe('Ticket Submission Tests', () => {
//     const testEmployee = {
//         username: "Bobby",
//         password: "abc"
//     }

//     const testManager = {
//         username: "manager",
//         password: "abc"
//     }

//     //Register an employee and a manager at the beginning of the test
//     beforeAll(async () => {
//         await registerEmployeeAccount(testEmployee);
//         await registerManagerAccount(testManager);
//     })

//     //logout anyone that has been logged in after each test
//     afterEach(async () => {
//         await logoutUser();
//     })

//     //Login Employee and send a ticket
//     test('Submit a Ticket (Employee)', async () => {
//         // Assign: Login the employee user and create a ticket
//         await loginUser(testEmployee);
//         const testTicket = {
//             description: "This is a test ticket",
//             amount: 20
//         }

//         //Act: Call the postEmployeeTicket method
//         const result = await postEmployeeTicket(testTicket);

//         //Assert: Check the result, should be true
//         expect(result).toBeTruthy();
//     })

//     //Login as Manager and send a ticket
//     test('Submit a Ticket (Manager)', async () => {
//         // Assign: Login the manager user and create a ticket
//         await loginUser(testManager);
//         const testTicket = {
//             description: "This is a test ticket",
//             amount: 20
//         }

//         //Act: Call the postEmployeeTicket method
//         const result = await postEmployeeTicket(testTicket);

//         //Assert: Check the result, should be false since user is manager
//         expect(result).toBeFalsy();
//     })

//     //No one logged in and try to submit ticket
//     test('Submit a Ticket (No one Logged In)', async () => {
//         // Assign: create a ticket and skip the log in
//         const testTicket = {
//             description: "This is a test ticket",
//             amount: 20
//         }

//         //Act: Call the postEmployeeTicket method
//         const result = await postEmployeeTicket(testTicket);

//         //Assert: Check the result, should be false since no one logged in
//         expect(result).toBeFalsy();
//     })
// })