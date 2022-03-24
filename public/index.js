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

    socket.on("resAndar", function(pFormigas, pConexoes){
        ProcessaTela(pFormigas, pConexoes);
    });
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

    var html = '<div class="div-no no-'+tipo+' no-id-'+noId+'" data-meuid='+noId+' id="div-no-'+noId+'" style="top:'+top+'px; left: '+left+'px;" onmousedown="clickNo(this, event.button);" oncontextmenu="return false;">0</div>';
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
            peso: 0
        }
        conexoes.push(conexao);
    });

    var nInd = parseInt($("#txtnInd").val());

    socket.emit("simular", nInd, nos, conexoes);
    
}


function Andar(){
    socket.emit("andar");
}

function ProcessaTela(formigas, conexoes){

    formigas.forEach(function(formiga){
        $("#div-no-"+formiga.Local.id).html(parseInt($("#div-no-"+formiga.Local.id).html()) + 1);
    });

    var maiorPeso = 0;
    var menorPeso = 9999999999;
    conexoes.forEach(function(conexao){
        if(conexao.peso > maiorPeso)
        {
            maiorPeso = conexao.peso;
        }
        if(conexao.peso < menorPeso)
        {
            menorPeso = conexao.peso;
        }
    });

    console.log("maiorPeso "+maiorPeso);
    console.log("menorPeso " + menorPeso);
    console.log(conexoes);

    
    conexoes.forEach(function(conexao){
        var valor = Math.trunc(510 * ((conexao.peso-menorPeso)/(maiorPeso - menorPeso)));
        var r = 0;
        var g = 255;
        var b = 0;

        if(valor <= 255)
        {
            r = valor;
        }
        else
        {
            r = 255;
            g = 255-valor;
        }
        $("#leader-line-"+conexao.id+"-line-shape").css("stroke","rgb("+r+","+g+","+b+")");


    });
    Andar();

}