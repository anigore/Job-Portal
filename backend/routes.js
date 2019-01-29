var express = require('express');
var router = express.Router();
var persons = require('./controller/persons.js');
var states = require('./state/states.js');
var uniqueEmail = require('./controller/emailValidator')
var username = require('./controller/usernameValidator')
var profilePicture = require('./controller/profilePicture')
var authLogin = require('./controller/authLogin')
var loginSession = require('./controller/loginSession')
var getCandidateData = require('./controller/getCandidate')


router.post('/jobportal/login/', authLogin);     //for checking valid user
router.post('/jobportal/uniqueEmail/', uniqueEmail); // for email validation
router.post('/jobportal/person/', persons.create);   //for adding data
router.post('/jobportal/state/', states.create); //to add new states into database
router.get('/jobportal/state/', states.getAll); //to get all states from database
router.post('/jobportal/username/', username); //for username validation
router.post('/jobportal/emailsender/', persons.emailSender); //for sending mail
router.post('/jobportal/updatePassword/', persons.updatePassword);//for update password
router.post('/jobportal/uploadPiture/', persons.uploadPiture);
//router.get('/loginSession/', loginSession);
router.get('/jobportal/getCandidateData/:username', getCandidateData);

module.exports = router;