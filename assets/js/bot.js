class Bot extends Character {
    constructor(opts) {
        super(opts);
        this.characterType = "bot";
        this.changed = true;
        this.changeDir = false;
        this.movingLeft = false;
        this.characterType = "bot";
        this.body.immovable = true;
        this.scaleReversed = opts.scaleReversed || false
    }
    move(animSpeed = 10) {
        if (this.state === "dead") return;

        this.animations.play("walk", animSpeed);
        if (this.attackState === "none") {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }



        //if see player
        if (Math.round(this.y) - 50 < Math.round(player.y) && Math.round(this.y) + 50 > Math.round(player.y)) {
            if (this.attackState !== "readyToHit" && this.attackState !== "attack") {
                return
            }
            if (Math.round(player.x) > Math.round(this.x)) {
                this.hitArea.scale.x = Math.abs(this.scale.x);
                this.changeScale(!this.movingLeft)
                this.body.velocity.x = 200;
            } else {
                this.scale.x = Math.abs(this.scale.x) * (-1);
                this.changeScale(!this.movingLeft)
                this.body.velocity.x = -200;
            }

            this.state = "chaising";
        } else {
            this.state = "patrolling";
        }
        //if not see player
        if (this.state !== "chaising") { //patrolling

            if (this.movingLeft) {
                this.body.velocity.x = 80;
                this.changeScale(this.movingLeft)
                this.hitArea.scale.x = Math.abs(this.scale.x);
            } else {
                this.body.velocity.x = -80;
                this.changeScale(this.movingLeft)
                this.hitArea.scale.x = Math.abs(this.scale.x) * (-1);

            }
            if (this.changed) {
                setTimeout(() => {
                    this.movingLeft = !this.movingLeft;
                    this.changed = true;
                }, 4000);
                this.changed = false;

            }
        }
        //this.calcSpeed();
    }
    changeDirection() { //collide wall
        //collide wall

        if (this.state === "dirChanged") return;

        else {

            if (this.movingLeft) { //inverse direction
                this.body.velocity.x = -80;
                this.changeScale(!this.movingLeft);
                this.hitArea.scale.x = Math.abs(this.scale.x) * (-1);
            } else {
                this.body.velocity.x = 80;
                this.changeScale(!this.movingLeft);
                this.hitArea.scale.x = Math.abs(this.scale.x);
            }
            this.movingLeft = !this.movingLeft;
            this.state = "dirChanged";
        }
    }
    collideplayer() {
        this.state = "collidePlayer";
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    calculateStates() {
        if (this.animations.currentAnim.name == "attack") {
            if (!this.animations.currentAnim.isFinished) return;
        }
        this.move();
    }

    changeScale(movingLeft) {
        if (!this.scaleReversed)
            if (movingLeft)
                this.scale.x = Math.abs(this.scale.x);
            else
                this.scale.x = Math.abs(this.scale.x) * (-1);
        else {
            if (movingLeft)
                this.scale.x = Math.abs(this.scale.x) * (-1);
            else
                this.scale.x = Math.abs(this.scale.x);
        }
    }

}