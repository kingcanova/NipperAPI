//Set up the express requirement and our application, hook it up to a server so we can then require that the server be run
var express = require('express');
var app = express();
var server = require('http').Server(app);

//Require the statueController.js file for creating our webpages when we need them
var statues = require('./statueController.js');

//Give the paths to the objects because they will not be static depending on where they are hosted
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));
app.use('/node_modules',express.static(__dirname + '/node_modules'));

//send the index.html as the root of the webpage, loads a collection view (or table) with a search bar to fuzzy search the database. More info in the index.html file itself
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

//This is the beginning of the api endpoint, its not specialized so we show the whole collection view and have the search bar, sending just index.html like the root again.
app.get('/data',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

//This is the API endpoint, when hit it creates a webpage displaying the statue it found with the id. In the getSearch function we preform a fuzzy search so even if someone misspells the name of a statue they should get the correct result from this endpoint
app.get('/data/:id',function(req,res){
    var webpage = statues.createHTMLTop();//Create the top of the webpage
    webpage += statues.getSearch(req.params.id);//Search and return the closest statue
    webpage += statues.createHTMLBottom();//Close all of the html tags
    res.send(webpage);//send the webpage
});

//This is the API endpoint that quiries the database for all data possible, used in index.html to show the collection view
app.get('/test/allData',function(req,res){
    var information = statues.getAll();
    res.json(information);
});


//Make the server listen to port 8081
server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});
// Our handler function is passed a request and response object

module.exports = app;