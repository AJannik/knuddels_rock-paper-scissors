import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { UiButton } from '../objects/UiButton';
import { Rock } from '../objects/playables/Rock';
import { Paper } from '../objects/playables/Paper';
import { Scissors } from '../objects/playables/Scissors';
import { NPC } from '../objects/NPC';

export default class GameScene extends Phaser.Scene {
  private player: IPlayer;
  private npc: IPlayer;
  private rockBtn!: UiButton;
  private paperBtn!: UiButton;
  private scissorsBtn!: UiButton;
  
  constructor() {
    super('GameScene');

    this.player = new Player();
    this.npc = new NPC([new Rock(), new Paper(), new Scissors()]);
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
      this.player.setPlayed(new Rock());
      this.deactivateSelectionBtns();
    });

    this.add.existing(this.paperBtn).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.player.setPlayed(new Paper());
      this.deactivateSelectionBtns();
    });

    this.add.existing(this.scissorsBtn).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.player.setPlayed(new Scissors());
      this.deactivateSelectionBtns();
    });

    this.input.on('pointerdown', () => {
      //this.scene.start('TestScene');
    })
  }

  private deactivateSelectionBtns() {
    this.rockBtn.deactivate();
    this.paperBtn.deactivate();
    this.scissorsBtn.deactivate();
  }
}
