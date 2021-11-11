const { Router } = require('express');
const express = require('express');

const DirectionController =require("../controllers/direction.controller");

const router = express.Router();

router.get('/',DirectionController.getAllDirection);

module.exports = router;