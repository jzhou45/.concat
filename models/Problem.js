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
        testCases: {
            type: Map,
            of: String
        }
});

// In order to set the testCases, please use set().
// Example, problem1.testCases.set('victor', 'rotciv')

module.exports = Problem = mongoose.model('problem', ProblemSchema);