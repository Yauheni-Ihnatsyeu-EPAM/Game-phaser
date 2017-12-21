var game = new Phaser.Game(1024, 800, Phaser.AUTO, 'canvas', {
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
    game.load.atlasJSONHash('doors-open', './assets/map assets/doors-open.png', './assets/map assets/doors-open.json');
    game.load.atlasJSONHash('doors-fences', './assets/map assets/doors-fences.png', './assets/map assets/doors-fences.json');
    game.load.atlasJSONHash('items', './assets/map assets/items-all.png', './assets/map assets/items-all.json');
    game.load.atlasJSONHash('goblin', './assets/characters/goblin/goblin.png', './assets/characters/goblin/goblin.json');
    game.load.atlasJSONHash('ranger-girl', './assets/characters/ranger/ranger-girl.png', './assets/characters/ranger/ranger-girl.json');
    game.load.atlasJSONHash('warrior-girl', './assets/characters/warrior/warrior-girl.png', './assets/characters/warrior/warrior-girl.json');
    game.load.atlasJSONHash('sceleton-enemy', './assets/characters/sceleton/sceleton.png', './assets/characters/sceleton/sceleton.json');
    game.load.atlasJSONHash('bat-enemy', './assets/characters/bat/bat.png', './assets/characters/bat/bat.json');
    game.load.atlasJSONHash('rat-enemy', './assets/characters/rat/rat.png', './assets/characters/rat/rat.json');
    game.load.tilemap('mario', 'assets/levels/super_mario.json', null, Phaser.Tilemap.TILED_JSON);

    //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:
}

var player;
var enemies;
var rat;
var goblin;


var score = 0;
var scoreText;

var map;
var dungeon;
var celling;
var items;
var potions;
var doors;

var doorOpened = false;



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


    items = game.add.group();
    items.enableBody = true;
    items.scale.x = 2;
    items.scale.y = 2;

    map.createFromObjects('items', "health-potion", 'items', 3, true, false, items);
    map.createFromObjects('items', "diminishing-potion", 'items', 7, true, false, items);
    map.createFromObjects('items', "lever", 'others-items', 11, true, false, items);
    flags = game.add.group();
    flags.enableBody = true;
    flags.scale.x = 2;
    flags.scale.y = 2;

    map.createFromObjects('items', 956, 'flags-statues', 7, true, false, flags);
    map.createFromObjects('items', 953, 'flags-statues', 10, true, false, flags);

    doors = game.add.group();
    doors.enableBody = true;
    doors.scale.x = 2;
    doors.scale.y = 2;

    map.createFromObjects('items', "door-closed", 'doors-fences', 0, true, false, doors);
    doors.children[0].body.immovable = true;
    doors.children[0].body.setSize(32, 16);


    dungeon.resizeWorld();

    scoreText = game.add.text(0, 0, 'score: 0', { fontSize: '32px', fill: '#FFFF' });
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(100, 570);

    enemies = game.add.group();
    sceleton = this.game.add.existing(SpriteFactory.createCharacter({
        y: 700,
        x: 500,
        game: this.game,
        key: 'sceleton-enemy',
        collideWorldBounds: true,
        health: 1,
        characterType: "bot",
        width: 32,
        height: 32,
        scale: 2,
        patrol: "X"
    }));

    enemies.add(sceleton);

    rat = this.game.add.existing(SpriteFactory.createCharacter({
        y: 200,
        x: 600,
        game: this.game,
        key: 'rat-enemy',
        collideWorldBounds: true,
        health: 1,
        characterType: "bot",
        width: 19,
        height: 20,
        scale: 1,
        scaleReversed: true,
        patrol: "Y"
    }));

    enemies.add(rat);

    goblin = this.game.add.existing(SpriteFactory.createCharacter({
        y: 700,
        x: 1000,
        game: this.game,
        key: 'goblin',
        collideWorldBounds: true,
        health: 1,
        characterType: "bot",
        width: 70,
        height: 70,
        scale: 0.5,
    }));

    enemies.add(goblin);


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
        scale: 2
    }));

    game.physics.enable(player);

    game.camera.follow(player);
}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, dungeon);
    game.physics.arcade.collide(enemies, dungeon, changeDirection);


    game.physics.arcade.collide(enemies, player);
    game.physics.arcade.collide(doors, player);
    game.physics.arcade.overlap(enemies, player, tryToAttack);

    game.physics.arcade.overlap(items, player, itemsFunction);


}

function changeDirection(bot) { //collide wall
    if (bot.state === "dirChanged") return;
    else {

        if (bot.movingLeft) { //inverse direction
            bot.body.velocity.x = -80;
            bot.changeScale(!bot.movingLeft);
            bot.hitArea.scale.x = Math.abs(bot.scale.x) * (-1);
        } else {
            bot.body.velocity.x = 80;
            bot.changeScale(!bot.movingLeft);
            bot.hitArea.scale.x = Math.abs(bot.scale.x);
        }
        bot.movingLeft = !bot.movingLeft;
        bot.state = "dirChanged";
    }
}


function tryToAttack(player, bot) {
    player.hitTarger = bot;
    bot.hitTarger = player;

    bot.attack(player); //тупая функция

}

function itemsFunction(source, target) {
    if (target.name === "health-potion") {
        source.health = 100;
        target.kill();
    } else if (target.name === "diminishing-potion") {
        console.log("reducing");
        source.scale.set(target.scale.x * 1, target.scale.y * 1);
        source.body.setSize(target.body.width * 1, target.body.height * 1);
        target.kill();
    } else if (target.name === "lever" && !doorOpened) {
        console.log("lever");
        target.frame = 12;
        doors.children[0].kill();
        map.createFromObjects('items', "door-open", 'doors-open', 0, true, false, doors);
        doors.children[0].body.setSize(0, 0);
        doors.children[1].body.immovable = true;
        doors.children[1].body.setSize(10, 48);
        doorOpened = true;
    }
}

function log() {
    console.log("azzaza");
}

function render() {
    // game.debug.bodyInfo(player, 32, 320);
    // game.debug.body(player);
    // game.debug.body(player.hitArea);
    // game.debug.body(goblin);
    // game.debug.body(rat);
    // game.debug.body(sceleton);
    // game.debug.body(doors.children[0]);
    //dungeon.debug = true;
}

function gofull() {

    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}

function changeScore(bot) {

    // Removes the star from the screen
    if (bot.key === "sceleton-enemy") { score += 70; } else if (bot.key === "goblin") {
        score += 45;
    } else if (bot.key === "rat-enemy") {
        score += 10;
    }
    //  Add and update the score

    scoreText.text = 'Score: ' + score;

}