import {Injectable} from '@angular/core';

@Injectable()
export class PageService {
  constructor() {
  }

  pages = [

    {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},

    {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},

    {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}

  ];

  createPage(websiteId, page) {
    page._id = Math.random();
    page.websiteId = websiteId;
    this.pages.push(page);
    return page;
  }

  findPagesByWebsiteId(websiteId) {
    let res;
    res = [];
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x].websiteId === websiteId) {
        res.push(this.pages[x]);
      }
    }
    return res;
  }

  findPageById(pageId) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        return this.pages[x];
      }
    }
  }

  updatePage(pageId, page) {
    let index;
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        index = x;
      }
    }
    this.pages[index] = page;
  }

  deletePage(pageId) {
    let index;
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        index = x;
      }
    }
    this.pages.splice(index, 1);
  }
}
