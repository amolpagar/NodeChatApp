
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , path = require('path');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

io.on('connection', function(socket){
	  console.log('a user connected');
	  socket.on('chat message', function(msg){
		  console.log('message: ' + msg);
		  io.emit('chat message', msg);
	  });
	});

http.listen(3000, function(){
  console.log('listening on *:3000');
});




