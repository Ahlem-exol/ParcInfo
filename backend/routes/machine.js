const { Router } = require('express');
const express = require('express');

const MachineController =require("../controllers/machine.controller");

const router = express.Router();

 router.get('/',MachineController.getAllMachine);
 router.post('/add', MachineController.addMachine);
// // the dynamics route always in the end
 router.get('/:id', MachineController.getMachine);
 router.put('/update/:id',MachineController.updateMachine);
// router.delete('/:id', EmployeeController.deleteEmployee);
module.exports = router;