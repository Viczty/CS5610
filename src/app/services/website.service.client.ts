import {Injectable} from '@angular/core';

@Injectable()
export class WebsiteService {
  constructor() {
  }

  websites = [

    {'_id': '123', 'name': 'Facebook', 'developerId': '456', 'description': 'Lorem'},

    {'_id': '234', 'name': 'Tweeter', 'developerId': '456', 'description': 'Lorem'},

    {'_id': '456', 'name': 'Gizmodo', 'developerId': '456', 'description': 'Lorem'},

    {'_id': '890', 'name': 'Go', 'developerId': '123', 'description': 'Lorem'},

    {'_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123', 'description': 'Lorem'},

    {'_id': '678', 'name': 'Checkers', 'developerId': '123', 'description': 'Lorem'},

    {'_id': '789', 'name': 'Chess', 'developerId': '234', 'description': 'Lorem'}

  ];

  createWebsite(userId, website) {
    website._id = Math.random();
    website.developId = userId;
    this.websites.push(website);

    return website;
  }

  findWebsitesByUser(userId) {
    let res;
    res = [];
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x].developerId === userId) {
        res.push(this.websites[x]);
      }
    }
    return res;
  }

  findWebsiteById(websiteId) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        return this.websites[x];
      }
    }
  }

  updateWebsite(websiteId, website) {
    let index;
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        index = x;
      }
    }
    this.websites[index] = website;
  }

  deleteWebsite(websiteId) {
    let index;
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        index = x;
      }
    }
    this.websites.splice(index, 1);
  }
}
