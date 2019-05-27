const express = require('express');
const socket = require('socket.io');

//App Setup
const app = express();
const server = app.listen(4000, function() {
   console.log('Server is listening on port 4000!'); 
});


//Static Files
app.use(express.static('public'));

//Socket Setup
var io = socket(server);
io.on('connection', function(socket){
   console.log('made socket connection', socket.id);

   socket.on('chat', function(data){
      //io.sockets refer to all clients that are connecting to the server.
      io.sockets.emit('chat', data);
   });

   socket.on('typing', function(data){
      socket.broadcast.emit('typing', data);
   });
});

