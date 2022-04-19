// const find = require('local-devices');
const si = require('systeminformation');
// // i use a modul for scan all the ip addres in the network
// // https://github.com/DylanPiercey/local-devices
// // TODO
// //rest to return  liste 
 exports.FindIp = (req, res, next) => {
  console.log("cpu ")

 
si.cpu()
.then(data => console.log(data))
.catch(error => console.error(error));


//   // Find all local network devices.
//   find().then((devices) => {

//     console.log(devices);

//   });
  


// promises style - new since version 3



 }