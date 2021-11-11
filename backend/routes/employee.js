const { Router } = require('express');
const express = require('express');

const EmployeeController =require("../controllers/employee.controller");

const router = express.Router();

router.get('/',EmployeeController.getAllEmployee);
router.post('/add', EmployeeController.addEmployee);
// the dynamics route always in the end
router.get('/:id', EmployeeController.getEmployee);
router.put('/update/:id',EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);
module.exports = router;