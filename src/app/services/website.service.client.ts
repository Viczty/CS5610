import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Website} from '../models/website.model.client';


@Injectable()
export class WebsiteService {
  constructor(private _http: HttpClient) {
  }

  baseUrl = environment.baseUrl;

  createWebsite(userId, website) {
    return this._http.post<Website>(this.baseUrl + '/api/user/' + userId + '/website', website);
  }

  findWebsitesByUser(userId) {
    return this._http.get<[Website]>(this.baseUrl + '/api/user/' + userId + '/website');
  }

  findWebsiteById(websiteId) {
    return this._http.get<Website>(this.baseUrl + '/api/website/' + websiteId);
  }

  updateWebsite(websiteId, website) {
    return this._http.put<Website>(this.baseUrl + '/api/website/' + websiteId, website);
  }

  deleteWebsite(websiteId) {
    return this._http.delete<Website>(this.baseUrl + '/api/website/' + websiteId);
  }
}
