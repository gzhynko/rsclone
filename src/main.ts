import Phaser from 'phaser';

import MainScene from './scenes/MainScene';

const gameZoom = 4;

const config: any = {
  type: Phaser.AUTO,
  width: 480,
  height: 270,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  pixelArt: true,
  zoom: gameZoom,
  scene: [MainScene],
  callbacks: {
    postBoot: function (game) {
      game.canvas.style.width = '95%';
      game.canvas.style.height = '95%';
      game.canvas.style.objectFit = 'contain';
    }
  }
};

export default new Phaser.Game(config);
