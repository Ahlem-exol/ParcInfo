
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Op = require('sequelize');

const User = require('../models/user');

exports.createUser = (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        mail: req.body.mail,
        name: req.body.name,
        password: hash,
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'Account created successfully !.',
          });
        })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: 'Username or Email already in use !',
        });
      });
    });
};

exports.userLogin = (req, res, next) => {
  console.log("in the set",req.body)
  let fetchedUser;
  User.findOne({ where: {mail: req.body.mail} })
    .then(user => {
      console.log("in the set")
      if (!user) {
        return res.status(401).json({
          message: 'User does not exist !'
        });
      }

      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })

    .then(result => {
      console.log("in the set",result)
      if (!result) {
        return res.status(401).json({
          message: "Incorrect Password !"
        });
      }
      User.findByPk(fetchedUser.id)
        .then(fetchedUser => {
          console.log("in the set",fetchedUser)
          const token = jwt.sign(
            {mail: fetchedUser.mail, id: fetchedUser.id, name: fetchedUser.name},
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            mail: fetchedUser.mail,
            id: fetchedUser.id, // should send the whole user !!
            name: fetchedUser.name,
            token: token,
            expiresIn: 3600


          });
        });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Authentification failed !",
        error: err
      });
    });
};