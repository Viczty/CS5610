var pageModel = require('../model/page/page.model.server');

module.exports = function (app) {

  var pages = [

    {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},

    {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},

    {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}

  ];

  app.get("/api/page/:pageId", findPageById);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.post("/api/website/:websiteId/page", createPage);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  function findPageById(req, res) {

    console.log("hit find page by id...");

    var id = req.params.pageId;
    pageModel.findPageById(id).exec(
      function (err, page) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(page);
      }
    );
  }

  function findAllPagesForWebsite(req, res) {
    let id = req.params.websiteId;
    pageModel.findAllPagesForWebsite(id).exec(
      function (err, pages) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(pages);
      }
    );
  }


  function createPage(req, res) {
    console.log("create page");
    let websiteId = req.params.websiteId;
    let page = req.body;
    pageModel
      .createPage(websiteId, page)
      .then(
        function (page) {
          console.log("page created!");
          res.json(page);
        },
        function (error) {
          if (error) {
            console.log(error);
            res.statusCode(400).send(error);
          }
        }
      )
  }

  function updatePage(req, res) {
    console.log("update page");
    let pageId = req.params.pageId;
    let page = req.body;
    pageModel.updatePage(pageId, page).exec(
      function (err, page) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(page);
      }
    );
  }

  function deletePage(req, res) {
    console.log("delete page");
    let pageId = req.params.pageId;
    pageModel.updatePage(pageId).exec(
      function (err, page) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(page);
      }
    );
  }


}
