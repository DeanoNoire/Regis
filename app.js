
var rpio = require('rpio');
const express = require('express')
const app = express()
const port = 8080
var path = require('path');
bodyParser = require('body-parser');
var svetlaPracovnaModule = require('./modules/svetlaPracovna/svetlaPracovnaController');
var authenticator = require('./modules/authenticator/authenticator')


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
  });

app.use("/static", express.static('./static/'));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



app.post('/MLSwitch', (req, res) => {
  var LSwitchResult = svetlaPracovnaModule.switchL(1); 
  res.statusMessage = 'S'+LSwitchResult;
  res.status(200).end();
});

app.post('/SLSwitch', (req, res) => {
  var LSwitchResult = svetlaPracovnaModule.switchL(2); 
  res.statusMessage = 'S'+LSwitchResult;
  res.status(200).end();
});

app.post('/auth', (req, res) => {
  console.log(req.body);
  var authResult = authenticator.authenticate(req.body); 
  res.statusMessage = authResult;
  res.status(200).end();
});

