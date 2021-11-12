const { Router } = require('express');
const express = require('express');

const DocumentController =require("../controllers/document.controller");

const router = express.Router();
router.post('/add',DocumentController.addDocument);

module.exports = router;