const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});


var Comment = mongoose.model("Comment", userSchema)

module.exports = Comment;