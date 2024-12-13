const express = require('express');
const eventManagement = require('../controller/event');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const {isLoggedIn, isAdmin}= require("../middleware.js");

router.get('/', eventManagement.getEvents);
router.get('/:id', eventManagement.getEventById);

router.post('/create', upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
]), eventManagement.createEvent);

router.put('/:id', upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
]), eventManagement.updateEvent);

router.delete('/:id', eventManagement.deleteEvent);

module.exports = router;