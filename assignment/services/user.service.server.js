var userModel = require('../model/user/user.model.server');

module.exports = function (app) {


  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUserByCredential);
  app.get("/api/user", findUserByUsername);
  app.post("/api/user", createUser);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  //delete me when push to heroku
  app.get("/api/populate", populateUsers);

  var users_pop = [
    {username: "alice", password: "alice", firstName: "Alice", lastName: "Wonderland"},
    {username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
  ];

  function populateUsers(req, res) {
    console.log("pop DB!");
    //res.send("pop DB!");
    userModel.populateUsers(users_pop)
      .then(
        function (users) {
          console.log("users populated!");
          res.json(users);
        },
        function (error) {
          if (error) {
            console.log(error);
            res.statusCode(400).send(error);
          }
        }
      );
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];
    userModel.findUserById(userId).exec(
      function (err, user) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(user);
      }
    );
  }

  function findAllUsers(req, res) {

    userModel.find().exec(
      function (err, users) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(users);
      }
    );
  }


  function findUserByCredential(req, res) {
    let username = req.query['username'];
    let password = req.query['password'];
    userModel.findUserByCredential(username, password).exec(
      function (err, user) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(user);
      }
    );
  }

  function findUserByUsername(req, res) {
    console.log("hit find user by username...");
    let username = req.query['username'];
    userModel.findUserByUserName(username).exec(
      function (err, user) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(user);
      }
    );
  }

  function updateUser(req, res) {
    console.log("update user");
    let userId = req.params.userId;
    let user = req.body;
    userModel.updateUser(userId, user).exec(
      function (err, user) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(user);
      }
    );
  }

  function deleteUser(req, res) {
    console.log("delete user");
    let userId = req.params.userId;

    userModel.deleteUser(userId).exec(
      function (err, user) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(user);
      }
    );
  }

  function createUser(req, res) {
    var user = req.body;
    userModel
      .createUser(user)
      .then(
        function (user) {
          console.log("user created!");
          res.json(user);
        },
        function (error) {
          if (error) {
            console.log(error);
            res.statusCode(400).send(error);
          }
        }
      )
  }
}
