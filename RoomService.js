
let _io;
var No = require('./no');

function listen(socket, Nos){
    
    socket.on("join", function(){
        console.log("join");
    });

    socket.on("addNo", function(pId, pTipo){
        var novoNo = new No();
        novoNo.Id = pId;
        novoNo.Tipo = pTipo;
        Nos.push(novoNo);
        console.log(Nos);
    });
    

}


/** @param {SocketIO.Server} io */
module.exports = function(io) {
    _io = io;
    return {listen};
  };