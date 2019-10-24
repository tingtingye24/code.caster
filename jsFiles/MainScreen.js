// var question;


class MainScreen extends Phaser.Scene {
    constructor(){
        super({key: "MainScreen"});
    }
    
    preload(){
        this.load.image("castle", "assets/castle_background.jpg");
        
        
    }

    create (){
    // Basic text wrapping based on width.
    //    console.log(question);
    // fetch('http://localhost:3000/questions/1').then(resp => resp.json()).then(json => localStorage.setItem('question', json))
    this.add.image(400, 300, "castle");
        this.make.text({
            x: 400,
            y: 300,
            text: 'Welcome to Code.Caster',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 75px Arial',
                fill: 'white',
                wordWrap: { width: 100 },
                align: 'center' 
            }
        });
        this.make.text({
            x: 400,
            y: 500,
            text: 'press any key to start...',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 15px Arial',
                fill: 'green',
            }
        });
        this.input.keyboard.on('keydown', function(event){
            
            this.scene.start("Battle");
    }, this);

    }

    // create(){
    //     this.text = this.make.text(0, 0, "Welcome to Code.Caster", {font: "50px", wordWrap: {width: "2000px"})
    // }

}
export default MainScreen