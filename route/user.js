const express = require('express');
const router = express.Router();
const userController= require("../controller/user.js")

router.get('/search', userController.searchEmail);
router.get('/status', userController.getStatus);
router.get('/registered-events/:id', userController.getAllRegistrations);

module.exports= router;