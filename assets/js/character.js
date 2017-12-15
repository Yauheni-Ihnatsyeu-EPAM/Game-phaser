class Character extends AbstactItem {
    constructor(opts) {
        super(opts);

        // Enable player physics
        this.game.physics.enable(this);
        this.body.collideWorldBounds = opts.hasOwnProperty('collideWorldBounds') ? opts.collideWorldBounds : true;

        this.body.setSize(opts.width || 14, opts.height || 16);
        this.state = "none";

        // Set up speed values
        this.speed = opts.speed || 150;
        this.scale.set(opts.scale || 0.25, opts.scale || 0.25);
        this.smoothed = false;
        //  this.anchor.setTo(0.5);
        // Set up controls
        this._health = opts.health || 10;
        if (opts.characterType === 'player') {
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.setUpKeyListeners();
            this.characterType = "player";
        } else {
            this.characterType = "bot";

            this.framesPlayed = 0;
            this.movingLeft = false;
        }

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.body.immovable = true;
        this.body.linearDamping = 1;
        this.initiateAnimations();
        this.movDirectionLeft = false;

        // Set up diagonal movement dampener
        this.matchDiagonalSpeed = opts.matchDiagonalSpeed || true;

        this.attacked = false;

        // Shortcut to inverse of Pythagorean constant
        // (used to make diagonal speed match straight speed)
        this.pythInverse = 1 / Math.SQRT2;
        this.player = opts.player;
        this.once = false;

        this.attackState = "readyToHit";

        //Hit area near character
        this.hitArea = this.addChild(game.make.sprite(0, -16))
        this.game.physics.enable(this.hitArea);
        this.hitArea.body.enable = true;
        this.hitArea.body.setSize(25, 50);
    }


    calcSpeed() {
        let targetSpeed =
            (this.body.velocity.x != 0 && this.body.velocity.y != 0) ?
            this.speed * this.pythInverse :
            this.speed;

        this.body.velocity.x *= targetSpeed;
        this.body.velocity.y *= targetSpeed;
    }

    initiateAnimations() {
        //Phaser.Animation.generateFrameNames('', 10, 19)// not working
        this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true, false);
        this.animations.add('gesture', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], true, false);
        this.animations.add('walk', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], true, false);
        this.animations.add('attack', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], true, false);
        this.animations.add('death', [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], false, false);
    }



    randomWithProbability() {
        var notRandomNumbers = [0, 0, 0, 0, 0, 0, 1];
        var idx = Math.floor(Math.random() * notRandomNumbers.length);
        return notRandomNumbers[idx];
    }

    update() {
        // basic living/dying checks
        // if (!this.alive) return

        if (this.state === "dead") {

            return;
        }
        if (this.animations.currentAnim.name == "attack") {
            if (!this.animations.currentAnim.isFinished) return;
        }

        if (this.health <= 0) {
            this.state = "dead";

            this.body.immovable = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.play("death", 10);

            return;
        }
        this.calculateStates()
            //  pigArrives = game.add.tween(pig);
            //  pigArrives.to({ x: 150 }, 1000, Phaser.Easing.Bounce.Out);
            //  pigArrives.start();

    }

    attack(target) {
        if (this.state === "dead") return;
        else if (this.attackState === "readyToHit") {
            this.attackState = "attack";
            this.animations.play("attack", 10);
        } else if (this.attackState === "attack") {
            if (this.animations.currentFrame.index == 39) {

                if (this.hitTarger)
                    this.game.physics.arcade.overlap(this.hitArea, this.hitTarger, this.calcHit(this.hitTarger));
                this.target = null;
                this.attackState = "rest";
                //this.game.physics.arcade.overlap(this.hitArea, target, this.calcHit(target));
            }
            if (this.animations.currentAnim.name !== "attack") {
                this.attackState = "rest";
                return;
            }
        } else if (this.attackState === "rest") {
            this.attackState = "none";
            setTimeout(() => { this.attackState = "readyToHit"; }, 1000);
        }
        //attackState = { attack: false, rest: false, readyToHit: true };
    }
    calcHit(target) {
        target.health = target.health - Math.round(Math.random() * 100) % 40;
    }

}


/*bot attack algoritm
1. check overlap
2. run animation
3. on some frames calc hit
*/