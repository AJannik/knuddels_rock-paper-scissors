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
  private resultTxt!: Phaser.GameObjects.Text;
  private ruleSet: IRuleSet;
  private playerImage!: RoundStartAnimation;
  private npcImage!: RoundStartAnimation;
  private scoreTxt!: Phaser.GameObjects.Text;
  private smokeAnim!: Phaser.GameObjects.Sprite;
  
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
    this.load.spritesheet('smoke_sheet', 'assets/Smoke_4_512.png', {frameWidth: 512, frameHeight: 512})
  }

  create() {
    this.rockBtn = new UiButton(this, 217, 440, 'player_rock', 0.15);
    this.paperBtn = new UiButton(this, 400, 440, 'player_paper', 0.15);
    this.scissorsBtn = new UiButton(this, 583, 440, 'player_scissors', 0.15);

    this.playerImage = new RoundStartAnimation(this, 220, 200, 'player_rock', 0.33);
    this.add.existing(this.playerImage);
    this.npcImage = new RoundStartAnimation(this, 580, 200, 'player_rock', -0.33);
    this.add.existing(this.npcImage);

    this.resultTxt = this.add.text(360, 100, 'text', {fontFamily: "Georgia", fontSize: 40, color: "#000000"});
    this.resultTxt.z = 10;
    this.resultTxt.visible = false;

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

    this.anims.create({
      key: 'smoke',
      frames: this.anims.generateFrameNumbers('smoke_sheet', { start:0 , end: 24}),
      frameRate: 25,
      repeat: 0
    });

    this.smokeAnim = this.add.sprite(300, 300, "");
    this.smokeAnim.scale = 6;
    this.smokeAnim.visible = false;

    this.smokeAnim.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.smokeAnimComplete();
    });
  }

  private playerSelectBtn(selected: IPlayable) {
    this.resultTxt.visible = false;
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

    this.playerImage.onComplete = () => {
      this.roundComplete(npcPlayed);
    }

    this.playerImage.startAnimation(this.player.getPlayed().sprite);
    this.npcImage.startAnimation(npcPlayed.sprite);
  }

  private smokeAnimComplete() {
    this.resultTxt.visible = true;
    this.activateSelectionBtns();
    this.scoreTxt.text = "Player: " + this.player.getScore() + " | Computer: " + this.npc.getScore();
  }

  private roundComplete(npcPlayed: IPlayable) {
    var result = this.player.hasWon(npcPlayed);
    switch (result) {
      case GameResult.Lost:
        this.smokeAnim.tint = 0x111111;
        this.resultTxt.text = "Lost!";
        this.npc.incrementScore();
        break;
      case GameResult.Won:
        this.smokeAnim.tint = 0x99ff11;
        this.resultTxt.text = "Won!";
        this.player.incrementScore();
        break;
      case GameResult.Tie:
        this.smokeAnim.tint = 0x990011;
        this.resultTxt.text = "Tie!";
        break;
    }

    this.smokeAnim.visible = true;
    this.smokeAnim.play("smoke");
  }
}
