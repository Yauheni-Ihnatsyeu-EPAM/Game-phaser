class Bot extends Character {
    constructor(opts) {
        super(opts);
        this.characterType = "bot";
        this.changed = true;
        this.changeDir = false;
        this.movingLeft = false;
        this.characterType = "bot";
        this.body.immovable = true;
    }
    move(animSpeed = 10) {
        if (this.state === "dead") return;
        if (this.animations.currentAnim.name == "attack") {
            if (!this.animations.currentAnim.isFinished) return;
        }
        this.animations.play("walk", animSpeed);





        //if see player
        if (Math.round(this.y) - 50 < Math.round(player.y) && Math.round(this.y) + 50 > Math.round(player.y)) {

            if (Math.round(player.x) > Math.round(this.x)) {
                this.hitArea.scale.x = Math.abs(this.scale.x);
                this.scale.x = Math.abs(this.scale.x);
                this.body.velocity.x = 200;
            } else {
                this.scale.x = Math.abs(this.scale.x) * (-1);
                this.hitArea.scale.x = Math.abs(this.scale.x) * (-1);
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
                this.scale.x = Math.abs(this.scale.x);
                this.hitArea.scale.x = Math.abs(this.scale.x);
            } else {
                this.body.velocity.x = -80;
                this.scale.x = Math.abs(this.scale.x) * (-1);
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
    changeDirection() {
        //collide wall
    }

    calculateStates() {
        if (this.animations.currentAnim.name == "attack") {
            if (!this.animations.currentAnim.isFinished) return;
        }
        this.move();
    }

}