class Player {
    constructor(y, dead, money, jumpHeight, speed, name, level, xp){
        this.y = y;
        this.dead = dead;
        this.money = money
        this.jumpHeight = jumpHeight;
        this.speed = speed;
        this.name = name;
        this.level = level;
        this.xp = xp;
        this.yVel = 0;
        this.onGround = true;
    }

    move(speed){
        this.y+=speed;
    }

    jump(){
        this.yVel+=10
    }

    draw(image){
        image(image, width, height)
    }

    update(){

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

function preload() {
    img = loadImage('/image-removebg-preview.png')
    background = loadImage('/background.jpg')
}

function setup() {
  let width = windowWidth;
  let height = windowHeight;
  createCanvas(width, height - 50);

}

    let x = 0;
function draw() {
    x+=10;
    let newX = x%width
    clear();
    image(background, -newX, 0, width, height);
    image(background, width-newX, 0, width, height);
}