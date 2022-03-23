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

    //primeiro anda

    //criando array com peso
    if(this.Sentido == 0)
    {
        var mConexoes = [];
        pConexoes.forEach(function(pConexao){
            if(pConexao.inicio == this.Local)
            {
                var existe = 0;
                existe = this.Caminho.find(e => e == pConexao.id);
                if(existe == undefined)
                {
                    for(var i = 0; i < (pConexao.peso + 1); i++)
                    {
                        mConexoes.push(pConexao);
                    }
    
                }
            }
        });

        //sorteando um array
        var sorteio = getRandomInt(0,(mConexoes.length - 1));
        var conexaoEscolhida = mConexoes[sorteio];
        this.Caminho.push(conexaoEscolhida);
        this.Local = conexaoEscolhida.fim;

        if(this.Local.id == this.Final.id)
        {
            this.Sentido = 1;
        }

    }
    else{
        
        var conexaoVolta = this.Caminho[this.Caminho.length - 1];
        this.Caminho = this.Caminho.pop();
        pConexoes.forEach(function(pConexao){
            if(pConexao.id == conexaoVolta.id)
            {
                this.Local = pConexao.fim;
                pConexao.peso = pConexao.peso + 1;
            }
        });

        if(this.Local == this.Inicio)
        {
            this.Sentido = 0;
            this.Caminho = [];
        }
    }

    return retConexoes;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
module.exports = Formiga;