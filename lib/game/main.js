ig.module( 
	'game.main' 
)
.requires(
    'impact.debug.debug',
	'impact.game',
    'impact.font',
    'game.scenes.screen-title',
    'game.scenes.stage-1',
    'game.entities.button',
    'game.entities.player',
    'game.entities.player-wall',
    'game.entities.enemy'
)
.defines(function(){
        
    //
    // --------------------------------------------------------------------------
    // Fullscreen / Mobile mode
    // --------------------------------------------------------------------------
    //
    ig.gameScale = 1;//(window.innerWidth < 640 ? 2 : 1);
    if (fullscreen || ig.ua.mobile)
    {
        // set the canvas element to the size of the window
        ig.gameCanvas = document.getElementById('canvas');
        ig.gameCanvas.style.width  = window.innerWidth + 'px';
        ig.gameCanvas.style.height = window.innerHeight + 'px';
        
        // on browser resize, update the canvas and game entities
        window.addEventListener('resize', function() {
            if ( ! ig.system)
            {
                return;
            }
            
            // resize the canvas
            if (ig.gameCanvas)
            {
                ig.gameCanvas.style.width  = window.innerWidth + 'px';
                ig.gameCanvas.style.height = window.innerHeight + 'px';
                ig.system.resize((window.innerWidth * ig.gameScale), (window.innerHeight * ig.gameScale));
            }
            
            if (ig.game.resizeGame)
            {
                ig.game.resizeGame();
            }
        }, false);
    }
    
    //
    // --------------------------------------------------------------------------
    // Initialize the Game
    // --------------------------------------------------------------------------
    //
    //ig.main('#canvas', ScreenTitle, 1, 300, 185, 3);
    ig.main('#canvas', Stage1, 1, 300, 185, 3);

});
