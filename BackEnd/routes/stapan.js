var fs = require('fs');
var qs = require('qs');
var oracledb = require('oracledb');

module.exports = function (req, res) {
    if(req.url === '/stapan' && req.method === 'GET') {
        var filename = '../View/stapan.html';
        fs.readFile(filename, function (err,html){
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(html);
            res.end();
        });
    }
}