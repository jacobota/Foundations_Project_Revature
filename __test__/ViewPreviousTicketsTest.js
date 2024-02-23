const { postEmployeeTicket } = require('../src/service/TicketSubmissionService');
const { registerEmployeeAccount, registerManagerAccount, loginUser, logoutUser } = require('../src/service/Registration_LoginService');
const { viewMyTickets } = require('../src/service/ViewPrevTicketsService');

//Test Suite that works with the Ticket Submission of an employee
// describe('View Previous Tickets Tests', () => {
//     const testEmployee = {
//         username: "Employee",
//         password: "abc"
//     }

//     const testManager = {
//         username: "Guy",
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

//     test('See if a Ticket is Returned After Submitting', async () => {
//         //Assign: Create some tickets and put them into a variable to test on
//         //Also login an employee and push these tickets
//         const firstTicket = {
//             description: "test ticket 1",
//             amount: 10
//         }

//         const secondTicket = {
//             description: "test ticket 2",
//             amount: 20
//         }

//         const ticketTester = [];
//         ticketTester.push(firstTicket);
//         ticketTester.push(secondTicket);
        
//         await loginUser(testEmployee);
//         await postEmployeeTicket(firstTicket);
//         await postEmployeeTicket(secondTicket);

//         //Act: Call the viewMyTickets
//         const result = await viewMyTickets();

//         //Assert: Should be equal to ticket tester 
//         expect(result).toBe(ticketTester);
//     }) 

        
    
// })