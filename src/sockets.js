export class Sockets {
  constructor(up, right, down, left) {
    this.up = up;
    this.right = right;
    this.down = down;
    this.left = left;
  }

  rotate() {
    let formerUp = this.up;
    this.up = this.left;
    this.left = this.down;
    this.down = this.right;
    this.right = formerUp;
  }
}
