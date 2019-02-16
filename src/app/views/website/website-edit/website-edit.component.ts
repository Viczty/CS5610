import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';

export class Website {
  _id: String;
  name: String;
  developerId: String;
  description: String;

  constructor(_id, name, developerId, description) {
    this._id = _id;
    this.name = name;
    this.developerId = developerId;
    this.description = description;
  }

}

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  website: Website;

  constructor(private websiteService: WebsiteService, private router: ActivatedRoute) {
    this.website = new Website('123', 'Facebook', '456', 'Lorem');
  }

  updateWebsite() {
    console.log(this.website.name);
    console.log(this.website.developerId);
    console.log(this.website.description);
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.website._id = params['wid'];
      console.log('website id: ' + this.website._id);
      this.website = this.websiteService.findWebsiteById(params.wid);
    });
  }

}
