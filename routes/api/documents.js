const express = require('express');
const router = express.Router();
const passport = require('passport');
const Room = require('../../models/Room');
const User = require('../../models/User');
const Problem = require('../../models/Problem')
const Document = require('../../models/Document')

router.get('/:roomId/:id', (req, res) => {
    Document.find({problem: req.params.id, room: req.params.roomId})
    .then(document => res.json(document))
})

router.post('/:roomId/:id',
        passport.authenticate('jwt', { session: false }),
        (req,res) => {
            const newDocument = new Document({
            body: req.body.body,
            problem: req.params.id,
            room: req.params.roomId
        })
        newDocument.save().then(document => res.json(document))
    })

router.patch('/:roomId/:id',
        passport.authenticate('jwt', { session: false }),
        (req,res) => {
        Document.find({problem: req.params.id, room: req.params.roomid})
        .then(document => {
            document.body = req.body.body
            document.save()
            .then(doc => res.json(doc))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})