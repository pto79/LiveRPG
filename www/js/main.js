var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update, render: render });

var tilesprite;
var player;
var cursors;
var text;
var absX;
var absY;
var direction;
var collision = false;
var mapObjs;
var count = 0;
var sound;
var showTile = false;
//temp = document.title;

var bullets;

var fireRate = 100;
var nextFire = 0;

function preload() {
    game.load.image('grass', 'assets/grass.png');
    game.load.spritesheet('tileb', 'assets/tileb.png', 32, 32);
    //game.load.spritesheet('dude', 'assets/universal-lpc-sprite_male_01_walk-3frame.png', 48, 64);
    game.load.spritesheet('dude', 'assets/6Actor_5.png', 32, 32);
    game.load.spritesheet('pony', 'assets/pony_32x32.png', 32, 32);
    //game.load.audio('sfx', 'assets/audio/SoundEffects/fx_mixdown.ogg');
    game.load.image('bullet', 'assets/red_ball.png');
}

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    tilesprite = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'grass');
    showTile = true;
    // The player and its settings
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'dude');
    //player.anchor.set(0.5,0.5);
    //player.inputEnabled = true;
    //player.events.onInputDown.add(testMessageBox, this);

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('west', [12, 13, 14, 15, 16, 17], 10, true);
    player.animations.add('east', [24, 25, 26, 27, 28, 29], 10, true);
    player.animations.add('north', [36, 37, 38, 39, 40, 41], 10, true);
    player.animations.add('south', [0, 1, 2, 3, 4, 5], 10, true);
    player.animations.add('northeast', [42, 43, 44, 45, 46, 47], 10, true);
    player.animations.add('southeast', [6, 7, 8, 9, 10, 11], 10, true);
    player.animations.add('northwest', [30, 31, 32, 33, 34, 35], 10, true);
    player.animations.add('southwest', [18, 19, 20, 21, 22, 23], 10, true);    

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();   

    //mapObjs = game.add.group();
    //mapObjs.enableBody = true;
    //mapObjs.physicsBodyType = Phaser.Physics.ARCADE;

    mapObjs = game.add.physicsGroup();

    for (var i = 0; i < 10; i++)
    {
        var c = mapObjs.create(game.rnd.between(0, 500), game.rnd.between(0, 500), 'pony', game.rnd.between(0, 95));
        c.body.immovable = true;
    }

    //sound = game.add.audio('sfx');

    collision = false;

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(1, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);   
}

function collisionHandler (player, obj) {
    //collision = true;
    //angular.element(document.getElementById('myionic')).scope().showModal(obj.frame);
}

function overlapHandler (player, obj) {
    obj.kill();
    count++;
    //sound.play();
}

