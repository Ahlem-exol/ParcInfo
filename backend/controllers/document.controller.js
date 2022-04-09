const Document = require('../models/document');

exports.addDocument = (req, res, next) => {

  
    const document = new Document({
  

         titreDoc: req.body.titreDoc,
         lienDoc: req.body.lienDoc,
         descreption :req.body.descreption,
         idEmp: req.body.idEmp,
         idForniss: req.body.idForniss,
         idInterv :req.body.idInterv,
         idDir: req.body.idDir,
         idPro: req.body.idPro,
         dateSortie: req.body.dateSortie,
    });
  
    document.save().then(result => {
      res.status(201).json({
        message: ' Add Document ! .',
      });
    })
  .catch(err => {
    res.status(500).json({
      error: err,
      message: 'Error !',
    });
});
  
};