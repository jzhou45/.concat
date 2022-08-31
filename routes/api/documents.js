const express = require('express');
const router = express.Router();
const passport = require('passport');
const Document = require('../../models/Document');

router.get('/:roomId/:id',
        passport.authenticate('jwt', { session: false }),
        (req,res) => {
        Document.findOne({problem: req.params.id, room: req.params.roomId})
        .then(document => res.json(document))
        .catch(err => console.log(err))
})

router.post('/:roomId/:id',
        passport.authenticate('jwt', { session: false }),
        (req,res) => {
            const newDocument = new Document({
            body: req.body.body,
            problem: req.params.id,
            room: req.params.roomId,
            lastEditor: req.body.lastEditor
        })
        newDocument.save().then(document => res.json(document))
    })

router.patch('/:roomId/:id',
        passport.authenticate('jwt', { session: false }),
        (req,res) => {
        Document.findOne({problem: req.params.id, room: req.params.roomId})
        .then(document => {
            document.body = req.body.body;
            document.lastEditor = req.body.lastEditor;
            document.save()
            .then(doc => res.json(doc))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

module.exports = router;
