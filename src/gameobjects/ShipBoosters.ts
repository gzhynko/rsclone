/** Holds the ship boosters. */
export default class ShipBoosters extends Phaser.GameObjects.Group {
  public boosters: Array<Phaser.GameObjects.Sprite>;

  constructor(scene: Phaser.Scene, smallBoosterTexture: string, boosterTexture: string) {
    super(scene);

    this.createAnimations(smallBoosterTexture, boosterTexture);

    const smallBoostersGroup = new Phaser.GameObjects.Group(scene, 
      new Array<Phaser.GameObjects.Sprite>(
        new Phaser.GameObjects.Sprite(scene, 170, 174, smallBoosterTexture, 6), 
        new Phaser.GameObjects.Sprite(scene, 258, 174, smallBoosterTexture, 6),
        new Phaser.GameObjects.Sprite(scene, 354, 174, smallBoosterTexture, 6)
      )
    );
    
    smallBoostersGroup.children.entries.forEach((child) => {
      (child as Phaser.GameObjects.Sprite).play('smallBoosterIdle');
    });
    
    this.boosters = new Array<Phaser.GameObjects.Sprite>(
      new Phaser.GameObjects.Sprite(scene, -40, 58 - 9, boosterTexture, 0), 
      new Phaser.GameObjects.Sprite(scene, -40, 112 - 9, boosterTexture, 0)
    );
    const boostersGroup = new Phaser.GameObjects.Group(scene, this.boosters);

    boostersGroup.children.entries.forEach((child) => {
      (child as Phaser.GameObjects.Sprite).play('boosterIdle');
    });

    this.addMultiple(smallBoostersGroup.children.entries);
    this.addMultiple(boostersGroup.children.entries);
  }

  createAnimations(smallBoosterTexture: string, boosterTexture: string): void {
    //#region Small booster animations

    this.scene.anims.create({
      key: 'smallBoosterIdle',
      frames: this.scene.anims.generateFrameNumbers(smallBoosterTexture, {
        start: 6,
        end: 8
      }),
      frameRate: 8,
      repeat: -1
    });

    //#endregion
    //#region Booster animations

    this.scene.anims.create({
      key: 'boosterIdle',
      frames: this.scene.anims.generateFrameNumbers(boosterTexture, {
        start: 0,
        end: 2
      }),
      frameRate: 8,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'boosterActive',
      frames: this.scene.anims.generateFrameNumbers(boosterTexture, {
        start: 6,
        end: 8
      }),
      frameRate: 8,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'boosterPowerUp',
      frames: this.scene.anims.generateFrameNumbers(boosterTexture, {
        start: 3,
        end: 5
      }),
      frameRate: 6,
      repeat: -1
    });

    //#endregion
  }
}
