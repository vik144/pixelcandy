const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/cooltek");

mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Product = require('./product');