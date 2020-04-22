const dotenv = require('dotenv');
dotenv.config();

var aylien = require("aylien_textapi");

//set aylien API credentials
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const path = require('path')
const mockAPIResponse = require('./mockAPI.js')

//set up express
const express = require('express')
//start instance of app
const app = express()

// Middleware
const bodyParser = require('body-parser');
//configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//start directory
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('App listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

//ADDED TODAY

app.post('/sentiment', (req, res) => {
  const { query } = req.body;
    textapi.sentiment(query, (error, response) => {
      if (error === null) {
        console.log(response);
        res.send(response);
      }
    });
  });