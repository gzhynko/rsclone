export default class BackgroundStar {
  public x: number;
  public y: number;
  public type: string;
  public size: number;
  public frame: number;

  constructor(x: number, y: number, type: string, size: number, frame: number) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = size;
    this.frame = frame;
  }
}