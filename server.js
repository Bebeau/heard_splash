const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var request = require('superagent');
const crypto = require('crypto');

const app = express();

require('dotenv').config();

// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// define mailchimp variables
var mailchimpInstance   = 'us15',
    listUniqueId        = '087d6c3e6b',
    mailchimpApiKey     = process.env.MAILCHIMP_API;

// route to subscribe new user to mailchimp list
app.put('/subscribe', function (req, res) {
	const {body} = req;
	const {
		emailValue
	} = body;
	emailaddress = emailValue.toLowerCase();
	let hash = crypto.createHash('md5').update(emailaddress).digest("hex");
    request
        .put('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/' + hash)
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer.from('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': emailaddress,
          'status': 'subscribed'
        })
        .end(function(err, response) {
			if ( response.status < 300 || (response.status === 400 && response.body.title === "Member Exists") ) {
				return res.send({success: true, message: 'Thank you. You have been added to the list.'});
			} else {
				console.log(response);
				return res.send({success: false, message: 'Oops, something went wrong.'});
			}
		});
});

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/app/build')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'client', 'app', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
