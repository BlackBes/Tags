(function () {
    var width, height;

    width = screen.width; //window.screen.availWidth;
    height = screen.height; //window.screen.availHeight;

    /*game = new Phaser.Game(width, height, Phaser.AUTO, '');*/
    
    /* globals Phaser:false, BasicGame: false */
    //  Create your Phaser game and inject it into the game div.
    //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    //  We're using a game size of 480 x 640 here, but you can use whatever you feel makes sense for your game of course.
    game = new Phaser.Game(width, height, Phaser.AUTO, 'game');

    //  Add the States your game has.
    //  You don't have to do this in the html, it could be done in your Game state too, but for simplicity I'll keep it here.
    game.state.add('Game', BasicGame.Game);
    game.state.add('Menu', Menu);
    game.state.add('Game_Over', Game_Over);
    game.state.add('About', About);

    //  Now start the Game state.
    game.state.start('Menu');

})();