var widgetModel = require('../model/widget/widget.model.server');

module.exports = function (app) {


  var widgets = [

    {'_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': 2, 'text': 'GIZMODO'},

    {'_id': '234', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},

    {
      '_id': '345', 'widgetType': 'IMAGE', 'pageId': '321', 'width': '100%',

      'url': 'http://lorempixel.com/400/200/'
    },

    {'_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},

    {'_id': '567', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},

    {
      '_id': '678', 'widgetType': 'YOUTUBE', 'pageId': '321', 'width': '100%',

      'url': 'https://www.youtube.com/embed/AM2Ivdi9c4E'
    },

    {'_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}

  ];

  var multer = require('multer'); // npm install multer --save
  var upload = multer({dest: __dirname + '/../../dist/my-project/assets/uploads'});

//website related api
  app.get("/api/widget/:widgetId", findWidgetById);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.post("/api/page/:pageId/widget", createWidget);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  app.put("/api/page/:pageId/widget", reorderWidgets);

  //UPLOAD
  app.post("/api/upload", upload.single('myFile'), uploadImage);

  function findWidgetById(req, res) {

    console.log("hit find widget by id...");

    let id = req.params.widgetId;
    widgetModel.findWidgetById(id).exec(
      function (err, widget) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(widget);
      }
    );
  }

  function findAllWidgetsForPage(req, res) {
    let id = req.params.pageId;
    widgetModel.findAllWidgetsForPage(id).exec(
      function (err, widget) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(widget);
      }
    );
  }


  function createWidget(req, res) {
    console.log("create widget");
    let pageId = req.params.pageId;
    let widget = req.body;
    widgetModel
      .createWidget(pageId, widget)
      .then(
        function (widget) {
          console.log("widget created!");
          res.json(widget);
        },
        function (error) {
          if (error) {
            console.log(error);
            res.statusCode(400).send(error);
          }
        }
      )
  }

  function updateWidget(req, res) {
    console.log("update widget");
    let widgetId = req.params.widgetId;
    let widget = req.body;
    widgetModel.updateWidget(widgetId, widget).exec(
      function (err, widget) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(widget);
      }
    );
  }

  function deleteWidget(req, res) {
    console.log("delete widget");
    let widgetId = req.params.widgetId;
    widgetModel.deleteWidget(widgetId).exec(
      function (err, widget) {
        if (err) {
          return res.sendStatus(400).send(err);
        }
        return res.json(widget);
      }
    );
  }


  function uploadImage(req, res) {
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;


    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    if (myFile == null) {
      //res.redirect("https://cs5610-ass1.herokuapp.com/user/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
      //res.redirect("http://localhost:3200/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
      return;
    }


    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;


    var widget = {url: "assets/uploads/" + filename};

    var widget;
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === widgetId) {
        widget = widgets[i];
      }
    }
    widget.url = 'uploads/' + filename;


    // res.redirect("https://cs5610-ass1.herokuapp.com/user/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    // res.redirect("http://localhost:3200/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
  }


  function array_swap(arr, startIndex, endIndex) {
    arr.splice(endIndex, 0, arr.splice(startIndex, 1));
  };

  function reorderWidgets(req, res) {

    var startIndex = parseInt(req.query["start"]);
    var endIndex = parseInt(req.query["end"]);

    array_swap(widgets, startIndex, endIndex);
    res.sendStatus(200);

  }

}
