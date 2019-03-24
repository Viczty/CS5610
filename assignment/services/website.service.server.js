var websiteModel = require('../model/website/website.model.server');

module.exports = function (app) {

//website related api
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.post("/api/user/:userId/website", createWebsite);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  //delete me when push to heroku
  app.get("/api/populateWebsites", populateWebsites);

  var websites_pop = [
    {name: "Facebook", developerId: "456", description: "Lorem"},
    {name: "Tweeter", developerId: "456", description: "Lorem"},
    {name: "Gizmodo", developerId: "456", description: "Lorem"},
    {name: "Go", developerId: "123", description: "Lorem"},
    {name: "Tic Tac Toe", developerId: "123", description: "Lorem"},
    {name: "Checkers", developerId: "123", description: "Lorem"},
    {name: "Chess", developerId: "234", description: "Lorem"}
  ]

  function populateWebsites(req, res) {
    console.log("pop DB!");
    //res.send("pop DB!");
    websiteModel.populateWebsites(websites_pop)
      .then(
        function (websites) {
          console.log("websites populated!");
          res.json(websites);
        },
        function (error) {
          if (error) {
            console.log(error);
            res.statusCode(400).send(error);
          }
        }
      );
  }

  function findAllWebsitesForUser(req, res) {
    let id = req.params.userId;
    websiteModel.findAllWebsitesForUser(id).exec(
      function (err, websites) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(websites);
      }
    );
  }

  function findWebsiteById(req, res) {
    let id = req.params.websiteId;

    websiteModel.findWebsiteById(id).exec(
      function (err, website) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(website);
      }
    );
  }

  function createWebsite(req, res) {
    console.log("create website");
    let userId = req.params.userId;
    let website = req.body;
    websiteModel
      .createWebsite(userId, website)
      .then(
        function (website) {
          console.log("website created!");
          res.json(website);
        },
        function (error) {
          if (error) {
            console.log(error);
            res.statusCode(400).send(error);
          }
        }
      )
  }

  function updateWebsite(req, res) {
    console.log("update website");
    let websiteId = req.params.websiteId;
    let website = req.body;
    websiteModel.updateWebsite(websiteId, website).exec(
      function (err, website) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(website);
      }
    );
  }

  function deleteWebsite(req, res) {
    console.log("delete website");
    let websiteId = req.params.websiteId;
    websiteModel.deleteWebsite(websiteId).exec(
      function (err, website) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(website);
      }
    );
  }
}
