import gameObjects from "./background.js"
import {enemies, modifyenemyInterval} from "./enemies.js"
import updateEnemy from "./enemies.js"
import Player from './bart-player.js';
import InputHandler from './bart-input.js'
// import isRectCollision,{isRectCircleCollision, isCircleCollision} from './checkCollision.js'
import {isCircleCollision, isCircleRectCollision} from './checkCollision.js'
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
            // if(object == running){
                if(isCircleRectCollision(object.enemyCircle,player.playerRect)){
                    gameOver = true;
                }
                else if (player.currentState == player.states[5] && player.onGround()
                && isCircleRectCollision(object.enemyCircle,player.skateBoard)){
                    object.markedForDeletion = true;
                    explosions.push(new Explosion(object.x, object.y, object.width));
                }
                else if (player.currentState == player.states[5] && !player.onGround()
                && isCircleCollision(object.enemyCircle,player.hammer)){
                    object.markedForDeletion = true;
                    explosions.push(new Explosion(object.x, object.y, object.width));
                }
        });
    }
    
    function animate(timeStamp){
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        //background
        gameObjects.forEach(object => {
            if(player.currentState == player.states[1]||player.currentState == player.states[5] && player.speed>0){
                object.speed = player.speed+object.speedModifier;
            }
            else if(player.currentState == player.states[2]){
                object.speed = object.speedModifier/2;
            }
            else{
                object.speed = object.speedModifier
            }
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
        //level
        if(score >= 20){
            modifyenemyInterval(1500);
        }
        else if(score >= 40){
            modifyenemyInterval(1200);
        }
        else if(score >= 60){
            modifyenemyInterval(1000);
        }
        else if(score >= 100){
            modifyenemyInterval(800);
        }
        //check collision
        checkCollision();
        //explosion
        displayStatusText(ctx);
        if(!gameOver) {
            requestAnimationFrame(animate);
        }
    };
    animate(0);
   
});
