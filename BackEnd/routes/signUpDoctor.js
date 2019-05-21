var fs = require('fs');
var qs = require('qs');
var oracledb = require('oracledb');

module.exports = function (req, res) {
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
            var firstName = post.firstName;
            var lastName = post.lastName;
            var age = post.age;
            var email = post.email;
            var password = post.password;
            var phone = post.phoneNumber;

            async function run()  {
                try {
                    connection = await oracledb.getConnection(  {
                        user          : "STUDENT",
                        password      : "STUDENT",
                        connectString : "localhost:1521/xe"
                      });
                      console.log("Connected");

                      connection.execute(
                        `BEGIN 
                            insertDoctori.insertIntoDoctori(:prenumeDoctor, :numeDoctor, :varstaDoctor, :emailDoctor, :passwordDoctor, :numar_telefonDoctor); 
                        END;`, {
                                    prenumeDoctor: firstName,
                                    numeDoctor: lastName,
                                    varstaDoctor: age,
                                    emailDoctor: email,
                                    passwordDoctor: password,
                                    numar_telefonDoctor: phone,
                                },  
                       function(err, result) {
                          if (err) {
                            console.error(err.message);
                            return;
                          }
                          console.log("Succes");
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