const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const fs = require('fs')

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.urlencoded({
  extended: false
}));


app.get('/', (req, res) => {
  res.render('home')
})

// index page - dinosaurs
app.get('/dinosaurs', (req, res) => {
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

// index page - creatures
app.get('/prehistoric_creatures', (req, res) => {
  const creatures = fs.readFileSync('./prehistoric_creatures.json');
  // take a json object and return a js object
  let creatureData = JSON.parse(creatures);

  res.render('prehistoric_creatures/index', {
    creatures: creatureData
  });
})

// new page - dinosaurs
app.get('/dinosaurs/new', (req, res) => {
  res.render('dinosaurs/new')
})

// new page - creatures
app.get('/prehistoric_creatures/new', (req, res) => {
  res.render('prehistoric_creatures/new')
})

//show page - dinosaurs
app.get('/dinosaurs/:id', (req, res) => {
  const index = parseInt(req.params.id)
  const dinosaurs = fs.readFileSync('./dinosaurs.json');
  const dinoData = JSON.parse(dinosaurs);
  res.render('dinosaurs/show', {
    dino: dinoData[index],
    dinoid: index})
})

//show page - creatures
app.get('/prehistoric_creatures/:id', (req, res) => {
  const index = parseInt(req.params.id)
  const creatures = fs.readFileSync('./prehistoric_creatures.json');
  const creatureData = JSON.parse(creatures);
  res.render('prehistoric_creatures/show', {
    creature: creatureData[index],
    creatureID: index})
})

app.post('/dinosaurs', (req, res) => {
  const dinosaurs = fs.readFileSync('./dinosaurs.json');
  // take a json object and return a js object
  const dinoData = JSON.parse(dinosaurs);
  dinoData.push(req.body);
  // save dinosaurs to the data.json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

  //redirect to the GET /dinosaurs route (index)
  res.redirect('/dinosaurs');
})


app.listen(5000, () => {
  console.log('listening on port 5000')
})
