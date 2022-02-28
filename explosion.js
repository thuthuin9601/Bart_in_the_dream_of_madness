
export default class Explosion{
    constructor(x, y, size){
        this.image = new Image();
        this.image.src = 'explosion.png';
        this.spriteWidth = 965/7;
        this.spriteHeight = 136;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 100;
        this.markedForDeletion = false;
    }
    update(deltatime){
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval){
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 5){
                this.markedForDeletion = true;
            }
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.size, this.size);
    }
}