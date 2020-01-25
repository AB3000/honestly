const http = require('http');
var unirest = require("unirest");
var req = unirest("POST", "https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud");
var express = require("express");
var app = express(); 
var bodyParser = require("body-parser"); 

//Set view engine to ejs
app.set("view engine", "ejs"); 

//Tell Express where we keep our index.ejs
app.set("views", __dirname + "/views"); 

//Use body-parser
app.use(bodyParser.urlencoded({ extended: false })); 

var wordle = "asdf";

//Instead of sending Hello World, we render index.ejs
app.get("/", (req, res) => { 
	//res.render("wordle", {base64: wordle}) 
	res.render("search");
}); 

//Allegedly we have to use the public folder in order to reference styles.css
app.use(express.static(__dirname + '/public'));

app.get("/search", (req, res) => { 
	console.log("SEARCHED");
}); 

app.get("/wordle", (req, res) => {
	var query = req.query["searchedQuery"]
	console.log(query);
	res.render("wordle", {base64: query}) 
});


//MONGOOSE CONNECTION
var mongoose = require("mongoose");
//Connection start
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://twistter:twist307@honestly-qllje.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error) {
    if (error) {
      console.log("Couldn't connect to database");
    } else {
      console.log("Connected To Database");
    }
  }
);
mongoose.set("useFindAndModify", false);


const hostname = '127.0.0.1';
const port = 3000;


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


/*
var scraped = "I've never been much of a mobile gamer, but, forget everything you think you know about mobile games because Raid Shadow Legends is one of the most ambitious RPG projects of 2019 has just been released and will change everything. Just look at the level of detail of these characters! If you use the code in the description you can start with 50,000 silver and join the Special Launch Tournament, and you better hurry because it's getting big fast! You can play for totally free with the link below on your smartphone.";
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
	"text": scraped,
	"scale": 0.5,
	"width": 800,
	"height": 800,
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
	wordle = res.body;
	//console.log(res.body);
});
*/