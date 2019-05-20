var fs = require('fs');
var qs = require('qs');
var oracledb = require('oracledb');

module.exports = function (req, res) {
    if(req.url === '/login' && req.method === 'GET') {
        var filename = '../View/login.html';
        fs.readFile(filename, function (err,html){
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(html);
            res.end();
        });
    }

    if(req.url === '/login' && req.method === 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            var post = qs.parse(body);
            console.log(post);
            console.log(post.email);
            async function run()  {
                try {
                    connection = await oracledb.getConnection(  {
                        user          : "student",
                        password      : "STUDENT",
                        connectString : "localhost:1521/xe"
                      });
                      console.log("Connected");
                      connection.execute(
                        `SELECT doctor
                         FROM useri where email=:email and password = :password`,
                        [email = post.email, password= post.password],  
                       function(err, result) {
                          if (err) {
                            console.error(err.message);
                            return;
                          }
                          console.log("am AJINS AICI");
                          console.log(result.rows);
                        //   console.log(result.rows);
                          if(result.rows.length > 0) {
                            console.log("exista");
                            if(result.rows > 0 ){
                                console.log("Doctor");
                                res.writeHead(301,{Location: '/doctor'});
                                res.end();
                                // return res.redirect('/doctor');
                            }
                            else {
                                console.log("Stapan");
                                // return res.redirect('/stapan');
                                res.writeHead(301,{Location: '/stapan'});
                                res.end();
                            }
                        } 
                            else {
                                console.log("Nu exista");
                            }
                        });

                    }
                catch(err) {
                    console.log(err);
                }
              }
              run();  
            
    });
}
}