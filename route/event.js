const express = require('express');
const { createEvent, getEvents } = require('../controller/event');
const router = express.Router();

router.post('/create', createEvent);
router.get('/events', getEvents);

module.exports = router;