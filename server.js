const express = require('express');
const app = express();
var cors = require('cors');
var No = require('./no');



var Nos = [];

app.use(cors());
const http = require('http');

server = http.createServer(app);
port = 80;
const io = require('socket.io')(server);

const RoomService = require('./RoomService')(io);
var dListen;
io.sockets.on('connection', function(socket){
    dListen = new RoomService.listen(socket, Nos);
    
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.sendFile(`${__dirname}/public/index.html`);
})





server.listen(port, function(){
   console.log("Server iniciado");
});
