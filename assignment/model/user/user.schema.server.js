var mongoose = require('mongoose');
var websiteSchema = require('../website/website.schema.server');

var userSchema = new mongoose.Schema({
  facebook: { id: String, token: String, displayName: String },
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  websites: [websiteSchema],
  dateCreate:{type: Date, default: Date.now()}
},{collection:'Users'});

module.exports = userSchema;
