module.exports = function (app) {

//website related api
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.post("/api/user/:userId/website", createWebsite);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websites = [
    { _id: "123", name: "Facebook", developerId: "456", description: "Lorem" },
    { _id: "234", name: "Tweeter",  developerId: "456", description: "Lorem" },
    { _id: "456", name: "Gizmodo",  developerId: "456", description: "Lorem" },
    { _id: "890", name: "Go",       developerId: "123", description: "Lorem" },
    { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
    { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
    { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }
  ]

  function findAllWebsitesForUser(req, res) {
    let id = req.params.userId;
    let result = [];
    for (var i in websites){
      if(websites[i].developerId === id){
        result.push(websites[i]);
      }
    } res.send(result);
  }

  function findWebsiteById(req, res) {
    let id = req.params.websiteId;

    for (var i in websites){
      if(websites[i]._id === id){
        res.send(websites[i]);
        return;
      }
    } res.send({});
  }

  function createWebsite(req, res) {
    console.log("create website");
    let userId = req.params.userId;
    let website = req.body;
    website._id = Math.round(Math.random() * 1000).toString();
    website.developerId = userId;
    websites.push(website);
    res.send(website);
  }

  function updateWebsite(req, res) {
    console.log("update website");
    let websiteId = req.params.websiteId;
    let index;
    for (let x = 0; x < websites.length; x++) {
      if (websites[x]._id === websiteId) {
        index = x;
      }
    }
    let website = req.body;
    websites[index] = website;
    res.send(website);
  }

  function deleteWebsite(req, res) {
    console.log("delete website");
    let websiteId = req.params.websiteId;
    let index;
    for (let x = 0; x < websites.length; x++) {
      if (websites[x]._id === websiteId) {
        index = x;
      }
    }
    let website = websites[index];
    websites.splice(index, 1);
    res.send(website);
  }
}
