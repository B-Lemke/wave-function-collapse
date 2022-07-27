export class Tile {
  constructor(imageName, sockets, rotation = 0) {
    if (imageName == undefined) {
      this.image = undefined;
    } else {
      this.image = imageName + ".png";
    }

    for (let i = 0; i < rotation; i++) {
      // Rotate on the sockets object
      sockets.rotate();
    }

    this.sockets = sockets;
    this.rotation = rotation * 90 + "deg";
  }
}
