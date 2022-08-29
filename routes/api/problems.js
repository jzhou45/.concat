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
                    room.save()
                    .then(room => res.json(problem));
                    
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => res.status(404).json({ noroomfound: 'No room found with that ID'}))
        
    }
)

router.get('/set', (req, res) => {
    Problem.find({seed: true})
    .then(seedProblems => {
        res.json(seedProblems)
    })
})

router.post('/', (req, res) => {
    const {errors, isValid} = validateProblemInput(req.body)

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
            seed: req.body.seed
        })

        newProblem.save().then(problem => res.json(problem))
})

router.patch('/:roomId/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {errors, isValid} = validateProblemInput(req.body);
        const user = req.user;

        if (!isValid) {
           return res.status(400).json(errors);
       }
      
      
        Problem.findById(req.params.id)
        .then(problem => 
            Room.findById(req.params.roomId)
            .then(room => {
                if (!room.users.includes(user.id)) {
                    return res.status(400).json({ usernotinroom: 'User is not in this room' });
                } else if (problem.seed) {
                    return res.status(400).json({ isSeedProblem: 'This problem cannot be edited' })
                } else {
                    problem.title = req.body.title,
                    problem.description = req.body.description,
                    problem.testCase = req.body.testCase,
                    problem.solution = req.body.solution,
                    problem.testCase2 = req.body.testCase2,
                    problem.solution2 = req.body.solution2,

                    problem.save()
                    .then(problem => res.json(problem))
                    .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    }
)

module.exports = router;
