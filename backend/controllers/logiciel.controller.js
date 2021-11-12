const Logiciel = require('../models/logiciel');
const Fournisseur = require('../models/fournisseur');
const Direction = require('../models/direction');
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
         
          // Logiciel:{
          //    idLog: logpardir.logiciel.idLog,
          //   nomLog: logpardir.logiciel.nomLog,
          //   logo:logpardirs.logiciel.logo,
          //   versionLog: logpardirs.logiciel.versionLog,
          //   Licence:logpardirs.logiciel.Licence,
          //   type: logpardirs.logiciel.type,
          //   comptabilite :logpardirs.logiciel.comptabilite,
          //   observation:logpardirs.logiciel.observation,
          //   lienTelechr:logpardirs.logiciel.lienTelechr,
          // },
          // direction:{     
          //   id: logpardirs.direction.idDir,
          //   nom: logpardirs.direction.nomDir,
          //   numPost: logpardirs.direction.numPost,
          //   effective:logpardirs.direction.effectif,
          //   nbrEmp: logpardirs.direction.nbrEmp,
          //   nbrMach :logpardirs.direction.nbrMachine,
          //   nbrInterv:logpardirs.direction.nbrIntervention,
          //   userPost:logpardirs.direction.UserPost,
          //   emplacement:logpardirs.direction.Emplacement
          //     }

        }
      }),
    });
  })
  .catch((err) => {
    console.log(err)
  });
};


