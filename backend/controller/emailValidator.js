var personModel = require('../models/person.js');

emailvalidation = function (req, res) {
    personModel.findOne({
        $and: [
            { 'email': req.body.email },
        ]
    },
        function (err, person) {
            console.log("*********");
            console.log(person);
            if (err || !person) {
                res.status(200).json({ status: true, message: 'unique email' });
            }
            else {
                res.status(200).json({ status: false, message: 'Already exist...' });
            }
        });
}

module.exports = emailvalidation;
