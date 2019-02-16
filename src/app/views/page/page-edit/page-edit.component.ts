import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../services/page.service.client';


export class Page {
  _id: String;
  name: String;
  websiteId: String;
  description: String;

  constructor(_id, name, websiteId, description) {
    this._id = _id;
    this.name = name;
    this.websiteId = websiteId;
    this.description = description;
  }

}

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  page: Page;

  constructor(private pageService: PageService, private router: ActivatedRoute) {
    this.page = new Page('321', 'Post 1', '456', 'Lorem');
  }

  updatePage() {
    console.log(this.page.name);
    console.log(this.page.websiteId);
    console.log(this.page.description);
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.page._id = params['pid'];
      console.log('page id: ' + this.page._id);
      this.page = this.pageService.findPageById(params.pid);
    });
  }

}
