const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DocumentSchema = new Schema ({
        body: {
            type: String,
            required: true
        },
        problem: {
            type: Schema.Types.ObjectId,
            ref: 'Problem',
            required: true
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: true
        },
        lastEditor: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
});

module.exports = Document = mongoose.model('Document', DocumentSchema)