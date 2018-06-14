var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var app = express();
var db = require('./models/index.js')
var User = db.User;
var Product = db.Product;


app.set(path.resolve(__dirname,'views'),'views')
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



//TO DO:
//use promises for .get


//🦊🐼🐵
//When user logs in - they can see add products, when product is added, the user id should be
//attached to the author field of the product entry in mogo
//While showing the products the populate method should be used to get all the users associated 
//with the product
//


//👉 USE CLOUDINARY FOR IMAGES 👈

//ADD USERS
app.post('/addUser',(req,res)=> {
	var newName = req.body.userName;
	var newBio = req.body.bio;
	var newUser = new User({
		userName: newName,
		bio: newBio
	});
	newUser.save(function(){
		console.log('meow')
	});
	res.send('user added');
})


//ADD PRODUCTS
app.post('/addproduct',(req,res) => {
	var name = req.body.productname;
	var price = req.body.price;
	var link = req.body.productlink;
	var imageUrl = req.body.image;
	var description = req.body.description;

	var newProduct = new Product({
		name: name,
		price: price,
		link: link,
		img: imageUrl,
		description: description
	})
	newProduct.save(function(){
		console.log('meow')
	});
	res.send('Product added');
})


//READ ALL USERS
app.get('/users',function(req,res){
	User.find({}, function(err, data) {
           res.json(data);
        });
})

//READ ALL PRODUCTS
app.get('/',function(req,res){
	Product.find({}, function(err, data) {
           res.render('index', {products: data});
        });
})

//READ SINGLE USER
app.get('/users/:id', function(req,res){
	var userId = req.params.id;
	User.findById(userId, function(err,data){
	res.json(data);
	})
})

//UPDATE USER

app.put('/users/:id/edit',function(req,res){
	var userId = req.params.id;
	User.findOneAndUpdate({_id:userId}, req.body,function(err,data){
		if(err){
			res.send(err)
		}
		res.send(data)
	}
)
});

//DELETE USER

app.delete('/users/:id/delete',function(req,res){
	var userId = req.params.id;
	User.findOneAndRemove({_id:userId}, function(err,data){
		if(err){
			res.send(err)
		}
		res.send(data)
	}
)
});




//READ SINGLE PRODUCT
app.get('/products/:id',function(req,res){
	var productId = req.params.id;
	// Product.findById(productId, function(err,data){
	// 	res.send(data);
	// })
	Product.findById(productId).populate('author').exec(function(error, product) {
                res.json(product)
            })
})

//UPDATE PRODUCT

app.put('/products/:id/edit',function(req,res){
	var productId = req.params.id;
	Product.findOneAndUpdate({_id:productId}, req.body,function(err,data){
		if(err){
		res.send(err)
		}
		res.send(data)
	}
)
});

//DELETE PRODUCT

app.delete('/products/:id/delete',function(req,res){
	var productId = req.params.id;
	Product.findOneAndRemove({_id:productId}, function(err,data){
		if(err){
			res.send(err)
		}
		res.send(data)
	}
)
});







app.listen(3000, function(){
	console.log('🙋‍ 🙆‍ 💁‍♀️ Started a server at localhost:3000');
})


