const { Router } = require('express');

const checkAuth = require("../middleware/check-auth");
const express = require('express');

const MachineController =require("../controllers/machine.controller");

const router = express.Router();

 router.get('/',checkAuth,MachineController.getAllMachine);
 router.post('/add',checkAuth, MachineController.addMachine);
// // the dynamics route always in the end
 router.get('/:id',checkAuth,MachineController.getMachine);
 router.put('/update/:id',checkAuth,MachineController.updateMachine);
// router.delete('/:id', EmployeeController.deleteEmployee);
module.exports = router;