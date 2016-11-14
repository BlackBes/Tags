var button_;

var About = {

    preload : function() {
        // Load all the needed resources for the menu.
        game.load.image('studio_logo', './asset/studio_logo.png');
        game.load.image('back', './asset/back.png');
    },
 
    create: function () {

        // Add menu screen.
        // It will act as a button to start the game.
        button_ = this.add.button((width/2)-(360/2), 0, 'studio_logo', this.backToGame, this);
        game.stage.backgroundColor = '#061f27';
        button_.scale.x = (0.28125);
        button_.scale.y = (0.28125);
        
        textStyle_Key = { font: "bold 18px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 22px sans-serif", fill: "#fff", align: "center" };
        
        game.add.text((width/2)-(300/2)-20, 220, "Developed by GLStudio", textStyle_Key);
        game.add.text((width/2)-(300/2)-20, 250, "Version: ", textStyle_Key);
        game.add.text((width/2)-(300/2)+60, 248, "0.9", textStyle_Value);
        game.add.text((width/2)-(300/2)-20, 280, "© 2016 GLStudio All Rights Reserved", textStyle_Key);
        
        button = this.add.button((width/2)-(300/2), 520, 'back', this.backToGame, this);

    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    },
    
    backToGame: function () {

        // Change the state to the actual game.
        this.state.start('Menu');

    }

};