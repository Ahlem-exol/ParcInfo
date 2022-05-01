const Logiciel = require('../models/logiciel');
const Fournisseur = require('../models/fournisseur');
const Direction = require('../models/direction');
const Logpardir =require("../models/logpardir");
exports.getAllLogiciel = (req,res, next) => {
    Logiciel.findAll({attributes: ['idLog', 'nomLog','logo', 'versionLog', 'Licence', 'type', 'comptabilite'
    , 'observation', 'lienTelechr', `dateactivation`, `dateFin`, `iduser`, `owner`],

    include:[

        {model:Fournisseur,attributes:['idForniss', 'nomFourni', 'Adresse']}
    ]
    }).then((logiciels) => {
    
      res.status(200).json({
       
        message: 'direction !',
        logiciels: logiciels.map(logiciel => {
          return {
             idLog: logiciel.idLog,
             nomLog: logiciel.nomLog,
             logo:logiciel.logo,
             owner:logiciel.owner,
             versionLog: logiciel.versionLog,
             Licence:logiciel.Licence,
             type: logiciel.type,
             datedactivation:logiciel.datedactivation,
             datefin:logiciel.datefin,
             comptabilite :logiciel.comptabilite,
             observation:logiciel.observation,
             lienTelechr:logiciel.lienTelechr,
            ////////////////////
            fournisseur:{
                idForniss: logiciel.fournisseur.idForniss,
                nomFourni: logiciel.fournisseur.nomFourni,
                Adresse :logiciel.fournisseur.Adresse,
            }

          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};

exports.getAllLogicielParDirection = (req,res, next) => {
  Logpardir.findAll({attributes: ['idLpd','idDir','idLog'],

  }).then((logpardirs) => {
  
    res.status(200).json({
     
      message: 'direction !',
      logpardirs: logpardirs.map(logpardir => {
        return {
          idLpd: logpardir.idLpd,
          idLog:logpardir.idLog,
          idDir:logpardir.idDir,
       
         

        }
      }),
    });
  })
  .catch((err) => {
    console.log(err)
  });
};


/////////////add machine
exports.addLogiciel = (req, res, next) => {
  const idUser = req.userData.id;
  console.log(req.body, idUser)
  
  const logiciel = new Logiciel({
 
    nomLog: req.body.nomLog,
    versionLog: req.body.versionLog,
    Licence:req.body.Licence,
    type: req.body.type,
    comptabilite :req.body.comptabilite,
    observation: req.body.observation,
    lienTelechr :req.body.lienTelechr,
    logo:req.body.logo,
    dateactivation:req.body.datedactivation,
    dateFin :req.body.datefin,
    owner :req.body.owner,
    
    idForniss:req.body.idForniss,
    iduser:idUser,

  });

  logiciel.save().then(result => {
    res.status(201).json({
      message: ' Add Logciel ! .',
    });
  })
.catch(err => {
  res.status(500).json({
    error: err,
    message: 'Error !',
  });
});
  
};

