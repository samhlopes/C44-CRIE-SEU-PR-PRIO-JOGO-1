
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var podePular = true
var podeAgachar = true
var allblocks = []
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
	collideblocos = new Group ();
	edges = createEdgeSprites ();
	chao = createSprite(450, 720, 900, 50)
	blocos.add(chao)
	

	createPurple();
	engine = Engine.create();
	world = engine.world;

	//Crie os Corpos aqui.

	Engine.run(engine);

}


function draw() {
	rectMode(CENTER);
	background(238, 173, 45)

	criarBlocos(200,200,200,200);
	configsPurple();


	drawSprites();

}

function configsPurple() {
	purpleGuy.velocityY = purpleGuy.velocityY + 0.2
	controlesPurple()
	regrasPurple()
}

function regrasPurple() {
	purpleGuy.collide(edges)
	if (purpleGuy.velocityY > -1 && purpleGuy.velocityY < 1 && purpleGuy.isTouching (blocos)) {
	podeAgachar = true
	} else {
		podeAgachar = false;
	}
}

function createPurple() {
	purpleGuy = createSprite(400, 200, 20, 40)
	purpleGuy.addImage(imagemPurpleParado)
}

function controlesPurple() {
	if (keyDown("W") && podePular == true) {
		purpleGuy.velocityY = -5
		purpleGuy.addImage(imagemPurplePulando)
		podePular = false
	}
	else {
		purpleGuy.addImage(imagemPurpleParado)

	}
	if (keyDown("S") && podeAgachar == true) {
		purpleGuy.addImage(imagemPurpleAgachado)
		podePular = true
	} else if (keyDown("A")) {
		purpleGuy.x = purpleGuy.x - 2
		purpleGuy.addImage(imagemPurpleEsquerda)
	} else if (keyDown("D")) {
		purpleGuy.x = purpleGuy.x + 2
		purpleGuy.addImage(imagemPurpleDireita)
	}
}

function criarBlocos(xpos,ypos,xblock,yblock) {
	for ( var i = 0; i < width; i ++) {
		var bloco = createSprite (xpos,ypos,xblock,yblock)
		bloco.shapeColor = "green"
		collideblock = createSprite (xpos,ypos+20,xblock,yblock)
		collideblock = "brown"
		allblocks[i] = (bloco)
		blocos.add (bloco)
		collideblock
	}


}
