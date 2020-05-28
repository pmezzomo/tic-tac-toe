//Declaraçao de variaveis
const jogador1 = "X";
const jogador2 = "O";
var vezjogo = jogador1;
var jogoacabou = false;

mostrarDesenho();
preencherEspacos();

//Carregar as imagens na tabela do jogo
function mostrarDesenho(){

	if (jogoacabou){return;}
// vez do jogador "X" jogar
	if (vezjogo == jogador1) {
//buscar a imagem que esta no html
var jogador = document.querySelectorAll("div#picture img")[0];
//src recebe a imagem
jogador.setAttribute("src","_imagem/xboy.jpg")
//vez do jogador "O" jogar
	} else{
var jogador = document.querySelectorAll("div#picture img")[0];
jogador.setAttribute("src","_imagem/kids.jpg")
}
}

//Carregar as imagens quando o jogador escolher o campo no jogo da velha
function preencherEspacos(){

	var lugar = document.getElementsByClassName("espaco");
	for (var i = 0; i < lugar.length; i++){

		lugar[i].addEventListener("click", function(){

			if (jogoacabou) {return;}

			if(this.getElementsByTagName("img").length == 0){
	
				if (vezjogo == jogador1){
		
					this.innerHTML = "<img src = '_imagem/xboy.jpg' border='0' height='60'>";
					this.setAttribute("jogo", jogador1);
					vezjogo = jogador2;
		
				}else{
		
					this.innerHTML = "<img src = '_imagem/kids.jpg' border='0' height='60'>";
					this.setAttribute("jogo", jogador2);
					vezjogo = jogador1;
				}
				mostrarDesenho();
				quemVenceu(); 
			}
		});

	}
}

async function quemVenceu(){
//atributo "jogo" ira dizer quem ganha o jogo
var a11 = document.getElementById("a11").getAttribute("jogo");
var a12 = document.getElementById("a12").getAttribute("jogo");
var a13 = document.getElementById("a13").getAttribute("jogo");

var b21 = document.getElementById("b21").getAttribute("jogo");
var b22 = document.getElementById("b22").getAttribute("jogo");
var b23 = document.getElementById("b23").getAttribute("jogo");

var c31 = document.getElementById("c31").getAttribute("jogo");
var c32 = document.getElementById("c32").getAttribute("jogo");
var c33 = document.getElementById("c33").getAttribute("jogo");

//combinando as posições da tabela para ver se há um ganhador ou não para o jogo
var resultado = "";

	if ((a11 == b21 && a11 == c31 && a11 != "" ) || (a11 == a12 && a11 == a13 && a11 != "") || (a11 == b22 && a11 == c33 && a11 != "")){
	resultado = a11;

	}else if((b21 == b22 && b21 == b23 && b21 !="")){

	resultado = b21;
	
	}else if((b22 == a12 && b22 == c32 && b22 != "")){
		
		resultado = b22;
		
	}else if ((c33 == a13 && c33 == b23 && c33 != ""))
	{
	resultado = c33;	
	
	}else if ((a13 == b22 && a13 == c31 && a13 != ""))
	{
	resultado = a13;
	
	}else if ((c31 == c32 && c31 == c33 && c31 != ""))
	{
	resultado = c31;	
	}
	
	//para dar uma pausa antes da msn final de quem ganhou	ou não há ganhadores
	if (resultado != ""){
		jogoacabou = true;
	    
		    await sleep(50);
	
		alert("O ganhador foi o '" + resultado + "'"); 
		}else if(a11 != "" && b21 != "" && b22 != "" &&  c33 != "" && a13 != "" && c31 != "")
    {
        await sleep(50);
	
        alert("Não há ganhadores!");
	}
	
	
function sleep(ms){
	return new Promise(resolve => setTimeout(resolve,ms));
}

}