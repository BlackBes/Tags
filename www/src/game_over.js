var button_end, width, height;


width = screen.width; //window.screen.availWidth;
height = screen.height; //window.screen.availHeight;

var Game_Over = {

    preload : function() {
        // Load the needed image for this game screen.
       game.load.image('gameover', './asset/xhdpi_icon.png');
        game.load.image('game_logo', './asset/logo.png');
        game.load.image('play_again', './asset/play_again.png');
    },

    create : function() {

        // Create button to start game like in Menu.
        button_end = this.add.button((width/2)-(360/2), 0, 'game_logo', this.startGame, this);
        /*button_end.scale.x = (width/600);
        button_end.scale.y = (width/600);*/

        // Add text with information about the score from last game.
        game.add.text((width/2)-(96/2)-40, 420, "WIN MOVES:", { font: "bold 20px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text((width/2)+(96/2)+ 10, 197+220, score.toString(), { font: "bold 24px sans-serif", fill: "#fff", align: "center" });
        button_end = this.add.button((width/2)-(300/2), 520, 'play_again', this.startGame, this);

    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Game');

    }

};