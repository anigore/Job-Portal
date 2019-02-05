var MongoClient = require('mongodb').MongoClient;
var personModel = require('../models/person.js');
var multer = require('multer')
const Cryptr = require('cryptr');
var nodemailer = require('nodemailer');
var multer = require('multer')
var upload = multer()
//var dataFormation =  require('../controller/encription');

var demo;


var persons = {




  show: function (req, res) {
    res.status(200).json({ status: 'success', message: 'Success' });
  },

  create: function (req, res) {


    var person = new personModel();
    person.firstName = req.body.firstName;
    person.lastName = req.body.lastName;
    person.dateOfBirth = req.body.dateOfBirth;
    person.gender = req.body.gender;
    hobbiesArray = getHobbies(req.body.hobbies)
    person.hobbies = this.hobbiesArray;
    person.phoneNumber = req.body.phoneNumber;
    person.address = req.body.address;
    person.city = req.body.city;
    person.state = req.body.state;
    person.zipcode = req.body.zipcode;
    person.email = req.body.email;
    person.password = req.body.password;
    person.username = req.body.username;
    person.photo = this.demo;


    console.log('saved succesfully', person)

    person.save(function (err) {

      if (err) {
        res.status(200).json({ status: true, message: 'Datebase Error:' + err, docs: '' });
      }
      else {
        res.status(200).json({ status: false, message: 'Added to Mongo successfully', doc: '' });
        console.log('saved succesfully')
        this.demo = null;
      }
    });
  },


  getOne: function (req, res) {

    personModel.findById(req.params.email, function (err, doc) {
      if (err) {
        res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, doc: '' });
      }
      else {
        res.status(200).json({ status: 'success', message: 'Success', docs: doc });
      }
    });
  },

  deleteOne: function (req, res) {

    personModel.deleteOne(req.params.email, function (err, doc) {
      if (err) {
        res.status(500).json({ status: 'error', message: 'Datebase Error:' + err,});
      }
      else {
        res.status(200).json({ status: 'success', message: 'deleted' });
      }
    });
  },

  //function to send email for password reset
  emailSender: function (req, res) {
    const cryptr = new Cryptr('private key');
    const encryptedString = cryptr.encrypt(req.body.email);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aniket@amdev.in',
        pass: 'aniket@77'
      }
    });

    var mailOptions = {
      from: 'aniket@amdev.in',
      to: req.body.email,
      subject: 'mail by jobportal - ',
      text: `http://localhost:4200/forgotPassword/${encryptedString}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        res.status(200).json({ status: true, message: 'mail sent..!' });
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },

  /**function to reset the password field */

  updatePassword: function (req, res) {
    const cryptr = new Cryptr('private key');
    const decryptedString = cryptr.decrypt(req.body.email);
    var myquery = { email: decryptedString }
    var newvalues = { $set: { password: req.body.password } };
    personModel.updateOne(myquery, newvalues, function (err, info) {
      if (!err) {
        res.status(200).json({ status: true, message: 'update Successfully!' });
      } else {
        res.status(200).json({ status: false, message: 'something wrong..!' });
      }

    });
  },

  uploadPiture: function (req, res) {

    var aniket = {
      path: String
    }

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)

      }
    });

    var upload = multer({ storage: storage }).single('photo');


    upload(req, res, function (err) {
      console.log("uploaded file - ", req.file.path)
      this.demo = req.file.path;
      console.log("copied path ", this.demo)
      // console.log("uploaded file - ",this.imagePath.path)
      if (err) {
        res.status(500).json({ status: 'error', message: 'Database Error:' + err, docs: '' });
      } else {

        res.status(200).json({ status: 'success', message: 'Picture is Successfully uploaded', docs: '' });
      }

    });
  }
}

getHobbies = function (hobbiesData) {
  result = hobbiesData.filter(word => word !== true)
  hobbiesArray = result.filter(word => word !== false)

  return hobbiesArray;
}
module.exports = persons;