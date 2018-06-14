const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	id: Number,
	name: String,
	bio: String,
});


var User = mongoose.model("User", userSchema)

module.exports = User;