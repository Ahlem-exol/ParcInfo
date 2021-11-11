const Employee = require('../models/employee');
const Direction = require('../models/direction');
//get liste employee
exports.getAllEmployee = (req,res, next) => {
  Employee.findAll({
    attributes:['idEmp','nomEmp','prenomEmp','dateNaiss','post','numTele','mailEmp','numPost','matricule','adresse'],
   include:[
    {
      model:Direction,attributes:['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention','UserPost','Emplacement']}
  ]

})
    .then((employees) => {
     // console.log(users[0].usr_email);
     // console.log(employees);
      res.status(200).json({
        message: 'Employees !',
        employees: employees.map(employee => {
          return {
             id: employee.idEmp,
             nom: employee.nomEmp,
             prenom: employee.prenomEmp,
             datenaissance:employee.dateNaiss,
             post: employee.post,
             numtel:employee.numTele,
             mailPers:employee.mailEmp,
             numpost:employee.numPost,
             matricule:employee.matricule,
             adresse:employee.adresse,
             direction:{
                
                    id: employee.direction.idDir,
                    nom: employee.direction.nomDir,
                    numPost: employee.direction.numPost,
                    effective:employee.direction.effectif,
                    nbrEmp: employee.direction.nbrEmp,
                    nbrMach :employee.direction.nbrMachine,
                    nbrInterv:employee.direction.nbrIntervention,
                    userPost:employee.direction.UserPost,
                    emplacement:employee.direction.Emplacement
                      }
          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};

// ////////////////////////////////////////////////////////////////////////////////////////////////
exports.getEmployee = (req, res, next) => {
 const employeeId = req.params.id;

 Employee.findOne({
  where:{idEmp:employeeId},
  attributes:['idEmp','nomEmp','prenomEmp','dateNaiss','post','numTele','mailEmp','numPost','matricule','adresse'],
  include:[
   {model:Direction,attributes:['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention','UserPost','Emplacement']}
 ]}
 ).then(employee=>{

 if (!employee) {
  return res.status(401).json({
    message: 'Employee does not exist !'
  });
}else{
  res.status(200).json({
    message: 'ok from controller  !',
    employee: { 
      id: employee.idEmp,
      nom: employee.nomEmp,
      prenom: employee.prenomEmp,
      datenaissance:employee.dateNaiss,
      post: employee.post,
      numtel:employee.numTele,
      mailPers:employee.mailEmp,
      numpost:employee.numPost,
      matricule:employee.matricule,
      adresse:employee.adresse,
      direction:{
         
             id: employee.direction.idDir,
             nom: employee.direction.nomDir,
             numPost: employee.direction.numPost,
             effective:employee.direction.effectif,
             nbrEmp: employee.direction.nbrEmp,
             nbrMach :employee.direction.nbrMachine,
             nbrInterv:employee.direction.nbrIntervention,
             userPost:employee.direction.UserPost,
             emplacement:employee.direction.Emplacement
               }

    }

  });
}
 }).catch(error=>{
   console.log(error);
   res.status(500).json({
     error:error,
     message :'An error occured while fetching the employee! Please try later or contact the administrator',
   });
 })
};

// /////////////////////////////////////add employee
exports.addEmployee = (req, res, next) => {
  const employee = new Employee({
    matricule:req.body.matricule,
    nomEmp:req.body.nom,
    prenomEmp:req.body.prenom,
    post : req.body.post,
    idDir :req.body.idDir ,
    dateNaiss:req.body.datenaissance,
    numTele:req.body.numtel,
    mailEmp:req.body.mailPers,
    numPost:req.body.numPost,
    adresse:req.body.adresse
  });

  employee.save().then(result => {

    res.status(201).json({
      message: ' Add employee  ! .',
    });
  })
.catch(err => {
  res.status(500).json({
    error: err,
    message: 'Error !',
  });
});
  
};


// //upate employee
exports.updateEmployee = (req, res, next) => {
  console.log(req.body.direction.id);
  const employeeId = req.params.id;

  Employee.findOne({   where:{idEmp:employeeId},
    attributes:['idEmp','nomEmp','prenomEmp','dateNaiss','post','numTele','mailEmp','numPost','matricule','adresse'],
    include:[
     {model:Direction,attributes:['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention','UserPost','Emplacement']}
   ]}

   ).then(employee => {
    if (!employee) {
      return res.status(401).json({
        message: 'employee does not exist !'
      });
    }else{
        employee.update({
          matricule:req.body.matricule,
          nomEmp:req.body.nom,
          prenomEmp:req.body.prenom,
          post : req.body.post,
          idDir :req.body.direction.id ,
          dateNaiss:req.body.datenaissance,
          numTele:req.body.numtel,
          mailEmp:req.body.mailPers,
          numPost:req.body.numPost,
          adresse:req.body.adresse

      }) .then(result => {
        res.status(201).json({
          message: 'Employee update  !',
          result: result,
        });
      }).catch(err => {
        res.status(500).json({
          error: err,
        });
      });
    }
  })
};
// ///////////////////delete
exports.deleteEmployee = (req, res, next) => {
  // User.destroy({where:{user_id: req.params.id}});
  const employeeId = req.params.id;
  Employee.findOne({ where:  { idEmp: employeeId},
    attributes:['idEmp','nomEmp','prenomEmp','dateNaiss','post','numTele','mailEmp','numPost','matricule','adresse'],
    include:[
     {model:Direction,attributes:['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention','UserPost','Emplacement']}
   ]}
    ) .then(employee => {
      return employee.destroy();
    })
    .then(result => {
      res.status(200).json({message: "User deleted !"});
    })
    .catch(err => console.log(err));
};
