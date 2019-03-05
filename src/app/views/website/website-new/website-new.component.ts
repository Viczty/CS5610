import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  userId: String;
  websites: [{}];

  @ViewChild('f') loginForm: NgForm;

  constructor(private websiteService: WebsiteService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  createWebsite() {
    const name = this.loginForm.value.name;
    const description = this.loginForm.value.description;
    const website = {name: name, description: description};
    this.websiteService.createWebsite(this.userId, website).subscribe(web => {
      this.router.navigateByUrl('/user/' + this.userId + '/website');
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];

    });
    this.websiteService.findWebsitesByUser(this.userId)
      .subscribe(data => {
        console.log('in website-new comp...');
        console.log(data);
        this.websites = data;
      });
  }

}
