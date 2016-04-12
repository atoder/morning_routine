// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var RoutineSchema = new mongoose.Schema({
  name: String,
  type: String,
  daysPerWeek: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Routine', RoutineSchema);
