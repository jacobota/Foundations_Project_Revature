const { viewMyTickets } = require('../src/service/ViewPrevTicketsService');
const dao = require('../src/repository/TicketsDAO');

jest.mock('../src/repository/TicketsDAO');

const mockTicketList = [
    {
        ticket_id: "Ticket 1"
    },
    {
        ticket_id: "Ticket 2"
    }
];

const mockUserID = "Mock";

//Test suite to view previous tickets that have been submitted
describe('View Previous Tickets Function Test', () => {
    //test to see if the it returns the list
    test('Successfully Returns the List of Tickets', async() => {
        //Assign: Have the viewPrevTicket function in dao return the mockList
        dao.viewPrevTickets.mockResolvedValue(mockTicketList);

        //Act: Call the viewMyTickets function to get the list
        const result = await viewMyTickets(mockUserID);

        //Assert: Expect the result to equal the mockList
        expect(result).toBe(mockTicketList);
    });

    //test to see if anything failed within the dao
    test('Failure to Return the List of Tickets', async() => {
        //Assign: Have the viewPrevTicket function in dao return false
        dao.viewPrevTickets.mockResolvedValue(false);

        //Act: Call the viewMyTickets function to get the list
        const result = await viewMyTickets(mockUserID);

        //Assert: Expect the result to equal the mockList
        expect(result).toBeFalsy();
    });
})