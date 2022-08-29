const express = require('express');
const router = express.Router();
const passport = require('passport');
const Room = require('../../models/Room');
const User = require('../../models/User');
const Problem = require('../../models/Problem')
const validateProblemInput = require('../../validation/problem')

router.post('/:roomId/', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {errors, isValid} = validateProblemInput(req.body)
        const user = req.user;

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newProblem = new Problem({
            title: req.body.title,
            description: req.body.description,
            testCase: req.body.testCase,
            solution: req.body.solution,
            testCase2: req.body.testCase2,
            solution2: req.body.solution2,
            seed: false
        })

        
        Room.findById(req.params.roomId)
        .then(room => {
            if (!room.users.includes(user.id)) {
                return res.status(400).json({ usernotinroom: 'User is not in this room' });
            } else {
                newProblem.save()
                .then(problem => { 
                    room.problems.push(problem.id);
                    res.json(problem);
                })
                .catch(err => console.log(err))
            }
        })

        res.json(problem)
    }
)

// router.get('/set', (req, res) => {
//     Problem.find({seed: true})
// })