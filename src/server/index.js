const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

//start instance of app
const app = express()

// cors for cross origin allowance
app.use(cors());

//start directory
app.use(express.static('dist'))

app.use(bodyParser.json());

console.log(__dirname)

var aylien = require("aylien_textapi");

//set aylien API credentials
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

let aylienResponse = {};
app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('App listening on port 8081!')
})

//app.get('/test', function (req, res) {
//    res.send(mockAPIResponse)
//})

app.post('/aylien', function(req,res){
  console.log(req.body)
  if (textapi) {
  textapi.sentiment({'url':req.body.url}, (error,response)=>{
  if(error==null){
      console.log(response)
      aylienResponse={
          "polarity":response.polarity,
          "subjectivity":response.subjectivity,
          "text":response.text,
          "polarity_confidence":response.polarity_confidence,
          "subjectivity_confidence":response.subjectivity_confidence
      }
      res.send(aylienResponse);
      console.log(aylienResponse);
  }
  else{
      console.log("Error",error);
  }
})
}
})
