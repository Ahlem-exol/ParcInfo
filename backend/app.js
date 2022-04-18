const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

// /* ROUTES */
const employeeRoutes = require('./routes/employee');
const machineRoutes = require('./routes/machine');
const directionRoutes = require('./routes/direction');
const fournisseurRoutes = require('./routes/fournisseur');
const interventionRoutes = require('./routes/intervention');
const logicielRoutes = require('./routes/logiciel');
const documentRoutes =require('./routes/document');
const authRoutes =require('./routes/auth');
//   /* LIeN */

app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/fournisseur',fournisseurRoutes);
app.use('/api/dir',directionRoutes);
app.use('/api/machine',machineRoutes);
app.use('/api/intervention',interventionRoutes);
app.use('/api/logiciel',logicielRoutes);
app.use('/api/document',documentRoutes);

module.exports = app;

