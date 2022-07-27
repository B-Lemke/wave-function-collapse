import { Cell } from "./cell.js";
import { Tile } from "./tile.js";

export class Grid {
  constructor(width, height, tiles) {
    this.cols = width;
    this.rows = height;
    this.tiles = tiles;
    this.contents = [];

    this.setup();
  }

  setup() {
    this.contents = [];

    // Create cells.
    for (let i = 0; i < this.rows; i++) {
        let row = [];
        for (let j = 0; j < this.cols; j++) {
          const cell = new Cell(this.tiles, new Tile(undefined, undefined, 0));
  
          row.push(cell);
        }
        this.contents.push(row);
      }
  }

  complete() {
    return this.getLowestEntropy() == -1;
  }

  fillCell() {
    // Change first cell
    let lowestEntropyCell = this.getLowestEntropy();

    if (lowestEntropyCell !== -1) {
      lowestEntropyCell.assignTile();

      // Check all cells and update possible tiles
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          if (i != 0) {
            this.contents[i][j].checkUpCell(this.contents[i - 1][j].tile);
          }
          if (i != this.rows - 1) {
            this.contents[i][j].checkDownCell(this.contents[i + 1][j].tile);
          }
          if (j != 0) {
            this.contents[i][j].checkLeftCell(this.contents[i][j - 1].tile);
          }
          if (j != this.cols - 1) {
            this.contents[i][j].checkRightCell(this.contents[i][j + 1].tile);
          }
        }
      }
    }
  }

  flatContents() {
    // flatten array for easy traversal
    return [].concat.apply([], this.contents);
  }

  getLowestEntropy() {
    // Remove filled cells
    let emptyCells = this.flatContents().filter((cell) => {
      return !cell.collapsed;
    });

    // Sort by entropy lowest to highest
    emptyCells.sort((a, b) => a.entropy - b.entropy);

    if (emptyCells.length == 0) {
      return -1;
    }

    // Get all cells with lowest entropy
    let lowestEntropyCells = emptyCells.filter(
      (cell) => cell.entropy == emptyCells[0].entropy
    );

    // Pick a random cell;
    return lowestEntropyCells[
      Math.floor(Math.random() * lowestEntropyCells.length)
    ];
  }
}
