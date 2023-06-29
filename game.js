var buttonColours = ["red", "blue", "green", "yellow", 12];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function nextSequence(){
    level += 1;
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);
}

function playSound(name){
    var link = "./sounds/" + name + ".mp3";
    var audio = new Audio(link);
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 50);
}

$("html").on("keypress", function(event){
    console.log(event);
    if (gamePattern.length === 0){
        $("h1").html("Level 0");
        nextSequence();
    }
})

function checkIfCorrect(){
    if (gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]){
        return true;
    }
    return false;
}

$(".btn").on("click", function(){
    var userChosenColour = this.id;
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    if (!checkIfCorrect()){
        gamePattern = [];
        level = 0;
        userClickedPattern = [];
        $("h1").html("Game over! Click any key to restart");
        var audio = new Audio("sounds/wrong.mp3");
          audio.play();
        $("body").addClass("game-over");
        setTimeout(function (){$("body").removeClass("game-over")}, 200);
    }
    else if (gamePattern.length === userClickedPattern.length){
        userClickedPattern = [];
        setTimeout(function(){nextSequence();}, 1000);
    }
});
