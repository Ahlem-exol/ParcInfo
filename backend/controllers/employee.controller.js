const Employee = require('../models/employee');
const Direction = require('../models/direction');
const Intervention = require('../models/intervention');
const Machine = require('../models/machine');
var sequelize = require('sequelize');
////////////////////////////////////
exports.getAllEmployee = (req,res, next) => {
  Employee.findAll({
    attributes:['idEmp','nomEmp','prenomEmp','dateNaiss','post','numTele','mailEmp','numPost','matricule','adresse'],
   include:[
    {
      model:Direction,attributes:['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention','UserPost','Emplacement']}
  ]

})
    .then((employees) => {

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
exports.getEmployeeCount = (req,res, next) => {

  Employee.findAll({
//     SELECT idDir, COUNT(idEmp) AS idEmp
//     FROM employee
//     GROUP BY idDir;
// en va le traduire en sequelize
    attributes: ['idDir', [sequelize.fn('COUNT', sequelize.col('idEmp')),'nbrEmployee']],
    group : ['Employee.idDir'],
    raw: true,
  }).then((charts) => {
// i have charte contien le id et nombre des elmetns dans la structure 
charts.forEach(element => {
  
  Direction.findOne({
    where:{idDir : element.idDir},
    attributes:['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention','UserPost','Emplacement']
  }).then(direction=>{
    direction.update({
      nbrEmp: element.nbrEmployee,
  }).then(result => {
    res.status(201).json({
      message: 'direction  update  !',
      result: result,
    });
   });
  });


  })
  .catch((err) => {
    console.log(err)
  });
  });
}


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

  const idUser = req.userData.id;
  console.log("the id get it by the tocken",idUser)
  const employee = new Employee({
    matricule:req.body.matricule,
    nomEmp:req.body.nom,
    prenomEmp:req.body.prenom,
    post : req.body.post,
    idDir :req.body.idDir,
    dateNaiss:req.body.datenaissance,
    numTele:req.body.numtel,
    mailEmp:req.body.mailPers,
    numPost:req.body.numPost,
    adresse:req.body.adresse,
    idUser:idUser,
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


// //update employee
exports.updateEmployee = (req, res, next) => {
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

// ///////////////////Delete
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


////////////////////////////////////
exports.getAllInterventionEmployee = (req,res, next) => {
  
};


exports.getAllInterventionEmployee = (req, res, next) => {
  const employeeId = req.params.id;

  Intervention.findAll({attributes:['idInterv', 'typeInterv', 'dateDemandeInter', 'dure', 'dateFinInter', 'descreption', 
  'remarque', 'dateReparation','etat','etatdereparation','causeEchec'],
    include:[
      {model:Employee,attributes:['idEmp','nomEmp','prenomEmp','post'],   where:{idEmp:employeeId}},
    ]
    }).then((interventions)=>{
  if(!interventions){
    return res.status(401).json({
      message:'could not fetch interventions !!'
    });
  }
  res.status(200).json({
    message:'liste of interventions !!',
    interventions  : interventions.map(intervention=>{
      return {
         id: intervention.idInterv,
         typeInterv: intervention.typeInterv,
         descreption: intervention.descreption,
         remarque :intervention.remarque,
         dure: intervention.dure,
         dateDemandeInter :intervention.dateDemandeInter,
         dateFinInter:intervention.dateFinInter,
         dateReparation:intervention.dateReparation,
         etat:intervention.etat,
         etatdereparation:intervention.etatdereparation,
         causeEchec:intervention.causeEchec,
         employee:{
             id: intervention.employee.idEmp,
             nom: intervention.employee.nomEmp,
             prenom: intervention.employee.prenomEmp,
             post: intervention.employee.post,
         }
      

      }
    })
  })
  }).catch(error=>{
    console.log(error);
    res.status(500).json({
    error:error,
    message:'An error occured while fetching the machines ! Please try later or contact he administartor',
  });
  });
};


exports.getAllMachineEmployee = (req, res, next) => {
  const employeeId = req.params.id;
  Machine.findAll({attributes:['idMach', 'categorieMach', 'typeMach','marqueMach', 'numSerie', 'numAlrim', 'etat', 'date_entre',
   'date_affectation', 'date_reforme', 'cause', 'observation',  'Emplacement'],
    include:[
      {model:Employee,attributes:['idEmp','nomEmp','prenomEmp','post'] ,  where:{idEmp:employeeId}},
  
    ]
    }).then((machines)=>{
  if(!machines){
    return res.status(401).json({
      message:'could not fetch machines !!'
    });
  }
  res.status(200).json({
    message:'liste of machines !!',
    machines  : machines.map(machine=>{
     if(machine.employee) {  ;
      return {
         id: machine.idMach,
         categorieMach: machine.categorieMach,
         typeMach: machine.typeMach,
         marqueMach:machine.marqueMach,
         numSerie: machine.numSerie,
         numAlrim: machine.numAlrim,
         etat :machine.etat,
         date_entre :machine.date_entre,
         date_affectation:machine.date_affectation,
         date_reforme:machine.date_reforme,
         cause :machine.cause,
         observation:machine.observation,
         Emplacement:machine.Emplacement,
         employee:{
             id: machine.employee.idEmp,
             nom: machine.employee.nomEmp,
             prenom: machine.employee.prenomEmp,
             post: machine.employee.post,
         },
        }
      }
    })
  })
  }).catch(error=>{
    console.log(error);
    res.status(500).json({
    error:error,
    message:'An error occured while fetching the machines ! Please try later or contact he administartor',
  });
  });
};