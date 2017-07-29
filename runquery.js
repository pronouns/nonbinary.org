/*

https://web.archive.org/web/http://nonbinary.org:80/w/index.php?title=Transgender&action=edit

This script operates on 2/list.json and tries to query archive.org for wiki text.
*/


var request = require('request');
var fs = require('fs');

var pages = require('./2/list.json');
var times = require('./2/times.json');

var failed = [];

var complete = 0;

function urlForPage(name, time) {
    if(time === undefined){
        time = '2016';
    }
    return 'https://web.archive.org/web/' + time + '/http://nonbinary.org:80/w/index.php?title=' + name + '&action=edit';
}

function addFailed(name) {
    failed.push(name);
    fs.writeFile('3/failed.json', JSON.stringify(failed));
}

function oneComplete() {
    complete++;
    console.log(complete + '/' + pages.length);
}

var index = 0;


//FIXME This will never finish execution FYI
setInterval(function () {
    var name = pages[index];
    var time = times[index];

    if(!fs.existsSync('3/pages/' + name + '.txt')) {
        request(urlForPage(name, time), function (error, response, body) {
            var res = /<textarea ([\S\s]*)>([\S\s]*)<\/textarea>/g.exec(body);

            if (res !== null) {
                fs.writeFile('3/pages/' + name + '.txt', res[2]);
            }
            else {
                addFailed(name);
            }
            console.log(name);
            oneComplete();
        });
    }
    else{
        oneComplete();
    }

    index++;
}, 1000);