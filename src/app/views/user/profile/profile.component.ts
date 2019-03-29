import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private activatedRouter: ActivatedRoute, private router: Router) {
    this.user = new User('111', 'alice', 'alice', 'alice', 'alice', 'alice@alice');
  }

  UpdateUser() {
    this.userService.updateUser(this.user).subscribe();
  }

  ngOnInit() {

    this.activatedRouter.params.subscribe(params => {
      this.user._id = params['uid'];
      console.log('user id: ' + this.user._id);
    });

    this.userService.findUserById(this.user._id.toString())
      .subscribe(data => {
        console.log('in login comp...');
        console.log(data);
        this.user = data;
      });
  }

  logout() {
    this.userService.logout().subscribe((data: any) => this.router.navigate(['/login']));
  }
}
