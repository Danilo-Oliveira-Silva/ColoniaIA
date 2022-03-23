
let _io;
const Formiga = require('./formiga');
var No = require('./no');
var emitter = require('events').EventEmitter;

var formigas = [];
var conexoes = [];
var nos = [];

function listen(socket, Nos){
    
    var that = this;
    var emissor = new emitter();
    emissor.setMaxListeners(200);
    this.emissore = emissor;

    socket.on("join", function(){
        console.log("join");
    });



    socket.on("simular", function(nInd, pnos, pconexoes){

        nos = pnos;
        conexoes = pconexoes;
        console.log("simular");
        console.log(nInd);
        console.log(nos);
        console.log(conexoes);
        
        for(var i = 1; i <= nInd; i++)
        {
            var formiga = new Formiga();
            formiga.Criar(i, nos);
            formigas.push(formiga);
        }

    });
    
    socket.on("andar", function(){
        formigas.forEach(function(formiga){
            var conexoes = formiga.Andar(conexoes);
        });
        socket.emit("resAndar", formigas, conexoes);
    });

}


/** @param {SocketIO.Server} io */
module.exports = function(io) {
    _io = io;
    return {listen};
  };