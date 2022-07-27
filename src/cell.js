export class Cell {
  constructor(tiles, tile = {}) {
    this.collapsed = false;
    this.tile = tile;
    this.possibleTiles = [...tiles];
  }

  get entropy() {
    return this.possibleTiles.length; // Number of tiles it could be, all start at max value
  }

  checkUpCell(upperTile) {
    if (upperTile == undefined || upperTile.collapsed == false || upperTile.sockets == undefined) {
      return;
    }

    // Reverse Socket string to compare
    let reverseString = this.reverseString(upperTile.sockets.down);

    // Remove any that won't match the reverse string
    this.possibleTiles = this.possibleTiles.filter((possibleTile) => {
      return possibleTile.sockets.up == reverseString;
    });


    return;
  }

  checkLeftCell(leftTile) {
    if (leftTile == undefined || leftTile.collapsed == false || leftTile.sockets == undefined) {
      return;
    }

    // Reverse Socket string to compare
    let reverseString = this.reverseString(leftTile.sockets.right);

    // Remove any that won't match the reverse string
    this.possibleTiles = this.possibleTiles.filter((possibleTile) => {
      return possibleTile.sockets.left == reverseString;
    });

    return;
  }

  checkDownCell(lowerTile) {
    if (lowerTile == undefined || lowerTile.collapsed == false || lowerTile.sockets == undefined) {
      return;
    }

    // Reverse Socket string to compare
    let reverseString = this.reverseString(lowerTile.sockets.up);

    // Remove any that won't match the reverse string
    this.possibleTiles = this.possibleTiles.filter((possibleTile) => {
      return possibleTile.sockets.down == reverseString;
    });

    return;
  }

  checkRightCell(rightTile) {
    if (rightTile == undefined || rightTile.collapsed == false || rightTile.sockets == undefined) {
      return;
    }

    // Reverse Socket string to compare
    let reverseString = this.reverseString(rightTile.sockets.left);

    // Remove any that won't match the reverse string
    this.possibleTiles = this.possibleTiles.filter((possibleTile) => {
      return possibleTile.sockets.right == reverseString;
    });

    return;
  }

  reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split("");

    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse();

    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join("");

    //Step 4. Return the reversed string
    return joinArray;
  }

  assignTile() {
    this.tile =
      this.possibleTiles[Math.floor(Math.random() * this.possibleTiles.length)];
    this.collapsed = true;
    this.possibleTiles = [];
  }
}
