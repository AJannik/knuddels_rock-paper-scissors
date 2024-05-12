import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import { TestScene } from './scenes/TestScene';

new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene, TestScene]
  })
);
