const express = require('express');
const router = express.Router();
const passport = require('passport');
const Room = require('../../models/Room');
const User = require('../../models/User');
const validateRoomInput = require('../../validation/rooms');

router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
        .then(room => res.json(room))
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

        const newRoom = new Room({
            name: req.body.name,
            users: [user.id]
        });

        newRoom.save().then(room => {
            user.rooms.push(newRoom.id);
            user.save();

            res.json(room);
        });
    }
);

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
                        .then(room => res.json(room))
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
                        .then(room => res.json(room))
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
                            .then(room => res.json(room))
                            .catch(err => console.log(err));
                    } else {
                        room.save()
                            .then(room => res.json(room))
                            .catch(err => console.log(err));
                    }
                }
            })
            .catch(err => res.status(404).json({ noroomfound: 'No room found with that ID' }));
    }
);

// router.delete('/:id',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//         const user = req.user;

//         Room.findById(req.params.id)
//             .then(room => {
//                 if (!room.users.includes(user.id)) {
//                     return res.status(400).json({ usernotinroom: 'User is not in this room' });
//                 } else if (room.solo) {
//                     return res.status(400).json({ soloroom: 'Users cannot delete a solo room' });
//                 } else {
//                     User.updateMany({ rooms: room.id }, { $pull: { rooms: room.id } })
//                         .then(data => console.log(data));
//                     Room.findByIdAndDelete(room.id)
//                         .then(room => res.json({ success: true }));
//                 }
//             })
//             .catch(err => res.status(404).json({ noroomfound: 'No room found with that ID' }));
//     }
// );

module.exports = router;
