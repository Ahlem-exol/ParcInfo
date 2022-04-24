const express = require('express');

const AuthController = require("../controllers/auth.controller");
const activeDirectory = require("../controllers/activeDirectory.controller")

const router = express.Router();

router.get('/find', activeDirectory.GetData);
router.post('/signup', AuthController.createUser);

router.post('/login', AuthController.userLogin);

module.exports = router;
