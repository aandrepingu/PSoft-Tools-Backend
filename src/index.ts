// src/index.js
import express, { Express, RequestHandler } from "express";

//import fs from "fs";
//import { appendFile } from "node:fs";
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
  console.log((req.body).toString())
  //Get string data
  var peopleTxt = (req.body);

  //Testing What goes into file
  /*
  fs.appendFile(
    __dirname + "/Dafny-Files" + "/testing.dfy",
    peopleTxt,
    function (err: any) {
      if (err) throw err;
      console.log("Create!");
    }
  );
  */

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


//Adding post request to test Hoar Tripples with counter Example
//Input string form variable, precondition, modifications to variable, postcondition
//Confirm Precondition
//Run code
//Confirm Postcondition
app.post("/HoarTrippleCounterExample", (req, res) => {
  //Get string data as array of 4 strings
  var peopleTxt = (req.body);

  //PeopleTxt[0] = Variable = ?;
  //PeopleTxt[1] = Precondition --> Change to Bool tmp = Precondition{Variable}

  //If tmp == false return false

  //Run PeopleTxt[2] with replacing in variable
  //Confirm PeopleTxt[3] Postcondition --> Change to Bool tmp = Postcondition{ChangedVariable}
  //If tmp == false return false
  //Return True to frontend otherwise
  


  //Make tmp file
  fs.appendFileSync(
    __dirname + "/Dafny-Files" + "/java.java",
    peopleTxt,
    function (err: any) {
      if (err) throw err;
      console.log("Create!");
    }
  );


  //Run Java and store output on file
  //Need to parse only code (line 3)
  //Need to read output of run java code instead --> To change
  const data = fs.readFileSync(__dirname + "/Dafny-Files" + "/java.java", {
    encoding: "utf8",
    flag: "r",
  });

  //Delete file
  fs.unlink(__dirname + "/Dafny-Files" + "/java.java", function (err: any) {
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

  //console.log(data.toString());
  res.send("False");
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
