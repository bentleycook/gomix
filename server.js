var express = require('express');
var cors = require('cors');
var Sequelize = require('sequelize');
const rp = require('request-promise');
Promise = require('bluebird');
var request = require('request');
 
/*
/     Setup
*/
var app = express();

app.use(cors({ origin: '*' }));
app.use(express.static('public'));

var server = app.listen(3000, function () {
  console.log('Server up and running...🏃🏃🏻');
  console.log("Listening on port %s", server.address().port);
});

/*
/     Routes
*/
app.get("/", function (request, response) {
  console.log(`GET '/' 🤠 ${Date()}`);
  response.send("<h1>Oh, hello there Boulder!</h1>");
});




/*
/     SQLite3 Example
*/
app.get("/sql", function (request, response) {
  console.log(`GET '/sql' 🤡 ${Date()}`);
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/users", function (request, response) {
  var dbUsers=[];
  User.findAll().then(function(users) { // find all entries in the users tables
    users.forEach(function(user) {
      dbUsers.push([user.firstName,user.lastName]); // adds their info to the dbUsers value
    });
    response.send(dbUsers); // sends dbUsers back to the page
  });
});

// creates a new entry in the users table with the submitted values
app.post("/users", function (request, response) {
  User.create({ firstName: request.query.fName, lastName: request.query.lName});
  response.sendStatus(200);
});

// default user list
var users = [
      ["John","Hancock"],
      ["Liz","Smith"],
      ["Ahmed","Khan"]
    ];
var User;

// setup a new database
// using database credentials set in .env
var sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
  host: '0.0.0.0',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
    // Security note: the database is saved to the file `database.sqlite` on the local filesystem. It's deliberately placed in the `.data` directory
    // which doesn't get copied if someone remixes the project.
  storage: '.data/database.sqlite'
});

// authenticate with the database
sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
    // define a new table 'users'
    User = sequelize.define('users', {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      }
    });
    
    setup();
  })
  .catch(function (err) {
    console.log('Unable to connect to the database: ', err);
  });

// populate table with default users
function setup(){
  User.sync({force: true}) // using 'force' it drops the table users if it already exists, and creates a new one
    .then(function(){
      // Add the default users to the database
      for(var i=0; i<users.length; i++){ // loop through all users
        User.create({ firstName: users[i][0], lastName: users[i][1]}); // create a new entry in the users table
      }
    });  
}
  
 
// !Trello API Helper Promises
// const getBoardCards = Promise.coroutine(function* (boardId){
//   var trelloApi = "https://api.trello.com/1/";
//   const apiReq = {
//     uri: `${trelloApi}/boards/${boardId}/cards/`,
//     qs: {
//       fields: "name", // You can add more card fields here
//       key: process.env.TRELLO_KEY,
//       token: process.env.TRELLO_TOKEN
//     },
//     json: true
//   };
//   let response;
//   try {
//     response = yield rp.get(apiReq);
//   } catch (apiErr) {
//     console.error(`Error getting board and cards! \n error=${apiErr.message}`);
//     return false;
//   }
//   return response;
// });

// app.get("/secrets", function (request, response) {
//   getBoardCards("iowe9iLM")
//   .then((results) => {
//     response.send(JSON.stringify(results, null, 2));
//   })
// });