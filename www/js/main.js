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

//temp = document.title;

function preload() {
    game.load.image('grass', 'assets/grass.png');
    game.load.spritesheet('tileb', 'assets/tileb.png', 32, 32);
    //game.load.spritesheet('dude', 'assets/universal-lpc-sprite_male_01_walk-3frame.png', 48, 64);
    game.load.spritesheet('dude', 'assets/6Actor_5.png', 32, 32);
}

    function testMessageBox() {
        //call this line of code when you want to show the message box
        //message, width and height
        //showMessageBox("HELLO THERE! Put Some Text Here!", game.width * .7, game.height * .5);
        //window.open("www.phaser.io", "_blank");
        //window.location.href = "http://www.google.com";
         prompt("Please enter your name", "Anonymous");
    }

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    //tilesprite = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'grass');

    // The player and its settings
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'dude');

    player.anchor.set(0.5,0.5);
    player.inputEnabled = true;
    player.events.onInputDown.add(testMessageBox, this);

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

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

    //  Creates a blank tilemap
    //gmap = game.add.tilemap();
    //gmap.addTilesetImage('tileb','wall',32,32,null,null,0);

    //mapObj = game.add.sprite(game.world.centerX-30, game.world.centerY-30, 'tileb');

}


    //
    //w=width
    //h=height
    //
    function showMessageBox(text, w = 300, h = 300) {
        //just in case the message box already exists
        //destroy it
        if (this.msgBox) {
            this.msgBox.destroy();
        }
        //make a group to hold all the elements
        var msgBox = game.add.group();
        //make the back of the message box
        var back = game.add.sprite(0, 0, "boxBack");
        //make the close button
        var closeButton = game.add.sprite(0, 0, "closeButton");
        //make a text field
        var text1 = game.add.text(0, 0, text);
        //set the textfeild to wrap if the text is too long
        text1.wordWrap = true;
        //make the width of the wrap 90% of the width 
        //of the message box
        text1.wordWrapWidth = w * .9;
        //
        //
        //set the width and height passed
        //in the parameters
        back.width = w;
        back.height = h;
        //
        //
        //
        //add the elements to the group
        msgBox.add(back);
        msgBox.add(closeButton);
        msgBox.add(text1);
        //
        //set the close button
        //in the center horizontally
        //and near the bottom of the box vertically
        closeButton.x = back.width / 2 - closeButton.width / 2;
        closeButton.y = back.height - closeButton.height;
        //enable the button for input
        closeButton.inputEnabled = true;
        //add a listener to destroy the box when the button is pressed
        closeButton.events.onInputDown.add(this.hideBox, this);
        //
        //
        //set the message box in the center of the screen
        msgBox.x = game.width / 2 - msgBox.width / 2;
        msgBox.y = game.height / 2 - msgBox.height / 2;
        //
        //set the text in the middle of the message box
        text1.x = back.width / 2 - text1.width / 2;
        text1.y = back.height / 2 - text1.height / 2;
        //make a state reference to the messsage box
        this.msgBox = msgBox;
    }

    function hideBox() {
        //destroy the box when the button is pressed
        this.msgBox.destroy();
    }


function update() {

    //  Reset the players velocity (movement)
    
    player.body.velocity.x = 0;

    absX = game.input.pointer1.x - window.innerWidth/2;
    absY = window.innerHeight/2 - game.input.pointer1.y;

    if (overlay.innerHTML == "west" || (game.input.pointer1.isDown && ((absX < 0) && (Math.abs(absY) < Math.abs(absX)*0.41) )))
    {
        player.animations.play('west');
        //tilesprite.tilePosition.x += 1;
    }
    else if (overlay.innerHTML == "east" || (game.input.pointer1.isDown && ((absX > 0) && (Math.abs(absY) < Math.abs(absX)*0.41) )))
    {
        player.animations.play('east');
        //tilesprite.tilePosition.x -= 1;
    }
    else if (overlay.innerHTML == "north" || (game.input.pointer1.isDown && ((absY > 0) && (Math.abs(absY) > Math.abs(absX)*2.41) )))
    {
        player.animations.play('north');
        //tilesprite.tilePosition.y += 1;
    }
    else if (overlay.innerHTML == "south" || (game.input.pointer1.isDown && ((absY < 0) && (Math.abs(absY) > Math.abs(absX)*2.41) )))
    {
        player.animations.play('south');
        //tilesprite.tilePosition.y -= 1;
    }
    else if (overlay.innerHTML == "northeast" || (game.input.pointer1.isDown && ((absX > 0) && (absY > 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.animations.play('northeast');
        //tilesprite.tilePosition.y += 1;
        //tilesprite.tilePosition.x -= 1;
    }
    else if (overlay.innerHTML == "northwest" || (game.input.pointer1.isDown && ((absX < 0) && (absY > 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.animations.play('northwest');
        //tilesprite.tilePosition.y += 1;
        //tilesprite.tilePosition.x += 1;
    }
    else if (overlay.innerHTML == "southeast" || (game.input.pointer1.isDown && ((absX > 0) && (absY < 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.animations.play('southeast');
        //tilesprite.tilePosition.y -= 1;
        //tilesprite.tilePosition.x -= 1;
    }
    else if (overlay.innerHTML == "southwest" || (game.input.pointer1.isDown && ((absX < 0) && (absY < 0) && (Math.abs(absY) < Math.abs(absX)*2.41) && (Math.abs(absY) > Math.abs(absX)*0.41) )))
    {
        player.animations.play('southwest');
        //tilesprite.tilePosition.y -= 1;
        //tilesprite.tilePosition.x += 1;
    }
    else
    {
        //  Stand still
        player.animations.stop();
        player.frame = 1;
    }

    //temp = overlay.innerHTML;
    //text.setText(temp);

    //mapObj.frame = 2;

}

function render() {
    temp = overlay.innerHTML;
    game.debug.text(temp, 32, 32, 'rgb(255,255,255)');
    //game.debug.pointer(game.input.positionDown);
    //game.debug.text(game.input.pointer1.x, 332, 32, 'rgb(255,255,255)');

    absX = game.input.pointer1.x - window.innerWidth/2;
    absY = window.innerHeight/2 - game.input.pointer1.y;
    game.debug.text("X:" + absX, 232, 32, 'rgb(255,255,255)');
    game.debug.text("Y:" + absY, 332, 32, 'rgb(255,255,255)');
    
}
