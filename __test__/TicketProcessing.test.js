const { getAllUnprocTickets, approveTicket, denyTicket } = require('../src/service/TicketProcessingService');
const dao = require('../src/repository/TicketsDAO');

jest.mock('../src/repository/TicketsDAO');

//Placeholder mocks for the tests
const mockTicketList = [
    {
        ticket_id: "Ticket 1",
        ticket_status: "Pending",
        ticket_processed: false
    },
    {
        ticket_id: "Ticket 2",
        ticket_status: "Pending",
        ticket_processed: false
    }
];

const approvedTicket = {
    ticket_id: "Mock Ticket",
    ticket_status: "Approve",
    ticket_processed: true
}

const deniedTicket = {
    ticket_id: "Mock Ticket",
    ticket_status: "Deny",
    ticket_processed: true
}


//test suite for testing the processing ticket feature
describe('Ticket Processing Feature Tests', () => {
    //Test to get all the unprocessed tickets
    test('Get all Unprocessed Tickets', async() => {
        //Assign: Assign the dao object to return the ticket list
        dao.createQueueOfTickets.mockResolvedValue(mockTicketList);

        //Act: Call the getAll UnprocTickets method
        const result = await getAllUnprocTickets();

        //Assert: Expect the result to be the mockTicketList
        expect(result).toBe(mockTicketList);
    })

    //If something failed in the dao when retriveing the ticket list
    test('Failure to Get All Unprocessed Tickets Test', async() => {
        //Assign: Assign the dao object to return false
        dao.createQueueOfTickets.mockResolvedValue(false);

        //Act: Call the getAll UnprocTickets method
        const result = await getAllUnprocTickets();

        //Assert: Expect the result to be false
        expect(result).toBeFalsy();
    })

    //Test the approve ticket feature
    test('Approve Ticket Test', async() => {
        //Assign: Assign the dao object to return the approved ticket
        dao.approveTicketDAO.mockResolvedValue(approvedTicket);

        //Act: Call the approveTicket method
        const result = await approveTicket("John");

        //Assert: Expect the result to be the approvedTicket
        expect(result).toBe(approveTicket);
    })

    //If the dao failed to return the approved ticket
    test('Failure to Approve Ticket Test', async() => {
        //Assign: Assign the dao object to return false
        dao.approveTicketDAO.mockResolvedValue(false);

        //Act: Call the approveTicket method
        const result = await approveTicket("John");

        //Assert: Expect the result to be false
        expect(result).toBeFalsy();
    })

    //Test the Deny ticket feature
    test('Deny Ticket Test', async() => {
        //Assign: Assign the dao object to return the denied ticket
        dao.denyTicketDAO.mockResolvedValue(deniedTicket);

        //Act: Call the deniedTicket method
        const result = await denyTicket("John");

        //Assert: Expect the result to be the deniedTicket
        expect(result).toBe(deniedTicket);
    })

    //If the dao failed to return the denied ticket
    test('Failure to Deny Ticket Test', async() => {
        //Assign: Assign the dao object to return false
        dao.denyTicketDAO.mockResolvedValue(false);

        //Act: Call the deniedTicket method
        const result = await denyTicket("John");

        //Assert: Expect the result to be false
        expect(result).toBeFalsy();
    })
})