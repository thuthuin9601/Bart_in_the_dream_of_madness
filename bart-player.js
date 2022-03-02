import { Standing, Skating, SkatingLeft, Jumping, Falling, Attacking, } from "./bart-state.js";
import { Circle, Rect } from "./checkCollision.js";

// console.log(typeof isRectCollision)
export default class Player {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new Standing(this), new Skating(this), new SkatingLeft(this), new Jumping(this), new Falling(this), new Attacking(this)];
        this.currentState = this.states[0];//trùng vị trí ban đầu của nvat
        this.image = document.getElementById('bartImage');
        this.width = 89;
        this.height = 467/6;
        this.x = this.width;
        this.y = this.gameHeight - this.height - 25;
        this.maxFrame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.vy = 0;
        this.weight = 1;
        this.speed = 0;
        this.maxSpeed = 10;
        this.fps = 60;
        this.frameTimer = 0;
        this.timeInterval = 1000/this.fps;
        this.playerRect = new Rect(this.x+32, this.y+24, 32,40);
        this.skateBoard = new Rect(this.x+64, this.y+32, 16,44);
        this.hammer = new Circle(this.x+this.width/2,this.y+this.height/2,45)
    }
    update(input){
        this.currentState.handleInput(input);
        //horizontal move
        this.x += this.speed;
        if(this.x <= 0) {
            this.x = 0;
        }
        else if(this.x >= this.gameWidth - this.width){
            this.x = this.gameWidth - this.width;
        }
        //vertical move
        this.y += this.vy;
        if(!this.onGround()){
            this.vy += this.weight;// khi vy <0 thì nvat sẽ nhảy lên, đạt đỉnh khi vy = 0, vy >0 sẽ đi xuống
        } else {
            this.vy = 0;
        }
        //updateRectangle
        this.playerRect.x = this.x+32;
        this.playerRect.y = this.y+24;
        this.skateBoard.x = this.x+64;
        this.skateBoard.y = this.y+32;
        this.hammer.x = this.x+this.width/2;
        this.hammer.y = this.y+this.height/2;
        //updateSkateBoard
    }  
    draw(context, deltaTime){
        //sprite animation
        if(this.frameTimer > this.timeInterval){
            if(this.frameX < this.maxFrame){
                this.frameX++;
            } else {
                this.frameX = 0;
            }
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        context.drawImage(this.image, this.frameX*this.width, this.frameY*this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        this.playerRect.strokeRectangle(context);
        
        if(this.currentState == this.states[5] && this.onGround()){
            this.skateBoard.strokeRectangle(context);
        }
        else if(this.currentState == this.states[5] && !this.onGround()){
            this.hammer.strokeCircle(context);
        }
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    onGround(){
        return this.y >= this.gameHeight - this.height-25;
     }
}