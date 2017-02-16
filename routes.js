const rp = require('request-promise');

Promise = require('bluebird');

var Sequelize = require('sequelize');

var request = require('request');

var routes = function(app, User) {
  
  app.get("/", function (request, response) {
    console.log(`GET '/' 🤠 ${Date()}`);
    response.send("<h1>Oh, hello there Boulder!</h1>");
  });
  
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
  

};

module.exports = routes;


// app.get("/sql", function (request, response) {
//   console.log(`GET '/sql' 🤡 ${Date()}`);
//   response.sendFile(__dirname + '/views/index.html');
// });

// app.get("/users", function (request, response) {
//   var dbUsers=[];
//   User.findAll().then(function(users) { // find all entries in the users tables
//     users.forEach(function(user) {
//       dbUsers.push([user.firstName,user.lastName]); // adds their info to the dbUsers value
//     });
//     response.send(dbUsers); // sends dbUsers back to the page
//   });
// });

// // creates a new entry in the users table with the submitted values
// app.post("/users", function (request, response) {
//   User.create({ firstName: request.query.fName, lastName: request.query.lName});
//   response.sendStatus(200);
// });

// // drops the table users if it already exists, populates new users table it with just the default users.
// app.get("/reset", function (request, response) {
//   setup();
//   response.redirect("/");
// });

// // removes all entries from the users table
// app.get("/clear", function (request, response) {
//   User.destroy({where: {}});
//   response.redirect("/");
// });



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
  