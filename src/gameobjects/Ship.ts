import MainScene from "../scenes/MainScene";
import ShipBoosters from "./ShipBoosters";

/** Holds the ship and its interior. */
export default class Ship extends Phaser.GameObjects.Group {
  public scene: MainScene;

  private captainsChair: Phaser.GameObjects.Sprite;
  private captainsChairOutline: Phaser.GameObjects.Sprite;

  private boosters: ShipBoosters;

  constructor(scene: MainScene, shipTexture: string, interiorTexture: string, chairTexture: string, 
    chairOutlineTexture: string, fuelHatchTexture: string, techStationTexture: string, 
    smallBoosterTexture: string, boosterTexture: string
  ) {
    super(scene);

    this.captainsChair = new Phaser.GameObjects.Sprite(scene, 460, 124, chairTexture);

    this.captainsChairOutline = new Phaser.GameObjects.Sprite(scene, 460, 123, chairOutlineTexture);
    this.captainsChairOutline.setVisible(false);

    const fuelHatch = new Phaser.GameObjects.Sprite(scene, 432, 116, fuelHatchTexture, 0);
    fuelHatch.anims.create({ 
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers(fuelHatchTexture, {
        start: 0,
        end: 3
      }),
      repeat: -1,
      frameRate: 6
    });
    fuelHatch.play('idle');

    const techStation = new Phaser.GameObjects.Sprite(scene, 360, 116, techStationTexture, 0);
    techStation.anims.create({ 
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers(techStationTexture, {
        start: 0,
        end: 31
      }),
      repeat: -1,
      frameRate: 6
    });
    techStation.play('idle');

    this.createShipBoosters(smallBoosterTexture, boosterTexture);

    this.scene = scene;

    this.addMultiple(new Array<Phaser.GameObjects.Sprite>(
      new Phaser.GameObjects.Sprite(scene, 0, 0, shipTexture),
      new Phaser.GameObjects.Sprite(scene, 95, 67, interiorTexture),
      this.captainsChair,
      this.captainsChairOutline,
      fuelHatch,
      techStation
    ));
  }

  createShipBoosters(smallBoosterTexture: string, boosterTexture: string): void {
    this.boosters = new ShipBoosters(this.scene, smallBoosterTexture, boosterTexture);
    this.addMultiple(this.boosters.children.entries);
  }

  update(playerX: number): void {
    const playerCanInteractWithChair = this.canInteractWithChair(playerX);
    this.toggleChairOutline(playerCanInteractWithChair);

    this.scene.ui.toggle(playerCanInteractWithChair);
  }

  canInteractWithChair(playerX: number): boolean {
    return Math.abs(this.captainsChair.getCenter().x - playerX) < 30;
  }

  turnOnBoosters(): void {
    this.boosters.boosters.forEach((booster) => {
      booster.play('boosterPowerUp');
      booster.playAfterRepeat('boosterActive', 0);
    });
  }

  turnOffBoosters(): void {
    this.boosters.boosters.forEach((booster) => {
      booster.play('boosterIdle');
    });
  }

  toggleChairOutline(state: boolean): void {
    this.captainsChairOutline.setVisible(state);
  }
}
