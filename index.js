const http = require('http');
var unirest = require("unirest");
var req = unirest("POST", "https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud");
const express = require("express");
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.sendFile('test.html', {root: __dirname })
});
/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
*/
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


req.query({
	"max_words": "200",
	"font": "Tahoma",
	"language": "en",
	"colors": "%5B'%23375E97'%2C '%23FB6542'%2C '%23FFBB00'%2C '%233F681C'%5D",
	"use_stopwords": "true",
	"scaling": "0.5",
	"width": "800",
	"height": "800",
	"text": "This is a test. I repeat%2C this is a test. We are only testing the functionality of this api%2C nothing else. End of test."
});
req.headers({
	"x-rapidapi-host": "textvis-word-cloud-v1.p.rapidapi.com",
	"x-rapidapi-key": "43a21f4f50msh8b405ea8a73566ap12a98ajsn7413018624fc",
	"x-api-key": "qLn10OtYwY8MILjfYAIH11rx6yVWaGMOUNh0NZQh",
	"content-type": "application/json",
	"accept": "application/json"
});
req.type("json");
req.send({
	"text": "This is a test. I repeat, this is a test. We are only testing the functionality of this api, nothing else. End of test.",
	"scale": 0.5,
	"width": 1800,
	"height": 1800,
	"colors": [
		"#375E97",
		"#FB6542",
		"#FFBB00",
		"#3F681C"
	],
	"font": "Tahoma",
	"use_stopwords": true,
	"language": "en",
	"uppercase": false
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);
	//var image = new Image()
	//image.src = res.body;

	console.log(res.body);
});