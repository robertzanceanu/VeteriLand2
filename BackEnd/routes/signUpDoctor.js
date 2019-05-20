var fs = require('fs');

module.exports = function (req, res, oracledb) {
    if(req.url === '/signUpDoctor' && req.method === 'GET') {
        var filename = '../View/signUpDoctor.html';
        fs.readFile(filename, function (err,html){
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(html);
            res.end();
        });
    }

    if(req.url === '/signUpDoctor' && req.method === 'POST') {
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