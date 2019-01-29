var personModel = require('../models/person.js');


userLogin = function (req, res) {
    personModel.findOne({
        $and: [
            { 'username': req.body.username },
            { 'password': req.body.password }
        ]
    },
        function (err, person) {
            console.log("*********");
           // console.log(person);
            if (err || !person) {
                res.status(200).json({ status: false, message: 'you have not user or you have not permission' });
            }
            else {
                res.status(200).json({ status: true, message: 'welcome to the system'});
            }
        });
}

module.exports = userLogin;
