const { Router } = require('express');
const express = require('express');
const checkAuth = require("../middleware/check-auth");
const DirectionController =require("../controllers/direction.controller");

const router = express.Router();

router.get('/',checkAuth,DirectionController.getAllDirection);

router.get('/:nomDir',checkAuth,DirectionController.getDirection);

module.exports = router;