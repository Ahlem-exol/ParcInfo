const { textChangeRangeIsUnchanged } = require('typescript');
const Machine = require('../models/machine');
const Employee =require('../models/employee');
const Fournisseur = require('../models/fournisseur');
const Direction = require('../models/direction');

exports.getAllMachine = (req, res, next) => {

  Machine.findAll({attributes:['idMach', 'categorieMach', 'typeMach','marqueMach', 'numSerie', 'numAlrim', 'etat', 'date_entre',
   'date_affectation', 'date_reforme', 'cause', 'observation',  'Emplacement'],
    include:[
      {model:Employee,attributes:['idEmp','nomEmp','prenomEmp','post']},
      {model:Fournisseur,attributes:['idForniss', 'nomFourni', 'Adresse']},
      {model:Direction,attributes:['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention',
      'UserPost','Emplacement']}
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

         fournisseur:{
           idForniss: machine.fournisseur.idForniss,
           nomFourni: machine.fournisseur.nomFourni,
           Adresse :machine.fournisseur.Adresse,
         },
         direction:{
            id:  machine.direction.idDir,
            nom:  machine.direction.nomDir,
            numPost:  machine.direction.numPost,
         }
        }
      }else{
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
        
          fournisseur:{
            idForniss: machine.fournisseur.idForniss,
            nomFourni: machine.fournisseur.nomFourni,
            Adresse :machine.fournisseur.Adresse,
          },
          direction:{
             id:  machine.direction.idDir,
             nom:  machine.direction.nomDir,
             numPost:  machine.direction.numPost,
          }
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
}


exports.getMachine = (req, res, next) => {
  const machineId = req.params.id;
  
  Machine.findOne(
    {
      where:{idMach:machineId},
      attributes:['idMach', 'categorieMach', 'typeMach','marqueMach', 'numSerie', 'numAlrim', 'etat', 'date_entre',
      'date_affectation', 'date_reforme', 'cause', 'observation',  'Emplacement'],
       include:[
         {model:Employee,attributes:['idEmp','nomEmp','prenomEmp','post']},
         {model:Fournisseur,attributes:['idForniss', 'nomFourni', 'Adresse']},
         {model:Direction,attributes:['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention',
         'UserPost','Emplacement']}
       ]}
    ).then(machine=>{
  
  if (!machine) {
   return res.status(401).json({
     message: 'machine does not exist !'
   });
 }else{
  if(machine.employee) { 
   res.status(200).json({
     message: 'ok from controller  !',
     machine: { 
      id: machine.idMach,
      categorieMach: machine.categorieMach,
      typeMach: machine.typeMach,
      marqueMach:machine.marqueMach,
      numSerie: machine.numSerie,
      etat :machine.etat,
      numAlrim: machine.numAlrim,
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
      fournisseur:{
        idForniss: machine.fournisseur.idForniss,
        nomFourni: machine.fournisseur.nomFourni,
        Adresse :machine.fournisseur.Adresse,
      },
      direction:{
         id:  machine.direction.idDir,
         nom:  machine.direction.nomDir,
         numPost:  machine.direction.numPost,
      }
     }
   });
  }else{
    res.status(200).json({
      message: 'ok from controller  !',
      machine: { 
       id: machine.idMach,
       categorieMach: machine.categorieMach,
       typeMach: machine.typeMach,
       marqueMach:machine.marqueMach,
       numSerie: machine.numSerie,
       etat :machine.etat,
       numAlrim: machine.numAlrim,
       date_entre :machine.date_entre,
       date_affectation:machine.date_affectation,
       date_reforme:machine.date_reforme,
       cause :machine.cause,
       observation:machine.observation,
       Emplacement:machine.Emplacement,
       fournisseur:{
         idForniss: machine.fournisseur.idForniss,
         nomFourni: machine.fournisseur.nomFourni,
         Adresse :machine.fournisseur.Adresse,
       },
       direction:{
          id:  machine.direction.idDir,
          nom:  machine.direction.nomDir,
          numPost:  machine.direction.numPost,
       }
      }
    });
  }
 }
  }).catch(error=>{
    console.log(error);
    res.status(500).json({
      error:error,
      message :'An error occured while fetching the machines! Please try later or contact the administrator',
    });
  })
 };

 exports.updateMachine= (req, res, next) => {
  const machineId = req.params.id;

  Machine.findOne(
    {
      where:{idMach:machineId},
      attributes:['idMach', 'categorieMach', 'typeMach','marqueMach', 'numSerie', 'numAlrim', 'etat', 'date_entre',
      'date_affectation', 'date_reforme', 'cause', 'observation',  'Emplacement'],
       include:[
         {model:Employee,attributes:['idEmp','nomEmp','prenomEmp','post']},
         {model:Fournisseur,attributes:['idForniss', 'nomFourni', 'Adresse']},
         {model:Direction,attributes:['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention',
         'UserPost','Emplacement']}
       ]}
    ).then(machine => {
    if (!machine) {
      return res.status(401).json({
        message: 'machine does not exist !'
      });
    }else{
        machine.update({
          categorieMach: req.body.categorieMach,
          typeMach: req.body.typeMach,
          marqueMach:req.body.marqueMach,
          numSerie: req.body.numSerie,
          etat :req.body.etat,
          numAlrim: req.body.numAlrim,
          date_entre :req.body.date_entre,
          date_affectation:req.body.date_affectation,
          date_reforme:req.body.date_reforme,
          cause :req.body.cause,
          observation:req.body.observation,
          Emplacement:req.body.Emplacement,
          idEmp:req.body.employee.idEmp,
          idForniss:req.body.fournisseur.idForniss,
          idDir:req.body.direction.idDir

       }) .then(result => {
        res.status(201).json({
          message: 'Machine update  !',
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

/////////////////////// SUPRIMER ///////////////////////////////////
exports.deleteMachine = (req, res, next) => {
  const machineId = req.params.id;
  Machine.findOne(
    {
      where:{idMach:machineId},
      attributes:['idMach', 'categorieMach', 'typeMach','marqueMach', 'numSerie', 'numAlrim', 'etat', 'date_entre',
      'date_affectation', 'date_reforme', 'cause', 'observation',  'Emplacement'],
       include:[
         {model:Employee,attributes:['idEmp','nomEmp','prenomEmp','post']},
         {model:Fournisseur,attributes:['idForniss', 'nomFourni', 'Adresse']},
         {model:Direction,attributes:['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention',
         'UserPost','Emplacement']}
       ]}
   ).then(machine => {
      return machine.destroy();
    })
    .then(result => {

      res.status(200).json({message: "Machine deleted !"});
    })
    .catch(err => console.log(err));
};

/////////////add machine
exports.addMachine = (req, res, next) => {

  
  const machine = new Machine({

    categorieMach: req.body.categorieMach,
    typeMach: req.body.typeMach,
    marqueMach:req.body.marqueMach,
    numSerie: req.body.numSerie,
    etat :req.body.etat,
    numAlrim: req.body.numAlrim,
    date_entre :req.body.date_entre,
    date_affectation:req.body.date_affectation,
    date_reforme:req.body.date_reforme,
    cause :req.body.cause,
    observation:req.body.observation,
    Emplacement:req.body.Emplacement,
    idEmp:req.body.idEmp,
    idForniss:req.body.idForniss,
    idDir:req.body.idDir

  });

  machine.save().then(result => {
    res.status(201).json({
      message: ' Add machine ! .',
    });
  })
.catch(err => {
  res.status(500).json({
    error: err,
    message: 'Error !',
  });
});
  
};