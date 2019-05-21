var fs = require('fs');
var qs = require('qs');
const request = require('request');
var oracledb = require('oracledb');
module.exports = function (req, res) {
    if (req.url === '/login' && req.method === 'GET') {
        var filename = '../View/login.html';
        fs.readFile(filename, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
            res.end();
        });
    }

    if (req.url === '/date' && req.method === 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            post = JSON.parse(body);
            console.log(post);
            console.log(post.email);
            // var datas = '';
            async function run() {
                try {
                    connection = await oracledb.getConnection({
                        user: "student",
                        password: "STUDENT",
                        connectString: "localhost:1521/xe"
                    });
                    console.log("Connected");
                    connection.execute(
                        `  select * from useri where email=:email and password=:password`,
                        [email = post.email, password = post.password],
                        function (err, result) {
                            if (err) {
                                console.error(err.message);
                                return;
                            }
                            console.log("am AJINS AICI");
                                // console.log('db response is ready '+result.rows);
                                // res.writeHead(200, {'Content-Type': 'application/json'});
                                // res.end(JSON.stringify(result.rows));
                            //   console.log(result.rows[0][0]);
                            if (result.rows.length > 0) {
                                var rowData = {
                                    id: result.rows[0][0],
                                    email: result.rows[0][1],
                                    password: result.rows[0][2],
                                    doctor: result.rows[0][3],
                                    stapan: result.rows[0][4]
                                };
                            }
                                console.log(rowData);
                            
                            if (result.rows.length > 0) {
                                console.log("exista");
                                if (rowData.doctor == 1) {
                                    console.log("Doctor");
                                    // res.statusCode = 200;   
                                    // res.setHeader('Content-Type', 'application/json');
                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                                    res.setHeader('Access-Control-Allow-Credentials', true);
                                    // res.writeHead(200,{'Content-Type':'application/json'});
                                    res.writeHead(200,{'Content-Type':'application/json'});
                                    res.end(JSON.stringify(rowData));
                                }
                                else {
                                    console.log("Stapan");
                                    // return res.redirect('/stapan');
                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                                    res.setHeader('Access-Control-Allow-Credentials', true);
                                    // res.writeHead(200,{'Content-Type':'application/json'});
                                    res.writeHead(200,{'Content-Type':'application/json'});
                                    res.end(JSON.stringify(rowData));
                                }
                            }
                            else {
                                console.log("Nu exista");
                            }
                        //    return rowData;
                        // datas=rowData;

                        });
                        // console.log(rowData);

                }
                catch (err) {
                    console.log(err);
                }
            }
            // async function wait(){
            //     await run();
            // }
            // wait();
            // console.log("Vacanta");
            // console.log(datas);
            run();
        });
    }

}
