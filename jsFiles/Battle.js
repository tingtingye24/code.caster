var curThis;
export default class Battle extends Phaser.Scene{
    constructor(){
        super({key: "Battle"})
    }
    
    preload(){
        
        // this.load.json('question', renderQuestion());
        this.load.image("fire", "assets/fire1.png");
        this.load.image('stone', "assets/stone.png")
        this.load.image("platform","assets/platform.png");
        this.load.image("monster", "assets/image.png");
        this.load.image("monster2", "assets/wizard_right.png");
        this.load.image("wizard", "assets/wizard_right.png");
        this.load.image("castle", "assets/castle_background.jpg");
        this.load.image("playerHealthBar", "assets/greenbar.jpg");
        this.load.image("player2HealthBar", "assets/greenbar.jpg");
        this.load.image("whitebar", "assets/whitebar.jpg");
        this.fetchQuestions();
        curThis = this;
    }

    create() {
        
        this.score = 0;
        this.add.image(400, 300, "castle");
        this.player2 = this.newPlayer(600, 200, 'monster', 0.5);  
        this.player = this.newPlayer(100,300,"wizard", 0.75);
        this.platforms = this.createPlatform();
        this.scoreText = this.add.text(330, 550, `Score: ${this.score}`, {
            fontSize: "30px",
            fill: "#000000"
          })
        this.createHealthBars();
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player2, this.platforms);
        this.renderQuestionBoard(this.questionObj)
        console.log(this.answer)
        this.clickListener();
    }

    createPlatform(){
        return this.physics.add.staticGroup()
        .create(225, 590, "platform")
        .setScale(3, 1.5)
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
        this.playerHealthBar.displayWidth = 200;
        this.player2HealthBar.displayWidth = 20;
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
            this.rock();
        }
        this.renderQuestionBoard(this.questionObj);
        this.clickListener();
    }
    
    fetchQuestions(){
        return fetch(`http://localhost:3000/questions/${Math.floor(Math.random() * 17) + 1 }`).then(resp =>resp.json()).then(question => this.questionObj = question)
    }

    renderQuestionBoard(question){
        
        this.question = this.add.text(20,50, question.question, {color: "red"})
        this.answer1 = this.add.text(20, 100, question.answer1);
        this.answer2 = this.add.text(20, 125, question.answer2);
        this.answer3 = this.add.text(20, 150, question.answer3);
        this.answer4 = this.add.text(20, 175, question.answer4);
        
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
    attackedMonster(){
        this.score+=10;
        this.scoreText.setText(`Score: ${this.score}`);
    }


    update(){
        
        if(this.player2HealthBar.displayWidth <= 2){
            // console.log('hello?')
            // this.player2.destroy();
            // let gamestate = this;
            setInterval(function(){

                curThis.player2.setTexture('monster2');
                curThis.player2HealthBar.displayWidth = 200;
                curThis.physics.add.collider(curThis.player2, curThis.platforms);
            },4000); 
            

        }
        if(this.playerHealthBar.displayWidth <= 2){
            this.scene.start("End");
        }

    }
}

