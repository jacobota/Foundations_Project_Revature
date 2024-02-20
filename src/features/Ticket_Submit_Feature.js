//function to submit a ticket
function submitTicket(data) {
    if(currentUser[0].role === "Employee") {
        const ticket = {
            sender: currentUser[0].username,
            description: data.description,
            amount: data.amount,
            status: "Pending"
        };
        ticketList.push(ticket);
        return true;
    } else {
        return false;
    }
}

module.exports = {
    submitTicket: submitTicket
}