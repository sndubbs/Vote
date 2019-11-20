const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/candidates', {
    useNewUrlParser: true
});

var CandidateSchema = new mongoose.Schema({
  name: String,
  votes: {type: Number, default: 0},
});

const Candidate = mongoose.model('Candidate', CandidateSchema);

app.post('/api/candidates', async (req, res) => {
 const candidate = new Candidate({
     name: req.body.name,
 });
 try {
     console.log("Post candidate");
     console.log(candidate);
     await candidate.save();
     res.send(candidate);
 } catch (error) {
     console.log(error);
     res.sendStatus(500);
 }
  });


app.get('/api/candidates', async (req, res) => {
  try {
      let candidates = await Candidate.find();
      res.send(candidates);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

app.delete('/api/candidates/:id', async (req, res) => {
    try{
        console.log("delete candidate");
        console.log(Candidate);
        await Candidate.deleteOne({_id: req.params.id});
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/candidates/:id', async (req, res) => {
    try {
        console.log("incrementVote");
        let candidate = await Candidate.findOne({_id: req.params.id});
        console.log(candidate.votes);
        candidate.votes += 1;
        await candidate.save();
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3002, () => console.log('Server listening on port 3002!'));

/* Create GitHub repo
clone github repo
cd to your new repo
mkdir public
cd public
touch index.html
touch style.css
cd..
touch server.js
nvm use stable
npm init
npm install express body-parser
cd public
touch admin.html
touch admin.js
npm start
npm install --save mongoose
*/