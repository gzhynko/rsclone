import MainScene from './scenes/MainScene';

/** Holds everything related to warping. */
export default class JumpManager {
  public shipSpeed = 0;
  public jumpInProgress = false;

  private scene: MainScene;

  constructor(scene: MainScene) {
    this.scene = scene;
  }

  update(): void {
    this.scene.shipBackground.tilePositionX += this.shipSpeed;
  }

  jump(): void {
    this.startShipJump();

    setTimeout(() => { this.scene.audioManager.playSound('hyperspaceEnd'); }, 5000)
    setTimeout(() => { this.finishShipJump(); }, 7000);
  }

  startShipJump(): void {
    this.jumpInProgress = true;

    this.scene.ship.turnOnBoosters();
    this.scene.ui.startMovingShip();
    this.scene.audioManager.playSound('hyperspaceStart');
    this.scene.audioManager.stopSound('hyperspaceEnd');

    this.shipSpeed = 5;

    this.scene.ui.toggleJumpingText(true);

    this.graduallyChangeShipSpeed(false).then(() => {
      this.scene.cameras.main.flash(600);
  
      setTimeout(() => {
        this.scene.shipBackground.setTexture('shipBackgroundWarp');
        this.shipSpeed = 80;

        this.scene.audioManager.stopSound('hyperspaceStart');
        this.scene.audioManager.playSound('hyperspaceLoop');
      }, 50);
    });
  }

  finishShipJump(): void {
    this.scene.cameras.main.flash(600);

    setTimeout(() => {
      this.shipSpeed = 75;
      this.scene.shipBackground.setTexture('shipBackground');

      this.scene.audioManager.stopSound('hyperspaceLoop');
    }, 50);

    this.graduallyChangeShipSpeed(true).then(() => {
      this.scene.ship.turnOffBoosters();
      this.shipSpeed = 0;

      this.scene.ui.toggleJumpingText(false);
      this.jumpInProgress = false;
    });
  }

  graduallyChangeShipSpeed(decrease: boolean): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.shipSpeed = decrease ? 65 : 5;
      }, 200);

      setTimeout(() => {
        this.shipSpeed = decrease ? 60 : 10;
      }, 400);

      setTimeout(() => {
        this.shipSpeed = decrease ? 55 : 15;
      }, 600);

      setTimeout(() => {
        this.shipSpeed = decrease ? 50 : 20;
      }, 800);

      setTimeout(() => {
        this.shipSpeed = decrease ? 45 : 30;
      }, 1000);

      setTimeout(() => {
        this.shipSpeed = decrease ? 40 : 35;
      }, 1200);

      setTimeout(() => {
        this.shipSpeed = decrease ? 35 : 40;
      }, 1400);

      setTimeout(() => {
        this.shipSpeed = decrease ? 30 : 45;
      }, 1600);

      setTimeout(() => {
        this.shipSpeed = decrease ? 20 : 50;
      }, 1800);

      setTimeout(() => {
        this.shipSpeed = decrease ? 15 : 55;
      }, 2000);

      setTimeout(() => {
        this.shipSpeed = decrease ? 10 : 60;
      }, 2200);

      setTimeout(() => {
        this.shipSpeed = decrease ? 5 : 65;
      }, 2400);

      setTimeout(() => {
        resolve();
      }, 2450);
    });
  }
}
