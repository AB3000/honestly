const http = require('http');
var unirest = require("unirest");
// var wordleReq = unirest("POST", "https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud");
// var wordleReq = unirest("POST", "https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud?max_words=1000");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var sys   = require('util');
var spawn = require('child_process').spawn;
var word = require("./models/word"); //reference to word schema

app.use(express.static(__dirname + "public")); //static file references


//Set view engine to ejs
app.set("view engine", "ejs");

//Tell Express where we keep our index.ejs
app.set("views", __dirname + "/views");

//Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//MONGOOSE CONNECTION

var mongoose = require("mongoose");

//Instead of sending Hello World, we render index.ejs
app.get("/", (req, res) => {
	//res.render("wordle", {base64: wordle})
	res.render("search");
});

//Allegedly we have to use the public folder in order to reference styles.css
app.use(express.static(__dirname + '/public'));


app.get("/wordle", (req, res) => {
	var search = req.query["searchedQuery"];
	var cont = req.query["contribution"];
	var hasLoaded = false;

	if(cont != null){
		//save to db
		word.findOne({keyword: search}, "keyword contributions", (err, wordData) => {
			if(wordData !== null){ //not empty
				wordData.contributions += " " + cont;
				wordData.save();

			} else { //word does not exist in database
				var newWord = new word({
					keyword: search,
					contributions: cont,
				});
				newWord.save();
			}
		});
	} else { //searched for a new object

	}

	var textRetrieved = ""
	//retrieve word from db, get contributions, add to textRetrieved
	word.findOne({keyword: search}, "contributions", (err, wordData) => {
		if(wordData !== null){ //not empty
			textRetrieved = wordData.contributions;
			//console.log(textRetrieved);
		} //else add nothing
	});

	//scrapes
	var scraped = "";

	console.log("Web Scraping starts");
	//console.log(scraped);
	var py    = spawn('python', ['python_scripts/web_scraping.py', search]),
	data = [1,2,3,4,5,6,7,8,9],
	dataString = '';
	py.stdout.on('data', function(data){
		dataString += data.toString();
	});
	py.stdout.on('end', function(){
	   console.log('TEXT: ',dataString);
	   dataString+= " "+textRetrieved;
	   dataString = JSON.stringify(dataString);
	   res.render("wordle", {ds: dataString, keyword: search});
	});

	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
	
});

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
//const port = process.env.PORT;
//console.log(process.env.PORT);

app.listen(process.env.PORT || 3000, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
var spawn = require('child_process').spawn,
    py    = spawn('python', ['web_scraping.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';
	py.stdout.on('data', function(data){
	dataString += data.toString();
	});
	py.stdout.on('end', function(){
	  console.log('TEXT: ',dataString);
	});
py.stdin.write(JSON.stringify(data));
py.stdin.end();
