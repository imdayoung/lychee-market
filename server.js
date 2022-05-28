/*app.js*/
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

app.listen(port, function(req, res) {
	console.log('server run: '+port);
})

app.post('/', function(req, res){
	
})