var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue,
    textStyle_Key, textStyle_value;

var Game = {
    preload: function() {
        // Load the resources needed for the level.
        game.load.image('snake', './assets/images/snake.png');
        game.load.image('apple', './assets/images/apple.png');
    },

    create: function() {
        // Set the global variables.
        // These need to be global so the update function can alter them.
        snake = [];
        apple = {};
        squareSize = 15;
        score = 0;
        speed = 0;
        updateDelay = 0;
        direction = 'right';
        new_direction = null;       // A buffer to store the new direction
        addNew = false;

        // Set up a Phaser controller for keyboard input
        cursors = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#061f27';

        // Generate the initial snake stack.
        // Starting at x=150 y = 150 and increasing the x on every iteration.
        for(var i = 0; i < 10; ++i) {
            snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake');
        }

        this.generateApple();

        // Add text to top of game
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

        // Score.
        game.add.text(30,20,"SCORE", textStyle_Key);
        scoreTextValue = game.add.text(90,18, score.toString(), textStyle_Value);   
        // Speed.
        game.add.text(500,20, "SPEED", textStyle_Key);
        speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value);
    },


    update: function() {
        // left empty for now
    },

    generateApple: function() {
        var randomX = Math.floor(Math.random() * 40) * squareSize;
        var randomY = Math.floor(Math.random() * 30) * squareSize;

        // Add new apple.
        apple = game.add.sprite(randomX, randomY, 'apple');
    }
};
