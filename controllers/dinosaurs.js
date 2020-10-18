const express = require('express');
const router = express.Router();
const fs = require('fs');

// index page - dinosaurs
router.get('/', (req, res) => {
  const dinosaurs = fs.readFileSync('./dinosaurs.json');
  // take a json object and return a js object
  let dinoData = JSON.parse(dinosaurs);
  const filter = req.query.nameFilter;
  if (filter) {
    dinoData = dinoData.filter(function(dino) {
      return dino.name.toLowerCase() === filter.toLowerCase();
    });
  }
  res.render('dinosaurs/index', {
    dinosaurs: dinoData
  });
})


// new page - dinosaurs
router.get('/new', (req, res) => {
  res.render('dinosaurs/new')
})


//show page - dinosaurs
router.get('/:id', (req, res) => {
  const index = parseInt(req.params.id)
  const dinosaurs = fs.readFileSync('./dinosaurs.json');
  const dinoData = JSON.parse(dinosaurs);
  res.render('dinosaurs/show', {
    dino: dinoData[index],
    dinoid: index})
})

// create route - dinosaurs
router.post('/', (req, res) => {
  const dinosaurs = fs.readFileSync('./dinosaurs.json');
  // take a json object and return a js object
  const dinoData = JSON.parse(dinosaurs);
  dinoData.push(req.body);
  // save dinosaurs to the data.json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  //redirect to the GET /dinosaurs route (index)
  res.redirect('/dinosaurs');
})

module.exports = router;
