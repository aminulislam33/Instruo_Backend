const express = require('express');
const authController = require('../controller/authController');

const Router = express.Router();

Router.get("/google", authController.googleAuth);
Router.get("/logout", authController.logout);

module.exports = Router;