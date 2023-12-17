userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var startStatus = 0;

function playSound(name) {
    var sound = new Audio ("sounds/" + name + ".mp3");
    sound.play();
}

function nextSequence() {
    level++;
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
        
    }
    else
    {
        $("body").addClass("game-over");
        var sound = new Audio ("sounds/wrong.mp3");
        sound.play();
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startover();
    }

}

function startover() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    startStatus = 0;
}

$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour); 
    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length - 1);
});


$(document).on("keypress", function () {
        if(startStatus == 0)
        {
            startStatus = 1;
            nextSequence();
        }
});