import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';


@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  website: Website;
  userId: String;
  websites: [{}];
  constructor(private websiteService: WebsiteService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.website = new Website('123', 'Facebook', '456', 'Lorem');
  }

  updateWebsite() {
    this.websiteService.updateWebsite(this.website._id, this.website).subscribe();
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.website._id).subscribe(website => {
      this.router.navigateByUrl('/user/' + this.userId + '/website');
    });
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.website._id = params['wid'];
      this.userId = params['uid'];
      console.log('website id: ' + this.website._id);
    });
    this.websiteService.findWebsiteById(this.website._id)
      .subscribe(data => {
        console.log('in website-edit comp...');
        console.log(data);
        this.website = data;
      });
    this.websiteService.findWebsitesByUser(this.userId)
      .subscribe(data => {
        console.log(data);
        this.websites = data;
      });
  }

}
