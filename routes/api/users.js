const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ username: req.body.username })
      .then(user => {
        if (user) {
          // Use the validations to send the error
          errors.username = 'Username is taken';
          return res.status(400).json(errors);
        } else {
          // Otherwise create a new user
          const newUser = new User({
            handle: req.body.handle,
            username: req.body.username,
            password: req.body.password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;
  
    User.findOne({username})
      .then(user => {
        if (!user) {
          // Use the validations to send the error
          errors.username = 'User not found';
          return res.status(404).json(errors);
        }
  
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
                const payload = {id: user.id, handle: user.handle};

                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  // Tell the key to expire in one hour
                  {expiresIn: 3600},
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    });
                  });
            } else {
              return res.status(400).json({password: 'Incorrect password'});
            }
          });
      });
});

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username
    });
  })

module.exports = router;