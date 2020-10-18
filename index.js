const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
// const fs = require('fs') // i dont think we need this in here any more

app.set('view engine', 'ejs');
app.use(ejsLayouts);
// body parser setup to get data from forms
app.use(express.urlencoded({
  extended: false
}));

// controllers
app.use('/dinosaurs',require('./controllers/dinosaurs'));
app.use('/prehistoric_creatures',require('./controllers/prehistoric_creatures'));

// root route
app.get('/', (req, res) => {
  res.render('home')
})

app.listen(5000, () => {
  console.log('listening on port 5000')
})
