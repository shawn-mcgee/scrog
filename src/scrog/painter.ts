import { Island } from "./island"
import { Sound } from "./sound";
import { Thing } from "./thing";
import { GRASS, Tile, WATER } from "./tile";
import { Where } from "./where";

export type Painter = {
  (iz: Island): Island
}

export const paint: Painter = (iz: Island) => {
  for (let row = 0; row < iz.w; row++) {
    for (let col = 0; col < iz.h; col++) {      
      let tile;
      if (
        row === 0 ||
        col === 0 ||
        row === iz.h - 1 ||
        col === iz.w - 1 ||
        Math.random() < 0.5
      )
        tile = Tile.Water(iz);
      else
        tile = Tile.Grass(iz);
      Island.putTileAt(iz, tile.id, [row, col]);
    }
  }

  for (let row = 0; row < iz.h; row++) {
    for (let col = 0; col < iz.w; col++) {
      const tile = Island.getTileAt(iz, [row, col]);
      if (tile && tile.is === WATER) {
        const n = Island.getTileAt(iz, Where.northOf([row, col]))?.is !== GRASS;
        const s = Island.getTileAt(iz, Where.southOf([row, col]))?.is !== GRASS;
        const e = Island.getTileAt(iz, Where.eastOf ([row, col]))?.is !== GRASS;
        const w = Island.getTileAt(iz, Where.westOf ([row, col]))?.is !== GRASS;
        if (n && s && e && w) {
          Island.putTileAt(iz, Tile.DeepWater(iz).id, [row, col]);
        }
      }
    }
  }

  for (let row = 0; row < iz.h; row++) {
    for (let col = 0; col < iz.w; col++) {
      const tile = Island.getTileAt(iz, [row, col]);
      if (tile && tile.is === GRASS && Math.random() < 0.5) {
        Island.putThingAt(iz, Thing.Berry(iz).id, [row, col]);
      }
    }
  }

  Island.putSoundAt(iz, Sound.Ouch(iz).id, [2, 2]);

  return iz;
}