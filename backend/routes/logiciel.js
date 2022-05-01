const { Router } = require('express');
const express = require('express');
const checkAuth = require("../middleware/check-auth");

const LogicielController =require("../controllers/logiciel.controller");

const router = express.Router();

router.get('/',checkAuth,LogicielController.getAllLogiciel);
router.get('/LogPaDir',checkAuth,LogicielController.getAllLogicielParDirection);

router.post('/add',checkAuth, LogicielController.addLogiciel);
module.exports = router;