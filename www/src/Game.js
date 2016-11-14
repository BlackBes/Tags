/* globals Phaser:false */
// create BasicGame Class
var width, height, coord_start, deck, gen_loop, clean_cell, cell_size, rand_find, x_now, y_now, temp, new_swipe, score, animate_frame, is_animate, animate_cell, dir;
width = screen.width; //window.screen.availWidth;
height = screen.height; //window.screen.availHeight;

BasicGame = {

};

// create Game function in BasicGame
BasicGame.Game = function (game) {
};

// set Game function prototype
BasicGame.Game.prototype = {

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

    preload: function () {

        // Here we load the assets required for our preloader (in this case a 
        // background and a loading bar)
        this.load.image('logo', 'asset/phaser.png');
        this.load.image('deck', 'asset/deck.png');
        
        for(var i=1; i<=15; i++) {
            this.load.image('d_'+i, 'asset/d_'+i+'.png');
        }
    },

    create: function () {
        
        function random(min,max,l){
        var arr = [],m = [],n = 0;
        if (max - min < l-1) return;
        for (var i=0; i<=(max-min); i++){
            m[i] = i + min;
        }
        for (var u=0; u<l; u++) {
            n = Math.floor(Math.random()*(m.length)); 
            arr[u]=m.splice(n,1)[0];
        }
            
        var Chaos = 0; //Количество беспорядков на поле
        var CurrNum; //Костяшка, для которой мы рассматриваем беспорядки
        for (var i = 0; i < 14; i++) //Считаем для костяшек на первых 14 позициях (для 15-й это бессмысленно)
        {
            CurrNum = arr[i];
            for (var j = i + 1; j < 15; j++)
                if (CurrNum > arr[j])
                    Chaos++;
        }
         if (Chaos % 2 == 1) //Если общее число беспорядков нечетное,
          { //меняем местами костяшки на 14-й и 15-й позициях
          var temps = arr[13];
          arr[13] = arr[14];
          arr[14] = temps;
          } 
            
        return arr;
        }
        
        dir = 0;
        animate_cell = 0;
        is_animate = false;
        animate_frame = 0;
        score = 0;
        new_swipe = null;
        rand_find = random(1, 15, 15);      
        deck = [];
        cell_size = 70;
        coord_start = {
            x : ((width-300)/2)+10, 
            y : ((height-300)/2)+10
        };
        clean_cell = {
            x : (((width-300)/2)+10)+cell_size*4,
            y : (((height-300)/2)+10)+cell_size*4,
            number: 16
        };
        
        this.swipe = new Swipe(this.game);
        
        game.stage.backgroundColor = '#061f27';
        game.add.sprite((width-300)/2, (height-300)/2, 'deck');
        
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
        
        game.add.text(30, 20, "MOVES", textStyle_Key);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
        
        // Add logo to the center of the stage
        gen_loop = 0;
        for(var i=0; i<4; i++) {
            deck[i] = [];
            for(var j=0; j<4; j++) {
                gen_loop++;
                if(gen_loop >= 16) {
                    break;
                } else {
                    deck[i][j] = game.add.sprite(coord_start.x+i*cell_size, coord_start.y+j*cell_size, 'd_'+rand_find[gen_loop-1]);
                    //console.log(deck[i][j].key.substr(2));
                }
            }
        }
        
        deck[3][3] = null;

    },
    
    update: function() {
        
        if(is_animate === false){
        
        var directions = this.swipe.check();
        
        if (directions!==null) {
            // direction= { x: x, y: y, direction: direction }
            switch(directions.direction) {
                    
               case this.swipe.DIRECTION_LEFT:
                    if (clean_cell.x !== (((width-300)/2)+10)+cell_size*4) {
                        x_now = ((clean_cell.x - (((width-300)/2)+10))/cell_size) -1;
                        y_now = ((clean_cell.y - (((height-300)/2)+10))/cell_size) -1;
                        //temp = deck[x_now+1][y_now];
                        clean_cell.x += cell_size;
                        deck[x_now][y_now] = deck[x_now+1][y_now];
                        deck[x_now+1][y_now] = null;
                        var new_cell = deck[x_now][y_now];
                        animate_cell = new_cell;
                        is_animate = true;
                        dir = 'left';
                        //new_cell.x -= cell_size;
                        new_swipe = 1;
                        break;
                    }
                    break;
               case this.swipe.DIRECTION_RIGHT:
                    if (clean_cell.x !== (((width-300)/2)+10)+cell_size) {
                        x_now = ((clean_cell.x - (((width-300)/2)+10))/cell_size) -1;
                        y_now = ((clean_cell.y - (((height-300)/2)+10))/cell_size) -1;
                        //temp = deck[x_now+1][y_now];
                        clean_cell.x -= cell_size;
                        deck[x_now][y_now] = deck[x_now-1][y_now];
                        deck[x_now-1][y_now] = null;
                        var new_cell = deck[x_now][y_now];
                        animate_cell = new_cell;
                        is_animate = true;
                        dir = 'right';
                        //new_cell.x += cell_size;
                        new_swipe = 1;                     
                        break;
                    }
                    break;
               case this.swipe.DIRECTION_UP:
                    if (clean_cell.y !== (((height-300)/2)+10)+cell_size*4) {
                        x_now = ((clean_cell.x - (((width-300)/2)+10))/cell_size) -1;
                        y_now = ((clean_cell.y - (((height-300)/2)+10))/cell_size) -1;
                        //temp = deck[x_now+1][y_now];
                        clean_cell.y += cell_size;
                        deck[x_now][y_now] = deck[x_now][y_now+1];
                        deck[x_now][y_now+1] = null;
                        var new_cell = deck[x_now][y_now];
                        animate_cell = new_cell;
                        is_animate = true;
                        dir = 'up';
                        //new_cell.y -= cell_size;
                        new_swipe = 1;
                        break;
                    }
                    break;
               case this.swipe.DIRECTION_DOWN:
                    if (clean_cell.y !== (((height-300)/2)+10)+cell_size) {
                        x_now = ((clean_cell.x - (((width-300)/2)+10))/cell_size) -1;
                        y_now = ((clean_cell.y - (((height-300)/2)+10))/cell_size) -1;
                        //temp = deck[x_now+1][y_now];
                        clean_cell.y -= cell_size;
                        deck[x_now][y_now] = deck[x_now][y_now-1];
                        deck[x_now][y_now-1] = null;
                        var new_cell = deck[x_now][y_now];
                        animate_cell = new_cell;
                        is_animate = true;
                        dir = 'down';
                        //new_cell.y += cell_size;
                        new_swipe = 1;
                        break;
                    }
                    break;
               case this.swipe.DIRECTION_UP_LEFT:
               case this.swipe.DIRECTION_UP_RIGHT:
               case this.swipe.DIRECTION_DOWN_LEFT:
               case this.swipe.DIRECTION_DOWN_RIGHT:
            }
        }
        
        if(new_swipe != null) {
            score++;
            scoreTextValue.text = score.toString();
            var f = 0;
            var new_arr = [];
            for(var i=0; i<4; i++) {
                for(var j=0; j<4; j++) {
                    try {
                    new_arr[f++] = parseInt(deck[j][i].key.substr(2));
                    //console.log(new_arr[f-1]);
                    } 
                    catch(e) {
                        new_arr[f++] = 0;
                        //console.log(new_arr[f-1]);
                    }
                }
            }
            
            var win_count = 0;
            for(var i = 0; i<15; i++) {
                if(new_arr[i] === i+1) {
                    win_count++;
                    console.log(win_count);
                } else {
                    break;
                }
            }
            
            if(win_count === 15) {
                game.state.start('Game_Over');
            }
            
            new_swipe = null;
        }
    }
        
        if(is_animate) {
            this.animate(animate_cell, dir);
        }
        
    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    },
    
    animate : function(new_cell, direction) {
        var anim_arr = [1, 1, 1, 1, 1, 2, 2, 2, 3, 4, 6, 7, 7, 7, 6, 5, 3, 2, 2, 2, 1, 1, 1, 1, 1];
        if(animate_frame < cell_size) {
            if(direction === 'right') {
                new_cell.x += 5;
                animate_frame+=5;
            } else if(direction === 'left') {
                new_cell.x -= 5;
                animate_frame+=5;
            }else if(direction === 'up') {
                new_cell.y -= 5;
                animate_frame+=5;
            }else if(direction === 'down') {
                new_cell.y += 5;
                animate_frame+=5;
            }
        } else {
            is_animate = false;
            animate_cell = 0;
            animate_frame = 0;
        }
    }


};