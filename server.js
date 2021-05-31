// Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
require('dotenv').config();
const PORT = process.env.PORT || 3003;

// Middleware
// Public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // returns middleware that only parses JSON. Not always necessary.

app.use(methodOverride('_method'));


// Database
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo & fix deprecation warnings from mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Error / Success
db.on('error', (err) => console.log(err.message + ' is Mongod running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// Routes
app.get('/', (req, res) => {
  res.send('Aloha, world!')
});

// Listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
