console.log("app.js is ready to start");
let cvs         = document.getElementById("canvas");
let cxt         = cvs.getContext("2d");

let bird        = new Image();
let bg          = new Image();
let fg          = new Image();
let pipeUp      = new Image();
let pipeBottom  = new Image();
let heart       = new Image();

bird.src        = "./assets/flappy_bird_bird.png";
bg.src          = "./assets/flappy_bird_bg.png";
fg.src          = "./assets/flappy_bird_fg.png";
pipeUp.src      = "./assets/flappy_bird_pipeUp.png";
pipeBottom.src  = "./assets/flappy_bird_pipeBottom.png";
heart.src       = "./assets/heart.png";

let fly         = new Audio();
let scoreAudio  = new Audio();
let fall        = new Audio();

fly.src         = "./assets/fly.mp3";
scoreAudio.src  = "./assets/score.mp3";
fall.src        = "./assets/audio_sfx_die.wav";


let xPos =10;
let yPos =150;
let gap = bird.height*4;
let grav = 1;
var score = 0;

function birdUp(e) {
    e = e || window.event
    if(e.keyCode == "38") {
        console.log ("arrow up");
        yPos -= 35;
        fly.play();
    }
    if(e.keyCode == "40") {
        console.log ("arrow Down");
        yPos += 25;
    }
};

let pipes = [];

pipes[0] = {
    x : cvs.width - 1,
    y : 0
};

document.addEventListener('keydown', birdUp);

function draw() {
    console.log("start draw");
    cxt.drawImage(bg, 0, 0);
    cxt.drawImage(bird, xPos, yPos);

    for(let i = 0; i <pipes.length; i++) {
       
        cxt.drawImage(pipeBottom,  pipes[i].x, pipes[i].y + pipeUp.height + gap);
        cxt.drawImage(pipeUp, pipes[i].x, pipes[i].y);
        pipes[i].x --;
   
        for (var k = 0; k < 3; k++) {
            cxt.save();
            cxt.translate(0 + k*30, 0 );
            cxt.drawImage(heart, 180, 0,);
            cxt.restore();
        }  
           
        if(pipes[i].x == 125){
           pipes.push({
            x : cvs.width + 50,
            y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        });
        }

        if( xPos + bird.width >= pipes[i].x 
            &&
            xPos <= pipes[i].x + pipeUp.width
            &&
            (yPos <= pipes[i].y + pipeUp.height 
            ||
            yPos + bird.height >= pipes[i].y + pipeUp.height + gap)
            ||
            yPos + bird.height >= cvs.height - fg.height) {
            fall.play();
                if(fall.play){
                   setTimeout(() => {
                        location.reload()
                    }, 500);
                }
            
        }
        

            if (pipes[i].x == 5) {
                score++;
                scoreAudio.play();
            }
    }
    
    cxt.drawImage(fg, 0, cvs.height - fg.height);
    
    
    yPos = yPos + grav;
    
    cxt.fillStyle = "#000";  
    cxt.font = "20px Verdana";  
    cxt.fillText("Score : "+score,10,cvs.height-20);    

    requestAnimationFrame(draw);
};
 
    
pipeBottom.onload = draw;