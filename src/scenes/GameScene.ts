import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { UiButton } from '../objects/UiButton';

export default class GameScene extends Phaser.Scene {
  private players: Player[];
  private rockBtn: UiButton;
  private paperBtn: UiButton;
  private scissorsBtn: UiButton;
  
  constructor() {
    super('GameScene');
    this.players = [new Player(false), new Player(true)];
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    this.add.existing(new UiButton(this, 100, 100, 'logo', 'logo')).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      console.log('pressed');
      
    });


    this.input.on('pointerdown', () => {
      //this.scene.start('TestScene');
    })
  }
}
