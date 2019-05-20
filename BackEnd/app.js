process.env.ORA_SDTZ = 'UTC';
var oracledb = require('oracledb');
var http = require('http');

const routes = require('./routes/routes');
const indexController = require('./routes/index');
const servicesPageController = require('./routes/servicesPage');
const contactUsPageController = require('./routes/contactUsPage');
const loginController = require('./routes/login');
const signUpDoctor = require('./routes/signUpDoctor');
const signUpUser = require('./routes/signUpUser');
const doctorController = require ('./routes/doctor');
const stapanController = require ('./routes/stapan');
async function run()  {
  try {
      connection = await oracledb.getConnection(  {
          user          : "student",
          password      : "STUDENT",
          connectString : "localhost:1521/xe"
        });
        console.log("Connected");
      }
  catch(err) {
      console.log(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch(err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
}
}
run();


http.createServer(function(req, res) {
  routes(req, res);
  indexController(req, res);
  servicesPageController(req, res);
  contactUsPageController(req, res);
  loginController(req, res);
  signUpDoctor(req, res);
  signUpUser(req, res);
  doctorController(req,res);
  stapanController(req,res);
}).listen(3000);