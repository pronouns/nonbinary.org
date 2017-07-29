/*
    This script accepts content removed JSON output.

    It will output a list of pages to visit.

    This will be heavy on memory.


 */

var fs = require('fs');
var data = require('./1/unsorted2.json');

var breakAt = 99999999999;

var times = [];

var pages = [];


for(var i = 0; i < data.length && i < breakAt; i++){
    var res = /https:\/\/web.archive.org\/web\/(.*)\/http:\/\/(www.)?nonbinary.org(:80)?\/wiki\/(.*)/g.exec(data[i].url);
    if(res !== null && data[i].hasContent && !pages.includes(res[4])){
        if(!/(Special|File|User|User_talk|Talk):(.*)/g.test(res[4])){
            if(res[4].substr(res[4].length-1) === '#'){
                res[4] = res[4].slice(0, -1);
            }
            times.push(res[1]);
            pages.push(res[4]);
            console.log(res[4]);
        }
    }
}

fs.writeFile('2/list.json', JSON.stringify(pages));
fs.writeFile('2/times.json', JSON.stringify(times));