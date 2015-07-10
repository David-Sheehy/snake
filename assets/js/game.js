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
        // Handle arrow key presses, while not allowing illegal direction
        // changes.
        
        if (cursors.right.isDown && direction != 'left') {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction != 'right') {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction != 'down') {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction != 'up') {
            new_direction = 'down';
        }

        // speed is calculated based on score
        speed = Math.min(10, Math.floor(score / 5));
        speedTextValue.text = '' + speed;

        // increase the delay counter
        updateDelay++;
        if (updateDelay % (10 - speed) == 0) { 
            // snake movement
            var firstCell = snake[snake.length - 1];
            var lastCell = snake.shift();
            var oldLastCellx = lastCell.x;
            var oldLastCelly = lastCell.y;


            if (new_direction ) {
                direction = new_direction;
                new_direction = null;
            }


            // Change the last cell's coordinates relative to the head of the
            // snake, according to the direction.
            if(direction == 'right') {
                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if (direction == 'left') {
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if (direction == 'up') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if (direction == 'down') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }

            // Place the last cell in the front of the stack.
            // mark it as the first cell
            snake.push(lastCell);
            firstCell = lastCell;
            // end of snake movement

            if(addNew) {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }

            // check for collisions
            this.appleCollision();
            this.selfCollision(firstCell);
            this.wallCollision(firstCell);

        }
    },

    appleCollision: function() {
        // check if any part of the snake is overlapping the apple.
        // this is needed if the apple spanws inside the snake.
        for (var i = 0; i < snake.length; ++i) {
            if(snake[i].x == apple.x && snake[i].y == apple.y) {
                addNew = true;
                apple.destroy();
                this.generateApple();
                score++;
                scoreTextValue.text = score.toString();
            }
        }
    },

    selfCollision: function(head) {
        // check if the head of the snake overlaps with any part of the snake.
        for (var i = 0; i < snake.length; ++i ) {
            if(head.x == snake[i].x && head.y == snake[i].y && head != snake[i]) { 
                game.state.start('Game_Over');
            }
        }
    },

    wallCollision: function(head) {
        if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0) {
            game.state.start('Game_Over');
        }
    },

    generateApple: function() {
        var randomX = Math.floor(Math.random() * 40) * squareSize;
        var randomY = Math.floor(Math.random() * 30) * squareSize;

        // Add new apple.
        apple = game.add.sprite(randomX, randomY, 'apple');
    }
};
