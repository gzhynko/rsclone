import MainScene from '../scenes/MainScene';

/** The main player class. */
export default class Player extends Phaser.GameObjects.Sprite {
  public body: Phaser.Physics.Arcade.Body;
  public scene: MainScene;

  private facingDirection = 0;
  private inputKeys: any;
  private horizontalSpeed = 100;

  private textureKey: string;
  
  constructor(scene: MainScene, texture: string) {
    super(scene, 280, 130, texture, 0);

    this.scene = scene;
    this.textureKey = texture;
  }

  create(): void {
    this.inputKeys = this.scene.input.keyboard.addKeys('A,D');
    this.scene.physics.world.enableBody(this, 0);
    this.body.collideWorldBounds = true;
    
    this.createAnimations();
  }

  update(): void {
    this.handleMovement();
  }

  createAnimations(): void {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers(this.textureKey, {
        start: 1,
        end: 8
      }),
      frameRate: 11
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 0
      })
    });
  }

  handleMovement(): void {
    if(this.inputKeys.A.isDown) {
      this.body.setVelocityX(-this.horizontalSpeed);
      this.anims.play('run', true);
      this.facingDirection = 1;
    } else if(this.inputKeys.D.isDown) {
      this.body.setVelocityX(this.horizontalSpeed);
      this.anims.play('run', true);
      this.facingDirection = 0;
    } else {
      this.body.setVelocityX(0);
      this.anims.play('idle', true);

      // Flip the sprite if the last run direction is left
      this.setFlipX(!!this.facingDirection);
    }

    if (this.body.velocity.x > 0) {
      this.setFlipX(false);
    } else if (this.body.velocity.x < 0) {
      this.setFlipX(true);
    }
  }

  getCenterX(): number {
    return this.getCenter().x;
  }
}
