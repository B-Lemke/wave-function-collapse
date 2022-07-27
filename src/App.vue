<template>
  <div>
    <button @click="fillGrid">Start</button>
    <button @click="resetGrid">Reset</button>
    <button @click="toggleRotate">Rotate</button>
    <button @click="setTiles">Change Tiles</button>
    <button @click="increaseSize">Bigger</button>
    <button @click="decreaseSize">Smaller</button>
    <button @click="changeHue">Change Hue</button>
    <h2 v-if="tilesets[tilesetIndex] && tilesets[tilesetIndex].name">
      {{ tilesets[tilesetIndex].name }}
    </h2>
    <div id="grid" :class="{ rotate: rotate }">
      <div class="row" v-for="(row, index) in grid.contents" :key="index">
        <div
          class="cell"
          v-for="(cell, index) in row"
          :key="index"
          :style="'filter: hue-rotate(' + hueValue + 'deg)'"
        >
          <img
            v-if="cell.tile && cell.tile.image != undefined"
            class="tile"
            :src="getImageUrl(cell.tile.image)"
            alt=""
            :style="'transform: rotate(' + cell.tile.rotation + ') '"
          />
        </div>
      </div>
    </div>
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
      width: 10,
      height: 10,

      grid: {
        contents: [],
      },
      tiles: [],
      tileset: "land",
      timeoutID: undefined,
      rotate: false,
      tilesets: [],
      tilesetIndex: 0,
      hueValue: 0,
    };
  },
  mounted() {
    this.createTilesets();
    this.setTiles();
  },
  methods: {
    getImageUrl: function (tileName) {
      return require("@/assets/" + tileName);
    },
    increaseSize: function () {
      if (this.width < 50) {
        this.width += 1;
        this.height += 1;

        this.createGrid();
      }
    },
    decreaseSize: function () {
      if (this.width > 2) {
        this.width -= 1;
        this.height -= 1;

        this.createGrid();
      }
    },
    changeHue: function () {
      this.hueValue = Math.floor(Math.random() * (359 - 0 + 1));
    },
    createTilesets: function () {
      const blockTiles = [
        new Tile("tile0", new Sockets("BBB", "BBB", "BBB", "BBB")),
        new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 0),
        new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 1),
        new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 2),
        new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 3),
      ];
      this.tilesets.push({ name: "Blocks", tiles: blockTiles });

      const elbowTiles = [
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 0),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 1),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 2),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 3),
      ];
      this.tilesets.push({ name: "Elbows", tiles: elbowTiles });

      const knotsTiles = [
        new Tile("tile0", new Sockets("BBB", "BBB", "BBB", "BBB")),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 0),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 1),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 2),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 3),
        new Tile("tile3", new Sockets("BAB", "BAB", "BAB", "BAB"), 0),
        new Tile("tile3", new Sockets("BAB", "BAB", "BAB", "BAB"), 1), // Overlapping tile rotation
        new Tile("tile7", new Sockets("BBB", "BAB", "BBB", "BAB"), 0),
        new Tile("tile7", new Sockets("BBB", "BAB", "BBB", "BAB"), 1),
      ];
      this.tilesets.push({ name: "Knots", tiles: knotsTiles });

      const tighterKnots = [
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 0),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 1),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 2),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 3),
        new Tile("tile3", new Sockets("BAB", "BAB", "BAB", "BAB"), 0),
        new Tile("tile3", new Sockets("BAB", "BAB", "BAB", "BAB"), 1), // Overlapping tile rotation
        new Tile("tile7", new Sockets("BBB", "BAB", "BBB", "BAB"), 0),
        new Tile("tile7", new Sockets("BBB", "BAB", "BBB", "BAB"), 1),
      ];
      this.tilesets.push({ name: "Tighter Knots", tiles: tighterKnots });

      const weaveTiles = [
        new Tile("tile3", new Sockets("BAB", "BAB", "BAB", "BAB"), 0),
        new Tile("tile3", new Sockets("BAB", "BAB", "BAB", "BAB"), 1),
        new Tile("tile7", new Sockets("BBB", "BAB", "BBB", "BAB"), 0),
        new Tile("tile7", new Sockets("BBB", "BAB", "BBB", "BAB"), 1),
      ];
      this.tilesets.push({ name: "Weave", tiles: weaveTiles });

      const funkyTiles = [
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 0),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 1),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 2),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 3),
        new Tile("tile5", new Sockets("BAB", "BAB", "BBB", "BBB"), 0),
        new Tile("tile5", new Sockets("BAB", "BAB", "BBB", "BBB"), 1),
        new Tile("tile5", new Sockets("BAB", "BAB", "BBB", "BBB"), 2),
        new Tile("tile5", new Sockets("BAB", "BAB", "BBB", "BBB"), 3),
        new Tile("tile6", new Sockets("BAB", "BAB", "BAB", "BAB"), 0),
        new Tile("tile6", new Sockets("BAB", "BAB", "BAB", "BAB"), 1),
        new Tile("tile7", new Sockets("BBB", "BAB", "BBB", "BAB"), 0),
        new Tile("tile7", new Sockets("BBB", "BAB", "BBB", "BAB"), 1),
      ];
      this.tilesets.push({ name: "Funky", tiles: funkyTiles });

      const allTiles = [
        new Tile("tile0", new Sockets("BBB", "BBB", "BBB", "BBB")),
        new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 0),
        new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 1),
        new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 2),
        new Tile("tile1", new Sockets("BBB", "BAB", "BAB", "BAB"), 3),
        new Tile("tile3", new Sockets("BAB", "BAB", "BAB", "BAB"), 0),
        new Tile("tile3", new Sockets("BAB", "BAB", "BAB", "BAB"), 1),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 0),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 1),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 2),
        new Tile("tile4", new Sockets("BAB", "BAB", "BBB", "BBB"), 3),
        new Tile("tile5", new Sockets("BAB", "BAB", "BBB", "BBB"), 0),
        new Tile("tile5", new Sockets("BAB", "BAB", "BBB", "BBB"), 1),
        new Tile("tile5", new Sockets("BAB", "BAB", "BBB", "BBB"), 2),
        new Tile("tile5", new Sockets("BAB", "BAB", "BBB", "BBB"), 3),
        new Tile("tile6", new Sockets("BAB", "BAB", "BAB", "BAB"), 0),
        new Tile("tile6", new Sockets("BAB", "BAB", "BAB", "BAB"), 1),
        new Tile("tile7", new Sockets("BBB", "BAB", "BBB", "BAB"), 0),
        new Tile("tile7", new Sockets("BBB", "BAB", "BBB", "BAB"), 1),
      ];
      this.tilesets.push({ name: "All", tiles: allTiles });

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
      this.tilesets.push({ name: "Land", tiles: landTiles });
    },
    setTiles: function () {
      // Increase index, go back to 0 if needed.
      this.tilesetIndex += 1;

      if (this.tilesetIndex >= this.tilesets.length) {
        this.tilesetIndex = 0;
      }

      // set tiles
      this.tiles = this.tilesets[this.tilesetIndex].tiles;

      this.createGrid();
    },
    createGrid: function () {
      this.grid = new Grid(
        this.width,
        this.height,
        this.tilesets[this.tilesetIndex].tiles
      );
    },
    fillGrid: function () {
      if (!this.grid.complete()) {
        this.grid.fillCell();

        this.timeoutID = setTimeout(this.fillGrid, 10);
      } else {
        setTimeout(() => {
          this.resetGrid();
          this.fillGrid();
        }, 2000);
      }
    },
    resetGrid: function () {
      // Stop running timeouts
      clearTimeout(this.timeoutID);
      this.timeoutID = undefined;

      // Reset Grid
      this.grid.setup();
    },
    toggleRotate: function () {
      this.rotate = !this.rotate;
    },
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
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    transform: rotate3d(1, 1, 1, 359deg);
  }
}

h2 {
  text-align: center;
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
