const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket.controller');
const { api } = require('../utility');

router.post('/', api(TicketController.createTicket));
router.get('/', api(TicketController.getTickets));
router.delete('/', api(TicketController.deleteAllTickets));
router.get('/:id', api(TicketController.getTicketById));
router.put('/:id', api(TicketController.updateTicket));
router.delete('/:id', api(TicketController.deleteTicket));

module.exports = router;