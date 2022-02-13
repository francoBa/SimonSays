const buttonColours = ['red', 'blue', 'green', 'yellow'];

let level = 0,
    gamePattern = [],
    userClickedPattern = [];

function nextSequence() {
    const randomNumber = Math.round(Math.random() * 3),
        randomChosenColour = buttonColours[randomNumber];
    
    level++;

    $('h1').text('Level ' + level);

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function checkAnswer(currentLevel) {
    // console.log(gamePattern[currentLevel], userClickedPattern[currentLevel]);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === currentLevel + 1) {
            // console.log('success');
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        // console.log('wrong');
        const SOUND = new Audio('./sounds/wrong.mp3');
        SOUND.play();

        $('body').addClass('game-over');

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        $('h1').text('Game Over, Press Any Key to Restart');

        startOver();
    }
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(() => {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

function playSound(name) {
    $('#' + name).fadeIn(100).fadeOut(100).fadeIn(100);

    const SOUND = new Audio('./sounds/' + name + '.mp3');
    SOUND.play();
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

$(document).keydown(function() {
    if ($('h1').text() === 'Press A Key to Start' || $('h1').text() === 'Game Over, Press Any Key to Restart') {
        nextSequence();
    }
});

$('button').click(function(e) {
    if ($('h1').text() !== 'Press A Key to Start' && $('h1').text() !== 'Game Over, Press Any Key to Restart') {
        // console.log(e);
        const userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);
        // console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
});