const Fournisseur = require('../models/fournisseur');

exports.getAllFournisseur = (req,res, next) => {
    Fournisseur.findAll({attributes: ['idForniss', 'nomFourni', 'Adresse']})
    .then((fournisseurs) => {
    
      res.status(200).json({
       
        message: 'Fournisseur !',
        fournisseurs: fournisseurs.map(fournisseur => {
          return {
            idForniss: fournisseur.idForniss,
            nomFourni: fournisseur.nomFourni,
            Adresse: fournisseur.Adresse,
          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};
