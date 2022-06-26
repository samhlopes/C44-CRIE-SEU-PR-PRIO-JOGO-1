
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var podePular = true;
var podeAgachar = true;
var podeDash = true;
var posicaoX = 0;
var purpleGuyVelocity = 0;
var estaEmDash = false;
var VIVO = "VIVO";
var MORTO = "MORTO";
var EstadoJogo = VIVO;
var podeMirar = true
var greenGuys = []
var purpleGuy
var blocos
var souls = 0

function preload() {
	imagemPurpleParado = loadImage("images/purpleParado.png")
	imagemPurpleAgachado = loadImage("images/purpleAgachado.png")
	imagemPurplePulando = loadImage("images/purplePulando.png")
	imagemPurpleEsquerda = loadImage("images/purpleCorrendoEsquerda.png")
	imagemPurpleDireita = loadImage("images/purpleCorrendoDireita.png")
	imagemPurpleArcoEsquerdo = loadImage("images/arcoPesquerda.png")
	imagemPurpleArcoDireito = loadImage("images/arcoPdireita.png")
	imagemPurpleEspadaEsquerda = loadImage("images/espada esquerda.png")
	imagemPurpleEspadaDireita = loadImage("images/espada direita.png")
	imagemFlechaDireita = loadImage("images/flechaParaDireita.png")
	imagemFlechaEsquerda = loadImage("images/flecha para esquerda.png")
	imagemGreenArcoEsquerda = loadImage("images/greenArcoEsquerda.png")
	imagemGreenArcoDireita = loadImage("images/greenArcoDireita.png")

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
	//submundo etapa
	criarBlocos(-310, 0, 50, 1000000)
	criarBlocos(1110, 0, 50, 1000000)
	criarBlocos(400, 2800, 2000, 1000)

	//etapa normal
	criarBlocos(5, -4000, 10, 10000)
	criarBlocos(800, -4000, 10, 10000)
	criarBlocos(403, 1120, 805, 800)
	criarBlocos(200, 650, 40, 20);
	criarBlocos(300, 320, 50, 10)
	criarRedBlocos(400, 500, 20, 20);
	criarRedBlocos(300, 500, 20, 20);
	criarBlocos(270, 600, 20, 20);
	criarBlocos(350, 360,20,10)
	criarBlocos(180, 300, 200, 50);
	criarBlocos(350, 610, 50, 20);
	criarBlocos(525, 630, 200, 20);
	criarBlocos(780, 650, 50, 10)
	criarRedBlocos(780, 530, 50, 10)
	criarBlocos(780, 440, 50, 10)
	criarBlocos(570, 390, 50, 10)
	criarBlocos(430, 360, 50, 10)
	criarBlocos(600, 590, 50, 60)
	criarBlocos(500, 520, 50, 10)
	criarBlocos(300, 320, 50, 10)
	criarBlocos(680, 610, 50, 10)
	criarRedBlocos(680, 510, 50, 10)
	criarBlocos(650, 430, 50, 10)
	criarBlocos(100, 220, 50, 20);
	criarRedBlocos(34, 150, 50, 20);
	criarBlocos(140, 70, 50, 20);
	criarBlocos(600, 40, 50, 20);
	criarBlocos(400, 140, 300, 20);
	criarBlocos(630, 170, 100, 20);
	criarRedBlocos(700, 140, 30, 20);
	criarBlocos(740, 70, 50, 20);
	criarRedBlocos(470, -29, 100, 20);
	criarBlocos(90, -50, 20, 20);
	criarBlocos(370, -100, 70, 10);
	criarBlocos(220, -150, 70, 10);
	criarBlocos(90, -180, 70, 10);
	criarBlocos(20, -250, 20, 10);
	criarBlocos(140, -295, 20, 10);
	criarBlocos(20, -350, 20, 10);
	criarBlocos(140, -400, 20, 10);
	criarRedBlocos(400, -370, 500, 160);
	criarBlocos(645, -480, 10,100);
	criarBlocos(155, -480, 10,100);
	criarBlocos(630, -520, 20,20);
	criarBlocos(20, -450, 20,10);
	criarBlocos(140, -500, 20,10);
	criarBlocos(400, -455, 20,30);
	criarBlocos(400, -510, 20,40);
	criarBlocos(718, -540, 156,30);
	criarBlocos(600, -610, 20,20);
	criarBlocos(500, -670, 20,20);
	criarRedBlocos(400, -730, 50,20);
	criarRedBlocos(300, -790, 50,20);
	criarRedBlocos(200, -850, 50,20);
	criarBlocos(770, -730, 50,20);
	criarBlocos(35, -790, 50,20);
	criarBlocos(770, -850, 50,20);
	criarBlocos(450, -920, 300,20);
	
	
	



	createPurple();
	createGreens();

	Engine.run(engine);

}


