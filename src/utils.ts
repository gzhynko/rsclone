export default class Utils {
  /** Returns a random integer between min and max (including both) */
  static randomInt(max = 1, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /** Returns a random float between min and max (including min) */
  static randomFloat(max = 1, min = 0) {
    return Math.random() * (max - min) + min;
  }
}
