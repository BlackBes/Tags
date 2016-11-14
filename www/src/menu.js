var button;

var Menu = {
    init: function () {
        // set up input max pointers
        this.input.maxPointers = 1;
        // set up stage disable visibility change
        this.stage.disableVisibilityChange = true;
        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        //this.scale.pageAlignHorizontally = true;
        
        this.scale.pageAlignVertically = true;
        
        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape. 
        // * Set second to true to force portrait.
        
        this.scale.forceOrientation(false, true);
        
        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this 
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        this.scale.setResizeCallback(this.gameResized, this);
        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        this.scale.updateLayout(true);
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        this.scale.refresh();

    },
    preload : function() {
        // Load all the needed resources for the menu.
        game.load.image('game_logo', './asset/logo.png');
        game.load.image('play_again', './asset/play.png');
        game.load.image('about', './asset/about.png');
    },
 
    create: function () {

        // Add menu screen.
        // It will act as a button to start the game
        button = this.add.button((width/2)-(360/2), 0, 'game_logo', this.startGame, this);
        game.stage.backgroundColor = '#061f27';
        button = this.add.button((width/2)-(300/2), 470, 'play_again', this.startGame, this);
        button = this.add.button((width/2)-(300/2), 550, 'about', this.aboutGame, this);
        button.scale.x = (0.5);
        button.scale.y = (0.5);
    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    },
    
    aboutGame: function () {

        // Change the state to the actual game.
        this.state.start('About');

    }

};