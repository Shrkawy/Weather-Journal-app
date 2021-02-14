const projectData = {};

// Require Express to run server and routes
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const indexRoutes = require('./routes/index');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static(path.join(__dirname, 'public')));

// Main Route
app.use('/', indexRoutes);

// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`your server is running on port: ${port}`)
});



