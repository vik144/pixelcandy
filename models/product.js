const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	id: Number,
	name: String,
	price: String,
	link: String,
	img: String,
	description: String,
	author: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]
	
});

var Product = mongoose.model("Product", productSchema);


module.exports = Product;



//user register
//first user model
//multiple products

//share the same ID
//Link it with mongoose, nested methods in mongoose
//use pre-save


