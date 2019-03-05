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

    for (var i in pages) {
      if (pages[i]._id === id) {
        res.send(pages[i]);
        return;
      }
    }
    res.send({});
  }

  function findAllPagesForWebsite(req, res) {
    let id = req.params.websiteId;
    let result = [];
    for (var i in pages) {
      if (pages[i].websiteId === id) {
        result.push(pages[i]);
      }
    }
    res.send(result);
  }


  function createPage(req, res) {
    console.log("create page");
    let websiteId = req.params.websiteId;
    let page = req.body;
    page._id = Math.round(Math.random() * 1000).toString();
    page.websiteId = websiteId;
    pages.push(page);
    res.send(page);
  }

  function updatePage(req, res) {
    console.log("update page");
    let pageId = req.params.pageId;
    let index;
    for (let x = 0; x < pages.length; x++) {
      if (pages[x]._id === pageId) {
        index = x;
      }
    }
    let page = req.body;
    pages[index] = page;
    res.send(page);
  }

  function deletePage(req, res) {
    console.log("delete page");
    let pageId = req.params.pageId;
    let index;
    for (let x = 0; x < pages.length; x++) {
      if (pages[x]._id === pageId) {
        index = x;
      }
    }
    let page = pages[index];
    pages.splice(index, 1);
    res.send(page);
  }


}
