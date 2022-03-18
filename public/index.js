var socket;
var numNos = 0;



$(function() {
    
    console.log("inicio");
    socket = io.connect(window.location.origin);
    console.log(window.location.origin);
    socket.emit("join");

    AddNo("inicio");
    AddNo("final");
});

function btnAddNo(){

    AddNo("comum");
}

function AddNo(tipo){

    var noId = numNos + 1;
    var top = 30;
    var left = 500;
    if(tipo == "inicio")
    {
        top = 30;
        left = 200;
    }
    if(tipo == "final")
    {
        top = 30;
        left = 800;
    }

    var html = '<div class="div-no no-'+tipo+'" id="div-no-'+noId+'" style="top:'+top+'px; left: '+left+'px;"></div>';
    $("#div-malha").append(html);
    $("#div-no-"+noId).draggable();
    
    socket.emit("addNo", noId, tipo);
    numNos = noId;

}