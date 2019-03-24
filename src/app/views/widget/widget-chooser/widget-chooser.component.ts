import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  userId: String;
  websiteId: String;
  pageId: String;
  widget: { type: String };

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.widget = {type: 'HEADING'};
  }

  createHeader() {
    this.widget.type = 'HEADING';
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(widget =>
      this.router.navigateByUrl('/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + widget._id));
  }

  createHtml() {
    this.widget.type = 'HTML';
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(widget =>
      this.router.navigateByUrl('/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + widget._id));
  }

  createText() {
    this.widget.type = 'TEXT';
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(widget =>
      this.router.navigateByUrl('/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + widget._id));
  }

  createImage() {
    this.widget.type = 'IMAGE';
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(widget =>
      this.router.navigateByUrl('/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + widget._id));
  }

  createYoutube() {
    this.widget.type = 'YOUTUBE';
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(widget =>
      this.router.navigateByUrl('/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + widget._id));
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
    });

  }

}
