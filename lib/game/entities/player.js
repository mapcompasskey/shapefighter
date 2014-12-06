ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'game.entities.player-bullet'
)
.defines(function() {
    EntityPlayer = ig.Entity.extend({
        
        size: {x: 10, y: 10},
        offset: {x: 0, y: 0},
        maxVel: {x: 1000, y: 1000},
        friction: {x: 0, y: 0},
        flip: false,
        speed: 100,
        jump: 0,
        health: 10,
        maxHealth: 10,
        animSheet: new ig.AnimationSheet('media/player.png', 10, 10),
        
        isInvincible: false,
        canAttack: false,
        attackTime: 0.4,
        timerAttack: new ig.Timer(0),
        
        moving: false,
        hurting: false,
        dying: false,
        attacking: false,
        
        type: ig.Entity.TYPE.A, // add to friendly group
        checkAgainst: ig.Entity.TYPE.NONE, // check collisions against nothing
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        init: function(x, y, settings) {
        
            this.parent(x, y, settings);
            
            // add the animations
            this.addAnim('idle', 1, [0], true);
            
            // game instance of this entity
            ig.game.player = this;
            
        },
        
        update: function() {
        
            if (ig.game.isPaused)
            {
                return;
            }
            
            this.checkStatus();
            this.checkPosition();
            this.parent();
            
        },
        
        checkStatus: function() {
        
            /*
            // update direction facing
            if ( ! this.hurting && ! this.dying)
            {
                if (ig.input.state('left'))
                {
                    this.flip = true;
                }
                else if (ig.input.state('right'))
                {
                    this.flip = false;
                }
            }
            */
            
            // toggle invincibility
            if (ig.input.pressed('invincible'))
            {
                this.isInvincible = this.isInvincible ? false : true;
            }
            
            // check entity status
            this.isHurting();
            this.isAttacking();
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
            
            if (this.hurting || this.dying)
            {
                this.attacking = false;
                return;
            }
            
            // while attack button held down
            this.attacking = (ig.input.state('attack') ? true : false);
            
            // if entity can attack
            if (this.canAttack)
            {
                if (this.attacking)
                {
                    this.canAttack = false;
                    this.timerAttack = new ig.Timer(this.attackTime); // resetting the timer affects all entities
                    
                    // create player bullet entity
                    var xPos = (this.pos.x + 4);
                    var yPos = (this.pos.y - 4);
                    ig.game.spawnEntity(EntityPlayerBullet, xPos, yPos);
                }
            }
            // else, entity can't attack again for a moment
            else
            {
                if (this.timerAttack.delta() > 0)
                {
                    this.canAttack = true;
                }
            }
            
        },
        
        // checking if idle or moving left/right
        isMoving: function() {
        
            if (this.hurting || this.dying)
            {
                this.moving = false;
                return;
            }
            
            // if moving left
            if (ig.input.state('left'))
            {
                this.moving = true;
                this.vel.x = -(this.speed);
            }
            // else, if moving right
            else if (ig.input.state('right'))
            {
                this.moving = true;
                this.vel.x = this.speed;
            }
            // else, if standing still
            else
            {
                this.moving = false;
                this.vel.x = 0;
            }
            
        },
        
        // update entity animation
        animate: function() {
            
            // update entitiy opacity
            if (this.hurting || this.isInvincible)
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
            else if (this.attacking)
            {
                if (this.currentAnim != this.anims.attack)
                {
                    this.currentAnim = this.anims.attack.rewind();
                }
            }
            else if (this.moving)
            {
                if (this.currentAnim != this.anims.move)
                {
                    this.currentAnim = this.anims.move.rewind();
                }
            }
            else
            {
                if (this.currentAnim != this.anims.idle)
                {
                    this.currentAnim = this.anims.idle.rewind();
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
        
        // check if this entity needs repositioned
        checkPosition: function() {
            /*
            // if this entity has moved off the map
            if (this.pos.x < 0)
            {
                this.pos.x = (ig.game.collisionMap.pxWidth - (this.size.x * 2));
            }
            else if ((this.pos.x + this.size.x) > ig.game.collisionMap.pxWidth)
            {
                this.pos.x = this.size.x;
            }
            
            // if this entity has fallen off the map
            if (this.pos.y > ig.game.collisionMap.pxHeight)
            {
                this.pos.y = 0;
            }
            */
        },
        
        // called by attacking entity
        receiveDamage: function(amount, from) {
        
            return false;
            if (this.hurting || this.dying || this.isInvincible)
            {
                return;
            }
            
            // reduce health
            //this.health -= amount;
            
            // if dead
            if (this.health <= 0)
            {
                this.vel.x = 0;
                this.vel.y = 0;
                this.maxVel.x = 0;
                this.maxVel.y = 0;
                this.dying = true;
                return true;
            }
            
            // update state
            this.hurting = true;
            
            // apply knockback
            //this.vel.x = (from.pos.x > this.pos.x) ? -300 : 300;
            //this.vel.y = -450;
            
            return true;
            
        },
        
    });
});