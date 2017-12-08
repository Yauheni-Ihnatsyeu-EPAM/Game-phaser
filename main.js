// import { SpriteFactory, Character } from "abstract-fabric";

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.tilemap('map', './map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('dude', 'assets/ololo.png', 31.5, 48, 24);
    game.load.image('tiles', 'assets/squares.png');
    player = game.load.atlasJSONHash('goblin', 'goblin.png', 'goblin.json');
    ranger = game.load.atlasJSONHash('ranger-girl', 'ranger-girl.png', 'ranger-girl.json');
}

var player;
var ranger;
var cursors;

var stars;
var score = 0;
var scoreText;

var map;
var layer;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#2d2d2d';
    //  A simple background for our game
    map = game.add.tilemap('map');

    map.addTilesetImage("dungeon", 'tiles');

    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    layer = map.createLayer('Tile Layer 1');
    layer.scale.set(2, 2);
    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();

    //  The platforms group contains the ground and the 2 ledges we can jump on

    // // The player and its settings
    // player = game.add.sprite(32, game.world.height - 150, 'dude');

    // //  We need to enable physics on the player
    // game.physics.arcade.enable(player);

    // //  Player physics properties. Give the little guy a slight bounce.
    // player.body.bounce.y = 0.2;
    // player.body.gravity.y = 300;
    // player.body.collideWorldBounds = true;

    //  Finally some stars to collect


    //  We will enable physics for any star that is created in this group


    //  Here we'll create 12 of them evenly spaced apart

    //  The score

    console.log(game.world.height - 100);
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    player = this.game.add.existing(SpriteFactory.createCharacter({
        y: game.world.height - 100,
        x: 100,
        game: this.game,
        key: 'goblin',
        controls: true,
        speed: 32,
        health: 100,
        characterType: "player"
    }))

}

function update() {

    //  Collide the player and the stars with the platforms
    // game.physics.arcade.collide(player, platforms);
    // game.physics.arcade.collide(stars, platforms);

    // //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Reset the players velocity (movement)
    // player.body.velocity.x = 0;



}