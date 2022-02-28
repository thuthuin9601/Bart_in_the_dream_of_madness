export const states = {
    STANDING: 0,
    SKATING: 1,
    SKATING_LEFT: 2,
    JUMPING: 3,
    FALLING: 4,
    ATTACKING: 5,
    // DIZZY: 6,
}
class State {
    constructor(state){
        this.state = state;
    }
};
export class Standing extends State {
    constructor(player){
        super('STANDING');
        this.player = player;
    };
    enter(){
        if(this.player.onGround()){
            this.player.frameY = 0;
            this.player.maxFrame = 5;
        }
        if(!this.player.onGround()){
            this.player.frameY = 1;
            this.player.maxFrame = 0;
        }
        this.player.speed = 0;
    };
    handleInput(input){
        if(input === 'ArrowRight'){
            this.player.setState(states.SKATING);
        }
        else if(input === 'ArrowLeft'){
            this.player.setState(states.SKATING_LEFT);
        }
        else if(input === 'ArrowUp'){
            this.player.setState(states.JUMPING);
        }
        else if (this.player.vy > 0){
            this.player.setState(states.FALLING);
        }
        else if(input === 'x'){
            this.player.setState(states.ATTACKING);
        }
    };
};
export class Skating extends State {
    constructor(player){
        super('SKATING');
        this.player = player;
    };
    enter(){
        if(this.player.onGround()){
            this.player.frameY = 0;
            this.player.maxFrame = 5;
        }
        if(!this.player.onGround()){
            this.player.frameY = 1;
            this.player.maxFrame = 0;
        }
        this.player.speed = this.player.maxSpeed;
    };
    handleInput(input){
        if(input === 'none' ){
            this.player.setState(states.STANDING);
        }
        else if (this.player.vy > 0){
            this.player.setState(states.FALLING);
        }
        else if(input === 'x'){
            this.player.setState(states.ATTACKING);
        }
    };
};
export class SkatingLeft extends State {
    constructor(player){
        super('SKATING');
        this.player = player;
    };
    enter(){
        if(this.player.onGround()){
            this.player.frameY = 0;
            this.player.maxFrame = 0;
        }
        if(!this.player.onGround()){
            this.player.frameY = 1;
            this.player.maxFrame = 0;
        }
        this.player.speed = -this.player.maxSpeed;
        
        
    };
    handleInput(input){
        if(input === 'none' ){
            this.player.setState(states.STANDING);
        }
        else if (this.player.vy > 0){
            this.player.setState(states.FALLING);
        }
        else if(input === 'x'){
            this.player.setState(states.ATTACKING);
        }
    };
};
export class Jumping extends State {
    constructor(player){
        super('JUMPING');
        this.player = player;
    };
    enter(){
        this.player.maxFrame = 0;
        this.player.frameY = 1;
        if(this.player.onGround()){
            this.player.vy -= 20;
        }
    };
    handleInput(input){
        if(input === 'none' ){
            this.player.setState(states.STANDING);
        }
        else if(this.player.vy > 0 && input !== 'x'){
            this.player.setState(states.FALLING);
        }
        else if(this.player.vy > 0 && input === 'x'){
            this.player.setState(states.ATTACKING);
        }
    };
};
export class Falling extends State {
    constructor(player){
        super('FALLING');
        this.player = player;
    };
    enter(){
        this.player.maxFrame = 0;
        this.player.frameY = 2;
    };
    handleInput(input){
        if(this.player.onGround()){
            this.player.setState(states.STANDING);
        }
    };
};
export class Attacking extends State {
    constructor(player){
        super('ATTACKING');
        this.player = player;
    };
    enter(){
        this.player.maxFrame = 2;
        if(this.player.onGround()){
            this.player.frameY = 3;
        }
        else if(!this.player.onGround()){
            this.player.frameY = 4;
        }
    };
    handleInput(input){
        if(input === 'none' ){
            this.player.setState(states.STANDING);
        }
    };
};