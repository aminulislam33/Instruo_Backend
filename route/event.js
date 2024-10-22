const express = require('express');
const { createEvent, getEvents } = require('../controller/event');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router.post('/create', upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
]), createEvent);
router.get('/events', getEvents);

module.exports = router;