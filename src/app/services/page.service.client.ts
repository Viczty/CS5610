import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Page} from '../models/page.model.client';


@Injectable()
export class PageService {

  constructor(private _http: HttpClient) {
  }

  baseUrl = environment.baseUrl;

  createPage(websiteId, page) {
    return this._http.post<Page>(this.baseUrl + '/api/website/' + websiteId + '/page', page);
  }

  findPagesByWebsiteId(websiteId) {
    return this._http.get<[Page]>(this.baseUrl + '/api/website/' + websiteId + '/page');
  }

  findPageById(pageId) {
    return this._http.get<Page>(this.baseUrl + '/api/page/' + pageId);
  }

  updatePage(pageId, page) {
    return this._http.put<Page>(this.baseUrl + '/api/page/' + pageId, page);

  }

  deletePage(pageId) {
    return this._http.delete<Page>(this.baseUrl + '/api/page/' + pageId);

  }
}
