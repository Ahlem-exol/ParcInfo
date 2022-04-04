const express = require('express');

const AuthController = require("../controllers/auth.controller");

const router = express.Router();

router.post('/signup', AuthController.createUser);

router.post('/login', AuthController.userLogin);

module.exports = router;
