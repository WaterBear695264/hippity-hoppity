let screenSpeed = 10;
let mainCharacter = new Player(100, false, 0, 100, 100, "john", 0, 0);

class Player {
    constructor(y, dead, money, jumpHeight, speed, name, level, xp, gravity){
        this.y = y;
        this.dead = dead;
        this.money = money
        this.jumpHeight = jumpHeight;
        this.speed = speed;
        this.name = name;
        this.level = level;
        this.xp = xp;
        this.yVel = 0;
        this.onGround = false;
        this.gravity = 0.5;
    }

    move(){
        this.y+=this.yVel;
    }

    jump(){
        if(this.onGround){
            this.yVel-=15
        }

    }

    draw(img){
        image(img, width/4, this.y, 100, 100)
    }

    applyPhysics() {
        this.yVel += this.gravity;
        this.y += this.yVel;

        // Ground collision (height - 150 accounts for sprite size)
        let groundY = height *3/4; 
        if (this.y >= groundY) {
            this.y = groundY;
            this.yVel = 0;
            this.onGround = true;
        }else{
            this.onGround = false;
        }
    }

    update(img){
        this.draw(img);
        this.applyPhysics()
    }
}

class Spike {
    constructor(x, y, height, width){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    move(){
        this.x-=screenSpeed
        console.log(this.x)
    }

    draw(img){
        image(img, this.x, this.y, this.width,this.height)
    }

    update(img){
        this.move()
        this.draw(img)
    }
}

class spikeArrangement {
    constructor(numSpikes, arrOfSize, x){
        this.numSpikes = numSpikes;
        this.arrOfSize = arrOfSize;
        this.arrOfSpikes = [];
        this.x = x;
        this.y = y;
    }

    createArr(){
        for(let i = 0; i < this.arrOfSize; i++){
            if(i!== 0){
                this.arrOfSpikes.push(new Spike(this.x + this.arrOfSize[i-1], this.y, this.height*this.arrOfSize[i], this.width*this.arrOfSize[i]))
            }else{
                this.arrOfSpikes.push(new Spike(this.x, this.y, this.height*this.arrOfSize[i], this.width*this.arrOfSize[i]))
            }
            
        }
    }


}

class Egg {
    constructor(x, y, width, height, value, gold){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.value = value;
        this.gold = gold
    }

}

function dash(distance){

}

function preload() {
    img = loadImage('/image-removebg-preview.png')
    background = loadImage('/background.jpg')
}

function spawnSpikes(random){
}

function setup() {
  let width = windowWidth;
  let height = windowHeight;
  createCanvas(width, height - 50);

}

    let x = 0;
    let spike = new Spike(1000, 100, 100, 100)
function draw() {
    x+=screenSpeed ;
    let newX = x % width
    clear();
    image(background, -newX, 0, width, height);
    image(background, width-newX, 0, width, height);
    mainCharacter.update(img)
    spike.y = height*3/4
    spike.update(img)

}

function keyPressed() {
  if (key === ' ') {
    mainCharacter.jump();
  }

}