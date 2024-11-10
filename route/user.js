const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.get('/', userController.home);
router.get('/addevent', userController.addEvent);
router.get('/getallevents', userController.seeAllEvents);

module.exports = router;