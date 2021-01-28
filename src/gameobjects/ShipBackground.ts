import BackgroundStar from '../types/BackgroundStar';
import Utils from '../utils';

/** Holds the background with stars for the ship. */
export default class ShipBackground extends Phaser.GameObjects.Group {
  private starBlueKey: string;
  private starWhiteKey: string;

  constructor(scene: Phaser.Scene, starBlueKey: string, starWhiteKey: string) {
    super(scene);
    this.starBlueKey = starBlueKey;
    this.starWhiteKey = starWhiteKey;
  }

  create() {
    const stars = this.createStars();

    this.createAnimations();

    stars.forEach((star) => {
      const sprite = new Phaser.GameObjects.Sprite(this.scene, star.x, star.y, `star5px${star.type}`, star.frame);
      sprite.setScale(.1, .1);
      //sprite.play(`star${star.type}Glow`);

      this.add(sprite);
    });
  }

  createStars() : Array<BackgroundStar> {
    const spacing = 35;
    const width = this.scene.game.scale.width;
    const height = this.scene.game.scale.height;

    const stars = new Array<BackgroundStar>();
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        const star = new BackgroundStar(
          x + Utils.randomInt(spacing),
          y + Utils.randomInt(spacing),
          this._randomStarType(),
          Utils.randomFloat(),
          Utils.randomInt(3, 0)
        );

        stars.push(star);
      }
    }

    console.log(stars);
    return stars;
  }

  createAnimations() {
    this.scene.anims.create({
      key: 'starwhiteGlow',
      frames: this.scene.anims.generateFrameNumbers(this.starWhiteKey, {
        start: 0,
        end: 3
      })
    });

    this.scene.anims.create({
      key: 'starblueGlow',
      frames: this.scene.anims.generateFrameNumbers(this.starBlueKey, {
        start: 0,
        end: 3
      })
    });
  }

  _randomStarType(): string {
    const starTypes = [ "blue", "white" ];

    return starTypes[Utils.randomInt(starTypes.length - 1)];
  }
}
