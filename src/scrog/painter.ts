import { Color } from "./color";
import { Island } from "./island"
import { Scrog } from "./scrog";
import { Sound } from "./sound";
import { Thing } from "./thing";
import { GRASS, Tile, WATER } from "./tile";
import { LEFT, Where } from "./where";

function cyrb128(str: string) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0] as const;
}

function sfc32(a :number, b: number, c: number, d: number) {
  return function() {
    a |= 0; b |= 0; c |= 0; d |= 0;
    let t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}

const seed = cyrb128("scrog")
const random = sfc32(...seed)

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
        random() < 0.5
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
      if (tile && tile.is === GRASS && random() < 0.5) {
        Island.putThingAt(iz, Thing.Berry(iz).id, [row, col]);
      }
    }
  }

  const scrog = Scrog.new("me", Color.Red());
  Island.addScrog(iz, scrog);

  Island.putScrogAt(iz, scrog.id, [2, 2]);
  Island.scrogHop (iz, scrog.id);
  Island.scrogTurn(iz, scrog.id, LEFT);
  Island.scrogHop (iz, scrog.id);
  Island.scrogEat (iz, scrog.id);

  return iz;
}