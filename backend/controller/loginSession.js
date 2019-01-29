var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({secret: "secret"}));

loginSession = function (req, res) {
    app.get('/', function(req, res){
        if(req.session.page_views){
          // req.session.page_views++;
          res.status(200).json({ status: false, message: 'already login' });
        } else {
           req.session.page_views = 1;
           res.status(200).json({ status: true, message: 'first time login' });
        }
     });
}


module.exports = loginSession;