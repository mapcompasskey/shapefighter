ig.module(
    'game.scenes.stage-1'
)
.requires(
    'impact.game'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Stage 1
    // --------------------------------------------------------------------------
    //
    Stage1 = ig.Game.extend({

        levelName: 'stage1',
        clearColor: '#000033',
        isPaused: false,
        tileSize: 10,
        gravity: 400,
        font: new ig.Font( 'media/04b03.font.png' ),
        
        
        init: function() {
            // Initialize your game here; bind keys etc.
        },
        
        update: function() {
            // Update all entities and backgroundMaps
            this.parent();
            
            // Add your own, additional update code here
        },
        
        draw: function() {
            // Draw all entities and backgroundMaps
            this.parent();
            
            
            // Add your own drawing code here
            var x = ig.system.width/2,
                y = ig.system.height/2;
            
            this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
        },
        
        // update the game size
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
            
        },
        
    });
});