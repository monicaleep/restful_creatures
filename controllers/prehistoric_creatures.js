const express = require('express');
const router = express.Router();
const fs = require('fs');

// index page - creatures
router.get('/', (req, res) => {
  const creatures = fs.readFileSync('./prehistoric_creatures.json');
  // take a json object and return a js object
  let creatureData = JSON.parse(creatures);
  res.render('prehistoric_creatures/index', {
    creatures: creatureData
  });
});

// new page - creatures
router.get('/new', (req, res) => {
  res.render('prehistoric_creatures/new')
})

//show page - creatures
router.get('/:id', (req, res) => {
  const index = parseInt(req.params.id)
  const creatures = fs.readFileSync('./prehistoric_creatures.json');
  const creatureData = JSON.parse(creatures);
  res.render('prehistoric_creatures/show', {
    creature: creatureData[index],
    creatureID: index})
});


// create route - creatures
router.post('/',(req,res)=>{
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





module.exports = router;
