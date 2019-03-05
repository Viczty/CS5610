import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget.model.client';


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
    });
    this.widgetService.findWidgetById(this.widget._id)
      .subscribe(data => {
        console.log('in widget-edit comp...');
        console.log(data);
        this.widget = data;
      });
  }

}
