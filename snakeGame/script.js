let inputDir = {x: 0, y: 0};   //variable
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snake = [                       //snake is a array
    {x: 13, y: 15 }
]
food = {x: 6, y: 7};                  //food is not array

//functions
function main(ctime){                          //ctime- current time
    window.requestAnimationFrame(main);        //we call it in function so it works again and again
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed) {
       return;
    }                                             //if last time less than 0.5(spped) so do not render that is return until condition is false
    lastPaintTime = ctime;
    gameEngine();                                 //method
}
function isCollide(Sbody){
    //if snake bump in itself
    for(let i = 1; i <snake.length; i++){
        if(Sbody[i].x === Sbody[0].x && Sbody[i].y === Sbody[0].y){
            return true;
        }
    }
    //if in the wall
        if(Sbody[0].x >= 18 || Sbody[0].x <=0 || Sbody[0].y >= 18 || Sbody[0].y <=0 ){
            return true;
        }
    
}

function gameEngine(){                             //1- update the snake array & food , 2- display the snake and food
     if(isCollide(snake)){                        //if we get out 
        inputDir = {x: 0, y:0};
        alert("Game Over ....Press any key to continue!!");
        snake = [{x: 13, y:15}];
        score = 0;

     }
     //if you have eating ,increment score and regnerate food
     if(snake[0].y === food.y && snake[0].x ===food.x){
          score +=1;
        //    for high score
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "HiScore: " +hiscoreval; 
        }
          scoreBox .innerHTML = "Score:" + score;
        snake.unshift({x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y});
        let a= 2;
        let b= 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
     }

     // for moving the snake
     for(let i=snake.length -2;i>=0;i--){
        snake[i+1] = {...snake[i]};                        //to create a new object we use tripple dot
     }

     snake[0].x += inputDir.x; 
     snake[0].y += inputDir.y; 

      box.innerHTML = "";
      //display snake
      snake.forEach((e, index)=>{
      snakeElement = document.createElement('div');         //new element
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;                      
      if(index == 0){
      snakeElement.classList.add('head');                       //so at start also the head of snake is visible
      }
      else{
        snakeElement.classList.add('Sbody');                    //body of snake
      }
      box.appendChild(snakeElement);                          //append element(child) in parent(box)

});
//display food
    foodElement = document.createElement('div');         //new element
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);                          //append element(child) in parent(box)

}





//main logic
 let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
   localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " +hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{                        //whenever someone presses a key.this method will run
    inputDir = {x: 0, y: 1}//game start
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
             break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }


});
