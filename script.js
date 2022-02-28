import gameObjects from "./background.js"
import {enemies, running, flying} from "./enemies.js"
import updateEnemy from "./enemies.js"
import Player from './bart-player.js';
import InputHandler from './bart-input.js'
import isRectCollision,{isRectCircleCollision, isCircleCollision} from './checkCollision.js'
import Explosion from './explosion.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 768; 
    const CANVAS_HEIGHT = canvas.height = 576;
    const player = new Player(canvas.width, canvas.height);
    let score = 0;
    let gameOver = false
    //player variable
    let explosions = [];
    
    let input = new InputHandler();
    
    let lastTime = 0;

    function displayStatusText(ctx){
        ctx.font = '40px Simpsonfont'
        ctx.fillStyle = 'red'
        ctx.fillText('Your score: '+score, 20, 50);
        ctx.fillStyle = 'yellow'
        ctx.fillText('Your score: '+score, 22, 52);
        if(gameOver){
            ctx.textAlign = 'center';
            ctx.fillStyle = 'red';
            ctx.fillText ('GAME OVER, refresh page to try again!', canvas.width/2, 200);
            ctx.fillStyle = 'yellow';
            ctx.fillText ('GAME OVER, refresh page to try again!', canvas.width/2 + 2, 200+2);
        }
    }
    
    function checkCollision(){
        enemies.forEach(object => {
            if(object == running){
                if(isRectCollision(player.x+32, player.y+16, player.rectW, player.rectH, running.x+10, running.y+25, running.rectWidth,running.rectHeight)){
                    gameOver = true;
                }
                else if(player.currentState == player.states[5] && isRectCollision(player.x+64, player.y+32, 16,44, running.x+10, running.y+25, running.rectWidth,running.rectHeight)){
                running.markedForDeletion = true;
                explosions.push(new Explosion(running.x, running.y, running.width));
                }                 
            }
            else if(object == flying){
                if(isRectCircleCollision(player.x+32, player.y+16, player.rectW, player.rectH,flying.x+flying.width/2,flying.y+flying.height/2,flying.circleRadius)){
                    gameOver = true;
                }
                else if(player.currentState == player.states[5] &&
                    isCircleCollision(player.x+player.width/2,player.y+player.height/2,player.hammerRadius, flying.x+flying.width/2,flying.y+flying.height/2,flying.circleRadius)
                    ||isRectCircleCollision(player.x+64, player.y+32, 16,44,flying.x+flying.width/2,flying.y+flying.height/2,flying.circleRadius)){
                    flying.markedForDeletion = true;
                    explosions.push(new Explosion(flying.x, flying.y, flying.width));
                }
            }
        });
    }
    
    function animate(timeStamp){
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        //background
        gameObjects.forEach(object => {
            object.update();
            object.draw(ctx);
        });
        //player
        player.update(input.keys[0]);
        player.draw(ctx, deltaTime);
        //enemy
        updateEnemy(deltaTime);
        explosions.forEach(object => object.update(deltaTime));
        [...explosions,...enemies].forEach(object => object.draw(ctx));
        enemies.forEach(object => {
            if (object.x + object.width < 0){
                score++;
            }
        });
        //check collision
        checkCollision();
        //explosion
        
        
        displayStatusText(ctx);
        if(!gameOver) requestAnimationFrame(animate);
    };
    animate(0);
});
