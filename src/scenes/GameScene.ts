import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { UiButton } from '../objects/UiButton';

export default class GameScene extends Phaser.Scene {
  private players: Player[];
  private rockBtn!: UiButton;
  private paperBtn!: UiButton;
  private scissorsBtn!: UiButton;
  
  constructor() {
    super('GameScene');

    this.players = [new Player(false), new Player(true)];
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image('player_rock', 'assets/playables/player_rock.png');
    this.load.image('player_paper', 'assets/playables/player_paper.png');
    this.load.image('player_scissors', 'assets/playables/player_scissors.png');
  }

  create() {
    this.rockBtn = new UiButton(this, 100, 300, 'player_rock', 'player_rock', 0.2);
    this.paperBtn = new UiButton(this, 300, 300, 'player_paper', 'player_paper', 0.2);
    this.scissorsBtn = new UiButton(this, 500, 300, 'player_scissors', 'player_scissors', 0.2);

    this.add.existing(this.rockBtn).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      console.log('pressed');
    });
    this.add.existing(this.paperBtn).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      console.log('pressed');
    });
    this.add.existing(this.scissorsBtn).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      console.log('pressed');
    });

    

    this.input.on('pointerdown', () => {
      //this.scene.start('TestScene');
    })
  }
}
