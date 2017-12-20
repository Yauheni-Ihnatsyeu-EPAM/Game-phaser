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
     static createHealPotion(options, group) {
         var temp = game.add.group();
         map.createFromObjects('items', "health-potion", 'items', 6, true, false, temp);
         var potion = temp.children[0];
         potion.hitArea = potion.addChild(game.make.sprite(0, 0));
         game.physics.enable(potion.hitArea);
         potion.hitArea.body.enable = true;
         potion.hitArea.body.setSize(25, 50);
         return potion;
     }
     static createDiminishingPotion(options, group = null) {
         var temp = game.add.group();
         map.createFromObjects('items', "diminishing-potion", 'items', 6, true, false, group || temp);
         var potion = temp.children[0];
         potion.hitArea = potion.addChild(game.make.sprite(0, 0));
         game.physics.enable(potion.hitArea);
         potion.hitArea.body.enable = true;
         potion.hitArea.body.setSize(25, 50);
         return potion;
     }
 }

 class AbstactItem extends Phaser.Sprite {
     constructor(opts) {
         super(opts.game, opts.x || 0, opts.y || 0, opts.key || '', opts.frame || '');
     }
 }