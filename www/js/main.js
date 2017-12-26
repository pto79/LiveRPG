var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var tilesprite;
var player;
var cursors;
var text;
var temp;
var overlay;
var gmap;
var mapObj;
var absX;
var absY;
var direction;
var collision = false;
var count = 0;
var mapObjs;
var player2;

//temp = document.title;

function preload() {
    game.load.image('grass', 'assets/grass.png');
    game.load.spritesheet('tileb', 'assets/tileb.png', 32, 32);
    //game.load.spritesheet('dude', 'assets/universal-lpc-sprite_male_01_walk-3frame.png', 48, 64);
    game.load.spritesheet('dude', 'assets/6Actor_5.png', 32, 32);
}

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    //tilesprite = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'grass');

    // The player and its settings
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'dude');
    //player.anchor.set(0.5,0.5);
    //player.inputEnabled = true;
    //player.events.onInputDown.add(testMessageBox, this);

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    player.body.bounce.set(1)
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

    //var overlay = document.querySelector('.test');
    overlay = document.getElementById('gps');

    // text
    text = game.add.text(16, 16, temp);

    mapObjs = game.add.group();
    mapObjs.enableBody = true;
    
    mapObj = game.add.sprite(game.world.centerX-100, game.world.centerY-100, 'tileb');
    mapObj.frame = 2;
    game.physics.arcade.enable(mapObj);    
    mapObj.body.collideWorldBounds = true;
    mapObj.body.immovable = true;



    //collision = false;
}

function collisionHandler (player, mapObj) {
    //collision = true;
    count = count + 1;
    //prompt("Please enter your name", "Anonymous");
}

function update() {
    game.physics.arcade.collide(player, mapObj);

    //collision = game.physics.arcade.collide(player, mapObj, collisionHandler, null, this);

    absX = game.input.pointer1.x - window.innerWidth/2;
    absY = window.innerHeight/2 - game.input.pointer1.y;


    if (overlay.innerHTML == "west" || (game.input.pointer1.isDown && ((absX < 0) && (Math.abs(absY) < Math.abs(absX)*0.41) )))
    {
        player.animations.play('west');
        direction = 6;        
        if(!collision) {
            //tilesprite.tilePosition.x += 1;
            mapObj.x += 1;       
        }
    }
    else if (overlay.innerHTML == "east" || (game.input.pointer1.isDown && ((absX > 0) && (Math.abs(absY) < Math.abs(absX)*0.41) )))
    {
        player.animations.play('east');
        direction = 2;
        if(!collision) {
            //tilesprite.tilePosition.x -= 1;
            mapObj.x -= 1;
        }
    }
    else if (overlay.innerHTML == "north" || (game.input.pointer1.isDown && ((absY > 0) && (Math.abs(absY) > Math.abs(absX)*2.41) )))
    {
        player.animations.play('north');
        direction = 0;        
        if(!collision) {
            //tilesprite.tilePosition.y += 1;
            mapObj.y += 1;
        }
    }
    else if (overlay.innerHTML == "south" || (game.input.pointer1.isDown && ((absY < 0) && (Math.abs(absY) > Math.abs(absX)*2.41) )))
    {
        player.animations.play('south');
        direction = 4;
        if(!collision) {
            //tilesprite.tilePosition.y -= 1;
            mapObj.y -= 1;
        }
    }
    else if (overlay.innerHTML == "northeast" || (game.input.pointer1.isDown && ((absX > 0) && (absY > 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.animations.play('northeast');
        direction = 1;
        if(!collision) {
            //tilesprite.tilePosition.y += 1;
            //tilesprite.tilePosition.x -= 1;
            mapObj.y += 1;
            mapObj.x -= 1;
        }
    }
    else if (overlay.innerHTML == "northwest" || (game.input.pointer1.isDown && ((absX < 0) && (absY > 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.animations.play('northwest');
        direction = 7;        
        if(!collision) {
            //tilesprite.tilePosition.y += 1;
            //tilesprite.tilePosition.x += 1;
            mapObj.y += 1;
            mapObj.x += 1;
        }
    }
    else if (overlay.innerHTML == "southeast" || (game.input.pointer1.isDown && ((absX > 0) && (absY < 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.animations.play('southeast');
        direction = 3;        
        if(!collision) {
            //tilesprite.tilePosition.y -= 1;
            //tilesprite.tilePosition.x -= 1;
            mapObj.y -= 1;
            mapObj.x -= 1;        
        }
    }
    else if (overlay.innerHTML == "southwest" || (game.input.pointer1.isDown && ((absX < 0) && (absY < 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.animations.play('southwest');
        direction = 5;        
        if(!collision) {
            //tilesprite.tilePosition.y -= 1;
            //tilesprite.tilePosition.x += 1;
            mapObj.y -= 1;
            mapObj.x += 1;        
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

    //temp = overlay.innerHTML;
    //text.setText(temp);
    //collision = false;
}

function render() {
    temp = overlay.innerHTML;
    game.debug.text(count, 32, 32, 'rgb(255,255,255)');
    //game.debug.pointer(game.input.positionDown);
    //game.debug.text(game.input.pointer1.x, 332, 32, 'rgb(255,255,255)');

    game.debug.text("X:" + absX, 232, 32, 'rgb(255,255,255)');
    game.debug.text("Y:" + absY, 332, 32, 'rgb(255,255,255)');
    
}

