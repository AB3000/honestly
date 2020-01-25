const http = require('http');
var unirest = require("unirest");
var req = unirest("POST", "https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud");
var app = require("express")(); 
var bodyParser = require("body-parser"); 
var sys   = require('util');
var spawn = require('child_process').spawn;


//Set view engine to ejs
app.set("view engine", "ejs"); 

//Tell Express where we keep our index.ejs
app.set("views", __dirname + "\\views"); 

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


var scraped = "";


console.log("Proc starting");
//console.log(scraped);
var py    = spawn('python', ['web_scraping.py', 'happy']),
data = [1,2,3,4,5,6,7,8,9],
dataString = '';

py.stdout.on('data', function(data){
dataString += data.toString();
});
py.stdout.on('end', function(){
console.log('TEXT: ',dataString);
req.query({
	"max_words": "16000",
	"font": "Times New Roman",
	"language": "en",
	"colors": "%5B'%23375E97'%2C '%23FB6542'%2C '%23FFBB00'%2C '%233F681C'%5D",
	"use_stopwords": "true",
	"scaling": "1.0",
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
	"text": dataString,
	"scale": 1.0,
	"width": 800,
	"height": 800,
	"colors": [
		"#0000cc",
		"#cc0000",
	],
	"font": "Times New Roman",
	"use_stopwords": true,
	"language": "en",
	"uppercase": false
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);
	//var image = new Image()

	//image.src = res.body;
	wordle = res.body;
	console.log("Wordle Done");
});

});
py.stdin.write(JSON.stringify(data));
py.stdin.end();


