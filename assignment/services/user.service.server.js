var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function (app) {
  passport.serializeUser(serializeUser);

  function serializeUser(user, done) {
    done(null, user);
  }

  passport.deserializeUser(deserializeUser);

  function deserializeUser(user, done) {
    userModel.findUserById(user._id).then(function (user) {
      done(null, user);
    }, function (err) {
      done(err, null);
    });
  }

  passport.use(new LocalStrategy(localStrategy));


  function localStrategy(username, password, done) {
    userModel.findUserByUserName(username, password).then(function (user) {
      if (user && bcrypt.compareSync(password, user.password)) {

        return done(null, user);
      } else {
        return done(null, false);
      }
    }, function (err) {
      if (err) {
        return done(err);
      }
    });
  }

  var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
    // clientID: '822114281477385',
    // clientSecret: '81ee4e2c03af9260923eda61c3025f01',
    // callbackURL: '/auth/facebook/callback'
  };

  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel.findUserByFacebookId(profile.id).then(function (user) {
      if (user) {
        return done(null, user);
      } else {
        var names = profile.displayName.split(" ");
        var newFacebookUser = {
          lastName: names[1],
          firstName: names[0],
          email: profile.emails ? profile.emails[0].value : "",
          facebook: {id: profile.id, token: token, displayName: profile.displayName}
        };
        return userModel.createUser(newFacebookUser);
      }
    }, function (err) {
      if (err) {
        return done(err);
      }
    })
    //   .then(function (user) {
    //   return done(null, user);
    // }, function (err) {
    //   if (err) {
    //     return done(err);
    //   }
    // });
  }

  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUserByCredential);
  app.post("/api/login", passport.authenticate('local'), login);
  app.get('/facebook/login', passport.authenticate('facebook', {scope: 'email'}));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/#/login'}),
    function (req, res) {
      // Successful authentication, redirect home.
      const uid = req.user._id;
      res.redirect('/#/user/' + uid);
    });
  app.post('/api/logout', logout);
  app.post('/api/register', register);
  app.get('/api/loggedin', loggedin);
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

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }


  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user).then(function (user) {
      if (user) {
        req.login(user, function (err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(user);
          }
        });
      }
    });
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }


}
