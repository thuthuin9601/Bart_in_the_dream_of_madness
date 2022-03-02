import { Rect, Circle } from "./checkCollision.js";
const CANVAS_WIDTH = 768;
const CANVAS_HEIGHT = 576;

let enemyInterval = 1500;
let enemyTimer = 0;
export function modifyenemyInterval( value ) { enemyInterval = value }


const flyingDino = new Image();
flyingDino.src = 'flying dino.png';

const runningDino = new Image();
runningDino.src = 'running dino.png';

export let enemies = [];

const enemyTypes = ['running','flying'];

class Enemy {
    constructor(){
        this.gameWidth = CANVAS_WIDTH;
        this.gameHeight = CANVAS_HEIGHT;
        this.markedForDeletion = false;
        this.frameX=0;
       
        this.fps = 60;
        this.frameInterval = 1000/this.fps;// có thể chia fps
        this.frameTimer = 0;
    }
    update(deltaTime){
        this.x -= this.speed*deltaTime; 
        //remove enemies
        if (this.x + this.width < 0){
            this.markedForDeletion = true;
        }
        if (this.frameTimer > this.frameInterval){
            if (this.frameX < this.maxFrame){
                this.frameX++
                this.frameTimer = 0;
            }
            else {
                this.frameX = 0;
            }
        }
        else{
            this.frameTimer += deltaTime;
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frameX* this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export class RunningDino extends Enemy {
    constructor(){
        super();
        this.maxFrame = 7; //tí phải đổi
        this.spriteWidth = 94.5;
        this.spriteHeight = 72;
        this.x = this.gameWidth;
        this.y =this.gameHeight - this.spriteHeight-25;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.speed = Math.random()*0.1 + 0.1;
        this.image = runningDino;
        this.enemyCircle = new Circle(this.x+this.width/2,this.y+this.height/2+20, this.width/2-15)
    }
    update(deltaTime){
        super.update(deltaTime);
        this.enemyCircle.x = this.x+this.width/2;
    }
    draw(ctx){
        super.draw(ctx);
        this.enemyCircle.strokeCircle(ctx);
    }
};
class FlyingDino extends Enemy {
    constructor(){
        super();
        this.maxFrame = 6; //tí phải đổi
        this.spriteWidth = 1200/7;
        this.spriteHeight = 151;
        this.x = this.gameWidth;
        this.y =this.gameHeight-this.gameHeight*(Math.random()*0.5+0.2)
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.speed = Math.random()*0.1 + 0.1;
        this.image = flyingDino;
        this.angle = 2;
        this.curve = Math.random() * 10;
        this.enemyCircle = new Circle(this.x+this.width/2,this.y+this.height/2,this.width/2-25);
    }
    update(deltaTime){
        super.update(deltaTime);
        this.y += Math.sin(this.angle)* this.curve;
        this.angle += 0.1;
        this.enemyCircle.x = this.x+this.width/2;
        this.enemyCircle.y = this.y+this.height/2;
    }
    draw(ctx){
        super.draw(ctx);
        this.enemyCircle.strokeCircle(ctx);
    }
};

function updateEnemy(deltaTime){
    enemies =  enemies.filter(object => !object.markedForDeletion)   
    if(enemyTimer>enemyInterval){
        addNewEnemy();
        enemyTimer = 0;

        console.log(enemies);
    }
    else {
        enemyTimer+=deltaTime;
    }
    enemies.forEach(object => object.update(deltaTime));
}

export let running;
export let flying;
export default updateEnemy;

function addNewEnemy(){
    running = new RunningDino();
    flying = new FlyingDino();
    let randomEnemy = enemyTypes[Math.floor(Math.random()*enemyTypes.length)];
    if (randomEnemy == 'running'){
        enemies.push(running);
    }
    else if (randomEnemy == 'flying'){
        enemies.push(flying);
    }
}
