import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../services/page.service.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  userId: String;
  websiteId: String;

  @ViewChild('f') loginForm: NgForm;

  constructor(private pageService: PageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  createPage() {
    const pageName = this.loginForm.value.pageName;
    const pageTitle = this.loginForm.value.pageTitle;
    const page = {name: pageName, description: pageTitle};
    this.pageService.createPage(this.websiteId, page).subscribe(pag => {
      console.log(pag);
      this.router.navigateByUrl('/user/' + this.userId + '/website/' + this.websiteId + '/page');
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
    });
  }

}
