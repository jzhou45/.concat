const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProblemSchema = new Schema ({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        testCase: {
            type: String,
            required: true
        },
        solution: {
            type: String,
            required: true
        },
        testCase2: {
            type: String
        },
        solution2: {
            type: String
        },
        seed: {
            type: Boolean,
            default: false
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Room'
        },
        difficulty: {
            type: String,
            required: true
        }
});

module.exports = Problem = mongoose.model('Problem', ProblemSchema);