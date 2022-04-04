const Logiciel = require('../models/logiciel');
const Fournisseur = require('../models/fournisseur');
const Direction = require('../models/direction');
const Logpardir =require("../models/logpardir");
exports.getAllLogiciel = (req,res, next) => {
    Logiciel.findAll({attributes: ['idLog', 'nomLog','logo', 'versionLog', 'Licence', 'type', 'comptabilite'
    , 'observation', 'lienTelechr'],
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
             versionLog: logiciel.versionLog,
             Licence:logiciel.Licence,
             type: logiciel.type,
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

