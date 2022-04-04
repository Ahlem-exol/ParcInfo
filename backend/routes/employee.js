const { Router } = require('express');
const express = require('express');
const checkAuth = require("../middleware/check-auth");
const EmployeeController =require("../controllers/employee.controller");

const router = express.Router();

router.get('/',checkAuth,EmployeeController.getAllEmployee);

router.post('/add', checkAuth,EmployeeController.addEmployee);
// the dynamics route always in the end
router.get('/:id',checkAuth, EmployeeController.getEmployee);
router.get('/inter/:id',checkAuth,EmployeeController.getAllInterventionEmployee);
router.get('/mach/:id',checkAuth,EmployeeController.getAllMachineEmployee);

router.put('/update/:id',checkAuth,EmployeeController.updateEmployee);
router.delete('/:id',checkAuth, EmployeeController.deleteEmployee);
module.exports = router;