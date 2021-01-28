import MainScene from './scenes/MainScene';

/** Helps with game audio. */
export default class AudioManager {
  public scene: MainScene;

  constructor(scene: MainScene) {
    this.scene = scene;
  }

  playSound(key: string): void {
    const sound = this.scene.sound.get(key);
    if(sound.isPlaying) return;
    
    sound.play();
  }

  stopSound(key: string): void {
    const sound = this.scene.sound.get(key);
    sound.stop();
  }
}
