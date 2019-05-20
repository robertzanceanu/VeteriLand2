var fs = require('fs');
var qs = require('querystring');

module.exports = function (req, res, oracledb) {
    if(req.url === '/signUpUser' && req.method === 'GET') {
        var filename = '../View/signUpUser.html';
        fs.readFile(filename, function (err,html){
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(html);
            res.end();
        });
    }

    if(req.url === '/signUpUser' && req.method === 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            var post = qs.parse(body);
            console.log(post);
        });
    }
}