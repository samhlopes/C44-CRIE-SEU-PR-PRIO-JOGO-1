
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const CRIANDO = "CRIANDO"
const CRIADO = "CRIADO"
var podePular = true
var podeAgachar = true
var podeDash = true
var posicaoX = 0
var purpleGuyVelocity = 0
var estaEmDash = false
var allblocks = []
var EstadoJogo = CRIANDO

function preload() {
	imagemPurpleParado = loadImage("images/purpleParado.png")
	imagemPurpleAgachado = loadImage("images/purpleAgachado.png")
	imagemPurplePulando = loadImage("images/purplePulando.png")
	imagemPurpleEsquerda = loadImage("images/purpleCorrendoEsquerda.png")
	imagemPurpleDireita = loadImage("images/purpleCorrendoDireita.png")
	imagemPurpleArcoEsquerdo = loadImage("images/arco esquerda.png")
	imagemPurpleArcoDireito = loadImage("images/arco direita.png")
	imagemPurpleEspadaEsquerda = loadImage("images/espada esquerda.png")
	imagemPurpleEspadaDireita = loadImage("images/espada direita.png")
	imagemFlechaDireita = loadImage ("images/flechaParaDireita.png")
	imagemFlechaEsquerda = loadImage ("images/flecha para esquerda.png")
}

function setup() {
	
	createCanvas(800, 700);

	blocos = new Group();
	collideblocos = new Group();
	flechas = new Group();
	flechasImg = new Group();

	engine = Engine.create();
	world = engine.world;



	//Crie os Corpos aqui.
	criarBlocos(0,1000,10,10000)
	criarBlocos(800,1000,10,10000)
	criarBlocos(450,1100,900,800)
	criarBlocos(200,650,40,20);
	criarBlocos(300, 320, 50,10)
	criarBlocos(400,500,20,20);
	criarBlocos(270,600,20,20);
	criarBlocos(270,600,20,20);
	criarBlocos(180,300,200,50);
	criarBlocos(350,600,50,20);
	criarBlocos(525,610,200,20);
	criarBlocos(780, 640, 50,10)
	criarBlocos(780, 570, 50,10)
	criarBlocos(780, 500, 50,10)
	criarBlocos(780, 430, 50,10)
	criarBlocos(610, 400, 50,10)
	criarBlocos(450, 370, 50,10)
	criarBlocos(600, 590, 50,60)
	criarBlocos(500, 520, 50,10)
	criarBlocos(300, 320, 50,10)

	
	createPurple();
	Engine.run(engine);

}


function draw() {
	fill ("Purple")
	rectMode(CENTER);
	background(238, 173, 45)

	if(keyDown("K")) {
	console.log (flechas)
	}

	fill ("Purple")
	text ("pressione F para preparar o arco e A/D para mirar e atirar",60,500)
	text ("O mesmo serve para a espada mas o botao de ativacao fica no R",30,520)
	text (mouseX + "X  " + mouseY + "Y",camera.position.x + 300,camera.position.y) 
	configsPurple();
	

	drawSprites();

}

function configsPurple() {
	purpleGuy.velocityY = purpleGuy.velocityY + 0.2
	controlesPurple()
	instrucoesPurple()
	regrasPurple()
	purpleDash();
}

function instrucoesPurple () {
	text ()
}

function purpleDash() {
	if (keyDown("E") && podeDash == true) {
		//dash para a direita
		purpleGuy.x = purpleGuy.x +20
		podeDash = false
		//iniciarDash();
	}

	if (keyDown("Q") && podeDash == true) {
		//dash para a direita
		purpleGuy.x = purpleGuy.x -20
		podeDash = false
	}


}

function regrasPurple() {
	camera.position.y = purpleGuy.y
	purpleGuyImage.x = purpleGuy.x
	purpleGuyImage.y = purpleGuy.y - 22
	purpleGuy.collide(collideblocos)
	if (purpleGuy.velocityY > -1 && purpleGuy.velocityY < 1 && purpleGuy.isTouching (blocos)) {
	podeAgachar = true;
	podeDash = true;
	} else {
		podeAgachar = false;
	}
	if (purpleGuy.velocityY < -1 || purpleGuy.velocityY > 1) {
		purpleGuyImage.addImage(imagemPurplePulando)
	}
}

function createPurple() {
	purpleGuy = createSprite(400, 672, 20, 56)
	purpleGuy.visible = false
	purpleGuyImage = createSprite(400,600,20,56)
	purpleGuyImage.addImage(imagemPurpleParado)
}

function controlesPurple() {
	if (keyDown("space") && podePular == true) {
		purpleGuy.velocityY = -5
		purpleGuyImage.addImage(imagemPurplePulando)
		podePular = false
	}
	if (keyDown("C")) {
		purpleGuy.velocityY = -5
	}
	else {
		purpleGuyImage.addImage(imagemPurpleParado)

	}
	if (keyDown("S") && podeAgachar == true) {
		purpleGuyImage.addImage(imagemPurpleAgachado)
		podePular = true
	} else if (keyDown("A")) {
		if (keyDown("F")) {
			purpleGuyImage.addImage(imagemPurpleArcoEsquerdo)
			FlechaEsquerda = createSprite (purpleGuy.x - 40, purpleGuy.y - 9, 30,2)
			FlechaEsquerda.velocityX = -5 
			FlechaEsquerda.visible = false
			FlechaEsquerdaImg = createSprite (purpleGuy.x - 50,purpleGuy.y - 9,10,10)
			FlechaEsquerdaImg.addImage(imagemFlechaEsquerda)
			FlechaEsquerdaImg.velocityX = -5
			flechasImg.add (FlechaEsquerdaImg)
			flechas.add (FlechaEsquerda)
			if (flechas.length == 2) {
				flechas.destroyEach()
				flechasImg.destroyEach()
			}
		}else if (keyDown ("R")){
			purpleGuyImage.addImage(imagemPurpleEspadaEsquerda)
			
		}
		else{
		purpleGuy.x = purpleGuy.x - 2
		purpleGuyImage.addImage(imagemPurpleEsquerda)
		}
	
	} else if (keyDown("D")) {
		if (keyDown("F")) {
			purpleGuyImage.addImage(imagemPurpleArcoDireito)
			FlechaDireita = createSprite (purpleGuy.x + 40, purpleGuy.y - 9, 30,2)
			FlechaDireita.velocityX = +5 
			FlechaDireita.visible = false
			FlechaDireitaImg = createSprite (purpleGuy.x + 50,purpleGuy.y - 9,10,10)
			FlechaDireitaImg.addImage(imagemFlechaDireita)
			FlechaDireitaImg.velocityX = +5
			flechasImg.add (FlechaDireitaImg)
			flechas.add (FlechaDireita)
			if (flechas.length == 2) {
				flechas.destroyEach()
				flechasImg.destroyEach()
			}

		}else if (keyDown("R")){
			purpleGuyImage.addImage(imagemPurpleEspadaDireita)
		} else{
		purpleGuy.x = purpleGuy.x + 2
		purpleGuyImage.addImage(imagemPurpleDireita)
		}
	}
}

function criarBlocos(xpos,ypos,xblock,yblock) {
		var bloco = createSprite (xpos,ypos,xblock,yblock)
		var collidebloco = createSprite (xpos,ypos+10,xblock,yblock)
		bloco.shapeColor = "green"
		collideblock = "brown"
		//allblocks[i] = (bloco)
		blocos.add (bloco)
		collideblocos.add (collidebloco)


}
