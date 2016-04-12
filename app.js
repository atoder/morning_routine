var express = require('express');
var mongoose = require('mongoose');
var Routine = require('./models/routine');
var bodyParser = require('body-parser');
var app = express();


// Connect to the Morning Routine MongoDB
mongoose.connect('mongodb://localhost:27017/morningroutine');

// Use environment defined port or 3000 if environment port is missing
var port = process.env.PORT || 3000;

var router = express.Router();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// dummy api endpoint
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to morning routine app' });
});


// Register all our routes with /api
app.use('/api', router);
//app.use('/', router);

//app.get('/', function(req, res) {
//  res.send('Hello World!');
//});



// Create a new route with the prefix /routines
var routinesRoute = router.route('/routines');

// Create endpoint /api/routines for POSTS
routinesRoute.post(function(req, res) {
  // Create a new instance of the Beer model
  var routine = new Routine();

  // Set the beer properties that came from the POST data
  routine.name = req.body.name;
  routine.type = req.body.type;
  routine.daysPerWeek = req.body.daysPerWeek;

  // Save the routine and check for errors
  routine.save(function(err) {
    if (err) res.send(err);

    res.json({ message: 'Routine added!', data: routine });
  });
});


// Create endpoint /api/routines for GET
routinesRoute.get(function(req, res) {
  // Use the Routine model to find all routines
  Routine.find(function(err, routines) {
    if (err)
      res.send(err);

    res.json(routines);
  });
});


// Create a new route with the /routines/:routine_id prefix
var routineRoute = router.route('/routines/:routine_id');

// Create endpoint /api/routines/:routine_id for GET
routineRoute.get(function(req, res) {
  // Use the routine model to find a specific routine
  Routine.findById(req.params.routine_id, function(err, routine) {
    if (err)
      res.send(err);

    res.json(routine);
  });
});

// Create endpoint /api/routines/:routine_id for PUT
routineRoute.put(function(req, res) {
  // Use the routine model to find a specific routine
  Routine.findById(req.params.routine_id, function(err, routine) {
    if (err)
      res.send(err);

    // Update the existing routine days per week
    routine.daysPerWeek = req.body.daysPerWeek;

    // Save the routine and check for errors
    routine.save(function(err) {
      if (err)
        res.send(err);

      res.json(routine);
    });
  });
});


// Create endpoint /api/routines/:routine_id for DELETE
routineRoute.delete(function(req, res) {
  // Use the Routine model to find a specific routine and remove it
  Routine.findByIdAndRemove(req.params.routine_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Routine removed!' });
  });
});

// Start the server
app.listen(port);
console.log('Morning routine on port: ' + port);