function update() {
    //collision = game.physics.arcade.collide(player, mapObjs, collisionHandler, null, this);

    game.physics.arcade.overlap(player, mapObjs, overlapHandler, null, this);

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    absX = game.input.pointer1.x - window.innerWidth/2;
    absY = window.innerHeight/2 - game.input.pointer1.y;

    if (heading == "west" || (cursors.left.isDown) || (game.input.pointer1.isDown && ((absX < 0) && (Math.abs(absY) < Math.abs(absX)*0.41) )))
    {
        player.body.velocity.x = -1;
        player.animations.play('west');
        direction = 6;        
        if(!collision) {
            if(showTile) tilesprite.tilePosition.x += 1;
            mapObjs.x += 1;       
        }
    }
    else if (heading == "east" || (cursors.right.isDown) || (game.input.pointer1.isDown && ((absX > 0) && (Math.abs(absY) < Math.abs(absX)*0.41) )))
    {
        player.body.velocity.x = 1;
        player.animations.play('east');
        direction = 2;
        if(!collision) {
            if(showTile) tilesprite.tilePosition.x -= 1;
            mapObjs.x -= 1;
        }
    }
    else if (heading == "north" || (cursors.up.isDown) || (game.input.pointer1.isDown && ((absY > 0) && (Math.abs(absY) > Math.abs(absX)*2.41) )))
    {
        player.body.velocity.y = -1;
        player.animations.play('north');
        direction = 0;        
        if(!collision) {
            if(showTile) tilesprite.tilePosition.y += 1;
            mapObjs.y += 1;
        }
    }
    else if (heading == "south" || (cursors.down.isDown) || (game.input.pointer1.isDown && ((absY < 0) && (Math.abs(absY) > Math.abs(absX)*2.41) )))
    {
        player.body.velocity.y = 1;
        player.animations.play('south');
        direction = 4;
        if(!collision) {
            if(showTile) tilesprite.tilePosition.y -= 1;
            mapObjs.y -= 1;
        }
    }
    else if (heading == "northeast" || (cursors.up.isDown && cursors.right.isDown) || (game.input.pointer1.isDown && ((absX > 0) && (absY > 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.body.velocity.x = 1
        player.body.velocity.y = -1;
        player.animations.play('northeast');
        direction = 1;
        if(!collision) {
            if(showTile) {
            tilesprite.tilePosition.y += 1;
            tilesprite.tilePosition.x -= 1;
            }
            mapObjs.y += 1;
            mapObjs.x -= 1;
        }
    }
    else if (heading == "northwest" || (cursors.up.isDown && cursors.left.isDown) || (game.input.pointer1.isDown && ((absX < 0) && (absY > 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.body.velocity.x = -1
        player.body.velocity.y = -1;
        player.animations.play('northwest');
        direction = 7;        
        if(!collision) {
            if(showTile) {
            tilesprite.tilePosition.y += 1;
            tilesprite.tilePosition.x += 1;
            }
            mapObjs.y += 1;
            mapObjs.x += 1;
        }
    }
    else if (heading == "southeast" || (cursors.down.isDown && cursors.right.isDown) || (game.input.pointer1.isDown && ((absX > 0) && (absY < 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.body.velocity.x = 1
        player.body.velocity.y = 1;
        player.animations.play('southeast');
        direction = 3;        
        if(!collision) {
            if(showTile) {
            tilesprite.tilePosition.y -= 1;
            tilesprite.tilePosition.x -= 1;
            }
            mapObjs.y -= 1;
            mapObjs.x -= 1;        
        }
    }
    else if (heading == "southwest" || (cursors.down.isDown && cursors.left.isDown) || (game.input.pointer1.isDown && ((absX < 0) && (absY < 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.body.velocity.x = -1
        player.body.velocity.y = 1;
        player.animations.play('southwest');
        direction = 5;        
        if(!collision) {
            if(showTile) {
            tilesprite.tilePosition.y -= 1;
            tilesprite.tilePosition.x += 1;
            }
            mapObjs.y -= 1;
            mapObjs.x += 1;        
        }
    }
    else
    {
        //  Stand still
        player.animations.stop();
        switch (direction) {
            case 0:
                player.frame = 37;
                break;
            case 1:
                player.frame = 43;
                break;
            case 2:
                player.frame = 25;
                break;
            case 3:
                player.frame = 7;
                break;
            case 4:
                player.frame = 1;
                break;
            case 5:
                player.frame = 19;
                break;
            case 6:
                player.frame = 13;
                break;
            case 7:
                player.frame = 31;
                break;
            default:
                player.frame = 7;
                break;
        }
    }

    collision = false;

    if (game.input.activePointer.isDown)
    {
        fire();
    }
}

function render() {
    game.debug.text(count, 32, 32, 'rgb(55,55,55)');
    //game.debug.pointer(game.input.positionDown);
    //game.debug.text(game.input.pointer1.x, 332, 32, 'rgb(255,255,255)');

    //game.debug.text("X:" + absX, 232, 32, 'rgb(255,255,255)');
    //game.debug.text("Y:" + absY, 332, 32, 'rgb(255,255,255)');
    game.debug.text("X:" + Math.floor(player.x), 132, 32, 'rgb(255,255,255)');
    game.debug.text("Y:" + Math.floor(player.y), 232, 32, 'rgb(255,255,255)');
    
}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(player.x , player.y );

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}
