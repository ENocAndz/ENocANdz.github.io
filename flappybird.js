//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImage;

let bird = {
    x : birdX,
    y : birdY,
    width: birdWidth,
    height: birdHeight
}

// pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; 
let velocityY = 0;
let gravity = 0.3;

let gameOver = false;
let gameWin = false;
let score = 0;
let gameStarted = false;
let gameVisible = false;



window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    board.style.display = "none";
    board.style.position = "fixed";
    board.style.top = "50%";
    board.style.left = "50%";
    board.style.transform = "translate(-50%, -50%)";
    board.style.border = "2px solid black";
    board.style.zIndex = 0;

    // Add event listener to show canvas with key combination
    document.addEventListener("keydown", (event) => {
        if (event.shiftKey && event.code === "KeyS") {
            board.style.display = "block"; // Show the canvas
            console.log("Game canvas revealed!");
            if(gameVisible == false ) {
                gameVisible = true;
            } else {
                gameVisible = false;
                board.style.display = "none";
                return;
            }
            

        }
    });
    context.fillStyle = "white";
    context.font = "30px san-serif";
        context.fillText("Press Space bar to play", 10,120);

    //load images
    birdImg = new Image();
    birdImg.src = "./img/bird1.png";
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, birdWidth, bird.height);
    }
    topPipeImg = new Image();
    topPipeImg.src = "./img/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./img/bottompipe.png";

    
    document.addEventListener("keydown", startGame);
}

function startGame(event) {
    if (!gameVisible || gameStarted) return; // Prevent starting the game if not visible or already started
    if (event.code === "Space" || event.code === "ArrowUp") {
        if(gameVisible) event.preventDefault();  
        gameStarted = true;
        document.removeEventListener("keydown", startGame); // Remove start listener
        document.addEventListener("keydown", moveBird); // Add move listener
        animationFrameId = requestAnimationFrame(update);
        pipeIntervalId = setInterval(placePipes, 1500);
    }
}

function update(){
    requestAnimationFrame(update);
    if(score == 10){
        gameWin = true;
        context.fillStyle = "yellow";
        context.font = "45px san-serif";
        context.fillText("YOU WIN",5,200);
        return;
    }
    if(gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocityY += gravity;
    bird.y =  Math.max(bird.y + velocityY,0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height){
        gameOver = true;
    }

    //pipes 
    for (let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5;
            pipe.passed = true;
        }
        if(detectCollision(bird,pipe)){
            gameOver = true;
        }
    }
    

    //clear pipes
    while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift();
    }
    context.fillStyle = "white";
    context.font="45px san-serif";
    context.fillText(score, 5, 45);
    

    if (gameOver){
        context.fillText("GAME OVER",5,90);
        context.font = "15px san-serif";
        context.fillText("Press Space bar to play", 10,120);
    }
    
}

function placePipes(){
    if(gameOver || gameWin){
        return;
    }
    
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;
    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height:pipeHeight,
        passed:false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height:pipeHeight,
        passed:false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(event) {
    if(event.code == "Space" || event.code == "ArrowUp" || event.code == "KeyX"){
       if (gameVisible) {
           event.preventDefault();   
        }
        velocityY = -6;      
    }
    if(gameOver || gameWin){
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false; 
        gameWin = false;
    }
    

}

function detectCollision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

