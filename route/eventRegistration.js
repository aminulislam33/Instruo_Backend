const express = require('express');
const router = express.Router();
const eventRegistrationController = require('../controller/eventRegistration');
const {isLoggedIn, isAdmin}= require("../middleware.js");
const multer = require('multer');
const upload = multer({ storage });

router.post('/', upload.single(), eventRegistrationController.createRegistration);

router.get('/', eventRegistrationController.getAllRegistrations);
router.get('/:id', eventRegistrationController.getRegistrationById);
router.put('/:id', eventRegistrationController.updateRegistration);
router.delete('/:id', eventRegistrationController.deleteRegistration);

module.exports = router;