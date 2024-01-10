const User = require('../models/User');
const jwt = require('jsonwebtoken');
const path = require('path');


const secret = 'mysecretsshhh';

exports.rootPath = (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'index.html'));
};

exports.home = (req, res) => {
    res.send('Welcome!');
};
  
exports.secret = (req, res) => {
    res.send('The password is potato');
};
  
exports.register = (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    user.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(400).send("Error registering new user please try again.");
      } else {
        return res.status(201).send("Welcome to the club!");
      }
    });
};
  
exports.authenticate = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        return res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        return res.status(401)
          .json({
          error: 'Incorrect email or password'
        });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            return res.status(500)
              .json({
              error: 'Internal error please try again'
            });
          } else if (!same) {
            return res.status(401)
              .json({
              error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true }).sendStatus(200);
            return res.status(200).json("Login successful."); //send token and other information if needed.
          }
        });
      }
    });
  };
  
//   exports.checkToken = (req, res) => {
//     res.sendStatus(200);
//   };
  