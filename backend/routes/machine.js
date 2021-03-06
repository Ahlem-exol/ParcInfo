const { Router } = require('express');
const checkAuth = require("../middleware/check-auth");
const express = require('express');
const MachineController =require("../controllers/machine.controller");

const router = express.Router();

 router.get('/',checkAuth,MachineController.getAllMachine);
 router.post('/add',checkAuth, MachineController.addMachine);
//  add information of the hard parte 
 router.post('/addHard',checkAuth, MachineController.addHard);
 router.post('/addNetwork',checkAuth, MachineController.addNetwork);
 router.post('/addLogiciels',checkAuth, MachineController.addLogiciels);
// // the dynamics route always in the end

router.get('/count',checkAuth,MachineController.getMachineCount);
 router.get('/:id',checkAuth,MachineController.getMachine);
 router.get('/GetHardDetaille/:id',checkAuth,MachineController.getHardDetaille);
 router.get('/GetNetworkDetaille/:id',checkAuth,MachineController.getNetworkDetaille);
 router.get('/GetLogicielsData/:id',checkAuth,MachineController.getLogicielInstalled);

 router.put('/update/:id',checkAuth,MachineController.updateMachine);
// router.delete('/:id', EmployeeController.deleteEmployee);
module.exports = router;