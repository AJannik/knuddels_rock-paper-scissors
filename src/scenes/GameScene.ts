import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { IPlayable } from "../interfaces/IPlayable";
import { UiButton } from '../objects/UiButton';
import { Rock } from '../objects/playables/Rock';
import { Paper } from '../objects/playables/Paper';
import { Scissors } from '../objects/playables/Scissors';
import { NPC } from '../objects/NPC';
import { IPlayer } from '../interfaces/IPlayer';
import { BasicRockPaperScissorsRuleSet } from '../objects/BasicRockPaperScissorsRulesSet';
import { IRuleSet } from '../interfaces/IRuleSet';
import { GameResult } from '../enums/GameResult';

export default class GameScene extends Phaser.Scene {
  private player: IPlayer;
  private npc: IPlayer;
  private rockBtn!: UiButton;
  private paperBtn!: UiButton;
  private scissorsBtn!: UiButton;
  private npcPlayedTxt!: Phaser.GameObjects.Text;
  private resultTxt!: Phaser.GameObjects.Text;
  private ruleSet: IRuleSet;
  
  constructor() {
    super('GameScene');
    
    
    this.ruleSet = new BasicRockPaperScissorsRuleSet();
    this.player = new Player(this.ruleSet);
    this.npc = new NPC(this.ruleSet);
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
    this.npcPlayedTxt = this.add.text(300, 60, '');
    this.resultTxt = this.add.text(300, 100, '');

    this.add.existing(this.rockBtn).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.player.setPlayed(new Rock());
      this.deactivateSelectionBtns();
      this.play();
    });

    this.add.existing(this.paperBtn).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.player.setPlayed(new Paper());
      this.deactivateSelectionBtns();
      this.play();
    });

    this.add.existing(this.scissorsBtn).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.player.setPlayed(new Scissors());
      this.deactivateSelectionBtns();
      this.play();
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

  private play() {
    var npcPlayed = this.npc.getPlayed();    
    this.npcPlayedTxt.text = npcPlayed.name;

    var result = this.player.hasWon(npcPlayed);
    switch (result) {
      case GameResult.Lost:
        this.resultTxt.text = "Lost!";
        break;
      case GameResult.Won:
        this.resultTxt.text = "Won!";
        break;
      case GameResult.Tie:
        this.resultTxt.text = "Tie!";
        break;
    }
  }
}
