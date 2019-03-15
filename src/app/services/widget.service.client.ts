import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Widget} from '../models/widget.model.client';

@Injectable()
export class WidgetService {

  constructor(private _http: HttpClient) {
  }

  baseUrl = environment.baseUrl;

  createWidget(pageId, widget) {
    return this._http.post<Widget>(this.baseUrl + '/api/page/' + pageId + '/widget', widget);
  }

  findWidgetsByPageId(pageId) {
    return this._http.get<[Widget]>(this.baseUrl + '/api/page/' + pageId + '/widget');
  }

  findWidgetById(widgetId) {
    return this._http.get<Widget>(this.baseUrl + '/api/widget/' + widgetId);
  }

  updateWidget(widgetId, widget) {
    return this._http.put<Widget>(this.baseUrl + '/api/widget/' + widgetId, widget);

  }

  deleteWidget(widgetId) {
    return this._http.delete<Widget>(this.baseUrl + '/api/widget/' + widgetId);

  }

  reorderWidgets(startIndex, endIndex, pageId) {

    const url = this.baseUrl + '/api/page/' + pageId + '/widget?start=' + startIndex + '&end=' + endIndex;
    return this._http.put(url, '');
  }
}
