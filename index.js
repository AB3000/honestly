const http = require('http');
var unirest = require("unirest");
var req = unirest("POST", "https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud");
var app = require("express")(); 
var bodyParser = require("body-parser"); 

//Set view engine to ejs
app.set("view engine", "ejs"); 

//Tell Express where we keep our index.ejs
app.set("views", __dirname + "/views"); 

//Use body-parser
app.use(bodyParser.urlencoded({ extended: false })); 

var wordle = "asdf";

//Instead of sending Hello World, we render index.ejs
app.get("/", (req, res) => { res.render("wordle", {base64: wordle}) }); 


const hostname = '127.0.0.1';
const port = 3000;


//app.use('/', express.static(__dirname + '/'));
/*
app.get('/', function(req, res) {
    //res.sendFile('test.html', {root: __dirname })
    res.render(__dirname + "test.html", {base64:wordle});
});*/
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
	"text": "I want to be the very best, Like no one ever was. To catch them is my real test, To train them is my cause! (I will travel across the land, Searching far and wide. Each Pokemon to understand The power that's inside!) Pokemon! Gotta catch em' all! It's you and me, I know it's my destiny! Pokemon! Oh, you're my best friend, In a world we must defend! Pokemon! Gotta catch em' all! (A heart so true, Our courage will pull us through!) You teach me and I'll teach you, Po-ke-mon! Gotta catch em' all! Gotta catch em' all! Every challenge along the way, With courage I will face! I will battle every day, To claim my rightful place! Come with me, the time is right, There's no better team! Arm in arm, we'll win the fight, It's always been our dream! Pokemon! Gotta catch em' all! It's you and me, I know it's my destiny! Pokemon! Oh, you're my best friend, In a world we must defend! Pokemon! Gotta catch em' all! (A heart so true, Our courage will pull us through!) You teach me and I'll teach you, Po-ke-mon! Gotta catch em' all! Gotta catch em' all! Gotta catch em' all! Gotta catch em' all! Gotta catch em' all! Pokemon! Gotta catch em' all! It's you and me, I know it's my destiny! Pokemon! Oh, you're my best friend, In a world we must defend! Pokemon! Gotta catch em' all! (A heart so true, Our courage will pull us through!) You teach me and I'll teach you, Po-ke-mon! Gotta catch em' all! Gotta catch em' all! Po-ke-mon!",
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
	"use_stopwords": false,
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