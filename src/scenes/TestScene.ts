import Phaser from 'phaser';

export class TestScene extends Phaser.Scene {
    private gameText!: Phaser.GameObjects.Text;

    constructor() {
        super({
          key: 'TestScene'
        });
    }

  create() {
    this.gameText = this.add.text(400, 10, 'New Scene');
    this.input.keyboard.on('keydown-A', () => {
        this.gameText.text += "1";
    });
  }


  countUp() {    
    
  }
}
