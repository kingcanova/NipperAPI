var data = require('./statues.json');
var jp = require('jsonpath');
var Fuse = require('fuse.js');

var options = {
  keys: ['name']  
};

module.exports = {
    createTable: function(){
        var statues = jp.query(data,'$.*');
        htmlTable = '<link rel=stylesheet href=/css/style.css><table>';
        htmlTable += '<tr><th>Title:</th><th>Artist:</th><th>Location:</th><th>Picture:</th></tr>';
        var fuzzySearch = new Fuse(statues,options);
        stat = fuzzySearch.search('Lsoot');
        //console.log(stat);
        for(i in stat){
            htmlTable += '<tr><td>'+stat[i].name+'</td>'+'<td>'+stat[i].artist+'</td>'+'<td>'+stat[i].address+'</td>'+'<td><img src ='+stat[i].path+' height=100px width=100px></td></tr>';
        }
        htmlTable.concat('</table>');
        return htmlTable;
    },
    createHeader: function(data){
        
    }
};