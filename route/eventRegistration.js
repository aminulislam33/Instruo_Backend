const express = require('express');
const router = express.Router();
const eventRegistrationController = require('../controller/eventRegistration');

router.post('/', eventRegistrationController.createRegistration);

//these are only for admin
router.get('/', eventRegistrationController.getAllRegistrations);
router.get('/:id', eventRegistrationController.getRegistrationById);
router.put('/:id', eventRegistrationController.updateRegistration);
router.delete('/:id', eventRegistrationController.deleteRegistration);

module.exports = router;