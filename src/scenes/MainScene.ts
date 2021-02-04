import Phaser from 'phaser';
import Ship from '../gameobjects/Ship';
import Player from '../gameobjects/Player';
import JumpManager from '../JumpManager';
import AudioManager from '../AudioManager';
import UI from '../gameobjects/UI';

/** The main and only game scene. */
export default class MainScene extends Phaser.Scene
{
  public ship: Ship;
  public shipBackground: Phaser.GameObjects.TileSprite;
  public ui: UI;
  public audioManager: AudioManager;

  private player: Player;
  private jumpManager: JumpManager;

  constructor() {
    super('main');
  }

  preload(): void {
    //#region Player assets

    this.load.spritesheet('player', 'sprites/human/sheet.png', {
      frameWidth: 20,
      frameHeight: 36
    });

    //#endregion
    //#region Ship assets

    this.load.image('ship', 'sprites/ship/shiphuman.png');
    this.load.image('shipInterior', 'sprites/ship/shiphuman_interior.png');
    this.load.image('shipChair', 'sprites/ship/shiphuman_captainschair.png');
    this.load.image('shipChairOutline', 'sprites/ship/shiphuman_captainschair_outline.png');
    this.load.spritesheet('shipFuelHatch', 'sprites/ship/shiphuman_fuelhatch.png', {
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet('shipTechStation', 'sprites/ship/techstationhuman.png', {
      frameWidth: 24,
      frameHeight: 24
    });
    this.load.spritesheet('shipSmallBooster', 'sprites/ship/boosters/smallboosterflame.png', {
      frameWidth: 28,
      frameHeight: 28
    });
    this.load.spritesheet('shipBooster', 'sprites/ship/boosters/boosterflame.png', {
      frameWidth: 40,
      frameHeight: 64
    });

    //#endregion
    //#region Celestial assets

    this.load.image('shipBackground', 'sprites/celestial/shipBackground.png');
    this.load.image('shipBackgroundWarp', 'sprites/celestial/shipBackground_warp.png');

    const starColors = [ 'Blue', 'LightBlue', 'Orange', 'Red', 'White', 'Yellow' ];
    starColors.forEach((e) => {
      this.load.spritesheet(`star${ e }`, `sprites/celestial/star${ e }.png`, {
        frameWidth: 25,
        frameHeight: 25
      });
    });

    //#endregion
    //#region UI assets

    this.load.image('jumpMenu', 'sprites/misc/jumpMenu.png');
    this.load.image('shipIcon', 'sprites/misc/ship.png');
    this.load.image('lineFragment', 'sprites/misc/lineFragment.png');

    //#endregion
    //#region SFX

    this.load.audio("hyperspaceStart", "sfx/hyperspace_start.ogg");
    this.load.audio("hyperspaceLoop", "sfx/hyperspace_loop.ogg");
    this.load.audio("hyperspaceEnd", "sfx/hyperspace_end.ogg");
    this.load.audio("navComputerOn", "sfx/nav_computer_on.ogg");

    //#endregion
  }

  create(): void {
    this.shipBackground = new Phaser.GameObjects.TileSprite(this, 0, 0, 1855, 1013, 'shipBackground');
    this.shipBackground.setOrigin(0, 0).setScrollFactor(0, 0);
    this.shipBackground.setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    this.add.existing(this.shipBackground);

    this.ship = new Ship(this, 'ship', 'shipInterior', 'shipChair', 'shipChairOutline', 
      'shipFuelHatch', 'shipTechStation', 'shipSmallBooster', 'shipBooster'
    );
    this.ship.children.entries.forEach((e) => {
      (this.add.existing(e) as Phaser.GameObjects.Sprite).setOrigin(0, 0);
    });

    this.player = new Player(this, 'player');
    this.add.existing(this.player);

    this.ui = new UI(this, 'jumpMenu', 'shipIcon', 'lineFragment', [ 'Blue', 'LightBlue', 'Orange', 'Red', 'White', 'Yellow' ]);
    this.ui.children.entries.forEach((e) => {
      (this.add.existing(e) as Phaser.GameObjects.Sprite).setOrigin(0, 0).setScrollFactor(0, 0);
    });
        
    this.cameras.main.backgroundColor = new Phaser.Display.Color();
    this.cameras.main.startFollow(this.player, true, .2);

    this.player.create();

    this.physics.world.setBounds(95, 67, 414, 81);
    this.input.setDefaultCursor('url(sprites/misc/cursor.png), pointer');

    this.jumpManager = new JumpManager(this);

    this.sound.add('hyperspaceStart');
    this.sound.add('hyperspaceLoop', { loop: true });
    this.sound.add('hyperspaceEnd');
    this.sound.add('navComputerOn');
    this.audioManager = new AudioManager(this);

    this.setUpEvents();
  }

  update(): void {
    this.player.update();
    this.ship.update(this.player.getCenterX());
    this.jumpManager.update();
    this.ui.update();
  }

  setUpEvents(): void {
    this.input.keyboard.on('keydown-E', () => {
      if(!this.ship.canInteractWithChair(this.player.getCenterX()) || this.jumpManager.jumpInProgress) return;

      this.jumpManager.jump();
    });
  }
}
