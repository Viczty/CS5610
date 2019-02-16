import {Injectable} from '@angular/core';

@Injectable()
export class WidgetService {
  widgets = [

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

      'url': 'https://youtu.be/AM2Ivdi9c4E'
    },

    {'_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}

  ];

  createWidget(pageId, widget) {
    widget._id = Math.random();
    widget.pageId = pageId;
    this.widgets.push(widget);
    return widget;
  }

  findWidgetsByPageId(pageId) {
    let res;
    res = [];
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x].pageId === pageId) {
        res.push(this.widgets[x]);
      }
    }
    return res;
  }

  findWidgetById(widgetId) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        return this.widgets[x];
      }
    }
  }

  updateWidget(widgetId, widget) {
    let index;
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        index = x;
      }
    }
    this.widgets[index] = widget;
  }

  deleteWidget(widgetId) {
    let index;
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        index = x;
      }
    }
    this.widgets.splice(index, 1);
  }
}
