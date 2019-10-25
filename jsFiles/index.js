
import MainScreen from './MainScreen.js';
import Battle from './Battle.js';
import Round from './Round.js'
import End from './End.js';
import Level from './Level.js';



// const MainScreen =  new MainScreen();
document.addEventListener('DOMContentLoaded', ()=>{
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      enableBody: true
    }
  },
  scene: [MainScreen, Battle, Round, End, Level]
  };
  const game = new Phaser.Game(config);
})

