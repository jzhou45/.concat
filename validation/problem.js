const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateProblemInput(data) {
    let errors = {};

    data.title = validText(data.title) ? data.title : ''
    data.description = validText(data.description) ? data.description : ''
    data.testCase = validText(data.testCase) ? data.testCase : ''
    data.solution = validText(data.solution) ? data.solution : ''
    data.testCase2 = validText(data.testCase2) ? data.testCase2 : ''
    data.solution2 = validText(data.solution2) ? data.solution2 : ''

    

};