var Game_Over = {
    preload: function() {
        // load the needed image for the game screen.
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create: function() {
        // Create button to start game like in Menu
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Add text with information from the last game.
        game.add.text(235, 350, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center"});
    },

    startGame: function() {
        this.state.start('Game');
    }
}
