let gamespeed = 2;
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'far-buildings.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'back-buildings.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'foreground.png';
class Layer{
    constructor(image, speedModifier, width){
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = 576;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier
        this.speed = gamespeed*this.speedModifier;
    }
    update(){
        // if(player.currentState = player.states[1]){
        //     this.speed = player.speed*this.speedModifier;
        // }
            this.speed = gamespeed*this.speedModifier;
        
        
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
};
const layer1 = new Layer(backgroundLayer1, 1.5, 768);
const layer2 = new Layer(backgroundLayer2, 2, 768);
const layer3 = new Layer(backgroundLayer3, 2.5, 1056);

const gameObjects = [layer1, layer2, layer3];
export default gameObjects;