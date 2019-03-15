import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// import { QuillModule } from 'ngx-quill';
import { SafePipe } from './views/widget/widget-list/safe-pipe.pipe';
import { OrderByPipe } from './views/widget/widget-list/order-by-pipe.pipe';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './views/user/login/login.component';
import {PageListComponent} from './views/page/page-list/page-list.component';
import {RegisterComponent} from './views/user/register/register.component';
import {ProfileComponent} from './views/user/profile/profile.component';
import {WebsiteNewComponent} from './views/website/website-new/website-new.component';
import {WebsiteEditComponent} from './views/website/website-edit/website-edit.component';
import {WebsiteListComponent} from './views/website/website-list/website-list.component';
import {WidgetChooserComponent} from './views/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './views/widget/widget-edit/widget-edit.component';
import {WidgetListComponent} from './views/widget/widget-list/widget-list.component';
import {WidgetHeaderComponent} from './views/widget/widget-edit/widget-header/widget-header.component';
import {WidgetImageComponent} from './views/widget/widget-edit/widget-image/widget-image.component';
import {WidgetYoutubeComponent} from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import {PageEditComponent} from './views/page/page-edit/page-edit.component';
import {PageNewComponent} from './views/page/page-new/page-new.component';
import {UserService} from './services/user.service.client';
import {WebsiteService} from './services/website.service.client';
import {PageService} from './services/page.service.client';
import {WidgetService} from './services/widget.service.client';
import {SharedService} from './services/shared.service';
import { FlickrImageSearchComponent } from './views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import {FlickrService} from './services/flickr.service';
import {SortableDirective} from '../../assignment/directives/sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageListComponent,
    RegisterComponent,
    ProfileComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    WebsiteListComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    PageEditComponent,
    PageNewComponent,
    SortableDirective,
    FlickrImageSearchComponent,
    SafePipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // QuillModule
  ],
  providers: [UserService, WebsiteService, PageService, WidgetService, SharedService, FlickrService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
