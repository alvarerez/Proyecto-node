
var express=require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port=process.env.PORT || 3000;
var formidable = require('formidable');
var nick=false,usuarios=[];//Almacenamos todos los nombres de usuarios

var notas=[];

app.use(express.static('public'))
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});




io.on('connection', function(socket){
  console.log('a user connected');
//    socket.broadcast.emit('notasNuevas',notas);
    socket.broadcast.emit('usuario','ha entrado un usuario nuevo');

  socket.on('disconnect', function(){
    console.log('user disconnected');
       socket.broadcast.emit('usuario','un usuario se ha desconectado');
  });
});
//notas
io.on('connection', function(socket){
  io.emit('notasNuevas',notas);
    socket.on('notasNuevas', function(notasNuevas) {
        notas=notasNuevas;
        socket.broadcast.emit('notasNuevas',notas);
    });
    
});
//CHAT
io.on('connection', function(socket){
  socket.on(' message', function(msg){
       console.log('message: ' + msg);
    io.emit(' message', msg);
  });
});

  io.on(' message', function(msg){
       console.log('message: ' + msg);
    io.emit(' message', msg);
  });
//subir
app.post('/', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/subidas/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/index.html');
});

    