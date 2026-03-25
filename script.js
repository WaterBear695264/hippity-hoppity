class Player {
    constructor(x, y, dead, money, jumpHeight, speed, name, level, xp, width, height){
        this.y = y;
        this.dead = dead;
        this.money = money
        this.jumpHeight = jumpHeight;
        this.speed = speed;
        this.name = name;
        this.level = level;
        this.xp = xp;
        this.yVel = 0;
        this.x = x
        this.onGround = false;
        this.gravity = 0.5;
        this.width = width;
        this.height = height
    }

    move(){
        this.y+=this.yVel;
    }

    jump(){
        if(this.onGround){
            this.yVel-=this.jumpHeight
        }

    }

    draw(img){
        image(img, this.x, this.y, this.width, this.height)
    }

    applyPhysics() {
        this.yVel += this.gravity;
        this.y += this.yVel;

        // Ground collision (height - 150 accounts for sprite size)
        let groundY = height *5/6; 
        if (this.y >= groundY- this.height*4/5) {
            this.y = groundY-this.height*4/5;
            this.yVel = 0;
            this.onGround = true;
            this.gravity = 0.5
        }else{
            this.onGround = false;
        }
    }

    update(img){
        if(!this.dead){
        this.draw(img);
        this.applyPhysics()
        }
    }

    fastFall(){
        this.gravity*=3
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
    constructor(numSpikes, arrOfSize, x, y, width, height){
        this.numSpikes = numSpikes;
        this.arrOfSize = arrOfSize;
        this.arrOfSpikes = [];
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    createArr(){
        let offset = 0; 
        for(let i = 0; i < this.arrOfSize.length; i++){
            if(i!== 0){
                offset += this.width*this.arrOfSize[i-1]
                this.arrOfSpikes.push(new Spike(this.x + offset, this.y - this.height*this.arrOfSize[i], this.height*this.arrOfSize[i], this.width*this.arrOfSize[i]))
            }else{
                this.arrOfSpikes.push(new Spike(this.x, this.y - this.height*this.arrOfSize[i], this.height*this.arrOfSize[i], this.width*this.arrOfSize[i]))
            }
            
        }
    }

    updateSpikes(img){
        for(let i = 0; i < this.arrOfSpikes.length; i++){
            this.arrOfSpikes[i].update(img)
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
    spikeImage = loadImage('/spike.png')
    rabbit = loadImage('/rabbit.png')
}

function spawnSpikes(arr, random, timer){
    timer++;
    if(random === 0 && timer > 150){
        let spikeArrange = new spikeArrangement(4, [1, 1, 1, 1], width*1.4, height*5/6, width/30, height/15);
        spikeArrange.createArr()
        arr.push(spikeArrange)
        timer = 0;
    }else if(random === 1 && timer > 150){
        let spikeArrange = new spikeArrangement(4, [0.7, 2, 2, 0.7], width*1.4, height*5/6, width/30, height/15);
        spikeArrange.createArr()
        arr.push(spikeArrange)
        timer = 0;
    }
    console.log(timer, random)
    return timer;
}

function deleteSpikes(arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].arrOfSpikes[0].x < width*(-1/2)){
            arr.splice(i, 1)
        }
    }
}

function updateAllSpikes(arr, img){
    if(arr[0] !== undefined){
    for(let i = 0; i < arr.length; i++){
        arr[i].updateSpikes(img);
    }
}
}

function checkCollisions(arr, mainCharacter){
    for(let i = 0; i < arr.length; i++){
        let spikes = arr[i].arrOfSpikes;
        for(let j = 0; j < spikes.length;j++){
            let spike = spikes[j];
            if(mainCharacter.x < spike.x + spike.width && mainCharacter.x + mainCharacter.width*3/5 > spike.x && mainCharacter.y < spike.y + spike.height && mainCharacter.y + mainCharacter.height*3/5 > spike.y){
                mainCharacter.dead = true;
            }
        }
    }
}

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
    mainCharacter = new Player(100, 100, false, 0, height/60, 0, "asdfasdf", 0, 0, width/10, height/10)
}
    let screenSpeed = 10;
    let x = 0;
    let spike = new Spike(1000, 100, 100, 100)
    let spikeArray = [];
    let score = 0;
    let timer = 0;
function draw() {
    let rand = Math.floor(random(0, 100))
    if(mainCharacter.dead){
        screenSpeed = 0;
    }else{
        x+=screenSpeed ;
        screenSpeed+=0.01;
    }
    let newX = x % width
    clear();
    image(background, -newX, 0, width, height);
    image(background, width-newX, 0, width, height);
    mainCharacter.update(rabbit)
    mainCharacter.x = width/4;
    timer = spawnSpikes(spikeArray, rand, timer);
    updateAllSpikes(spikeArray, spikeImage);
    checkCollisions(spikeArray, mainCharacter)
    deleteSpikes(spikeArray)
    score++; 
    text('SCORE: ' + score, 50, 50);
}

function keyPressed() {
  if (key === 'w') {
    mainCharacter.jump();
  }
  if(key === 's'){
    mainCharacter.fastFall();
  }

}