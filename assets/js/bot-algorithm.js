 class BotBehavior {

     botMovement(animSpeed = 10) {
         this.animations.play("walk", animSpeed);
         var chasing = false;

         // check if the slime's y position on the map is equal to the player's y position
         // we use Math.round to ignore the decimal
         if (Math.round(this.y) - 100 < Math.round(player.y) && Math.round(this.y) + 100 > Math.round(player.y)) {
             // if both slime and player are on the same 'plane' move towards the player!
             if (Math.round(player.x) > Math.round(this.x)) {
                 // we increase the speed from the default 80 to 200
                 this.scale.x = Math.abs(this.scale.x);
                 this.body.velocity.x = 200;


             } else {
                 this.scale.x = Math.abs(this.scale.x) * (-1);
                 this.body.velocity.x = -200;
             }
             chasing = true;
         }

         /////////////////////
         // game.physics.arcade.collide(this, platforms, function(slime, platform) {
         //         if (slime.body.velocity.x > 0 && slime.x > platform.x + (platform.width - slime.width) ||
         //             slime.body.velocity.x < 0 && slime.x < platform.x) { // this is still the old platform patrol AI from before // we added the chasing check so the slime will stop at the edge closest to the player if (chasing) { slime.body.velocity.x = 0; } else { slime.body.velocity.x *= -1; } } }); game.physics.arcade.collide(this, slimes, function (slime, slimes) { slime.body.velocity.x *= -1; }); if (this.body.velocity.x > 0) {
         //             // this.animations.stop();
         //             this.animations.play('right');
         //         } else {
         //             //this.animations.stop();
         //             this.animations.play('left');
         //         }
         //     }


         if (this.framesPlayed === 200 && !chasing) {
             if (this.movingLeft) {
                 this.body.velocity.x = 80;
                 this.scale.x = Math.abs(this.scale.x);

                 this.framesPlayed = 0;
             } else {
                 this.body.velocity.x = -80;
                 this.scale.x = Math.abs(this.scale.x) * (-1);

                 this.framesPlayed = 0;
             }
             this.movingLeft = !this.movingLeft;
         }


         //this.calcSpeed();
         this.framesPlayed++;
     }

     botAttacking() {

     }


     insertBotBehavior() {

     }
     tryToAttack() {

     }
 }