

export default class End extends Phaser.Scene{
    constructor(){
        super({key: "End"});
    }
    init(data){
        this.score = data.score
    }
    
    preload(){
        this.load.image("castle", "assets/castle_background.jpg");
        
        
    }
    postUser(){
        this.name = prompt("Please enter your name", "Anonymous");
        if(this.name || this.score >= 0){
            fetch('http://localhost:3000/users', {
                method: 'post',
                header: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: this.name,
                    score: this.score,
                })
            })
        }
    }
    fetchTopTen(){
        var curY = 50;
        fetch('http://localhost:3000/users/topTen').then(resp => resp.json()).then(users => users.forEach(user => {
            curY+=45;
            this.renderUser(user,curY);
        }))
    }
    renderUser(user,curY){
        
        this.add.text(300, curY,user.name, {color: 'red',align: 'center'})
        this.add.text(400, curY, user.score,{color: 'black',align: 'center'} )
        
    }

    create (){
        this.postUser();
        
        this.fetchTopTen();
        ;
        this.add.image(400, 300, "castle");
            
        this.add.rectangle(400,300,300,500, "0xFFFFFF") 
        this.make.text({
            x: 400,
            y: 75,
            text: "High Score",
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 20px Arial',
                fill: 'black',
               
                align: 'center' 
            }
    });
        
        this.input.keyboard.on('keydown', function(event){
            this.scene.start("Battle",{level: "monster1", round:1});
        }, this);
    }

    
    

}