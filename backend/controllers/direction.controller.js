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


exports.getDirection = (req, res, next) => {
  
  const nomDir = req.params.nomDir;
  console.log(nomDir);
  Direction.findOne({
   where:{nomDir : nomDir},
   attributes:['idDir', 'nomDir', 'numPost', 'nbrEmp','effectif','nbrMachine','nbrIntervention','UserPost','Emplacement'],
 }
  ).then(direction=>{
 
  if (!direction) {
   return res.status(401).json({
     message: 'Direction does not exist !'
   });
 }else{
   console.log(direction);
   res.status(200).json({
     message: 'ok from controller  !',
     direction: { 
   
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
 
   });
 }
  }).catch(error=>{
    console.log(error);
    res.status(500).json({
      error:error,
      message :'An error occured while fetching the direction! Please try later or contact the administrator',
    });
  })
 };