var express = require('express');

var app = express();

// Use environment defined port or 3000 if environment port is missing
var port = process.env.PORT || 3000;

var router = express.Router();

// dummy api endpoint
// http://localhost:3000/api
router.get('/', function(req, res) {
  debugger;
  res.json({ message: 'Welcome to morning routine app' });
});


// Register all our routes with /api
app.use('/api', router);
//app.use('/', router);

//app.get('/', function(req, res) {
//  res.send('Hello World!');
//});

// Start the server
app.listen(port);
console.log('Morning routine on port: ' + port);