function draw() {
	fill("Purple")
	rectMode(CENTER);

	if (EstadoJogo === MORTO) {
		background(255, 255, 255)
		camera.position.y = 30000
		fill("black")
		textSize(40)
		text("VOCE MORREU", 270, camera.position.y - 120)
		textSize(25)
		text("Clique F5 para reiniciar", 290, camera.position.y - 90)

	}


	if (EstadoJogo === VIVO) {
		background(238, 173, 45)
		fill("Purple")
		text('Use AD para se mover para a esquerda e para a direita, clique S para de agachar', 30, 400)
		text("Pressione F para preparar o arco e A/D para mirar, depois de mirar clique G para atirar", 30, 440)
		text('Para pular clique espaco, agache para poder pular de novo', 30, 420)
		text('Quando você atirar sera necessario esperar 1 segundo para atirar novamente', 30, 460)
		text('Dica 1:Caso esteja muito dificil para passar, você pode usar o ', 30, 550)
		text('poder das asas de PurpleGuy para voar clicando e segurando a tecla C', 30, 570)
		text('Dica 2: Você pode clicar S para agachar no ar ou na terra para desviar das flechas', 300, 230)
		text('Dica 3:Você pode se mexer no ar mesmo agachado segurando S e clicando nas teclas AD', 300, 250)
		textSize(20)
		text('PARABENS!!!',380, -1100)
		text('Você chegou ao final dessa versão',280, -1050)
		textSize(12)
		text("Almas corrompidas ceifadas: " + souls, camera.position.x + 220, camera.position.y - 320)

		configsPurple();
		regrasGreens();
	}



	drawSprites();

}

function configsPurple() {
	purpleGuy.velocityY = purpleGuy.velocityY + 0.2
	controlesPurple();
	instrucoesPurple();
	regrasPurple();
	purpleDash();
}

function instrucoesPurple() {
	text()
}

function purpleDash() {
	if (keyDown("E") && podeDash == true && !purpleGuy.isTouching(blocos)) {
		//dash para a direita
		purpleGuy.x = purpleGuy.x + 30
		podeDash = false
		//iniciarDash();
	}

	if (keyDown("Q") && podeDash == true && !purpleGuy.isTouching(blocos)) {
		//dash para a direita
		purpleGuy.x = purpleGuy.x - 30
		podeDash = false
	}


}

function regrasPurple() {
	camera.position.y = purpleGuy.y
	purpleGuy.collide(collideblocos)
	if (purpleGuy.velocityY > -1 && purpleGuy.velocityY < 1 && purpleGuy.isTouching(blocos)) {
		podeAgachar = true;
		podeDash = true;
	} else {
		podeAgachar = false;
	}
	if (keyDown("S")) {
		purpleGuy.width = 45
		purpleGuy.height = 20
		purpleGuyImage.x = purpleGuy.x - 10
		purpleGuyImage.y = purpleGuy.y - 40
		purpleGuyImage.addImage(imagemPurpleAgachado)
	} else if (purpleGuy.velocityY < -1 || purpleGuy.velocityY > 1) {
		purpleGuyImage.addImage(imagemPurplePulando)
	}
}

function createPurple() {
	purpleGuy = createSprite(400, 772, 20, 56)
	//purpleGuy = createSprite(500, -700, 20, 56)
	purpleGuy.visible = false
	purpleGuyImage = createSprite(400, 600, 20, 56)
	purpleGuyImage.addImage(imagemPurpleParado)
}

function createGreens() {
	GreenOne = new GreenGuy(500, 499);
	GreenTwo = new GreenGuy(600, 15);
	GreenThree = new GreenGuy(300, 115);
	GreenFour = new GreenGuy(90, -75);
	GreenFive = new GreenGuy(350, 340);
	GuardianGreenOne = new GreenGuy(200, -466)
	GuardianGreenTwo = new GreenGuy(600, -466)
	GreenStairsOne = new GreenGuy(770, -755)
	GreenStairsTwo = new GreenGuy(770, -875)
	GreenStairsThree =  new GreenGuy(35, -815) 
	greenGuys.push(GreenOne);
	greenGuys.push(GreenTwo);
	greenGuys.push(GreenThree);
	greenGuys.push(GreenFour);
	greenGuys.push(GreenFive);
	greenGuys.push(GuardianGreenOne);
	greenGuys.push(GuardianGreenTwo);
	greenGuys.push(GreenStairsOne);
	greenGuys.push(GreenStairsTwo);
	greenGuys.push(GreenStairsThree);

}

