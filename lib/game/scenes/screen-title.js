ig.module(
    'game.scenes.screen-title'
)
.requires(
    'impact.game'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Title Screen
    // --------------------------------------------------------------------------
    //
    ScreenTitle = ig.Game.extend({
        
        levelName: 'title',
        clearColor: '#000033',
        isPaused: false,
        tileSize: 10,
        gravity: 400,
        
        logo: {
            pos: {x: 0, y: 0},
            img: new ig.Image('media/shapefighter.png')
        },
        
        // initialize your game here
        init: function() {
            
            // bind keys
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            
            // add Start button
            var settings = {action:'start', anchor:{bottom:15, right:15, offset:{x:0, y:0}}, width:50, height:19, imgSrc:'media/start.png'};
            this.buttonStart = ig.game.spawnEntity(EntityButton, 0, 0, settings);
            
            // show collision boxes
            //ig.Entity._debugShowBoxes = true;
            
            this.resizeGame();
            
        },
        
        update: function() {
            
            this.parent();
            
            if (ig.input.pressed('pause'))
            {
                this.isPaused = !this.isPaused;
            }
            
            if (ig.game.isPaused)
            {
                return;
            }
            
            // if Start button is pressed
            this.buttonStart.update();
            if (ig.input.released('start'))
            {
                ig.system.setGame(Stage1);
            }
            
        },
        
        draw: function() {
            
            this.parent();
            
            // draw logo
            this.logo.img.draw(this.logo.pos.x, this.logo.pos.y);
            
            // draw Start button
            this.buttonStart.draw(true);
            
        },
        
        // update the game size and the placement of some elements
        resizeGame: function() {
        
            // has the game started
            if ( ! ig.system)
            {
                return;
            }
            
            // resize the canvas
            if (fullscreen || ig.ua.mobile)
            {
                if (ig.gameCanvas)
                {
                    ig.gameCanvas.style.width  = window.innerWidth + 'px';
                    ig.gameCanvas.style.height = window.innerHeight + 'px';
                    ig.system.resize((window.innerWidth * ig.gameScale), (window.innerHeight * ig.gameScale));
                }
            }
            
            // update logo position
            this.logo.pos.x = ((ig.system.width / 2) - (this.logo.img.width / 2));
            this.logo.pos.y = 30;
            
            // reposition Start button
            this.buttonStart.align();
            
        },
        
    });
});