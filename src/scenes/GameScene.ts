import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { UiButton } from '../objects/UiButton';
import { Rock } from '../objects/playables/Rock';
import { Paper } from '../objects/playables/Paper';
import { Scissors } from '../objects/playables/Scissors';
import { NPC } from '../objects/NPC';
import { IPlayer } from '../interfaces/IPlayer';
import { BasicRockPaperScissorsRuleSet } from '../objects/BasicRockPaperScissorsRulesSet';
import { IRuleSet } from '../interfaces/IRuleSet';
import { GameResult } from '../enums/GameResult';
import { IPlayable } from '../interfaces/IPlayable';
import { RoundStartAnimation } from '../objects/RoundStartAnimation';

export default class GameScene extends Phaser.Scene {
  private player: IPlayer;
  private npc: IPlayer;
  private rockBtn!: UiButton;
  private paperBtn!: UiButton;
  private scissorsBtn!: UiButton;
  private npcPlayedTxt!: Phaser.GameObjects.Text;
  private resultTxt!: Phaser.GameObjects.Text;
  private ruleSet: IRuleSet;
  private playerImage!: RoundStartAnimation;
  private npcImage!: RoundStartAnimation;
  private scoreTxt!: Phaser.GameObjects.Text;
  
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
    this.rockBtn = new UiButton(this, 217, 440, 'player_rock', 0.15);
    this.paperBtn = new UiButton(this, 400, 440, 'player_paper', 0.15);
    this.scissorsBtn = new UiButton(this, 583, 440, 'player_scissors', 0.15);

    this.playerImage = new RoundStartAnimation(this, 220, 200, 'player_rock', 0.33);
    this.add.existing(this.playerImage);
    this.npcImage = new RoundStartAnimation(this, 580, 200, 'player_rock', -0.33);
    this.add.existing(this.npcImage);

    this.npcPlayedTxt = this.add.text(300, 60, '');
    this.npcPlayedTxt.z = 10;
    this.npcPlayedTxt.setColor("#000000");
    this.resultTxt = this.add.text(300, 100, '');
    this.resultTxt.z = 10;
    this.resultTxt.setColor("#000000");

    this.scoreTxt = this.add.text(250, 550, "Player: 0 | Computer: 0", {fontFamily: "Georgia", fontSize: 32, color: "#000000"});

    this.add.existing(this.rockBtn).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.playerSelectBtn(new Rock());
    });

    this.add.existing(this.paperBtn).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.playerSelectBtn(new Paper());
    });

    this.add.existing(this.scissorsBtn).on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.playerSelectBtn(new Scissors());
    });

    this.input.on('pointerdown', () => {
      //this.scene.start('TestScene');
    })
  }

  private playerSelectBtn(selected: IPlayable) {
    this.player.setPlayed(selected);
    this.deactivateSelectionBtns();
    this.play();
  }

  private deactivateSelectionBtns() {
    this.rockBtn.deactivate();
    this.paperBtn.deactivate();
    this.scissorsBtn.deactivate();
  }

  private activateSelectionBtns() {
    this.rockBtn.activate();
    this.paperBtn.activate();
    this.scissorsBtn.activate();
  }

  private play() {
    var npcPlayed = this.npc.getPlayed();    
    this.npcPlayedTxt.text = npcPlayed.name;

    this.playerImage.onComplete = () => {
      this.roundComplete(npcPlayed);
    }

    this.playerImage.startAnimation(this.player.getPlayed().sprite);
    this.npcImage.startAnimation(npcPlayed.sprite);
  }

  private roundComplete(npcPlayed: IPlayable) {
    var result = this.player.hasWon(npcPlayed);
    switch (result) {
      case GameResult.Lost:
        this.resultTxt.text = "Lost!";
        this.npc.incrementScore();
        break;
      case GameResult.Won:
        this.resultTxt.text = "Won!";
        this.player.incrementScore();
        break;
      case GameResult.Tie:
        this.resultTxt.text = "Tie!";
        break;
    }

    this.activateSelectionBtns();
    this.scoreTxt.text = "Player: " + this.player.getScore() + " | Computer: " + this.npc.getScore();
  }
}
