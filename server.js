var express = require('express'),
	bodyParser = require('body-parser');
	
var app = express();

app.use(bodyParser());

var todos = [
	{id: 1, title: 'Learn Ember.js', isCompleted: true},
 	{id: 2, title: '...', isCompleted: false},
 	{id: 3, title: 'Profit!', isCompleted: false}
];

app.get('/', function(req, res){
	//res.redirect('/employees');
	res.type('text/plain');
	//res.type('application/json');
	//res.type('application/xml');
	res.send(400, 'Nothing here')

});

app.post('/todos', addTodo);
app.get('/todos', findAll);
app.put('/tosos', function(){res.send(501)});//updateAll - 501 Not Implemented
app.delete('/todos', function(){res.send(501)});//deleteAll - 501 Not Implemented
app.post('/todos/:id', function(){res.send(405)});//405 Method Not Allowed
app.get('/todos/:id', findById);
app.put('/todos/:id', updateTodo);
app.delete('/todos/:id', deleteTodo);


app.listen(3000);
console.log('Listening on port 3000');


function addTodo(req, res){
	console.log("req: " + req.body);
	console.log("body: " + req);
	var conttyp = req.header('Content-Type');
	console.log('content-type' + conttyp);
	if(conttyp == 'application/json'){
		var todo = JSON.parse(req.body);
		console.log('Adding employee: ' + JSON.stringify(employee));
		todos.push(todo);
		res.send(201, 'todo added');
	}else{
		res.send(501);
	}
}

function findAll(req, res){
	console.log('Retrieving all todos');
	var accept = req.header('Accept');
	if(accept == 'json'){
		console.log('returning json');
		res.json(todos);
	}else{
		res.send(406);//Not Acceptable. Only capable of generating content not acceptable according to the Accept headers
	}
}

function findById(req, res){
	var id = req.params.id;
	var accept = req.header('Accept');
    console.log('Retrieving todo: ' + id);
    var elemPos = indexOfTodo(id);
    if(elemPos >= 0){
    	if(accept == 'json'){
    		res.json(todos[elemPos]);
    	}else{
			res.send(406);//Not Acceptable. Only capable of generating content not acceptable according to the Accept headers
		}
    }else{
    	res.send(404, 'Todo not found'); //Or should be 204
    }
}

function updateTodo(req, res){
	var id = req.params.id;
	var todo = null;
	var conttyp = req.header('Content-Type');
	console.log('Updting todo: ' + id);
	var elemPos = indexOfTodo(id);
	console.log('Request: ' + req.body);
	console.log("json.stringify" + JSON.stringify(req.body));
	if(conttyp == 'application/json'){
		todo = req.body;
	}else{
		res.send(501);
	}
	if(elemPos >= 0){
		console.log('Updating todo' + todo);
    	todos.splice(elemPos,1);
    	todos.push(todo);
    	res.send(201, 'todo updated');
    }else{
    	res.send(404, 'Todo not found'); //Or should be 204
    }

}

function deleteTodo(req, res){
	var id = req.params.id;
    console.log('Deleting todo: ' + id);
    var elemPos = indexOfTodo(id);
	if(elemPos >= 0){
    	todos.splice(elemPos,1);
    	res.send(204, 'Succesully deleted');
    }else{
    	res.send(404, 'Todo not found'); //Or should be 204
    }
}

function indexOfTodo(id){
	for(var i = 0; i < todos.length; i++){
    	if(todos[i].id == id){
    		return i;
    	}
    }
    return -1;
}

