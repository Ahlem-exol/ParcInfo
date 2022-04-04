const { textChangeRangeIsUnchanged } = require('typescript');
const Intervention = require('../models/intervention');
const Employee =require('../models/employee');
const Direction = require('../models/direction');
const Logiciel = require('../models/logiciel');
const Machine = require('../models/machine');
const Logparinter = require('../models/logparinter');
exports.getAllIntervention = (req, res, next) => {
  Intervention.findAll({attributes:['idInterv', 'typeInterv', 'dateDemandeInter', 'dure', 'dateFinInter', 'descreption', 
  'remarque', 'dateReparation','etat','etatdereparation','causeEchec'],
    include:[
      {model:Employee,attributes:['idEmp','nomEmp','prenomEmp','post']},
      {model:Logiciel,attributes:['idLog', 'nomLog', 'versionLog', 'Licence', 'type','observation']},
      {model:Machine,attributes:['idMach', 'categorieMach', 'typeMach', 'marqueMach', 'numSerie', 'numAlrim', 'etat', 'date_entre', 
      'date_affectation', 'date_reforme', 'cause', 'observation', 'Emplacement']},
      {model:Direction,attributes:['idDir', 'nomDir']}
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
         direction:{
            id: intervention.direction.idDir,
            nom: intervention.direction.nomDir,
          },
         machine:{
        id: intervention.machine.idMach,
         categorieMach:intervention. machine.categorieMach,
         typeMach: intervention.machine.typeMach,
         marqueMach:intervention.machine.marqueMach,
         numSerie: intervention.machine.numSerie,
         numAlrim: intervention.machine.numAlrim,
         etat :intervention.machine.etat,
         date_entre :intervention.machine.date_entre,
         date_affectation:intervention.machine.date_affectation,
         date_reforme:intervention.machine.date_reforme,
         cause :intervention.machine.cause,
         observation:intervention.machine.observation,
         Emplacement:intervention.machine.Emplacement,
          },
         employee:{
            id: intervention.employee.idEmp,
             nom: intervention.employee.nomEmp,
             prenom: intervention.employee.prenomEmp,
             post: intervention.employee.post,
         },
         logiciel:{
             idLog: intervention.logiciel.Log,
             nomLog: intervention.logiciel.nomLog,
             versionLog: intervention.logiciel.versionLog,
          },
      

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

exports.getIntervention = (req, res, next) => {
  const interventionId = req.params.id;
  
  Intervention.findOne(
    {
      where:{idInterv:interventionId},
      attributes:['idInterv', 'typeInterv', 'dateDemandeInter', 'dure', 'dateFinInter', 'descreption', 
      'remarque', 'dateReparation','etat','etatdereparation','causeEchec'],
       include:[
        {model:Employee,attributes:['idEmp','nomEmp','prenomEmp','post']},
        {model:Logiciel,attributes:['idLog', 'nomLog', 'versionLog', 'Licence', 'type','observation']},
        {model:Machine,attributes:['idMach', 'categorieMach', 'typeMach', 'marqueMach', 'numSerie', 'numAlrim', 'etat', 'date_entre', 
        'date_affectation', 'date_reforme', 'cause', 'observation', 'Emplacement']},
        {model:Direction,attributes:['idDir', 'nomDir']}
       ]}
    ).then(intervention=>{
  
  if (!intervention) {
   return res.status(401).json({
     message: 'INTERVNETION NOT EXOSTE !'
   });
 }else{
   res.status(200).json({
     message: 'ok from controller  !',
     intervention: { 
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
      direction:{
         id: intervention.direction.idDir,
         nom: intervention.direction.nomDir,
       },
      machine:{
     id: intervention.machine.idMach,
      categorieMach:intervention. machine.categorieMach,
      typeMach: intervention.machine.typeMach,
      marqueMach:intervention.machine.marqueMach,
      numSerie: intervention.machine.numSerie,
      numAlrim: intervention.machine.numAlrim,
      etat :intervention.machine.etat,
      date_entre :intervention.machine.date_entre,
      date_affectation:intervention.machine.date_affectation,
      date_reforme:intervention.machine.date_reforme,
      cause :intervention.machine.cause,
      observation:intervention.machine.observation,
      Emplacement:intervention.machine.Emplacement,
       },
      employee:{
         id: intervention.employee.idEmp,
          nom: intervention.employee.nomEmp,
          prenom: intervention.employee.prenomEmp,
          post: intervention.employee.post,
      },
      logiciel:{
          idLog: intervention.logiciel.Log,
          nomLog: intervention.logiciel.nomLog,
          versionLog: intervention.logiciel.versionLog,
       },
     }
   });
 }
  }).catch(error=>{
    console.log(error);
    res.status(500).json({
      error:error,
      message :'An error occured while fetching the machines! Please try later or contact the administrator',
    });
  })
 };

 exports.updateIntervention= (req, res, next) => {
  const interventionId = req.params.id;
   console.log("we are ine the controlleu",interventionId);
   Intervention.findOne(
    {
      where:{idInterv:interventionId},
      attributes:['idInterv', 'typeInterv', 'dateDemandeInter', 'dure', 'dateFinInter', 'descreption', 
      'remarque', 'dateReparation','etat','etatdereparation','causeEchec'],
       include:[
        {model:Employee,attributes:['idEmp','nomEmp','prenomEmp','post']},
        {model:Logiciel,attributes:['idLog', 'nomLog', 'versionLog', 'Licence', 'type','observation']},
        {model:Machine,attributes:['idMach', 'categorieMach', 'typeMach', 'marqueMach', 'numSerie', 'numAlrim', 'etat', 'date_entre', 
        'date_affectation', 'date_reforme', 'cause', 'observation', 'Emplacement']},
        {model:Direction,attributes:['idDir', 'nomDir']}
       ]}
    ).then(intervention => {
    if (!intervention) {
      return res.status(401).json({
        message: 'intervention does not exist !'
      });
    }else{
      intervention.update({
          typeInterv: req.body.typeInterv,
          descreption: req.body.descreption,
          remarque :req.body.remarque,
          dure: req.body.dure,
          dateDemandeInter :req.body.dateDemandeInter,
          dateFinInter:req.body.dateFinInter,
          dateReparation:req.body.dateReparation,
          etat:req.body.etat,
          etatdereparation:req.body.etatdereparation,
          causeEchec:req.body.causeEchec,
          idLog:req.body.logiciel.idLog,
          idEmp:req.body.employee.idEmp,
          idMach:req.body.machine.idMach,
          idDir:req.body.direction.idDir
         
       }) .then(result => {
        res.status(201).json({
          message: 'intervention update  !',
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
exports.deleteIntervention = (req, res, next) => {
  const interventionId = req.params.id;
  Intervention.findOne(
    {
      where:{idInterv:interventionId},
      attributes:['idInterv', 'typeInterv', 'dateDemandeInter', 'dure', 'dateFinInter', 'descreption', 
      'remarque', 'dateReparation','etat','etatdereparation','causeEchec'],
       include:[
        {model:Employee,attributes:['idEmp','nomEmp','prenomEmp','post']},
        {model:Logiciel,attributes:['idLog', 'nomLog', 'versionLog', 'Licence', 'type','observation']},
        {model:Machine,attributes:['idMach', 'categorieMach', 'typeMach', 'marqueMach', 'numSerie', 'numAlrim', 'etat', 'date_entre', 
        'date_affectation', 'date_reforme', 'cause', 'observation', 'Emplacement']},
        {model:Direction,attributes:['idDir', 'nomDir']}
       ]}
   ).then(intervention => {
      return intervention.destroy();
    })
    .then(result => {

      res.status(200).json({message: "intervention deleted !"});
    })
    .catch(err => console.log(err));
};


/////////////add machine
exports.addIntervention= (req, res, next) => {
  listedeslogiciel = req.body.ListeLogiciel;

  const intervention = new Intervention({
          typeInterv: req.body.typeInterv,
          descreption: req.body.descreption,
          remarque :req.body.remarque,
          dure: req.body.dure,
          dateDemandeInter :req.body.dateDemandeInter,
          dateFinInter:req.body.dateFinInter,
          dateReparation:req.body.dateReparation,
          etat:req.body.etat,
          etatdereparation:req.body.etatdereparation,
          causeEchec:req.body.causeEchec,
          idLog:req.body.idLog,
          idEmp:req.body.idEmp,
          idMach:req.body.idMach,
          idDir:req.body.idDir
  });

  intervention.save().then(resul => {
   

    listedeslogiciel.forEach(element => {

    const logparinter = new Logparinter({
      idInterv:resul.idInterv,
      idLog:  element.idLog,
    })
    logparinter.save().then(resul => {
      res.status(201).json({
        message: ' Add logiel paeikntzr ! .',
      });
    });
  });
    res.status(201).json({
      message: ' Add Intervention ! .',
    });
  })
.catch(err => {
  res.status(500).json({
    error: err,
    message: 'Error !',
  });
});
  
};


exports.UpdateEtat= (req, res, next) => {
  const interventionId = req.params.id;
   Intervention.findOne(
    {
      where:{idInterv:interventionId},
      attributes:['idInterv', 'etat']
    }
    ).then(intervention => {
    if (!intervention) {
      return res.status(401).json({
        message: 'intervention does not exist !'
      });
    }else{
      intervention.update({
          etat:req.body.etat,


       }) .then(result => {
        res.status(201).json({
          message: 'intervention update  !',
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


exports.getAllLogicielParIntervnetion = (req,res, next) => {
  Logparinter.findAll(
    {attributes: ['id','idInterv','idLog'],
  }).then((logparinters) => {
    res.status(200).json({    
      message: 'logiciel dans l\'intervention !',
      logparinters: logparinters.map(logparinter => {
        return {
          id: logparinter.id,
          idInterv:logparinter.idInterv,
          idLog:logparinter.idLog,
         

        }
      }),
    });
  })
  .catch((err) => {
    console.log(err)
  });
};




exports.UpdateListeOfLogiciel= (req, res, next) => {
  const interventionId = req.body.idinter;
  //delet all the logicielPar intervention avec idIntervention equal intervention id 
 
  Logparinter.findAll({    
     where:{idInterv:interventionId},
    attributes: ['id','idInterv','idLog'],
  }).then((logparinters) => {
    res.status(200).json({    
      message: 'logiciel dans l\'intervention !',
      logparinters: logparinters.map(logparinter => {
        return logparinter.destroy();
      }),
    });
  })
  .catch((err) => {
    console.log(err)
  });
 
  //then instert the new logiciel 
  listedeslogiciel = req.body.listeLogiciel;
  console.log(Object.keys(listedeslogiciel));
 if (req.body.lenth != 0){


    listedeslogiciel.forEach(element => {
    const logparinter = new Logparinter({
      idInterv:interventionId,
      idLog:  element.idLog,
    })
    logparinter.save().then(resul => {
      res.status(201).json({
        message: ' Add logiel paeikntzr ! .',
      });
    });
  });
 }else{
  

    const logparinter = new Logparinter({
      idInterv:interventionId,
      idLog:  listedeslogiciel.idLog,
    })
    logparinter.save().then(resul => {
      res.status(201).json({
        message: ' Add logiel paeikntzr ! .',
      });
    });
  
 }

};



