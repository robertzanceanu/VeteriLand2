var oracledb = require('oracledb');
var http = require('http');

oracledb.getConnection(
  {
    user          : "STUDENT",
    password      : "STUDENT",
    connectString : "localhost/XE"
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    /*connection.execute(
      `SELECT * FROM stapani`,
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.rows);
        doRelease(connection);
      })
      */
  });

function doRelease(connection) {
  connection.close(
    function(err) {
      if (err)
        console.error(err.message);
    });
}

const routes = require('./routes/routes');
const indexController = require('./routes/index');
const servicesPageController = require('./routes/servicesPage');
const contactUsPageController = require('./routes/contactUsPage');
const loginController = require('./routes/login');
const signUpDoctor = require('./routes/signUpDoctor');
const signUpUser = require('./routes/signUpUser');

http.createServer(function(req, res) {
  routes(req, res);
  indexController(req, res);
  servicesPageController(req, res);
  contactUsPageController(req, res);
  loginController(req, res, oracledb);
  signUpDoctor(req, res, oracledb);
  signUpUser(req, res, oracledb);
}).listen(3000);