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

//website related api
  app.get("/api/widget/:widgetId", findWidgetById);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.post("/api/page/:pageId/widget", createWidget);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);


  function findWidgetById(req, res) {

    console.log("hit find widget by id...");

    let id = req.params.widgetId;

    for (var i in widgets) {
      if (widgets[i]._id === id) {
        res.send(widgets[i]);
        return;
      }
    }
    res.send({});
  }

  function findAllWidgetsForPage(req, res) {
    let id = req.params.pageId;
    let result = [];
    for (var i in widgets) {
      if (widgets[i].pageId === id) {
        result.push(widgets[i]);
      }
    }
    res.send(result);
  }


  function createWidget(req, res) {
    console.log("create widget");
    let pageId = req.params.pageId;
    let widget = req.body.widget;
    widget._id = Math.round(Math.random() * 1000).toString();
    widget.pageId = pageId;
    widgets.push(widget);
    res.send(widget);
  }

  function updateWidget(req, res) {
    console.log("update widget");
    let widgetId = req.params.widgetId;
    let index;
    for (let x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === widgetId) {
        index = x;
      }
    }
    let widget = req.body.widget;
    widgets[index] = widget;
    res.send(widget);
  }

  function deleteWidget(req, res) {
    console.log("delete widget");
    let widgetId = req.params.widgetId;
    let index;
    for (let x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === widgetId) {
        index = x;
      }
    }
    let widget = widgets[index];
    widgets.splice(index, 1);
    res.send(widget);
  }
}
