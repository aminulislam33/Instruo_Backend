const express = require('express');
const multer = require('multer');
const router = express.Router();
const eventRegistrationController = require('../controller/eventRegistration');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const {isLoggedIn, isAdmin}= require("../middleware.js");

router.post('/', upload.single('paymentProof'), eventRegistrationController.createRegistration);

router.get('/', eventRegistrationController.getAllRegistrations);
router.get('/:id', eventRegistrationController.getRegistrationById);
router.put('/:id', eventRegistrationController.updateRegistration);
router.delete('/:id', eventRegistrationController.deleteRegistration);

module.exports = router;