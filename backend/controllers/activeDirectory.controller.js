 const find = require('local-devices');
 //https://www.npmjs.com/package/systeminformation
const si = require('systeminformation');


exports.FindIp = (req, res, next) => {


  // Find all local network devices.
  find().then((devices) => {

    console.log(devices);

  });

 }

// get informtaion of the local client 
// i should installed a scipt in all  the machine 

 exports.GetData = (req, res, next) => {

  si.system()
  .then(data => console.log(data))
  .catch(error => console.error(error));
  si.cpu()
  .then(data => console.log(data))
  .catch(error => console.error(error));

  si.bios()
  .then(data => console.log(data))
  .catch(error => console.error(error));

  si.mem()
  .then(data => console.log(data))
  .catch(error => console.error(error));

  si.graphics()
  .then(data => console.log(data))
  .catch(error => console.error(error));

  si.osInfo()
  .then(data => console.log(data))
  .catch(error => console.error(error));

  si.users()
  .then(data => console.log(data))
  .catch(error => console.error(error));

  si.diskLayout()
  .then(data => console.log(data))
  .catch(error => console.error(error));

  si.networkInterfaces()
  .then(data => console.log(data))
  .catch(error => console.error(error));
 }
