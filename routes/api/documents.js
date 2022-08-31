const express = require('express');
const router = express.Router();
const passport = require('passport');
const Document = require('../../models/Document');

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
        Document.findOne({problem: req.params.id, room: req.params.roomId})
        .then(document => {
            document.body = req.body.body;
            document.save()
            .then(doc => res.json(doc))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

module.exports = router;