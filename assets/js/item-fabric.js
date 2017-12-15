 class SpriteFactory {
     constructor() {}
     static createCharacter(options, group) {
         if (options.characterType === "bot")
             var a = new Bot(options);
         else if (options.characterType === "player")
             var a = new Player(options);
         a.prototype = Object.create(Phaser.Sprite.prototype);
         return a;
     }
     static createTorch(options) {
         var a = new Torch(options);
         a.prototype = Object.create(Phaser.Sprite.prototype);
         return a;
     }
     static createChest(options) {
         var a = new Chest(options);
         a.prototype = Object.create(Phaser.Sprite.prototype);
         return a;
     }

 }

 class AbstactItem extends Phaser.Sprite {
     constructor(opts) {
         super(opts.game, opts.x || 0, opts.y || 0, opts.key || '', opts.frame || '');
     }
 }