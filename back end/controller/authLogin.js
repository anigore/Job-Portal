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
                var username = req.body.username;
                res.status(200).json({ status: true, message: 'welcome to the system',username: username});
            }
        });
}

module.exports = userLogin;





// var jwt = require('jwt-simple');
// var personModel = require('../models/person.js');
// var config = require('../config/config');


// userLogin = function (req, res) {
//     personModel.findOne({
//         $and: [
//             { 'username': req.body.username },
//             { 'password': req.body.password }
//         ]
//     },
//         function (err, user) {
//             console.log("*********");
//             console.log(user);
//             if (err || !user) {
//                 res.status(400).json({ status: false, message: 'you have not user or you have not permission' });
//             }
//             else {

//                 // encode
//                 var username = req.body.username;
//                 res.status(200).json({ status: true, message: 'welcome to the system', username: username });
//             }
//         });
// }

// module.exports = userLogin;
