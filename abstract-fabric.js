 class SpriteFactory {
     constructor() {}
     static createCharacter(options, group) {
         return new Character(options);
     }
 }

 class Character extends Phaser.Sprite {
     constructor(opts) {
         super(opts.game, opts.x || 0, opts.y || 0, opts.key || '', opts.frame || '')

         // Enable player physics
         this.game.physics.enable(this, Phaser.Physics.ARCADE);
         this.body.collideWorldBounds = opts.hasOwnProperty('collideWorldBounds') ? opts.collideWorldBounds : true
         this.body.setSize(opts.width || 64, opts.height || 64);
         this.state = this.game.state.states[this.game.state.current]

         // Set up speed values
         this.speed = opts.speed || 150
         this.scale.set(2, 2);
         this.anchor.setTo(.5, .5);
         // Set up controls
         if (opts.characterType === 'player') {
             this.cursors = this.game.input.keyboard.createCursorKeys();
             this.setUpKeyListeners();
             this.characterType = "player";
         } else {
             this.characterType = "bot";
         }
         this.state = {};
         this.initiateAnimations();
         this.movDirectionLeft = false;

         // Set up diagonal movement dampener
         this.matchDiagonalSpeed = opts.matchDiagonalSpeed || true

         // Shortcut to inverse of Pythagorean constant
         // (used to make diagonal speed match straight speed)
         this.pythInverse = 1 / Math.SQRT2
     }

     initiateAnimations() {
         this.animations.add('idle', Phaser.Animation.generateFrameNames('', 0, 9), 10, true, false);
         this.animations.add('gesture', Phaser.Animation.generateFrameNames('', 10, 19), 10, true, false);
         this.animations.add('walk', Phaser.Animation.generateFrameNames('', 20, 29), 15, true, false);
         this.animations.add('attack', Phaser.Animation.generateFrameNames('', 30, 39), 10, true, false);
         this.animations.add('death', Phaser.Animation.generateFrameNames('', 40, 49), 10, false, false);
     }

     setUpKeyListeners() {

         this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

         //  Stop the following keys from propagating up to the browser
         this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

         // Set up controls

         this.cursors = this.game.input.keyboard.createCursorKeys()
     }

     randomWithProbability() {
         var notRandomNumbers = [0, 0, 0, 0, 0, 0, 1];
         var idx = Math.floor(Math.random() * notRandomNumbers.length);
         return notRandomNumbers[idx];
     }

     playerMovement() {
         // horizontal movement
         this.body.velocity.y = 0;
         this.body.velocity.x = 0;

         if (this.cursors.left.isDown) {
             this.body.velocity.x = -1;

             this.scale.x = Math.abs(this.scale.x) * (-1);

             this.animations.play("walk");
         } else if (this.cursors.right.isDown) {
             this.body.velocity.x = 1
             this.scale.x = Math.abs(this.scale.x);
             this.animations.play("walk");
         } else {
             this.body.velocity.x = 0;
             // this.frame = 4;
         }

         // vertical movement
         if (this.cursors.up.isDown) {
             this.scale.x = Math.abs(this.scale.x) * (-1);
             this.body.velocity.y = -1;
             this.animations.play("walk");
         } else if (this.cursors.down.isDown) {
             this.body.velocity.y = 1;
             this.scale.x = Math.abs(this.scale.x);
             this.animations.play("walk");
         } else {
             this.body.velocity.y = 0;
             // this.frame = 4;
         }
         //TODO create random gesture
         if (!this.cursors.up.isDown && !this.cursors.down.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
             if (this.randomWithProbability()) this.animations.play("gesture");
             //  this.animations.play("idle");
             //randomWithProbability() /////////// дописать
         }
         let targetSpeed =
             (this.body.velocity.x != 0 && this.body.velocity.y != 0) ?
             this.speed * this.pythInverse :
             this.speed

         this.body.velocity.x *= targetSpeed
         this.body.velocity.y *= targetSpeed

         if (this.spaceKey.isDown) {
             console.log("attack");
             this.animations.play("attack");
         }
     }


     update() {
         // basic living/dying checks
         // if (!this.alive) return
         if (this.health <= 0) {
             this.animations.play("death");
             this.die();
         }
         if (this.characterType === 'player') {
             this.playerMovement();
         }



         // If the player is moving diagonally, the resultant vector
         // will have a magnitude greather than the defined speed.
         // This section makes the magnitude of the player's movement
         // match the defined speed.

     }
 }