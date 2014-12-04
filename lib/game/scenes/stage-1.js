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
        isPaused: false,
        gravity: 0,
        tileSize: 10,
        clearColor: '#000033',
        font: new ig.Font('media/04b03.font.png'),
        
        // initialize
        init: function() {
            
            // bind keys
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.UP_ARROW, 'up');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
            ig.input.bind(ig.KEY.Z, 'attack');
            ig.input.bind(ig.KEY.C, 'invincible');
            ig.input.bind(ig.KEY.P, 'pause');
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            
            // load the level
            this.loadLevel();
            
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
            
        },
        
        draw: function() {
            
            this.parent();
            
            this.font.draw('Z Key to Attack\nArrow Keys to Move', (ig.system.width / 2), (ig.system.height / 2), ig.Font.ALIGN.CENTER);
            
        },
        
        loadLevel: function(data) {
            /*
            // update background layer with x-axis parallax
            for (obj in data.layer)
            {
                if (data.layer[obj].name == 'background_1')
                {
                    data.layer[obj].distance = 2;
                }
            }
            
            // remember the currently loaded level, so we can reload when the player dies.
            this.currentLevel = data;
            
            // call the parent implemenation. this creates the background maps and entities.
            this.parent(data);
            
            // setup simple camera plugin
            this.camera = new ig.SimpleCamera();
            this.camera.offset.x.min = 0;
            this.camera.offset.x.max = 0;
            this.camera.getMinMax();
            
            // add level HUD
            this.hud = ig.game.spawnEntity(EntityHud, 0, 0);
            */
            
            // add player walls
            ig.game.spawnEntity(EntityPlayerWall, 0, (ig.system.height - 20));
            ig.game.spawnEntity(EntityPlayerWall, (ig.system.width - 10), (ig.system.height - 20));
            
            // add player
            ig.game.spawnEntity(EntityPlayer, (ig.system.width / 2), (ig.system.height - 20));
            
        },
        
        // reposition entities
        resizeGame: function() {
        
            // has the game started
            if ( ! ig.system)
            {
                return;
            }
            
        },
        
    });
});