<template>
  <div>
    Grid:
    <div id="grid" :class="{rotate: rotate}">
      <div class="row" v-for="(row, index) in grid.contents" :key="index">
        <div class="cell" v-for="(cell, index) in row" :key="index">
          <img
            v-if="cell.tile && cell.tile.image != undefined"
            class="tile"
            :src="getImageUrl(cell.tile.image)"
            alt=""
            :style="'transform: rotate(' + cell.tile.rotation + ')'"
          />
        </div>
      </div>
    </div>
    <button @click="fillGrid">Click me</button>
    <button @click="resetGrid">Reset</button>
    <button @click="toggleRotate">Rotate</button>
  </div>
</template>

<script>
import { Grid } from "@/grid.js";
import { Tile } from "@/tile.js";
import { Sockets } from "@/sockets.js";

export default {
  name: "App",
  components: {},
  data() {
    return {
      width: 20,
      height: 20,

      grid: {
        contents: [],
      },

      tiles: [],
      landTiles: [],
      timeoutID: undefined,
      rotate: false
    };
  },
  mounted() {
    /*
    const landTiles = [
      new Tile("tileA", new Sockets("ABB", "BBB", "BBA", "AAA"), 0),
      new Tile("tileA", new Sockets("ABB", "BBB", "BBA", "AAA"), 1),
      new Tile("tileA", new Sockets("ABB", "BBB", "BBA", "AAA"), 2),
      new Tile("tileA", new Sockets("ABB", "BBB", "BBA", "AAA"), 3),
      new Tile("tileB", new Sockets("AAA", "AAA", "AAA", "AAA")),
      new Tile("tileC", new Sockets("BBB", "BBB", "BBB", "BBB")), // Lots of C for weighting
      new Tile("tileC", new Sockets("BBB", "BBB", "BBB", "BBB")),
      new Tile("tileC", new Sockets("BBB", "BBB", "BBB", "BBB")),
      new Tile("tileC", new Sockets("BBB", "BBB", "BBB", "BBB")),
      new Tile("tileC", new Sockets("BBB", "BBB", "BBB", "BBB")),
      new Tile("tileD", new Sockets("ABB", "BBA", "AAA", "AAA"), 0),
      new Tile("tileD", new Sockets("ABB", "BBA", "AAA", "AAA"), 1),
      new Tile("tileD", new Sockets("ABB", "BBA", "AAA", "AAA"), 2),
      new Tile("tileD", new Sockets("ABB", "BBA", "AAA", "AAA"), 3),
      new Tile("tileE", new Sockets("BBB", "BBB", "BBA", "ABB"), 0),
      new Tile("tileE", new Sockets("BBB", "BBB", "BBA", "ABB"), 1),
      new Tile("tileE", new Sockets("BBB", "BBB", "BBA", "ABB"), 2),
      new Tile("tileE", new Sockets("BBB", "BBB", "BBA", "ABB"), 3),
    ];
    this.tiles = landTiles;
    */

    const pipeTiles = [
      new Tile("tile2", new Sockets("BBB", "BBB", "BBB", "BBB")),
      new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 0),
      new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 1),
      new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 2),
      new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 3),
    ];

    this.tiles = pipeTiles;

    this.grid = new Grid(this.width, this.height, this.tiles);
  },
  methods: {
    getImageUrl: function (tileName) {
      return require("@/assets/" + tileName);
    },
    fillGrid: function () {
      if (!this.grid.complete()) {
        this.grid.fillCell();

        this.timeoutID = setTimeout(this.fillGrid, 10);
      } else {
        setTimeout(() => {
          this.resetGrid();
          this.fillGrid();
        }, 1000);
      }
    },
    resetGrid: function () {
      // Stop running timeouts
      clearTimeout(this.timeoutID);
      this.timeoutID = undefined;

      // Reset Grid
      this.grid.setup();
    },
    toggleRotate: function() {
      this.rotate = !this.rotate;
    }
  },
};
</script>

<style>
#grid {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 80%;
  max-height: 80%;
  height: 80%;
  margin: auto;
  justify-content: center;
}

.rotate {
  animation: rotation 20s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate3d(0, 0 ,0 , 0deg);
  }
  to {
    transform: rotate3d(1, 1, 1, 359deg);
  }
}

.cell {
  border: 1px solid black;
  aspect-ratio: auto 1;
  max-width: 100px;
  flex: 1;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.tile {
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  display: block;
  box-shadow: 0 0 1px rgba(255, 255, 255, 0);
  outline: 1px solid transparent;
  will-change: transform;
}
</style>
