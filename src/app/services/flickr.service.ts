import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable() // needed as we're injecting Http service into this service
export class FlickrService {

  key = '007d3ca946cbdd2230f55d22a5c0b3e2';
  secret = '9eb168009b8b9e79';
  urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

  constructor(private _http: HttpClient) {
  }

  searchPhotos(searchTerm: any) {
    const url = this.urlBase
      .replace('API_KEY', this.key)
      .replace('TEXT', searchTerm);
    return this._http.get(url, {responseType: 'text'});
  }
}
