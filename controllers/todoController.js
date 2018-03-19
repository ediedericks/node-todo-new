var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// COnnect to database
mongoose.connect('mongodb://test:test@ds115749.mlab.com:15749/todo');

// Create schema - this is a blueprint
var todoSchema = new mongoose.Schema({
		item: String
});
// schema
var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'coding'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

	app.get('/todo', function(req, res){
		// get data from mongodb
		Todo.find({}, function(err, data){
			if(err) throw err;
			res.render('todo', {todos: data});
		});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		// Get data from view and add to mongodb
		var newTodo = Todo(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});

	app.delete('/todo/:item', function(req, res){
		// delete requested item
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});

};
