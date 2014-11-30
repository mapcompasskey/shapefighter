ig.module(
    'game.entities.player-wall'
)
.requires(
    'impact.entity'
)
.defines(function() {
    EntityPlayerWall = ig.Entity.extend({
        
        size: {x: 10, y: 10},
        offset: {x: 0, y: 0},
        maxVel: {x: 0, y: 0},
        
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.FIXED, // doesn't move during collision
        
        init: function(x, y, settings) {
            
            this.parent(x, y, settings);
            
        },
        
        // called when overlapping with ig.Entity.TYPE.A entities
        check: function(other) {
            
            if (other.playerWallCollision)
            {
                other.playerWallCollision();
            }
            
        },
        
    });
});