function Formiga(){
    this.Id = 0;
    this.Passo = 0;
    this.Local = 0;
    this.Sentido = 0;
    this.Caminho = [];
    this.Nos;
    this.Conexoes;
    this.Inicio;
    this.Final;
    var that = this;
}

Formiga.prototype.Criar = function Criar(pId, pNos){
    this.Id = pId;
    this.Nos = pNos
    this.Local = pNos.find(x => x.tipo == "inicio");
    this.Caminho = [];
    this.Sentindo = 0;
    this.Inicio = pNos.find(x => x.tipo == "inicio");
    this.Final = pNos.find(x => x.tipo == "final");
};

Formiga.prototype.Andar = function Andar(pConexoes){
    var retConexoes;
    var that = this;
    //primeiro anda

    //criando array com peso
    if(this.Sentido == 0)
    {
    
        var mConexoes = [];
       

        pConexoes.forEach(function(pConexao){        
            if(pConexao.inicio == that.Local.id)
            {
                var existe = 0;
                existe = that.Caminho.find(e => e == pConexao.id);
                if(existe == undefined)
                {
                    for(var i = 0; i < (pConexao.peso + 1); i++)
                    {
                        mConexoes.push(pConexao);
                    }
    
                }
            }
        });
        //console.log(this.Local);
        //console.log(pConexoes);
        //console.log(mConexoes);
        

        //sorteando um array
        var sorteio = getRandomInt(0,(mConexoes.length - 1));
        var conexaoEscolhida = mConexoes[sorteio];
        this.Caminho.push(conexaoEscolhida);
        this.Local = this.Nos.find(x => x.id == conexaoEscolhida.fim);

        if(this.Local.id == this.Final.id)
        {
            this.Sentido = 1;
        }
        

    }
    else{
        
        that = this;
        console.log("voltando");
        console.log(this.Caminho);
        var conexaoVolta = this.Caminho[this.Caminho.length - 1];
        this.Caminho.splice(-1,1);
        pConexoes.forEach(function(pConexao){
            if(pConexao.id == conexaoVolta.id)
            {
                that.Local = that.Nos.find(x => x.id == pConexao.inicio);
                pConexao.peso = pConexao.peso + 1;
            }
        });

        if(this.Local == this.Inicio)
        {
            this.Sentido = 0;
            this.Caminho = [];
        }
    }

    retConexoes = pConexoes;
    return retConexoes;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
module.exports = Formiga;