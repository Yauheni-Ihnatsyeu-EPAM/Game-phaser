class Player extends Character {
    constructor(opts) {
        super(opts);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.setUpKeyListeners();
        this.characterType = "player";
        this.body.immovable = true;

        var barConfig = {
            width: 200,
            height: 20,
            x: 0,
            y: 0,
            bg: {
                color: '#696969'
            },
            bar: {
                color: '#FF0000'
            },
            animationDuration: 200,
            flipped: false
        };
        this.myHealthBar = new HealthBar(this.game, barConfig);
        this.myHealthBar.setPosition(150, 550);
        this.myHealthBar.setFixedToCamera(true);


    }

    setUpKeyListeners() {
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }
    move(animSpeed = 15) {
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -1;
            this.scale.x = Math.abs(this.scale.x) * (-1);
            this.hitArea.scale.x = Math.abs(this.scale.x) * (-1);
            this.animations.play("walk", animSpeed);
        } else if (this.cursors.right.isDown) {
            this.body.velocity.x = 1;
            this.scale.x = Math.abs(this.scale.x);
            this.hitArea.scale.x = Math.abs(this.scale.x);
            this.animations.play("walk", animSpeed);
        } else {
            this.body.velocity.x = 0;
        }

        // vertical movement
        if (this.cursors.up.isDown) {
            this.scale.x = Math.abs(this.scale.x) * (-1);
            this.hitArea.scale.x = Math.abs(this.scale.x) * (-1);


            this.body.velocity.y = -1;

            this.animations.play("walk", animSpeed);
        } else if (this.cursors.down.isDown) {
            this.body.velocity.y = 1;
            this.scale.x = Math.abs(this.scale.x);
            this.hitArea.scale.x = Math.abs(this.scale.x);
            this.animations.play("walk", animSpeed);
        } else {
            this.body.velocity.y = 0;

        }
        this.calcSpeed();
    }
    calculateStates() {
        if (this.animations.currentAnim.name == "attack") {
            this.attack();
            if (!this.animations.currentAnim.isFinished) return;
        }
        this.move();
        //TODO create random gesture
        if (!this.cursors.up.isDown && !this.cursors.down.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
            // if (this.animations.currentAnim.name == "idle")
            //     if ((Math.random() * 100) < 1) {
            //         this.animations.play("gesture", 10);
            //     }
            // if (!this.animations.currentAnim.name == "gesture") {
            this.animations.play("idle", 10);
            // }
        }
        if (this.spaceKey.isDown) {
            this.attack();
        }
    }
    set health(n) {
        this._health = n;
        this.myHealthBar.setPercent(n);
    }
    get health() {
        return this._health;
    }
}