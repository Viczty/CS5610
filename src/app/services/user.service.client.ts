import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  constructor() {}
  users = [

    {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder', email: 'alice@alice'},

    {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley', email: 'bob@bob'},

    {_id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia', email: 'charly@charly'},

    {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi', email: 'jannunzi@jannunzi'}

  ];

  createUser(user: any) {
    user._id = Math.random();
    this.users.push(user);

    return user;
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
