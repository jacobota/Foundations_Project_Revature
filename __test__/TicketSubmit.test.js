const { postEmployeeTicket } = require('../src/service/TicketSubmissionService');
const dao = require('../src/repository/TicketsDAO');

jest.mock('../src/repository/TicketsDAO');

const mockTicket = {
    description: "Mock",
    amount: 1000
}

//Test suite to test employees posting tickets
describe('Post a Ticket Test', () => {
    test('Successfully Post a Ticket', async () => {
        //Assign: Mock the dao postTicket method to return the mockTicket
        dao.postTicket.mockResolvedValue(mockTicket);

        //Act: Call the postEmployeeTicket method
        const result = await postEmployeeTicket(mockTicket);

        //Assert: The result should equal the mockTicket, since if it passes it gives us the ticket back to show to client
        //Only checking the description, amount, employee ID, processed, and status
        expect(result.description).toBe(mockTicket.description);
        expect(result.amount).toBe(mockTicket.amount);
        expect(result.employee_id).toBe(mockTicket.user_id);
        expect(result.ticket_processed).toBeFalsy();
        expect(result.ticket_status).toBe("Pending");
    })

    test('Failure to Post a Ticket', async () => {
        //Assign: Mock the dao postTicket method to return false
        dao.postTicket.mockResolvedValue(false);

        //Act: Call the postEmployeeTicket method
        const result = await postEmployeeTicket(mockTicket);

        //Assert: The result should equal the mockTicket, since if it passes it gives us the ticket back to show to client
        expect(result).toBeFalsy();
    })
})