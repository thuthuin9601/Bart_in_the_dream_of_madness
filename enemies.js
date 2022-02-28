const CANVAS_WIDTH = 768;
const CANVAS_HEIGHT = 576;

let enemyInterval = 2000;
let enemyTimer = 0;


const flyingDino = new Image();
flyingDino.src = 'flying dino.png';
const jumpingSpider = new Image();
jumpingSpider.src = 'spider.png';
const runningDino = new Image();
runningDino.src = 'running dino.png';

export let enemies = [];

const enemyTypes = ['running','flying','jumping'];

class Enemy {
    constructor(){
        this.gameWidth = CANVAS_WIDTH;
        this.gameHeight = CANVAS_HEIGHT;
        this.markedForDeletion = false;
        this.frameX=0;
       
        // this.fps = 20;
        this.frameInterval = 100;// có thể chia fps
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
        // this.rectX = this.x+10;
        // this.rectY = this.y+25;
        this.rectWidth = 70;
        this.rectHeight = 42;
        // console.log(this.rectX);
    }
    update(deltaTime){
        super.update(deltaTime);
    }
    draw(ctx){
        super.draw(ctx);
        ctx.strokeRect(this.x+10, this.y+25, this.rectWidth,this.rectHeight);
    }
};
class FlyingDino extends Enemy {
    constructor(){
        super();
        this.maxFrame = 6; //tí phải đổi
        this.spriteWidth = 1200/7;
        this.spriteHeight = 151;
        this.x = this.gameWidth;
        this.y =this.gameHeight*Math.random() *0.6;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.speed = Math.random()*0.1 + 0.1;
        this.image = flyingDino;
        this.angle = 0;
        this.curve = Math.random() * 3;
        this.circleRadius = this.width/2-25;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.y += Math.sin(this.angle)* this.curve;
        this.angle += 0.1;
    }
    draw(ctx){
        super.draw(ctx);
        ctx.beginPath();
        ctx.arc(this.x+this.width/2,this.y+this.height/2,this.circleRadius,0,Math.PI*2)
        ctx.stroke();
    }
};
class JumpingSpider extends Enemy {
    constructor(){
        super();
        this.maxFrame = 7; 
        this.spriteWidth = 1254/8;
        this.spriteHeight = 91;
        this.x = this.gameWidth;
        this.y =this.gameHeight*Math.random() *0.6;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.speed = Math.random()*0.1 + 0.1;
        this.image = jumpingSpider;
        this.vy = 0;
        this.weight = 1;
        this.rectWidth = 70;
        this.rectHeight = 25;
        this.circleRadius = this.width/2-40
    }
    update(deltaTime){
        super.update(deltaTime);
        this.y += this.vy;
        if(this.y < this.gameHeight - this.height - 25){
            this.vy += this.weight;// khi vy <0 thì nvat sẽ nhảy lên, đạt đỉnh khi vy = 0, vy >0 sẽ đi xuống
        } else {
            this.vy = -15;
        }
    }
    draw(ctx){
        super.draw(ctx);
        ctx.beginPath();
        ctx.arc(this.x+this.width/2-15,this.y+this.height/2+10,this.circleRadius,0,Math.PI*2);
        ctx.stroke();
        ctx.strokeRect(this.x+70, this.y+42, this.rectWidth,this.rectHeight);
    }
};
function updateEnemy(deltaTime, ctx){
    enemies =  enemies.filter(object => !object.markedForDeletion)   
    if(enemyTimer>enemyInterval){
        addNewEnemy();
        enemyTimer = 0;

        // console.log(enemies);
    }
    else {
        enemyTimer+=deltaTime;
    }
    enemies.forEach(object => object.update(deltaTime));
}
export default updateEnemy;
// function draw(){
//     enemies.forEach(object => object.draw(ctx));
// }
export let running;
export let flying;
export let jumping;
function addNewEnemy(){
    running = new RunningDino();
    flying = new FlyingDino();
    jumping = new JumpingSpider();
    let randomEnemy = enemyTypes[Math.floor(Math.random()*enemyTypes.length)];
    if (randomEnemy == 'running'){
        enemies.push(running);
    }
    else if (randomEnemy == 'flying'){
        enemies.push(flying);
    }
    else if (randomEnemy == 'jumping'){
        enemies.push(jumping);
    }
}
