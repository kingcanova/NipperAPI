var data = require('./statues.json');
var jp = require('jsonpath');
var Fuse = require('fuse.js');

var options = {
  keys: ['name']  
};

module.exports = {
    createTable: function(searchTerm){
        var statues = jp.query(data,'$.*');
        htmlTable = '<table>';
        htmlTable += '<tr><th>Title:</th><th>Artist:</th><th>Location:</th><th>Picture:</th></tr>';
        var fuzzySearch = new Fuse(statues,options);
        stat = statues;
        if(searchTerm == '')
        {
            for(i in stat){
                htmlTable += '<tr><td>'+stat[i].name+'</td>'+'<td>'+stat[i].artist+'</td>'+'<td>'+stat[i].address+'</td>'+'<td><img src ='+stat[i].path+' height=100px width=100px></td></tr>';
            } 
        }
        else
        {
            stat = fuzzySearch.search(searchTerm);
            htmlTable += '<tr><td>'+stat[0].name+'</td>'+'<td>'+stat[0].artist+'</td>'+'<td>'+stat[0].address+'</td>'+'<td><img src ='+stat[0].path+' height=100px width=100px></td></tr>';
        }
        htmlTable.concat('</table>');
        return htmlTable;
    },
    createHTMLBadly: function(){
        badHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Nipper API</title><link rel=stylesheet href=/css/style.css></head><body><div id="main">';
        return badHTML;
    },
    finishHTMLBadly: function(){
        finishedHTML = '</div></body></html>';
        return finishedHTML;
    }
};