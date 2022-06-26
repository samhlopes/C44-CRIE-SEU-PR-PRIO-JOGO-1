class GreenGuy {
    npcPodeAtirar
    sprite
    image
    flechas
    flechasImg
    purpleGuy
    blocos
    xpos
    ypos
    isDestroyed = false
    isDirectionLeft
    imagemGreenArcoEsquerda = loadImage("images/greenArcoEsquerda.png")
    imagemFlechaEsquerda = loadImage("images/flecha para esquerda.png")

    constructor(xpos, ypos) {
        this.sprite = createSprite(xpos, ypos, 20, 57)
        this.sprite.visible = false
        this.xpos = xpos;
        this.ypos = ypos;
        this.checkDirection();
        this.image = createSprite(300, 480, 20, 56)
        if (!this.isLeft()) {
        this.image.mirrorX(this.image.mirrorX() * -1);
        this.checkDirection()
        }
        this.image.addImage(this.imagemGreenArcoEsquerda)
        this.image.x = this.sprite.x
        this.image.y = this.sprite.y - 24
        this.flechas = new Group();
        this.flechasImg = new Group();
        this.npcPodeAtirar = true;

        this.checkDirection();
    }

    isLeft() {
        return purpleGuy.x < this.xpos
    }

    checkDirection() {
        this.isDirectionLeft = this.isLeft()
    }

    atirar() {
        if (this.isDestroyed == false &&purpleGuy.y < this.ypos + 30 && purpleGuy.y > this.ypos - 30 && this.npcPodeAtirar == true) {
            this.npcPodeAtirar = false
            setTimeout(() => { this.npcPodeAtirar = true }, 3000);
            var localizacao = this.isLeft() ? -24 : +24
            var FlechaEsquerda = createSprite(this.xpos + localizacao, this.ypos - 10, 30, 2)
            var velocidade = this.isLeft() ? -5 : +5
            FlechaEsquerda.velocityX = velocidade
            FlechaEsquerda.visible = false
           
            var FlechaEsquerdaImg = createSprite(this.xpos + localizacao, this.ypos - 10, 10, 10)
            FlechaEsquerdaImg.addImage(this.imagemFlechaEsquerda)
            FlechaEsquerdaImg.velocityX = velocidade
            this.flechasImg.add(FlechaEsquerdaImg)
            this.flechas.add(FlechaEsquerda)
            if (!this.isLeft()) {

                FlechaEsquerdaImg.mirrorX(FlechaEsquerdaImg.mirrorX() * -1);
            }
        }
    }

    destroyGreen () {
        this.sprite.destroy()
        this.image.destroy()
        this.isDestroyed = true
    }

    destroyflechas() {
        this.flechas.destroyEach();
        this.flechasImg.destroyEach();
    }

    acertou(alvo) {
        if (this.flechas.isTouching(alvo)) {
            this.destroyflechas()
            return true
            
        } 
        return false
    }

    acertado(atacante) {
        if (this.sprite.isTouching(atacante)){
            return true
        }return false
    }
    
    display() {
        this.atirar()
        this.sprite.draw();
        if (this.isDirectionLeft ==! this.isLeft()) {
            this.image.mirrorX(this.image.mirrorX() * -1);
            this.checkDirection()
        }
        this.image.draw();
        this.flechas.draw();
        this.flechasImg.draw();
    }
}