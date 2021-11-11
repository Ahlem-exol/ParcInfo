const { Router } = require('express');
const express = require('express');

const InterventionController =require("../controllers/Intervention.controller");

const router = express.Router();

 router.get('/',InterventionController.getAllIntervention);
 router.post('/add', InterventionController.addIntervention);
// // the dynamics route always in the end
 router.get('/:id', InterventionController.getIntervention);
 router.put('/update/:id',InterventionController.updateIntervention);
 router.delete('/:id', InterventionController.deleteIntervention);
module.exports = router;