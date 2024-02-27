const dao = require('../repository/DebugDAO');

async function getEmployees() {
    return await dao.getEmployees();
}

async function getManagers() {
    return await dao.getManagers();
}

async function getAllTickets() {
    return await dao.getTickets();
}

module.exports = {
    getEmployees,
    getManagers,
    getAllTickets
}