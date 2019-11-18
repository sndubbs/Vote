var mongoose = require('mongoose');
var CandidateSchema = new mongoose.Schema({
  name: String,
  votes: {type: Number, default: 0},
});
mongoose.model('Candidate', CandidateSchema);