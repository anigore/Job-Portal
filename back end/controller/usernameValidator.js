var personModel = require('../models/person.js');

usernameValidation = function (req, res) {
    personModel.findOne({
        $and: [
            { 'username': req.body.username },
        ]
    },
        function (err, person) {
            console.log("*********");
            console.log(person);
            if (err || !person) {
                res.status(200).json({ status: true, message: 'unique username' });
            }
            else {
                res.status(200).json({ status: false, message: 'username already exist...' });
            }
        });
}

module.exports = usernameValidation;
