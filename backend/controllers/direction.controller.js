const Direction = require('../models/direction');

exports.getAllDirection = (req,res, next) => {
  Direction.findAll({attributes: ['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention','UserPost','Emplacement']})
    .then((directions) => {
    
      res.status(200).json({
       
        message: 'direction !',
        directions: directions.map(direction => {
          return {
              id: direction.idDir,
              nom: direction.nomDir,
              numPost: direction.numPost,
              effective:direction.effectif,
              nbrEmp: direction.nbrEmp,
              nbrMach :direction.nbrMachine,
              nbrInterv:direction.nbrIntervention,
              userPost:direction.UserPost,
              emplacement:direction.Emplacement

          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};
