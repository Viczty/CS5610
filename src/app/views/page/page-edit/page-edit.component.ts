import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';


@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})

export class PageEditComponent implements OnInit {
  page: Page;
  userId: String;
  websiteId: String;

  constructor(private pageService: PageService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.page = new Page('321', 'Post 1', '456', 'Lorem');
  }

  updatePage() {
    this.pageService.updatePage(this.page._id, this.page).subscribe();
  }

  deletePage() {
    this.pageService.deletePage(this.page._id).subscribe(page => {
      this.router.navigateByUrl('/user/' + this.userId + '/website/' + this.websiteId + '/page');
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.page._id = params['pid'];
      this.websiteId = params['wid'];
      console.log('page id: ' + this.page._id);
    });
    this.pageService.findPageById(this.page._id)
      .subscribe(data => {
        console.log('in page-edit comp...');
        console.log(data);
        this.page = data;
      });
  }

}
