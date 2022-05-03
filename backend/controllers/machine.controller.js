const { textChangeRangeIsUnchanged } = require('typescript');
const Machine = require('../models/machine');
const Employee =require('../models/employee');
const Fournisseur = require('../models/fournisseur');
const Direction = require('../models/direction');
const Info_materiel = require('../models/info_materiel');
const Info_reseau = require('../models/info_reseau');
const Logparmach = require('../models/logparmach');
const Logiciel = require('../models/logiciel');
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
     if(machine.employee) {  
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
  const idUser = req.userData.id;
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
          idDir:req.body.direction.idDir,
          idUser:idUser,

       }) .then(result => {
        res.status(201).json({
          message: 'Machine update !!',
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
  const idUser = req.userData.id;
  // console.log(req.body)
  
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
    idDir:req.body.idDir,
   
    idUser:idUser,

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


/////////////add har information of the machine 
exports.addHard = (req, res, next) => {

  const idUser = req.userData.id;
   console.log(req.body,idUser)
  const info_materiel = new Info_materiel({
    idMach:req.body.idMach,
    RAM:req.body.RAM,
    Processor:req.body.Processor,
    CarteGraphique:req.body.CarteGraphique,
    espaceStokage:req.body.espaceStokage,
    Appphoto:req.body.Appphoto,
    Bluetouth:req.body.Bluetouth,
    cartReseau:req.body.cartReseau,
    cartReseau2:req.body.cartReseau2,
    cartReseau3:req.body.cartReseau3,
    iduser:idUser,

  });

  info_materiel.save().then(res => {
    res.status(201).json({
      message: ' Add info_materiel ! .',
    });
  })
.catch(err => {
  res.status(500).json({
    error: err,
    message: 'Error !',
  });
});
  
};
///////////////////
exports.getHardDetaille = (req, res, next) => {
  const machineId = req.params.id;
  
  Info_materiel.findOne(
    {
      where:{idMach:machineId},
      attributes:['idInfoM', 'RAM', 'Processor','CarteGraphique', 'Appphoto', 'Bluetouth', 'cartReseau', 'cartReseau2',
      'cartReseau3', 'espaceStokage']
     }
    ).then(HardData=>{
  
  if (!HardData) {
   return res.status(200).json({
     message: 'you should entre information of the hard !',

    
   });
 }else{
 
   res.status(200).json({
     message: 'ok from controller  !',
     HardInfo: { 
       idInfoM: HardData.idInfoM,
       RAM: HardData.RAM,
       Processor: HardData.Processor,
       CarteGraphique: HardData.CarteGraphique,
       espaceStokage: HardData.espaceStokage,
       Appphoto: HardData.Appphoto,
       Bluetouth: HardData.Bluetouth,
       cartReseau: HardData.cartReseau,
       cartReseau2: HardData.cartReseau2,
       cartReseau3: HardData.cartReseau3,
      
     }
   }).catch(error=>{
    console.log(error);
    res.status(500).json({
      error:error,
      message :'An error occured while fetching the machines! Please try later or contact the administrator',
    });
  })
 
 }
  })
 };
///////////////////////
exports.addNetwork = (req, res, next) => {
  const idUser = req.userData.id;
  // console.log(req.body)
  
  const info_reseau = new Info_reseau({
 
     macAdd: req.body.macAdd,
     nomMach: req.body.nomMach,
     outlook:req.body.outlook,
     DNSDomain: req.body.DNSDomain,
     sessionReseau: req.body.sessionReseau,
     VPNConfig: req.body.VPNConfig,
     sessionLocal: req.body.sessionLocal,
     mdpsSessionLocal: req.body.mdpsSessionLocal,
     observation: req.body.observation,
     idMach: req.body.idMach,
     iduser:idUser,

  });

  info_reseau.save().then(result => {
    res.status(201).json({
      message: ' Add info_reseau  ! .',
    });
  })
.catch(err => {
  res.status(500).json({
    error: err,
    message: 'Error !',
  });
});
  
};


exports.getNetworkDetaille = (req, res, next) => {
  const machineId = req.params.id;
  
  Info_reseau.findOne(
    {
      where:{idMach:machineId},
      attributes:['idInfoR', 'nomMach', 'sessionLocal','mdpsSessionLocal', 'sessionReseau', 'outlook', 'observation', 'macAdd',
      'DNSDomain', 'VPNConfig']}
    ).then(NetworkData=>{
  
  if (!NetworkData) {
   return res.status(200).json({
     message: 'you should entre information of the Network !',
   
   });
 }else{
 
   res.status(200).json({
     message: 'ok from controller  !',
     NetworkData: { 
   
        id: NetworkData.idInfoR,
        macAdd: NetworkData.macAdd,
        outlook: NetworkData.outlook,
        nomMach: NetworkData.nomMach,
        DNSDomain: NetworkData.DNSDomain,
        sessionReseau: NetworkData.sessionReseau,
        VPNConfig: NetworkData.VPNConfig,
        sessionLocal: NetworkData.sessionLocal,
        mdpsSessionLocal: NetworkData.mdpsSessionLocal,
        observation: NetworkData.observation,
     }
   });
 
 }
  }).catch(error=>{
    console.log(error);
    res.status(500).json({
      error:error,
      message :'An error occured while fetching the data! Please try later or contact the administrator',
    });
  })
 };

 
/////////////add machine
exports.addLogiciels= (req, res, next) => {
  const idUser = req.userData.id;
  logiciles = req.body.logiciles;

  console.log(idUser, logiciles)
    logiciles.forEach(element => {

    const logparmach = new Logparmach({
      dateInstallation:req.body.dateInstallation,
      idMach:req.body.idMach,
      iduser:idUser,
      idLog:  element.idLog,
    })
    logparmach.save().then(resul => {
      res.status(201).json({
        message: ' Add Logiciel par machine  ! .',
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'Error !',
      });
    });
  });
   

  
};

//get all the installed logociel onstlled in this machine 
// i will  get the inforlation of the logiciel installed in machine avec un telll idMachine then i will take the information from the table of 
//logciel for get the information of installefd logiciel
// but ther is a  problem with the keys and licenceof the smae logiciel so ??
// if i will  do the same logciel with multi licence or
// i will do  licence table is better logiciel avec ensemeble des licence a installed kespersky licence 1 l'annes et date d'activation when 
exports.getLogicielInstalled = (req, res, next) => {
  const machineId = req.params.id;
  console.log("we are in the machine controllor for get the data of the logiciels installed in this machine  with id "+machineId)
  Logparmach.findAll(
    {
      where:{idMach:machineId},
      attributes:['idLPM', 'idMach', 'idLog','dateInstallation'] ,
        include:[
        {model:Logiciel,attributes:['idLog', 'nomLog','logo']},
       
      ]
    }

    ).then(logdatas=>{
  if (!logdatas) {
   return res.status(200).json({
     message: 'there is no logiciel installed in this machine !',

   });
 }else{
  res.status(200).json({
  logdatas  : logdatas.map(logdata=>{
     return {
      idLPM:logdata.idLPM,
      idMach:logdata.idMach,
      idLog:logdata.idLog,
      dateInstallation:logdata.dateInstallation,
      logiciel: { 
        idLog: logdata.logiciel.idLog,
         nomLog: logdata.logiciel.nomLog,
         logo:logdata.logiciel.logo,
      }
       }
     })
    })
 }
  }).catch(error=>{
    console.log(error);
    res.status(500).json({
      error:error,
      message :'An error occured while fetching the data! Please try later or contact the administrator',
    });
  })
 };