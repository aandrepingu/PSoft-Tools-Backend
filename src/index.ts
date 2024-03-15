// src/index.js
import express, { Express, RequestHandler } from "express";
//import fs from "fs";
//import { appendFile } from "node:fs";
/*
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});
*/

var fs = require("fs");
var cors = require("cors");
var bodyParser = require("body-parser");
//const path = require("path");

const app: Express = express();
const port = 3000;

const logRequest: RequestHandler = (req, res, next) => {
  console.log("LOGGED");
  next();
};

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(logRequest);
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.raw({inflate:true, type: 'text/plain'}));
//app.use(bodyParser.json());

app.post("/*", (req, res) => {
  //req.body; // JavaScript object containing the parse JSON
  //console.log((req.body).toString())
  //Get string data
  var peopleTxt = (req.body).toString();

  //Make tmp file
  fs.appendFileSync(
    __dirname + "/Dafny-Files" + "/dafny.dfy",
    peopleTxt,
    function (err: any) {
      if (err) throw err;
      console.log("Create!");
    }
  );

  //Run Dafny and store output on file

  //test
  const data = fs.readFileSync(__dirname + "/Dafny-Files" + "/dafny.dfy", {
    encoding: "utf8",
    flag: "r",
  });

  // Display the file data
  //console.log(data);

  //Delete file
  fs.unlink(__dirname + "/Dafny-Files" + "/dafny.dfy", function (err: any) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
    } else {
      console.info(`removed`);
    }
  });

  //Return Dafny Output
  //res.send(peopleJSON);
  console.log(data.toString());
  res.send(data);
});

app.get("/", (req, res) => {
  //res.send("Hello World!");
  let responseText = JSON.stringify("Hello World!<br>");
  res.send(responseText);
});

app.get("/test", (request, response) => {
  response.contentType("application/json");

  var people = [
    { name: "Dave", location: "Atlanta" },
    { name: "Santa Claus", location: "North Pole" },
    { name: "Man in the Moon", location: "The Moon" },
  ];

  var peopleJSON = JSON.stringify(people);
  response.send(peopleJSON);
});

//Simple Get request for routing to Homepage
//Implement Later
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/static/home.html');
});

//Simple Get request for routing to Login page
//Implement Later
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});

//Simple Get request for routing to dafny Page
//Implement Later
app.get('/dafny', (req, res) => {
  res.sendFile(__dirname + '/static/dafny.html');
});

//Simple Login Post Request
app.post('/login', (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;

  //Add checkign to make sure valid login in database
  res.send(`Username: ${username} Password: ${password}`);
});

//Simple Signup Post Request
app.post('/signup', (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;

  //Add username and password to database
  res.send(`Username: ${username} Password: ${password}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
