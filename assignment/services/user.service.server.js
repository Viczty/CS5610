module.exports = function (app) {

  var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonderland"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
  ];

  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUserByCredential);
  app.get("/api/user", findUserByUsername);
  app.post("/api/user", createUser);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  function createUser(req, res) {
    console.log("create user");
    let user = req.body;
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === user["username"]) {
        res.status(404).send("This username is already exist.");
        return;
      }
    }
    user._id = Math.round(Math.random() * 1000).toString();
    users.push(user);
    res.send(user);
  }

  function findUserById(req, res) {

    console.log("hit find user by id...");

    var id = req.params.userId;

    for (let i in users) {
      if (users[i]._id === id) {
        res.send(users[i]);
        return;
      }
    }
    res.send({});
  }

  function findUserByCredential(req, res) {
    let username = req.query['username'];
    let password = req.query['password'];
    for (let i in users) {
      if (users[i].username === username && users[i].password === password) {
        res.send(users[i]);
        return;
      }
    }
    res.send({});
  }

  function findUserByUsername(req, res) {
    console.log("hit find user by username...");
    let username = req.query['username'];
    for (let i in users) {
      if (users[i].username === username) {
        res.send(users[i]);
        return;
      }
    }
    res.send({});
  }

  function updateUser(req, res) {
    console.log("update user");
    let userId = req.params.userId;
    let index;
    for (let x = 0; x < users.length; x++) {
      if (users[x]._id === userId) {
        index = x;
      }
    }
    let user = req.body;
    users[index] = user;
    res.send(user);
  }

  function deleteUser(req, res) {
    console.log("delete user");
    let userId = req.params.userId;
    let index;
    for (let x = 0; x < users.length; x++) {
      if (users[x]._id === userId) {
        index = x;
      }
    }
    let user = users[index];
    users.splice(index, 1);
    res.send(user);
  }
//demo hello world api calls
//   app.get("/api/hello", function (req, res) {
//     console.log("Get hello api call!");
//     res.send("Hello world!");
//   });
//
//
//   app.get("/api/hello-world", hello);
//
//   function hello(req, res) {
//     res.status(200).send("Hitting hello world js file....");
//   }
}
