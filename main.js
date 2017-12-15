var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.load.tilemap('level', 'assets/levels/map.json', null, Phaser.Tilemap.TILED_JSON, 'game');

    game.load.image('textures-full', './assets/map assets/textures.png');
    game.load.atlasJSONHash('flags-statues', './assets/map assets/flags-statues.png', './assets/map assets/flags-statues.json');
    game.load.atlasJSONHash('others-items', './assets/map assets/other.png', './assets/map assets/other.json');
    game.load.atlasJSONHash('goblin', './assets/characters/goblin/goblin.png', './assets/characters/goblin/goblin.json');
    game.load.atlasJSONHash('ranger-girl', './assets/characters/ranger/ranger-girl.png', './assets/characters/ranger/ranger-girl.json');
    game.load.atlasJSONHash('warrior-girl', './assets/characters/warrior/warrior-girl.png', './assets/characters/warrior/warrior-girl.json');
    game.load.atlasJSONHash('sceleton-enemy', './assets/characters/sceleton/sceleton.png', './assets/characters/sceleton/sceleton.json');
    game.load.tilemap('mario', 'assets/levels/super_mario.json', null, Phaser.Tilemap.TILED_JSON);

    //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:
}

var player;
var sceletons;
var cursors;

var stars;
var score = 0;
var scoreText;

var map;
var dungeon;
var celling;

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#787878';



    game.input.onDown.add(gofull, this);








    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.scale.startFullScreen(false);
    map = game.add.tilemap('mario');


    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'

    map.addTilesetImage('textures', 'textures-full');
    map.addTilesetImage('other', 'others-items');
    dungeon = map.createLayer('dungeon-level');
    dungeon.smoothed = false;
    dungeon.setScale(2, 2);

    // dungeon.debug = true;
    map.setCollisionByIndex(109);
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list

    // dungeon = map.createLayer('dungeon-level', this.game.width * 0.5, this.game.height * 0.5);


    tourches = game.add.group();
    tourches.enableBody = true;
    tourches.scale.x = 2;
    tourches.scale.y = 2;
    tourches.parent.smoothed = false;
    //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the tourches group
    map.createFromObjects('items', 132, 'others-items', 14, true, false, tourches);
    //  Add animations to all of the coin sprites
    tourches.callAll('animations.add', 'animations', 'flame', [15, 16, 17], 10, true);
    tourches.callAll('animations.play', 'animations', 'flame');


    flags = game.add.group();
    flags.enableBody = true;
    flags.scale.x = 2;
    flags.scale.y = 2;

    map.createFromObjects('items', 956, 'flags-statues', 5, true, false, flags);
    map.createFromObjects('items', 953, 'flags-statues', 10, true, false, flags);



    dungeon.resizeWorld();



    //  Finally some stars to collect


    //  We will enable physics for any star that is created in this group


    //  Here we'll create 12 of them evenly spaced apart

    //  The score

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();



    // player.anchor.x = 0.5;
    // player.anchor.y = 0.5;

    sceletons = game.add.group();


    sceleton = this.game.add.existing(SpriteFactory.createCharacter({
        y: 700,
        x: 500,
        game: this.game,
        key: 'sceleton-enemy',
        collideWorldBounds: true,
        health: 1,
        characterType: "bot",
        width: 19,
        height: 32,
        scale: 2
    }));



    player = this.game.add.existing(SpriteFactory.createCharacter({
        y: 1000,
        x: 700,
        game: this.game,
        key: 'warrior-girl',
        controls: true,
        collideWorldBounds: true,
        health: 100,
        characterType: "player",
        width: 19,
        height: 32,
        scale: 2,

    }));


    // p = this.game.add.existing(SpriteFactory.createCharacter({
    //     y: 210,
    //     x: 100,
    //     game: this.game,
    //     key: 'ranger-girl',
    //     controls: false,
    //     collideWorldBounds: true,
    //     health: 100,
    //     characterType: "bot"
    // }));
    // p.anchor.x = 0.5;
    // p.anchor.y = 0.5;




    game.physics.enable(player);
    // game.physics.enable(p);


    game.camera.follow(player);
}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, dungeon);
    game.physics.arcade.collide(sceleton, dungeon, sceleton.changeDirection);
    game.physics.arcade.collide(sceleton, player);
    game.physics.arcade.overlap(sceleton.hitArea, player, tryToAttack);
    game.physics.arcade.overlap(player.hitArea, sceleton, tryToAttack);

}

function tryToAttack(attackerHitArea, target) {
    attackerHitArea.parent.hitTarger = target;
    if (attackerHitArea.parent.characterType !== "player")
        attackerHitArea.parent.attack(target); //тупая функция
}

function touchCelling() {
    console.log("aazzzzaaa");
}


function render() {


    game.debug.bodyInfo(player, 32, 320);
    game.debug.body(player.hitArea);
    game.debug.body(sceleton.hitArea);
    game.debug.body(sceleton);
    //dungeon.debug = true;

}

function gofull() {

    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }

}