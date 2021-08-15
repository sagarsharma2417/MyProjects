audio = new Audio('music.ogg');      // defining the audio  and audiogo.
audiogo= new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();     // audio will be played after 1 sec. after user iteracts with the page.
}, 1000);

document.onkeydown = function (e) {   // when key is pressed,
  //console.log("key is: ", e.key);     // return its value of name.

  if (e.key == "ArrowUp") {
    player = document.querySelector(".player");  // select the class player and assign it in player variable.
    player.classList.add("animatePlayer");       // add a css class animatePlayer in the player
    setTimeout(() => {                 // remove the class after 700 ms so that the button can be pressed again.
      player.classList.remove("animatePlayer");
    }, 700);
  }
  if (e.key == "ArrowRight") {
    player = document.querySelector(".player");
    moveRight = parseInt(
      window.getComputedStyle(player, null).getPropertyValue("left")
    );          // get the css property value of the class player and assign it in moveRight.
    player.style.left = moveRight + 80 + "px";   // and move it 80px right. when key is pressed.
  }
  if (e.key == "ArrowLeft") {
    player = document.querySelector(".player");
    moveRight = parseInt(
      window.getComputedStyle(player, null).getPropertyValue("left")
    );
    player.style.left = moveRight - 80 + "px";
  }
};

var score = 0;
cross = true;
setInterval(() => {  // collision detection operation.
  player = document.querySelector(".player");
  gameOver = document.querySelector(".gameOver");
  obstecal = document.querySelector(".obstecal");
  background = document.querySelector(".background");

  playerX = parseInt(
    window.getComputedStyle(player, null).getPropertyValue("left")
  );  // get the css property, left from class, player and assign it in playerX.
  playerY = parseInt(
    window.getComputedStyle(player, null).getPropertyValue("top")
  );

  obstecalX = parseInt(
    window.getComputedStyle(obstecal, null).getPropertyValue("left")
  );
  obstecalY = parseInt(
    window.getComputedStyle(obstecal, null).getPropertyValue("top")
  );

  offsetX = Math.abs(playerX - obstecalX); // subtract the left value of player from left value of obstecal.
  offsetY = Math.abs(playerY - obstecalY);
  // console.log(offsetX,offsetY);

  if (offsetX < 132 && offsetY < 15) {  // if their diff. is less then 132 then gameover.
    gameOver.style.visibility = "visible";
    obstecal.classList.remove("obstecalMove");
    gameName.style.visibility = "hidden";
    audio.pause();
    audiogo.play();
    setTimeout(() => {
        audiogo.pause();  // pause the audio after 3 secs.
    }, 3000);
  }
   else if (offsetX < 134 && cross) {  // else update the score
    score = score + 10;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;  // make cross true again after 1 sec to start over the condition.
    }, 1000);

    setTimeout(() => {
      obsSpeedOld = parseFloat(
        window
          .getComputedStyle(obstecal, null)
          .getPropertyValue("animation-duration") // get the speed of animation on obstecal class.
      );
      obsSpeedNew = obsSpeedOld - 0.2; // and subtract 0.2 secs to make it faster.
    //   console.log("speed is ", obsSpeedNew);   // printing the current speed.
      obstecal.style.animationDuration = obsSpeedNew + "s"; // assinging the new speed to class obstecal.
      maxSpeed=3;
        if (obsSpeedNew<=maxSpeed){  // stop the speed to decrease after a certain point.
            obstecal.style.animationDuration = maxSpeed + "s";  // and assign the last fastest speed.
        }
    }, 500);  // perform this action after 500ms only if condition in else if block is correct. 
  }  // end of else if block..
}, 100);  // end of collision detection operation. that was performing at every 100ms .

function updateScore(score) {
  scores.innerHTML = "Your Score: " + score; // function to update the scores on the main page.
}
