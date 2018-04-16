//This file acts as our "database" and has helpful methods for putting together a webpage when a person quiries for a specific statue or searches for a specific statue

//Load the data, require jsonpath for quiries, require fuse.js for fuzzy search
var data = require('./statues.json');
var jp = require('jsonpath');
var Fuse = require('fuse.js');
//var model = require('./statues.js');


//Set up our options for the fuse fuzzy search, here we use thier default algorithm with no tuning and only search by name.
var options = {
  keys: ['name']  
};

//Here are all of the functions that can be called by server.js to build a webpage based on the path or api endpoint that a user has entered
module.exports = {
    //This is an old method when I was testing things out and building a table the wrong way
    createTable: function(searchTerm){
        var statues = jp.query(data,'$.*');
        var htmlTable = '<table>';
        htmlTable += '<tr><th>Title:</th><th>Artist:</th><th>Location:</th><th>Picture:</th></tr>';
        var fuzzySearch = new Fuse(statues,options);
        stat = statues;
        if(searchTerm == '')
        {
            htmlTable += model.createAllStatues(stat);
        }
        else
        {
            stat = fuzzySearch.search(searchTerm);
            htmlTable += model.createOneStatue(stat[0]);
        }
        htmlTable.concat('</table>');
        return htmlTable;
    },
    //This function returns html that is at the top of the webpage, including everything from <!DOCTYPE html> linking all of the required scripts and stylesheets and ending with an open div with id=main.
    createHTMLTop: function(){
        var topHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Nipper API</title><link rel=stylesheet href=/css/style.css><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"><script src = "/node_modules/angular/angular.js"></script></head><body><div id="main">';
        return topHTML;
    },
    //This is the getAll function that is used when someone quiries for all of the data or the collection view/table is quiring for all of the data.
    getAll: function(){
        var information = jp.query(data,'$.*');
        //console.log(information[0]);
        return information;
    },
    //This is the getSearch method that is used to build a small webpage/api endpoint to display a specific statue or searched statue, it uses a fuzzysearch algorithm to try to find the closest match, if the searched name is so far off that fuzzysearch doesnt return any matches at all, an error page will appear alerting the user.
    getSearch: function(searchTerm){
        var img = '<div class="imgbox">';
        var statues = jp.query(data,'$.*');//get all the data
        var fuzzySearch = new Fuse(statues,options);//create a fuzzysearch object to preform the search
        statues = fuzzySearch.search(searchTerm);//Actually do the search and fill the statues array with the best matches for what the user typed
        var guessedStatue = statues[0];//Return only the best match
        if(guessedStatue == undefined){//If someone typed in "zzzz" they would get an error message because no statues are closely named "zzzz"
            img = '<div class="alert alert-danger"><Strong>Oops!</Strong> We are sorry! The name youve searched does not appear to come close enough for our searching algorithm to guess the statue you want! Please try searching with a different or modified name! </div>';
            img += '<br> <a href="/data" class="btn btn-primary">Back</a>';
            return img;
        }
        //Otherwise if fuzzysearch returns a result display that result and the information about the statue
        img += '<img src="'+guessedStatue.path+'" alt="'+guessedStatue.name+'" class="center-fit" style="width:80%;">';
        img += '<div class="text-block"><h4>'+guessedStatue.name+'</h4><p>By: '+guessedStatue.artist+'</p><br><p>Location: '+guessedStatue.address+'</div>';
        img += '</div>';
        //Always have a back button to bring them back to the collection view
        img += '<br> <a href="/data" class="btn btn-primary">Back</a>';
        return img;
        
    },
    //Old method for creating the angular app without actually using HTML. NOT USED 
    createAngularSearch: function(){
        var angularStuff = '<script> var nipperApp = angular.module("nipperApp",[]); nipperApp.controller("nipperController",function($scope){$scope.searchTerm = "";});</script><div ng-app= "nipperApp" ng-controller = "nipperController">Search: <input type="text" ng-model="searchTerm"><a ng-href = "/data/{{searchTerm}}" class="btn btn-default">Search</a></div>';
        return angularStuff;
    },
    //This method closes all of the tags opened by the createHTMLTop method.
    createHTMLBottom: function(){
        var bottomHTML = '</div></body></html>';
        return bottomHTML;
    }
};