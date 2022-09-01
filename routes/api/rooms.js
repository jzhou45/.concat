const express = require('express');
const router = express.Router();
const passport = require('passport');
const Room = require('../../models/Room');
const User = require('../../models/User');
const Problem = require('../../models/Problem');
const validateRoomInput = require('../../validation/rooms');
const roomPhotoUrls = require('../../util/room-photo-url');

const roomResponse = ({ id, name, solo, users, problems, roomPhotoUrl, messages }) => {
    return User.find({ _id: { $in: users } }).then(users => {
        return { id, name, solo, users, problems, roomPhotoUrl, messages };
    });
};

const userResponse = ({ id, username, rooms }) => {
    return { id, username, rooms };
};

router.get('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Room.find({ users: req.user.id })
        .then(rooms => {
            Promise.all(rooms.map(room => roomResponse(room).then(room => room)))
                .then(rooms => res.json(rooms));
        })
        .catch(err => console.log(err));
    }
);

router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
        .then(room => roomResponse(room).then(room => res.json(room)))
        .catch(err => res.status(404).json({ noroomfound: 'No room found with that ID' }));
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateRoomInput(req.body);
        const user = req.user;
  
        if (!isValid) {
            return res.status(400).json(errors);
        }

        Problem.find({ seed: true })
            .then(problems => {
                const newRoom = new Room({
                    name: req.body.name,
                    users: [user.id],
                    roomPhotoUrl: roomPhotoUrls[Math.floor(Math.random() * 25)],
                    problems: { incomplete: problems.map(problem => problem.id) }
                });
        
                newRoom.save().then(room => {
                    user.rooms.push(newRoom.id);
                    user.save();
        
                    roomResponse(room).then(room => res.json(room));
                });
            })
    }
);

router.patch('/:roomId/:id/complete', (req, res) => {
    Room.findById(req.params.roomId)
        .then(room => {
            room.problems.incomplete.pull(req.params.id)
            room.problems.complete.push(req.params.id)
            room.save().then(room => roomResponse(room).then(room => res.json(room)))
        })
})
router.patch('/:roomId/:id/incomplete', (req, res) => {
    Room.findById(req.params.roomId)
        .then(room => {
            room.problems.complete.pull(req.params.id)
            room.problems.incomplete.push(req.params.id)
            room.save().then(room => roomResponse(room).then(room => res.json(room)))
        })
})

router.patch('/:roomId/sendMessage', (req, res) => {
    Room.findById(req.params.roomId)
        .then(room => {
            const { username, message, timestamp } = req.body;
            room.messages.push({ username, message, timestamp });
            room.save().then(room => roomResponse(room).then(room => res.json(room)));
        });
})

router.patch('/:id/rename',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateRoomInput(req.body);
        const user = req.user;
        
        if (!isValid) {
            return res.status(400).json(errors);
        }

        Room.findById(req.params.id)
            .then(room => {
                if (!room.users.includes(user.id)) {
                    return res.status(400).json({ usernotinroom: 'User is not in this room' });
                } else if (room.solo) {
                    return res.status(400).json({ soloroom: 'Solo rooms cannot be renamed' });
                } else {
                    room.name = req.body.name;
                    room.save()
                        .then(room => roomResponse(room).then(room => res.json(room)))
                        .catch(err => console.log(err));
                }
            })
            .catch(err => res.status(404).json({ noroomfound: 'No room found with that ID' }));
    }
);

router.patch('/:id/join',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const user = req.user;

        Room.findById(req.params.id)
            .then(room => {
                if (room.users.includes(user.id)) {
                    return res.status(400).json({ userinroom: 'User is already in this room' });
                } else if (room.solo) {
                    return res.status(400).json({ soloroom: 'Users cannot be added to a solo room' });
                } else {
                    user.rooms.push(room.id);
                    user.save();

                    room.users.push(user.id);
                    room.save()
                        .then(room => roomResponse(room).then(room => res.json(room)))
                        .catch(err => console.log(err));
                }
            })
            .catch(err => res.status(404).json({ noroomfound: 'No room found with that ID' }));
    }
);

router.patch('/:id/leave',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const user = req.user;

        Room.findById(req.params.id)
            .then(room => {
                if (!room.users.includes(user.id)) {
                    return res.status(400).json({ usernotinroom: 'User is not in this room' });
                } else if (room.solo) {
                    return res.status(400).json({ soloroom: 'Users cannot leave a solo room' });
                } else {
                    user.rooms.pull(room.id);
                    user.save();

                    room.users.pull(user.id);

                    if (room.users.length === 0) {
                        Room.findByIdAndDelete(room.id)
                            .then(room => res.json(userResponse(user)))
                            .catch(err => console.log(err));
                    } else {
                        room.save()
                            .then(room => res.json(userResponse(user)))
                            .catch(err => console.log(err));
                    }
                }
            })
            .catch(err => res.status(404).json({ noroomfound: 'No room found with that ID' }));
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const user = req.user;

        Room.findById(req.params.id)
            .then(room => {
                if (!room.users.includes(user.id)) {
                    return res.status(400).json({ usernotinroom: 'User is not in this room' });
                } else if (room.solo) {
                    return res.status(400).json({ soloroom: 'Users cannot delete a solo room' });
                } else {
                    Room.findByIdAndDelete(room.id)
                        .then(room => {
                            User.find({ rooms: room.id })
                                .then(users => {
                                    const updatedUsers = users.map(user => {
                                        user.rooms.pull(room.id);
                                        user.save();
                                        return userResponse(user);
                                    });
                                    return res.json(updatedUsers);
                                });
                        });
                }
            })
            .catch(err => res.status(404).json({ noroomfound: 'No room found with that ID' }));
    }
);

module.exports = router;
