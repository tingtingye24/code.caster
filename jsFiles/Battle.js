
export default class Battle extends Phaser.Scene{
    constructor(){
        super({key: "Battle"})
    }
    init(data){
        this.level = data.level;
        this.round = data.round;
        this.health = data.health;
        this.score = data.score;
    }
    
    preload(){
        
        // this.load.json('question', renderQuestion());
        this.load.image("fire", "assets/fire1.png");
        this.load.image('stone', "assets/stone.png")
        this.load.image("platform","assets/lava_platform.png");
        this.load.image("monster1", "assets/image.png");
        this.load.image("monster2", "assets/frog.png");
        this.load.image("monster3", "assets/snake.png");
        this.load.image("monster4", "assets/monster4.png");
        this.load.image("monster5", "assets/monster5.png");
        this.load.image("monster6", "assets/monster6.png");
        this.load.image("monster7", "assets/monster7.png");
        this.load.image("monster8", "assets/monster8.png");
        this.load.image("monster9", "assets/monster9.png");

        this.load.image("wizard", "assets/wizard_right.png");
        this.load.image("castle", "assets/castle_background.jpg");
        this.load.image("playerHealthBar", "assets/greenbar.jpg");
        this.load.image("player2HealthBar", "assets/greenbar.jpg");
        this.load.image("whitebar", "assets/whitebar.jpg");
        this.fetchQuestions();

        this.load.audio('fireSound', 'assets/fireSoundEFX.mp3')
        this.load.audio('rockSound', 'assets/rockSoundEFX.mp3')

    }

    create() {
        this.fireSound = this.sound.add('fireSound')
        this.rockSound = this.sound.add('rockSound')
        console.log(this.level)
        this.add.image(400, 300, "castle");
        this.player2 = this.newPlayer(600, 200, this.level, 0.5);  
        this.player = this.newPlayer(100,300,"wizard", 0.75);
        this.platforms = this.createPlatform(0);
        this.platform2 = this.createPlatform(550    );
        this.scoreText = this.add.text(330, 550, `Score: ${this.score}`, {
            fontSize: "30px",
            fill: "white"
          })
        this.createHealthBars();
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player2, this.platform2);
        this.renderQuestionBoard(this.questionObj)
        console.log(this.answer)
        this.clickListener();
    }

    createPlatform(curX){
        return this.physics.add.staticGroup()
        .create(curX, 550, "platform")
        .setOrigin(0,0)
        // .setScale(, 1)
        .refreshBody();
    }

    newPlayer(x,y,key,scale){
    return this.physics.add
        .sprite(x, y, key)
        .setScale(scale);
    }

    createHealthBars(){
        this.add.image(49, 549, "whitebar").setOrigin(0, 0).displayWidth = 202;
        this.playerHealthBar = this.add.image(50, 550, "playerHealthBar").setOrigin(0, 0)
        this.add.image(549, 549, "whitebar").setOrigin(0, 0).displayWidth = 202;
        this.player2HealthBar = this.add.image(550, 550, "player2HealthBar").setOrigin(0, 0)
        this.playerHealthBar.displayWidth = this.health;
        this.player2HealthBar.displayWidth = 200;
    }
    updateHealthBar(clickedvalue){
        this.destroyQuestion();
        this.fetchQuestions();
        if(clickedvalue === this.answer){
            this.player2HealthBar.displayWidth-=20
            this.fire();
            this.attackedMonster();
        }else{
            this.playerHealthBar.displayWidth -=20;
            this.health-=20
            this.rock();
        }
        this.renderQuestionBoard(this.questionObj);
        this.clickListener();
    }
    
    fetchQuestions(){
        return fetch(`http://localhost:3000/questions/${Math.floor(Math.random() * 54) + 1 }`).then(resp =>resp.json()).then(question => this.questionObj = question)
    }

    renderQuestionBoard(question){
        // this.add.rectangle(250,250,200,200, "0xFFFFFF") 
        this.question = this.add.text(20,50, question.question, {color: "orange", align: "center",wordWrap: { width: 250 }})
        this.answer1 = this.add.text(20, 135, question.answer1, {color: "red"});
        this.answer2 = this.add.text(20, 160, question.answer2, {color: "red"});
        this.answer3 = this.add.text(20, 185, question.answer3, {color: "red"});
        this.answer4 = this.add.text(20, 215, question.answer4, {color: "red"});
        
        this.answer1.setInteractive();
        this.answer2.setInteractive();
        this.answer3.setInteractive();
        this.answer4.setInteractive();
        
        this.answer = question.answer
    }

    destroyQuestion(){
        // this.questionObj.destroy();
        this.question.destroy();
        this.answer1.destroy();
        this.answer2.destroy();
        this.answer3.destroy();
        this.answer4.destroy();
        // this.answer.destroy();
        
    }
    
    clickListener(){
        this.answer1.on('pointerdown', ()=>{
            // console.log("hello?")
            this.updateHealthBar(1);
        })
        this.answer2.on('pointerdown', ()=>{
            // console.log("hello?")
            this.updateHealthBar(2);   
        })
        this.answer3.on('pointerdown', ()=>{
            // console.log("hello?")
            this.updateHealthBar(3);   
        })
        this.answer4.on('pointerdown', ()=>{
            // console.log("hello?")
            this.updateHealthBar(4);   
        })
    }
    fire(){
        this.fireSound.play()
        var fires = this.physics.add.group();
        function fireGen() {
            
            const xCoord = Math.random() * 450 + 400;
          
            fires.create(xCoord, 10, "fire");
        }
        this.time.addEvent({
            delay: 100,
            callback: fireGen,
            callbackScope: this,
            repeat: 25
        });

    }

    rock(){
        this.rockSound.play()
        var rocks = this.physics.add.group();
        function stoneGen() {
            const xCoord = Math.random() * 350 + 1;
          
            rocks.create(xCoord, 10, "stone");
        }
        this.time.addEvent({
            delay: 100,
            callback: stoneGen,
            callbackScope: this,
            repeat: 25
        });
    }
    attack(type){
        var attack = this.physics.add.group();
        function attackGen(){
            const xCoord = Math.random() * 350 + 1;
            rocks.create(xCoord, 10, type);
        }
        this.time.addEvent({
            delay: 100,
            callback: stoneGen,
            callbackScope: this,
            repeat: 25
        });
    }
    attackedMonster(){
        this.score+=10;
        this.scoreText.setText(`Score: ${this.score}`);
    }


    update(){
        if(this.player2HealthBar.displayWidth < 2){
            
            this.cameras.main.fade(800,0,0,0,false,function(camera, progress){
                if(progress > 0.9){
                    this.scene.start('Round',{round: this.round+=1, health: this.health, score: this.score});
                    this.player2HealthBar.displayWidth = 200;
                }
            })
        }
        if(this.playerHealthBar.displayWidth <= 2){
            this.scene.start("End",{score: this.score});
        }
        if(this.round === 9){
            this.scene.start("MainScreen");

        }

    }
}

