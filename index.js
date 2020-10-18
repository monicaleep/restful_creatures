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

app.use('/dinosaurs',require('./controllers/dinosaurs'))

// index page - creatures
app.get('/prehistoric_creatures', (req, res) => {
  const creatures = fs.readFileSync('./prehistoric_creatures.json');
  // take a json object and return a js object
  let creatureData = JSON.parse(creatures);

  res.render('prehistoric_creatures/index', {
    creatures: creatureData
  });
})



// new page - creatures
app.get('/prehistoric_creatures/new', (req, res) => {
  res.render('prehistoric_creatures/new')
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

// create route - creatures
app.post('/prehistoric_creatures',(req,res)=>{
  //read from the 'database'
  const creatures = fs.readFileSync('./prehistoric_creatures.json');
  // take a json object and return a js object
  const creatureData = JSON.parse(creatures);
  // add the new data to the array
  creatureData.push(req.body);
  // update the database
  fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(creatureData));
  //redirect to the GET /prehistoric_creatures route
  res.redirect('/prehistoric_creatures')
})




app.listen(5000, () => {
  console.log('listening on port 5000')
})
