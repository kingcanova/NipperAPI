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
    console.log(req.hostname);
    console.log(req.fresh);
    console.log(req.stale);
    console.log(req.ip);
    //console.log(req.get('content-type'));
    //console.log("Headers sent: " + res.headersSent);
    res.append('Set-Cookie', 'firstTime=No!; Path=/; HttpOnly');
    res.append('Set-Cookie', 'BeenHereLong=Nope!; Path=/; HttpOnly');
    //res.cookie('BeenHereLong',{maxAge: Date.now()+60});
    res.append('Warning', '199 Miscellaneous warning');
    //res.clearCookie('foo');
    //res.clearCookie(req.cookies);
    res.sendFile(__dirname + '/index.html');
    //console.log("Headers sent: " + res.headersSent); //Will not send headers if you dont use res.send();
});

//This is the beginning of the api endpoint, its not specialized so we show the whole collection view and have the search bar, sending just index.html like the root again.
app.get('/data',function(req,res){
    console.log(req.get('Cookie'));
    res.sendFile(__dirname + '/index.html');
});

//This is the API endpoint, when hit it creates a webpage displaying the statue it found with the id. In the getSearch function we preform a fuzzy search so even if someone misspells the name of a statue they should get the correct result from this endpoint
app.get('/data/:id',function(req,res){
    //console.log(req.query); //Need to have the query in the URL with ?query
    console.log(req.hostname);
    //console.log(req.body);
    //console.log(req.header);
    console.log(req.params);
    var webpage = statues.createHTMLTop();//Create the top of the webpage
    webpage += statues.getSearch(req.params.id);//Search and return the closest statue
    webpage += statues.createHTMLBottom();//Close all of the html tags
    console.log(req.get('Cookie'));
    //res.append('Set-Cookie', 'BeenHereLong=Nope!; Path=/; HttpOnly');
    res.cookie('DIECOOKIE','1',{maxAge: 60000}); //THIS ONE ACTUALLY EXPIRES
    res.send(webpage);//send the webpage
    console.log("Headers sent: " + res.headersSent);
});

//This is the API endpoint that quiries the database for all data possible, used in index.html to show the collection view
app.get('/test/allData',function(req,res){
    var information = statues.getAll();
    res.json(information);
});


//Make the server listen to port 8081 or 80 (The default HTTP port)
server.listen(process.env.PORT || 80,function(){
    console.log('Listening on '+server.address().port);
});
// Our handler function is passed a request and response object

module.exports = app;