import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

  widget;
  userId: String;
  websiteId: String;
  pageId: String;

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.widget = new Widget('123', 'HEADING', '321');
  }

  updateWidget() {
    this.widgetService.updateWidget(this.widget._id, this.widget).subscribe();
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id).subscribe(widget => {
      this.router.navigateByUrl('/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget');
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.pageId = params['pid'];
      this.websiteId = params['wid'];
      this.widget._id = params['wgid'];
    });
    this.widgetService.findWidgetById(this.widget._id)
      .subscribe(data => {
        console.log('in widget-text-edit comp...');
        console.log(data);
        this.widget = data;
      });
  }

}
