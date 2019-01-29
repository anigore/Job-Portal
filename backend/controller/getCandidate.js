var personModel = require('../models/person.js');


getCandidateData = function (req, res) {
    console.log("coming data ",req.params.username)
    personModel.findOne({
        $and: [
            { 'username': req.params.username }
        ]
    },
        function (err, person) {
            console.log("*********");
            console.log(person);
            if (err || !person) {
                res.status(200).json({ status: false, message: 'you have not user or you have not permission' });
            }
            else {
                res.status(200).json({ status: true, message: 'welcome to the system',docs:person });
            }
        });
}

module.exports = getCandidateData;
