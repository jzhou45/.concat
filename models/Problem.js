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
        testCases: [{
            test: String,
            solution: String
        }] 
});

module.exports = Problem = mongoose.model('problem', ProblemSchema);