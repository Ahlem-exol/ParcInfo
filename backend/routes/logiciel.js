const { Router } = require('express');
const express = require('express');

const LogicielController =require("../controllers/logiciel.controller");

const router = express.Router();

router.get('/',LogicielController.getAllLogiciel);
router.get('/LogPaDir',LogicielController.getAllLogicielParDirection);
module.exports = router;