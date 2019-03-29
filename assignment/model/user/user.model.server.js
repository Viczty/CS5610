var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model("User",userSchema);


userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUserName = findUserByUserName;
userModel.findUserByCredential = findUserByCredential;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;

//helper function
userModel.populateUsers = populateUsers;


function findUserByFacebookId(facebookId) {
  return userModel.findOne({'facebook.id': facebookId});
}

function populateUsers(users) {
  return userModel.insertMany(users);
}

function createUser(user) {
  console.log("model"+user);
  return userModel.create(user);
}

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByUserName(username) {
  return userModel.findOne({username:username});
}

function findUserByCredential(username,password){
  return userModel.findOne({username:username,password:password});
}

function updateUser(userId,user) {
  return userModel.findByIdAndUpdate(userId,user);
}

function deleteUser(userId){
  return userModel.findByIdAndRemove(userId);
}
