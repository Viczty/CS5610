import {Injectable} from '@angular/core';
import {User} from '../models/user.model.client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SharedService} from './shared.service';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
  constructor(private _http: HttpClient, private sharedService: SharedService, private router: Router) {
  }

  baseUrl = environment.baseUrl;

  createUser(user: any) {
    return this._http.post<User>(this.baseUrl + '/api/user/', user);
  }

  findUserByCredential(username: String, password: String) {
    return this._http.get<User>(this.baseUrl + '/api/user/?username=' + username + '&password=' + password);
  }

  findUserById(userId: string) {
    return this._http.get<User>(this.baseUrl + '/api/user/' + userId);
  }

  findUserByUsername(username: string) {
    return this._http.get<User>(this.baseUrl + '/api/user/?username=' + username);
  }


  updateUser(user) {
    console.log(user);
    return this._http.put<User>(this.baseUrl + '/api/user/' + user._id, user);
  }

  deleteUser(userId) {
    return this._http.delete<User>(this.baseUrl + '/api/user/' + userId);
  }

  login(username: String, password: String) {
    const body = {username: username, password: password};
    return this._http.post(this.baseUrl + '/api/login', body, {withCredentials: true});
  }

  logout() {
    return this._http.post(this.baseUrl + '/api/logout', '', {withCredentials: true});
  }

  register(username: String, password: String) {
    const user = {username: username, password: password};
    return this._http.post(this.baseUrl + '/api/register', user, {withCredentials: true});
  }

  loggedIn() {
    return this._http.get(this.baseUrl + '/api/loggedin', {withCredentials: true});
      // .subscribe((res: any) => {
      //   const user = res;
      //   if (user !== '0') {
      //     this.sharedService.user = user;
      //     return true;
      //   } else {
      //     this.router.navigate(['/login']);
      //     return false;
      //   }
      // });
  }
}
