
/**
 * Module dependencies.
 */
var azure = require('azure-storage');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/exp', function (req, res, next) {
    seekID();
    //next();
    res.render('exp', { title: 'Experimental',val, year: new Date().getFullYear(), message: 'Test SDK' });
});
app.get('/poc', function (req, res, next) {
    seekID();
    //next();
    res.render('poc', { title: 'Experimental', val, year: new Date().getFullYear(), message: 'Test SDK' });
});
var val = 'ms';

function seekID() {
    var accountName = 'rghybridcommercediag301';
    var accountKey = 'nrfAyZBvofsKtbooCbudwgEaxvk7onJuAMy9VlWzDYj1qTC5zcxEoN4Av/1J4ueAl2Sb+/NtA9ikQdc1NeiRUQ==';
    var queueSvc = azure.createQueueService(accountName, accountKey);
  //  console.log('now toto is coming');
   // console.log(val);
    queueSvc.peekMessages('testqueue', function (error, result, response) {
        if (!error)
        {
            // Message text is in messages[0].messageText
            console.log(result[0].messageText);
            val = result[0].messageText;
            console.log(val);
        }
        else {
            val = 'error';
            console.log("error listening or nothing");
        }
    });
   // return val;
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
