const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateProblemInput(data) {
    let errors = {};

    data.title = validText(data.title) ? data.title : ''
    data.title = validText(data.title) ? data.title : ''
    data.title = validText(data.title) ? data.title : ''

};