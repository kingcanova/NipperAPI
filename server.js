//Set up the express requirement and our application, hook it up to a server so we can then require that the server be run
var express = require('express');
var app = express();
var server = require('http').Server(app);

var statues = require('./statueController.js');

//Give the paths to the objects because they will not be static depending on where they are hosted
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));
app.use('/node_modules',express.static(__dirname + '/node_modules'));

//send the index.html as the root of the webpage
app.get('/',function(req,res){
    var webpage = statues.createHTMLBadly();
    webpage += statues.createTable('');
    webpage += statues.createAngular();
    webpage += statues.finishHTMLBadly();
    res.send(webpage);
    //res.sendFile(__dirname+'/index.html');
});

app.get('/data',function(req,res){
    var webpage = statues.createHTMLBadly();
    webpage += statues.createTable('');
    webpage += statues.createAngular();
    webpage += statues.finishHTMLBadly();
    res.send(webpage);
});

app.get('/data/:id',function(req,res){
    var webpage = statues.createHTMLBadly();
    webpage += statues.createTable(req.params.id);
    webpage += statues.createAngular();
    webpage += statues.finishHTMLBadly();
    res.send(webpage);
});

app.get('/picture',function(req,res){
    res.sendFile(__dirname+'/photo.html');
});

//Make the server listen to port 8081
server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});
// Our handler function is passed a request and response object

module.exports = app;