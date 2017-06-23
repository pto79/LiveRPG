var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var tilesprite;
var player;
var cursors;
var text;
var temp;
var overlay;
var gmap;
var mapObj;

//temp = document.title;

function preload() {
    game.load.image('grass', 'assets/grass.png');
    game.load.spritesheet('tileb', 'assets/tileb.png', 32, 32);
    game.load.spritesheet('dude', 'assets/universal-lpc-sprite_male_01_walk-3frame.png', 48, 64);
}


function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    tilesprite = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'grass');

    // The player and its settings
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Our two animations, walking left and right.
    player.animations.add('left', [10, 9, 11], 10, true);
    player.animations.add('right', [4, 3, 5], 10, true);
    player.animations.add('up', [1, 0, 2], 10, true);
    player.animations.add('down', [7, 6, 8], 10, true);


    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();   

  //var overlay = document.querySelector('.test');
    overlay = document.getElementById('gps');

    // text
    text = game.add.text(16, 16, temp);

    //  Creates a blank tilemap
    //gmap = game.add.tilemap();
    //gmap.addTilesetImage('tileb','wall',32,32,null,null,0);

    mapObj = game.add.sprite(game.world.centerX-30, game.world.centerY-30, 'tileb')

}

function update() {

    //  Reset the players velocity (movement)
    
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.animations.play('left');
        tilesprite.tilePosition.x += 1;
    }
    else if (cursors.right.isDown)
    {
        player.animations.play('right');
        tilesprite.tilePosition.x -= 1;
    }
    else if (cursors.up.isDown)
    {
        player.animations.play('up');
        tilesprite.tilePosition.y += 1;
    }
    else if (cursors.down.isDown)
    {
        player.animations.play('down');
        tilesprite.tilePosition.y -= 1;
    }
    else
    {
        //  Stand still
        player.animations.stop();
        player.frame = 7;
    }

    //temp = overlay.innerHTML;
    //text.setText(temp);

    mapObj.frame = 2;

}

function render() {
    temp = overlay.innerHTML;
    game.debug.text(temp, 32, 32, 'rgb(0,0,0)');
}
