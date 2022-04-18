const find = require('local-devices');

exports.FindIp = (req, res, next) => {
  console.log("ip adresses")

  // Without using a transpiler
 
  
  // Find all local network devices.
  find().then((devices) => {
    console.log(devices);
  });
  




};
