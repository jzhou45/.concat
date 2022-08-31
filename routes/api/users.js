const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Room = require('../../models/Room');
const keys = require('../../config/keys');
const passport = require('passport');
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
const roomPhotoUrls = require('../../util/room-photo-url');

router.post('/signup', (req, res) => {
    const { errors, isValid } = validateSignupInput(req.body);

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
            username: req.body.username,
            password: req.body.password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                    const soloRoom = new Room({
                        name: `${user.username}'s Room`,
                        solo: true,
                        users: [user.id],
                        roomPhotoUrl: roomPhotoUrls[Math.floor(Math.random() * 25)]
                    });
                    soloRoom.save()

                    newUser.rooms.push(soloRoom.id);
                    newUser.soloRoomId = soloRoom.id;
                    newUser.save()
                        .then(({ id, username, soloRoomId }) => {
                            Room.find({ users: id })
                                .then(rooms => res.json({
                                    id,
                                    username,
                                    rooms: rooms.map(room => room.id),
                                    soloRoomId
                                }))
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                })
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
                const payload = {id: user.id, username: user.username};

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

module.exports = router;
