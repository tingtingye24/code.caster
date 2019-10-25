export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: 'Level' });
  }
  init(data){
    this.level = data.level;
    this.score = data.score;
    this.health = data.health;
    this.round = data.round;
  }

  preload() {
    this.load.image("wizard", "assets/wizard_right.png");
    this.load.image("monster1", "assets/image.png");
    this.load.image("monster2", "assets/frog.png");
    this.load.image("monster3", "assets/snake.png");
    this.load.image("monster4", "assets/monster4.png");
    this.load.image("monster5", "assets/monster5.png");
    this.load.image("monster6", "assets/monster6.png");
    this.load.image("monster7", "assets/monster7.png");
    this.load.image("monster8", "assets/monster8.png");
    this.load.image("monster9", "assets/monster9.png");
    this.load.image("platform", "assets/lava_platform.png");
    this.load.image("bg1", "assets/background.jpg");
    this.load.image("blackSquare", "assets/blackBar.png");

    this.load.audio("jumping", "assets/Jumping-sound.mp3");
    
    this.load.audio("backgroundMusic","assets/Silent Hill 2 OST - Betrayal.mp3");
  }

  create() {
    this.spookyPath = this.add.image(1000, 350, "bg1").setScale(1.5);
    this.spookyPath2 = this.add.image(3000, 350, "bg1").setScale(1.5);
    this.wizardSprite = this.physics.add
      .sprite(200, -50, "wizard")
      .setScale(0.25);
    this.monster1 = this.physics.add.sprite(2950, -50, this.level).setScale(0.5);
    this.monster1.flipX = true;

    this.jumping = this.sound.add("jumping");
    
    this.backgroundMusic = this.sound.add("backgroundMusic");
    this.backgroundMusic.play();

    //   this.levelSetup();

    var blackSquare = this.physics.add.staticGroup();
    this.blackSquare = blackSquare.create(2300, 1000, "blackSquare");
    var platforms = this.physics.add.staticGroup();
    this.platform1 = platforms.create(225, 510, "platform");
    this.platform2 = platforms.create(3500, 250, "platform");
    this.platform3 = platforms.create(800, (Math.random() *400) +300, "platform");
    this.platform4 = platforms.create(1200, (Math.random() *200) +300, "platform");
    this.platform5 = platforms.create(1500, (Math.random() *400) +400, "platform");
    this.platform6 = platforms.create(1800, (Math.random() *400) +300, "platform");
    this.platform7 = platforms.create(2100, (Math.random() *300) +400, "platform");
    this.platform8 = platforms.create(2400, 610, "platform");
    this.platform9 = platforms.create(2800, 610, "platform");
    this.platform10 = platforms.create(3000, 250, "platform");
    this.platform11 = platforms.create(3500, 610, "platform");
    this.platform12 = platforms.create(3900, 400, "platform");

    // Make the camera follow player
    this.cameras.main.setBounds(0, 0, this.width, this.height);
    this.physics.world.setBounds(0, 0, this.width, this.height);
    this.cameras.main.startFollow(this.wizardSprite, true, 0.5, 0.5);

    // Physics
    this.wizardSprite.setCollideWorldBounds(true);
    this.monster1.setCollideWorldBounds(true);
    this.physics.add.collider(this.wizardSprite, platforms);
    this.physics.add.collider(this.monster1, platforms);
    // this.physics.add.collider(this.wizardSprite, blackSquare);

    // Create the keyboard functionality on up,down.left,right,space,shift
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.wizardSprite, blackSquare, () => {
      this.cameras.main.shake(200, 0.05, false, function(camera, progress) {
        this.time.addEvent({
          delay: 2000,
          callback: () => {
            console.log(this.round);
            if(this.round == 1){
              this.scene.restart();
            }else{
              this.backgroundMusic.stop(); 
              this.scene.start('Battle', {level: this.level, round: this.round , health: this.health, score: this.score});
            }
          },
          loop: false
        })
      });
    });

    this.physics.add.overlap(
      this.wizardSprite,
      this.monster1,
      function() {
        // Add in the collider that will fade out to the next level here
        // this.backgroundMusic.stop();
        this.backgroundMusic.stop();
        this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
          if (progress > 0.9) {
            if(this.round != 1){
              this.health +=20;
            }
            this.scene.start('Battle', {level: this.level, round: this.round , health: this.health, score: this.score});
          }
        });
      },
      null,
      this
    );
  }
  update() {
    if (this.cursors.left.isDown) {
      this.wizardSprite.setVelocityX(-300);
      this.wizardSprite.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.wizardSprite.setVelocityX(300);
      this.wizardSprite.flipX = false;
    } else {
      this.wizardSprite.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.wizardSprite.body.touching.down) {
      this.wizardSprite.setVelocityY(-600);
      this.jumping.play();
    }
  }
}

