var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var game = false;


$(document).keydown(function(){
  if(!game){
    nextSequence();
    game = true;
  }  
});

function nextSequence(){
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#"+randomChosenColour).animate({opacity: 0});
  setTimeout(function(){
      $("#"+randomChosenColour).animate({opacity: 1})
  }, 10);

  playSound(randomChosenColour);
}

$(".btn").click(function(){
  var e = $(this).attr("id");
  userClickedPattern.push(e);
  animatePress(this);
  playSound(e);
  
  checkAnswer(userClickedPattern.length - 1);  
});   


function playSound(name){
  var sound = new Audio("./sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColour){
  $(currentColour).addClass("pressed");
  setTimeout(function(){
      $(currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    var audio = new Audio("./sounds/wrong.mp3")
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function()  {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart")

    startOver();
  }
}

function startOver(){
    level = 0;
    gamePattern = [];
    game = false;
}
