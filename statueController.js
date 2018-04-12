var data = require('./statues.json');
var jp = require('jsonpath');

module.exports = {
    createTable: function(){
        var statues = jp.query(data,'$.*');
        htmlTable  = '<table>';
        for(i in statues){
            htmlTable += '<tr><td>'+statues[i].name+'</td>'+'<td>'+statues[i].artist+'</td>'+'<td>'+statues[i].address+'</td>'+'<td><img src ='+statues[i].path+' height=100px width = 100px></td></tr>';
        }
        htmlTable.concat('</table>');
        return htmlTable;
    },
    createHeader: function(data){
        
    }
}