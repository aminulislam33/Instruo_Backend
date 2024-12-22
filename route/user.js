const express = require('express');
const router = express.Router();
const userController= require("../controller/user.js")

router.get('/search', userController.searchEmail);

module.exports= router;