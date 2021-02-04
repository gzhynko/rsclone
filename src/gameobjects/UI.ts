import MainScene from '../scenes/MainScene';
import Utils from '../utils';

/** Holds all UI elements. */
export default class UI extends Phaser.GameObjects.Group {
  public statusText: Phaser.GameObjects.Text;
  public scene: MainScene;

  private jumpingText = 'Jumping...';
  private defaultText = "Press 'E' to jump.";

  private playerShipIcon: Phaser.GameObjects.Sprite;
  private pathLine: Phaser.GameObjects.TileSprite;
  private starIcon: Phaser.GameObjects.Sprite;
  private shipMoving = false;
  private visible = false;

  private starX = 400;
  private initialShipX = 61;

  private starColors: Array<string>;

  constructor(scene: MainScene, jumpMenuTexture: string, shipIconTexture: string, lineFragmentTexture: string, stars: Array<string>) {
    super(scene);

    this.starColors = stars;

    this.statusText = new Phaser.GameObjects.Text(scene, 165, 160, this.defaultText, {
      fontFamily: '"Hobo"',
      color: '#999999'
    });
    this.statusText.setFixedSize(139, 16);
    this.statusText.setAlign("center");

    this.playerShipIcon = new Phaser.GameObjects.Sprite(scene, this.initialShipX, 112, shipIconTexture);

    this.pathLine = new Phaser.GameObjects.TileSprite(scene, this.playerShipIcon.getCenter().x, 127, 
      this.starX - this.playerShipIcon.getCenter().x, 2, lineFragmentTexture);
    this._calculateAndSetPathLineSize();

    const randomStar = this._pickRandomStarTexture(this.starColors);
    this.starIcon = new Phaser.GameObjects.Sprite(scene, this.starX - 10, 115, randomStar, 0);
    
    this._generateAnimsForStarIcon(this.starColors);
    this.starIcon.anims.play('idle_' + randomStar);

    this.addMultiple(new Array<Phaser.GameObjects.GameObject> (
      new Phaser.GameObjects.Sprite(scene, 45, 65, jumpMenuTexture),
      this.statusText,
      this.pathLine,
      this.playerShipIcon,
      this.starIcon
    ));
  }

  update(): void {
    if(this.shipMoving) { 
      this.pathLine.tilePositionX -= .3;

      this.playerShipIcon.x = Phaser.Math.Interpolation.SmoothStep(.04, this.playerShipIcon.x, this.starX);
      this._calculateAndSetPathLineSize();

      if(this.starX - this.playerShipIcon.getCenter().x <= 30) {
        this.playerShipIcon.alpha -= .01;
        this.pathLine.alpha -= .01;
      }

      if(this.playerShipIcon.alpha <= .095) this.stopMovingShip();
    }
  }

  startMovingShip(): void {
    this.shipMoving = true;
  }

  stopMovingShip(): void {
    this.shipMoving = false;

    this.reset();
  }

  reset(): void {
    this.playerShipIcon.x = this.initialShipX;
    this.playerShipIcon.alpha = 1;

    this.pathLine.alpha = 1;
    this._calculateAndSetPathLineSize();

    const newStarIconTexture = this._pickRandomStarTexture(this.starColors);
    this.starIcon.setTexture(newStarIconTexture, 0);
    this.starIcon.anims.play('idle_' + newStarIconTexture);
  }

  toggle(newState: boolean): void {
    this.setVisible(newState);
    if(newState && newState != this.visible) this.scene.audioManager.playSound('navComputerOn');

    this.visible = newState;
  }

  toggleJumpingText(newState: boolean): void {
    if(newState) { 
      this.statusText.text = this.jumpingText;

      return;
    }

    this.statusText.text = this.defaultText;
  }

  _calculateAndSetPathLineSize(): void {
    this.pathLine.x = this.playerShipIcon.getCenter().x;
    this.pathLine.width = Math.max(1, this.starX - this.playerShipIcon.getCenter().x);
  }

  _pickRandomStarTexture(stars: Array<string>): string {
    return 'star' + stars[Utils.randomInt(stars.length - 1, 0)];
  }

  _generateAnimsForStarIcon(stars: Array<string>): void {
    stars.forEach((e) => {
      this.starIcon.anims.create({
        key: 'idle_star' + e,
        frames: this.scene.anims.generateFrameNumbers('star' + e, {
          start: 0,
          end: 3
        }),
        frameRate: 1,
        repeat: -1
      });
    });
  }
}