function controlesPurple() {
	
	if (keyDown("N")) {
		createCanvas(1400, 800)
	}
	if (keyDown("space") && purpleGuy.isTouching(blocos)) {
		purpleGuy.velocityY = -5.7
		purpleGuyImage.addImage(imagemPurplePulando)
		podePular = false
	}
	if (keyDown("C")) {
		purpleGuy.velocityY = -3
	}
	else {
		purpleGuyImage.addImage(imagemPurpleParado)

	}
	if (keyDown("V")) {
		purpleGuy.velocityY = -20
	}
	else {
		purpleGuyImage.addImage(imagemPurpleParado)

	}


	if (keyDown("S")) {
		purpleGuyImage.addImage(imagemPurpleAgachado)
		purpleGuy.width = 45
		purpleGuy.height = 20
		purpleGuyImage.x = purpleGuy.x - 10
		purpleGuyImage.y = purpleGuy.y - 40
	} else {
		purpleGuy.width = 20
		purpleGuy.height = 56
		purpleGuyImage.x = purpleGuy.x
		purpleGuyImage.y = purpleGuy.y - 22
	}


	if (keyDown("S") && podeAgachar == true) {
		//podeMirar = true
	} else if (keyDown("A")) {
		purpleGuyImage.x = purpleGuy.x
		purpleGuyImage.y = purpleGuy.y - 22
		if (keyDown("F") && podeMirar == true) {
			purpleGuyImage.addImage(imagemPurpleArcoEsquerdo)

			if (keyDown("G")) {
				setTimeout(() => { podeMirar = true }, 1000);
				FlechaEsquerda = createSprite(purpleGuy.x - 40, purpleGuy.y - 9, 30, 2)
				FlechaEsquerda.velocityX = -5
				FlechaEsquerda.visible = false
				FlechaEsquerdaImg = createSprite(purpleGuy.x - 50, purpleGuy.y - 9, 10, 10)
				FlechaEsquerdaImg.addImage(imagemFlechaEsquerda)
				FlechaEsquerdaImg.velocityX = -5
				flechasImg.add(FlechaEsquerdaImg)
				flechas.add(FlechaEsquerda)
				podeMirar = false
				if (flechas.isTouching(blocos)) {
					flechas.destroyEach();
					flechasImg.destroyEach()
				}

			}

		} else if (keyDown("R")) {
			purpleGuyImage.addImage(imagemPurpleEspadaEsquerda)

		}
		else {
			purpleGuy.x = purpleGuy.x - 2
			purpleGuyImage.addImage(imagemPurpleEsquerda)
		}

	} else if (keyDown("D")) {
		purpleGuyImage.x = purpleGuy.x
		purpleGuyImage.y = purpleGuy.y - 22
		if (keyDown("F") && podeMirar == true) {
			purpleGuyImage.addImage(imagemPurpleArcoDireito)
			if (keyDown("G")) {
				setTimeout(() => { podeMirar = true }, 1000);
				var FlechaDireita = createSprite(purpleGuy.x + 40, purpleGuy.y - 9, 30, 2)
				FlechaDireita.velocityX = +5
				FlechaDireita.visible = false
				FlechaDireitaImg = createSprite(purpleGuy.x + 50, purpleGuy.y - 9, 10, 10)
				FlechaDireitaImg.addImage(imagemFlechaDireita)
				FlechaDireitaImg.velocityX = +5
				flechasImg.add(FlechaDireitaImg)
				flechas.add(FlechaDireita)
				podeMirar = false
			}


		} else if (keyDown("R")) {
			purpleGuyImage.addImage(imagemPurpleEspadaDireita)
		} else {
			purpleGuy.x = purpleGuy.x + 2
			purpleGuyImage.addImage(imagemPurpleDireita)
		}
	}
}

function criarBlocos(xpos, ypos, xblock, yblock) {
	var bloco = createSprite(xpos, ypos, xblock, yblock)
	var collidebloco = createSprite(xpos, ypos + 10, xblock, yblock)
	bloco.shapeColor = "green"
	collidebloco.shapeColor = "#9b7653 "
	blocos.add(bloco)
	collideblocos.add(collidebloco)


}

function criarRedBlocos(xpos, ypos, xblock, yblock) {
	var bloco = createSprite(xpos, ypos, xblock, yblock)
	var collidebloco = createSprite(xpos, ypos + 10, xblock, yblock)
	bloco.shapeColor = "#8b0000"
	collidebloco.shapeColor = "#9b7653 "
	blocos.add(bloco)
	collideblocos.add(collidebloco)
}

function regrasFlechas(green) {
	green.acertou(blocos)

	if (green.acertou(purpleGuy)) {
		purpleGuy.destroy();
		purpleGuyImage.destroy();
		EstadoJogo = MORTO;
	}



}

function regrasGreens() {
	for (i = 0; i < greenGuys.length; i++) {
		var green = greenGuys[i]
		regrasFlechas(green)
		if (green.acertado(flechas)) {
			souls++
			green.destroyGreen();
		}
		green.display();
	}

}
