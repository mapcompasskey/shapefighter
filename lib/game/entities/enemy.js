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
        points: [],
        
        idling: false,
        hurting: false,
        dying: false,
        moving: false,
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
            //var rand = Math.floor((Math.random() * 20) + 0); // 0 - 20
            //this.pos.x -= 40;//= 40;//-50;//-= 50;//(50 + rand);
            //this.pos.y -= 40;//-50;//-= 50;//(50 + rand);
            this.pos.x = 50;
            this.pos.y = 50;
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
            
            //this.imgDot.draw((this.origin.x - ig.game.screen.x), (this.origin.y - ig.game.screen.y));
            //this.imgDot.draw((this.target.x - ig.game.screen.x), (this.target.y - ig.game.screen.y));
            this.imgDot.draw(this.origin.x, this.origin.y);
            this.imgDot.draw(this.target.x, this.target.y);
            
            if (1 == 1)
            {
                // X := originX + sin(angle)*radius;
                // Y := originY + cos(angle)*radius;
                var angle = 0;
                var radius = 20;
                for (var i = 1; i < 7; i++)
                {
                    var pos_x = this.target.x + (Math.sin(angle) * radius);
                    var pos_y = this.target.y + (Math.cos(angle) * radius);
                    this.imgDot.draw((pos_x - ig.game.screen.x), (pos_y - ig.game.screen.y));
                    angle = i;
                }
            }
            
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
            
            /*
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
                
                this.moving = true;
                this.actionDirection = 1;
                this.directionTimer = new ig.Timer(this.directionTime);
            }
            
            if (this.moving)
            {
                this.target.x += (0.1 * this.actionDirection);
                this.moveToPoint.setDestination(this.target);
                this.vel = this.moveToPoint.getVelocity(this.speed, this);
                //if (this.vel.x == 0 && this.vel.y == 0)
                //{
                    //this.moving = false;
                //}
            }
            
            // if direction timer ended
            if (this.directionTimer)
            {
                if (this.directionTimer.delta() > 0)
                {
                    // switch directions
                    this.actionDirection = (this.actionDirection == 1 ? -1 : 1);
                    this.directionTimer = new ig.Timer(this.directionTime);
                }
            }
            */
            
            // standard form: y = a(x*x) + bx + c
            
            // vertex form: y = a(x - h)(x - h) + k
            // vertex of the parabola (h, k)
            
            /*
            if (this.prepareToMove)
            {
                this.prepareToMove = false;
                
                var x = this.origin.x;
                var y = this.origin.y;
                var h = this.target.x;
                var k = this.target.y;
                
                var a = (y - k) / ((x - h) * (x - h));
                console.log(a);
            }
            */
            
            /*
            var a = 0.05;
            var h = this.target.x;
            var k = this.target.y;
            
            var x = (this.pos.x + ig.system.tick);
            //var y = (a * Math.pow((x - h), 2)) + k;
            var y = (a * (x - h) * (x - h)) + k;
            
            this.pos.x = x;
            this.pos.y = y;
            console.log(Math.round(x), Math.round(y));
            */
            
            if (1 == 0)
            {
                if ( ! this.angle)
                {
                    this.angle = 0;
                }
                
                // *drifts a bit to the left over time
                // circle around a point
                var xVel = (Math.cos(this.angle) * 10);
                var yVel = (Math.sin(this.angle) * 10);
                
                this.vel.x = xVel;
                this.vel.y = yVel;
                this.angle += 0.02;
                if (this.angle > 6)
                {
                    this.angle = 0;//(6 - this.angle);
                }
            }
            
            if (1 == 0)
            {
                if ( ! this.angle)
                {
                    // get starting angle from target
                    var my = this.origin.y - this.target.y;
                    var mx = this.origin.x - this.target.x;
                    this.angle = Math.atan2(my, mx);
                    this.angle = (this.angle < 0 ? (this.angle + 6) : this.angle);
                    this.startAngle = this.angle;
                    this.finalAngle = 6;
                    this.angleTick = 0;
                    this.angleDistance = Math.sqrt(Math.pow((this.startAngle - this.finalAngle), 2));
                    this.angleTime = (this.angleDistance / this.speed);
                    //console.log(this.angleTime);
                    console.log(this.angle);
                }
                
                if ( ! this.radius)
                {
                    // get starting radius from target
                    var a = Math.pow((this.origin.x - this.target.x), 2);
                    var b = Math.pow((this.origin.y - this.target.y), 2);
                    var c = Math.sqrt(a + b);
                    this.radius = c;
                    this.startRadius = c;
                    this.finalRadius = 20;
                    this.radiusTick = 0;
                    this.radiusDistance = (this.startRadius - this.finalRadius);
                    this.radiusTime = (this.radiusDistance / this.speed);
                    //console.log(this.radiusTime);
                    console.log(this.radius);
                }
                
                // gradually decrease the radius using the velocity (pixels per second)
                //this.radiusTick += ig.system.tick;
                var foo = ((this.radiusTick * this.radiusDistance) / this.radiusTime);
                this.radius = (this.startRadius - foo);
                //this.radius -= 0.1;
                //console.log(this.radiusTick.toFixed(2), Math.round(this.radius));
                var radius = (this.radius < this.finalRadius ? this.finalRadius : this.radius);
                
                /*
                // gradually increase the angle using the velocity
                this.angleTick += ig.system.tick;
                //var foo = ((this.angleTick * this.angleDistance) / this.angleTime);
                //console.log(this.angleTick.toFixed(2), this.angleDistance.toFixed(2), this.angleTime.toFixed(2), foo.toFixed(2));
                var foo = (this.angleTick * this.angleDistance) * this.angleTime;
                console.log(foo.toFixed(2));
                this.angle = (this.startAngle + foo);
                */
                
                // X := originX + sin(angle)*radius;
                // Y := originY + cos(angle)*radius;
                this.pos.x = this.target.x + (Math.sin(this.angle) * radius);
                this.pos.y = this.target.y + (Math.cos(this.angle) * radius);
                
                this.pos.x -= (this.size.x / 2);
                this.pos.y -= (this.size.y / 2);
                
                //this.angle += 0.02;
                //console.log(this.angle);
            }
            
            if (1 == 1)
            {
                if ( ! this.angle)
                {
                    // get starting angle from target
                    var my = (this.origin.y - this.target.y);
                    var mx = (this.origin.x - this.target.x);
                    this.angle = Math.atan2(my, mx);
                    this.angle = (this.angle < 0 ? (this.angle + 6) : this.angle);
                    this.startAngle = this.angle;
                    this.finalAngle = 6;
                    this.angleTick = 0;
                    this.angleDistance = Math.sqrt(Math.pow((this.startAngle - this.finalAngle), 2));
                    this.angleTime = (this.angleDistance / this.speed);
                    console.log(this.startAngle, this.finalAngle, this.angleDistance);
                }
                
                if ( ! this.radius)
                {
                    // get starting radius from target
                    var a = Math.pow((this.origin.x - this.target.x), 2);
                    var b = Math.pow((this.origin.y - this.target.y), 2);
                    var c = Math.sqrt(a + b);
                    this.radius = c;
                    this.startRadius = c;
                    this.finalRadius = 20;
                    this.radiusTick = 0;
                    this.radiusDistance = (this.startRadius - this.finalRadius);
                    this.radiusTime = (this.radiusDistance / this.speed);
                }
                /**/
                // gradually decrease the radius using the velocity (pixels per second)
                this.radiusTick += ig.system.tick;
                var foo = ((this.radiusTick * this.radiusDistance) / this.radiusTime);
                this.radius = (this.startRadius - foo);
                var radius = (this.radius < this.finalRadius ? this.finalRadius : this.radius);
                
                // gradually decrease the angle based on the radius
                var radiusRate = (((this.startRadius - radius) * 100) / this.radiusDistance); // 1 - 100
                this.angle = this.startAngle + ((this.angleDistance * radiusRate) / 100);
                //this.angle += 0.01;
                
                // X := originX + sin(angle)*radius;
                // Y := originY + cos(angle)*radius;
                this.pos.x = this.target.x + (Math.cos(this.angle) * radius);
                this.pos.y = this.target.y + (Math.sin(this.angle) * radius);
                
                this.pos.x -= (this.size.x / 2);
                this.pos.y -= (this.size.y / 2);
                /**/
            }
            
            if (1 == 0)
            {
                //this.speed = 80;
                //this.maxVel.y = this.speed * 0.5;
                
                //this.accel.x = 1000;
                //this.accel.y = 0;
                this.friction.x = 0;
                this.friction.y = 100;
                
                this.target.x += 0.1;
                this.moveToPoint.setDestination(this.target);
                this.vel = this.moveToPoint.getVelocity(this.speed, this);
            }
            
            if (1 == 0)
            {
                // vertical parabola (easing in)
                // y = a(x - h)(x - h) + k
                
                var x = this.target.x;
                var y = this.target.y;
                var h = this.origin.x;
                var k = this.origin.y;
                var a = (y - k) / ((x - h) * (x - h));
                
                var xPos = (this.pos.x + (ig.system.tick * 5));
                var yPos = (a * (xPos - h) * (xPos - h)) + k;
                
                this.pos.x = xPos;
                this.pos.y = yPos;
            }
            
            if (1 == 0)
            {
                // horizontal parabola (easing out)
                // x = a(y - k)(y - k) + h
                
                var x = this.origin.x;
                var y = this.origin.y;
                var h = this.target.x;
                var k = this.target.y;
                var a = (x - h) / ((y - k) * (y - k));
                
                var yPos = (this.pos.y + (ig.system.tick * 10));
                var xPos = (a * (yPos - k) * (yPos - k)) + h;
                
                this.pos.x = xPos;
                this.pos.y = yPos;
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