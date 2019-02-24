import {Injectable} from '@angular/core';
import {User} from '../models/user.model.client';

@Injectable()
export class UserService {
  constructor() {
  }

  users = [

    new User( '123',  'alice',  'alice', 'Alice', 'Wonder', 'alice@alice'),

    new User( '234', 'bob', 'bob', 'Bob', 'Marley', 'bob@bob'),

    new User('345', 'charly', 'charly', 'Charly', 'Garcia', 'charly@charly'),

    new User('456', 'jannunzi', 'jannunzi', 'Jose', 'Annunzi', 'jannunzi@jannunzi')

  ];

  createUser(user: any) {
    user._id = Math.random();
    this.users.push(user);

    return user;
  }

  findUserByCredential(username: String, password: String) {
    return this.users.find(function (user) {
      return user.username === username && user.password === password;
    });
  }

  findUserById(userId: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        return this.users[x];
      }
    }
  }

  findUserByUsername(username: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].username === username) {
        return this.users[x];
      }
    }
  }


  updateUser(userId, user) {
    let index;
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        index = x;
      }
    }
    this.users[index] = user;
  }

  deleteUser(userId) {
    let index;
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        index = x;
      }
    }
    this.users.splice(index, 1);
  }

}
