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
    }

    move(speed){
        this.y+=speed;
    }

    draw(){

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

