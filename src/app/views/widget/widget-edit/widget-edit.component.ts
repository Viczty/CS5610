import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';

export class Widget {
  _id: String;
  widgetType: String;
  pageId: String;

  constructor(_id, widgetType, pageId) {
    this._id = _id;
    this.widgetType = widgetType;
    this.pageId = pageId;
  }

}

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
  widget: Widget;

  constructor(private widgetService: WidgetService, private router: ActivatedRoute) {
    this.widget = new Widget('123', 'HEADING', '321');
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.widget._id = params['wgid'];
      console.log('widget id: ' + this.widget._id);
      this.widget = this.widgetService.findWidgetById(params.wgid);
    });
  }

}
