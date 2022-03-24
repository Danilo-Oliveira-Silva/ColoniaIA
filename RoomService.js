
let _io;
const Formiga = require('./formiga');
var No = require('./no');
var emitter = require('events').EventEmitter;


function listen(socket, Nos){

    
    this.formigas = [];
    this.conexoes = [];
    this.nos = [];

    var that = this;
    var emissor = new emitter();
    emissor.setMaxListeners(200);
    this.emissore = emissor;

    socket.on("join", function(){
        console.log("join");
    });



    socket.on("simular", function(nInd, pnos, pconexoes){

        that.formigas = [];
        that.nos = pnos;
        that.conexoes = pconexoes;
        
        for(var i = 1; i <= nInd; i++)
        {
            var formiga = new Formiga();
            formiga.Criar(i, that.nos);
            that.formigas.push(formiga);
        }

    });
    
    socket.on("andar", function(){

        console.log("andar");
        that.formigas.forEach(function(formiga){
            that.conexoes = formiga.Andar(that.conexoes);
        });
        

        socket.emit("resAndar", that.formigas, that.conexoes);
    });

}


/** @param {SocketIO.Server} io */
module.exports = function(io) {
    _io = io;
    return {listen};
  };