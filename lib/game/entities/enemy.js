ig.module(
    'game.entities.enemy'
)
.requires(
    'impact.entity',
    'impact.entity-pool',
    'plugins.move-to-point'
)
.defines(function() {
    EntityEnemy = ig.Entity.extend({
        
        size: {x: 10, y: 10},
        offset: {x: 0, y: 0},
        maxVel: {x: 1000, y: 1000},
        friction: {x: 0, y: 0},
        flip: false,
        speed: 20,
        gravityFactor: 0,
        health: 10,
        maxHealth: 10,
        animSheet: new ig.AnimationSheet('media/enemy.png', 10, 10),
        imgDot: new ig.Image('media/dot.png'),
        
        prepareToMove: false,
        directionTime: 5,
        directionTimer: null,
        origin: {x: 0, y: 0},
        target: {x: 0, y: 0},
        
        idling: false,
        hurting: false,
        dying: false,
        preparing: false,
        attacking: false,
        returning: false,
        
        type: ig.Entity.TYPE.B, // add to enemy group
        checkAgainst: ig.Entity.TYPE.A, // check collisions against friendly group
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        init: function(x, y, settings) {
        
            this.parent(x, y, settings);
            
            // add the animations
            this.addAnim('idle', 1, [0], true);
            
            this.prepareEntity();
            
        },
        
        // resurrect this entity from the entity pool (pooling enabled below)
        reset: function(x, y, settings) {
        
            this.parent(x, y, settings);
            this.prepareEntity();
            
        },
              
        // reset parameters
        prepareEntity: function() {
            
            // include movement class
            this.moveToPoint = new MoveToPoint();
            this.moveToPoint.minimun = 0.5;
            
            // reset parameters
            this.maxVel = {x: 1000, y: 1000};
            this.health = this.maxHealth;
            
            this.idling = false;
            this.hurting = false;
            this.dying = false;
            this.attacking = false;
            this.returning = false;
            
            // store starting position
            this.target.x = this.pos.x;
            this.target.y = this.pos.y;
            this.prepareToMove = true;
            
            // move to outside the screen
            var rand = Math.floor((Math.random() * 20) + 0); // 0 - 20
            this.pos.x -= (50 + rand);
            this.pos.y -= (50 + rand);
            this.origin.x = this.pos.x;
            this.origin.y = this.pos.y;
            
        },
        
        update: function() {
        
            if (ig.game.isPaused)
            {
                return;
            }
            
            this.checkStatus();
            this.parent();
            
        },
        
        draw: function() {
        
            this.parent();
            
            this.imgDot.draw((this.origin.x - ig.game.screen.x), (this.origin.y - ig.game.screen.y));
            this.imgDot.draw((this.target.x - ig.game.screen.x), (this.target.y - ig.game.screen.y));
            
        },
        
        checkStatus: function() {
            
            // check entity status
            this.isHurting();
            //this.isAttacking();
            //this.isReturning();
            //this.isIdling();
            this.isMoving();
            this.animate();
            
        },
        
        // check if hurting
        isHurting: function() {
            /*
            // if dying, kill this entity when the animation ends
            if (this.dying)
            {
                if (this.currentAnim == this.anims.dead)
                {
                    if (this.currentAnim.loopCount)
                    {
                        this.kill();
                    }
                }
            }
            */
            /*
            // if hurting
            if (this.hurting)
            {
                if (this.currentAnim == this.anims.hurt)
                {
                    // stop hurting when the animation ends
                    if (this.currentAnim.loopCount)
                    {
                        this.hurting = false;
                    }
                }
            }
            */
        },
        
        // check if attacking
        isAttacking: function() {
        
            /*if (this.hurting || this.dying)
            {
                this.attacking = false;
                return;
            }
            
            // if attacking, move towards the destination
            if (this.attacking)
            {
                this.vel = this.moveToPoint.getVelocity(this.speed, this);
            }*/
            
        },
        
        // check if returning
        isReturning: function() {
            
            /*if ( this.attacking || this.hurting || this.dying ) {
                return;
            }
            
            // if returning, move towards the starting position
            if ( this.returning ) {
                this.vel = this.moveToPoint.getVelocity( 10, this );
                if ( this.vel.x == 0 && this.vel.y == 0 ) {
                    this.returning = false;
                }
            }*/
            
        },
        
        // check if idling
        isIdling: function() {
            
            /*if ( this.attacking || this.returning || this.hurting || this.dying ) {
                return;
            }
            
            // if idling, just move around within boundary
            if ( this.idling ) {
                this.vel = this.moveToPoint.getVelocity( 10, this );
                if ( this.vel.x == 0 && this.vel.y == 0 ) {
                    this.idling = false;
                }
            }
            else {
                destination = {x: 0, y: 0}
                destination.x = Math.round( Math.random() * ( this.boundary.x.max - this.boundary.x.min ) ) + this.boundary.x.min
                destination.y = Math.round( Math.random() * ( this.boundary.y.max - this.boundary.y.min ) ) + this.boundary.y.min;
                this.moveToPoint.setDestination( destination );
                this.idling = true;
            }*/
            
        },
        
        // check if moving
        isMoving: function() {
            
            /*if (this.hurting || this.dying)
            {
                return;
            }
            
            // if attacking, face the player
            if ( this.attacking && ig.game.player ) {
                if ( ig.game.player.pos.x < this.pos.x ) {
                    this.flip = true; // face left
                } else {
                    this.flip = false; // face right
                }
                return;
            }
            
            // if returning, face that right direction
            if ( this.returning && this.vel.x != 0 ) {
                if ( this.vel.x < 0 ) {
                    this.flip = true; // face left
                } else {
                    this.flip = false; // face right
                }
            }*/
            
            if (this.prepareToMove)
            {
                this.prepareToMove = false;
                
                // make the movement arc shaped
                var num = Math.floor((Math.random() * 6) + 1); // 1 - 6
                switch (num)
                {
                    case 6:
                        this.maxVel.x = (this.speed * 0.8);
                        break;
                        
                    case 5:
                        this.maxVel.y = (this.speed * 0.8);
                        break;
                    
                    case 4:
                        this.maxVel.x = (this.speed * 0.6);
                        break;
                        
                    case 3:
                        this.maxVel.y = (this.speed * 0.6);
                        break;
                    
                    case 2:
                        this.maxVel.x = (this.speed * 0.4);
                        break;
                        
                    default:
                        this.maxVel.y = (this.speed * 0.4);
                }
                
                this.preparing = true;
                this.actionDirection = 1;
                this.directionTimer = new ig.Timer(this.directionTime);
            }
            
            if (this.preparing)
            {
                this.moveToPoint.setDestination(this.target);
                this.vel = this.moveToPoint.getVelocity(this.speed, this);
                //if (this.vel.x == 0 && this.vel.y == 0)
                //{
                    //this.preparing = false;
                //}
                
                this.target.x += (0.1 * this.actionDirection);
            }
            
            // if action timer ended
            if (this.directionTimer)
            {
                if (this.directionTimer.delta() > 0)
                {
                    this.actionDirection = (this.actionDirection == 1 ? -1 : 1);
                    this.directionTimer = new ig.Timer(this.directionTime);
                }
            }
            
        },
        
        // update entity animation
        animate: function() {
            
            // update entitiy opacity
            if (this.hurting || this.dying)
            {
                this.currentAnim.alpha = 0.5;
            }
            else if (this.currentAnim.alpha < 1)
            {
                this.currentAnim.alpha = 1;
            }
            
            /*
            // update animation state
            if (this.dying)
            {
                if (this.currentAnim != this.anims.dead)
                {
                    this.currentAnim = this.anims.dead.rewind();
                }
            }
            else if (this.hurting)
            {
                if (this.currentAnim != this.anims.hurt)
                {
                    this.currentAnim = this.anims.hurt.rewind();
                }
            }
            */
            if (this.currentAnim != this.anims.idle)
            {
                this.currentAnim = this.anims.idle.rewind();
            }
            
            // update facing direction
            //this.currentAnim.flip.x = this.flip;
            
        },
        
        // called when this entity overlaps with an entity matching the .checkAgainst property
        check: function( other ) {
            /*
            if (this.hurting || this.dying)
            {
                return;
            }
            
            other.receiveDamage(1, this);
            */
        },
        
        // called by attacking entity
        receiveDamage: function(amount, from) {
        
            return false;
            if (this.hurting || this.dying)
            {
                return false;
            }
            
            // reduce health
            //this.health -= amount;
            
            // if dead
            if (this.health <= 0)
            {
                this.vel.x = 0;
                this.vel.y = 0;
                this.dying = true;
                return true;
            }
            
            // update state
            this.hurting = true;
            
            // apply knockback
            //this.vel.x = ( from.flip ? -80 : 80 );
            //this.vel.y = -10;
            
            return true;
            
        },
        
    });
    
    ig.EntityPool.enableFor( EntityEnemy );
});