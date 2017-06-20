
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
app.get('/destroy/:id', function (req, res, next) {
    var id = req.params.id;
    console.log("Removing: " + id);
    for (var i = ordered.length - 1; i >= 0; i--) {
        if (ordered[i] == id) {
            ordered.splice(i, 1);
        }
    }
   // ordered.splice(id,1);
    sendSMS(id);
    console.log("Removing order");

    res.redirect('/exp');
});
app.get('/exp', function (req, res, next) {
    seekID();
    //next();
    res.render('exp', { title: 'Experimental', val, ordered, year: new Date().getFullYear(), message: 'Test SDK' });
});
app.get('/poc', function (req, res, next) {
    seekID();
    //next();
    res.render('poc', { title: 'Experimental', val, year: new Date().getFullYear(), message: 'Test SDK' });
});
var val = 'Initialisation, veuillez recharger la page';

var ordered = [];

/*destroy: function(req, res) {
    var id = req.params.id;

    Todo.findByIdAndRemove(id, function (err, todo) {
        if (err) res.render('error', { error: 'Error deleting todo' });
        res.redirect('/todos');
    });
},*/

function seekID() {
    var accountName = 'rghybridcommercediag301';
    var accountKey = 'nrfAyZBvofsKtbooCbudwgEaxvk7onJuAMy9VlWzDYj1qTC5zcxEoN4Av/1J4ueAl2Sb+/NtA9ikQdc1NeiRUQ==';
    //var retryOperations = new azure.ExponentialRetryPolicyFilter();
    //OPTION 1
    var queueSvc = azure.createQueueService(accountName, accountKey);
    //OPTION 2
    //var queueSvc = azure.createQueueService(accountName, accountKey).withFilter(retryOperations);
    console.log('trying to get messages...');
   // console.log(val);
    queueSvc.getMessages('testqueue', function (error, result, response) {
        if (!error && result[0]!= undefined)
        {
            console.log('No Error: Research...');
            // Message text is in messages[0].messageText
            console.log(result[0].messageText);
            var message = result[0];
            val = result[0].messageText;
            console.log(val);
            queueSvc.deleteMessage('testqueue', message.messageId, message.popReceipt, function (error, response) {
                if (!error) {
                    console.log("message deleted");
                }
            });
            ordered.push(val);
        }
        else {
            val = 'No New Order';
            console.log("error listening or nothing");
        }
    });
}

function sendSMS(id) {
    var accountName = 'rghybridcommercediag301';
    var accountKey = 'nrfAyZBvofsKtbooCbudwgEaxvk7onJuAMy9VlWzDYj1qTC5zcxEoN4Av/1J4ueAl2Sb+/NtA9ikQdc1NeiRUQ==';
    //var retryOperations = new azure.ExponentialRetryPolicyFilter();
    //Valid
    //OPTION 1
    var queueSvc = azure.createQueueService(accountName, accountKey);
    //OPTION 2
    //var queueSvc = azure.createQueueService(accountName, accountKey).withFilter(retryOperations);
    console.log('trying to get messages...');
    // console.log(val);
    queueSvc.createMessage('tdestqueue',id, function (error, result, response) {
        if (!error) {
            console.log('SMS Sended');
        }
        else {
            console.log("error sms");
        }
    });
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
