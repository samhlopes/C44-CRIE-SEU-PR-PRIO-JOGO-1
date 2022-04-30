
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
}

function setup() {
	createCanvas(800, 700);

	blocos = new Group();
	collideblocos = new Group();
	edges = createEdgeSprites ();
	chao = createSprite(450, 720, 900, 50)
	blocos.add(chao)

	engine = Engine.create();
	world = engine.world;

	//Crie os Corpos aqui.
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
	rectMode(CENTER);
	background(238, 173, 45)
	
	configsPurple();


	drawSprites();

}

function configsPurple() {
	purpleGuy.velocityY = purpleGuy.velocityY + 0.2
	controlesPurple()
	regrasPurple()
	purpleDash();
}

function criarMundo () {

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

	//finalizarDash();

}


/* function iniciarDash () {

	purpleGuy.velocityX = 3
	posicaoX = purpleGuy.x;
	estaEmDash = true;
  }
  
  function finalizarDash() {
	var distancia = posicaoX - purpleGuy.x;
	if (distancia >= 100 || purpleGuy.x <= 100) {
	  purpleGuy.velocityX = 0;
	  estaEmDash = false;
	}
  } */ 

function regrasPurple() {
	purpleGuyImage.x = purpleGuy.x
	purpleGuyImage.y = purpleGuy.y - 22
	purpleGuy.collide(collideblocos)
	purpleGuy.collide(edges)
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
	else {
		purpleGuyImage.addImage(imagemPurpleParado)

	}
	if (keyDown("S") && podeAgachar == true) {
		purpleGuyImage.addImage(imagemPurpleAgachado)
		podePular = true
	} else if (keyDown("A")) {
		purpleGuy.x = purpleGuy.x - 2
		purpleGuyImage.addImage(imagemPurpleEsquerda)
	} else if (keyDown("D")) {
		purpleGuy.x = purpleGuy.x + 2
		purpleGuyImage.addImage(imagemPurpleDireita)
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
