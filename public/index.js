var socket;
var numNos = 0;
var noIdSel = [];
var linhas = [];




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

    var html = '<div class="div-no no-'+tipo+' no-id-'+noId+'" data-meuid='+noId+' id="div-no-'+noId+'" style="top:'+top+'px; left: '+left+'px;" onmousedown="clickNo(this, event.button);" oncontextmenu="return false;"></div>';
    $("#div-malha").append(html);
    $("#div-no-"+noId).draggable({
        drag:function(){
            linhas.forEach(function(linha){
                linha.position();
            });
            }
        });
    
    //socket.emit("addNo", noId, tipo);
    numNos = noId;

}

function clickNo(obj, evento){
    
    
    if(evento == 2)
    {
        noIdSel.push(obj.dataset.meuid);
        if(noIdSel.length == 2)
        {
            //procura se existe a conexão
            var existe = false;
            var index = -1;
            var indexRemove = -1;
            linhas.forEach(function(linha){
                index++;
                if(linha.start.id == "div-no-"+noIdSel[0] && linha.end.id == "div-no-"+noIdSel[1])
                {
                    existe = true;
                    indexRemove = index;
                    linha.hide();
                }
            }) 

            if(existe == true){
                linhas.splice(indexRemove, 1);
            }
            else {
               var noA = document.getElementById('div-no-'+noIdSel[0]);
                var noB = document.getElementById('div-no-'+noIdSel[1]);
                
                var linha = new LeaderLine(
                    noA,
                    noB, 
                    {color:"blue", size:3}
                );
                linhas.push(linha);
            }

            noIdSel = [];
        }
    }
}


function Simular(){

    var nos = [];
    var conexoes = [];

    $(".div-no").each(function(i){
        console.log($(this));
        var tipono = "comum";
        if($(this).hasClass("no-inicio")){ tipono = "inicio"; }
        if($(this).hasClass("no-final")){ tipono = "final"; }
        var no = {
            id: parseInt($(this).attr("id").replace("div-no-","")),
            tipo: tipono
        }
        nos.push(no);
    });

    linhas.forEach(function(linha){
        var conexao = {
            id: linha._id,
            inicio: parseInt(linha.start.id.replace("div-no-","")),
            fim: parseInt(linha.end.id.replace("div-no-","")),
        }
        conexoes.push(conexao);
    });

    var nInd = parseInt($("#txtnInd").val());

    socket.emit("simular", nInd, nos, conexoes);
    
}