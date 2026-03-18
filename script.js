let width = windowWidth;
let height = windowHeight;
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

    draw(){
        image(img, width, height)
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
}

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
}

function draw() {
  background(240); // Light gray background
}