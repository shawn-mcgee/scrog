import type { Scrog } from "./scrog"
import type { Sound } from "./sound"
import { Thing } from "./thing"
import { Tile, GRASS  } from "./tile"
import { Where } from "./where"

export type Island = {
  tiles : {[tileId : string]: Tile }
  things: {[thingId: string]: Thing}
  scrogs: {[scrogId: string]: Scrog}
  sounds: {[soundId: string]: Sound}

  grid: Array<string | undefined>

  readonly w   : number
  readonly h   : number
}

export const Island = {
  new(
    w = 10, 
    h = 10
  ) {
    return {
      tiles : {},
      things: {},
      scrogs: {},
      sounds: {},
      grid  : Array(w * h).fill(undefined),
      w, h
    } satisfies Island;
  },

  populate(iz: Island) {
    for (let x = 1; x < iz.w - 1; x++)
      for (let y = 1; y < iz.h - 1; y++)
        if (Math.random() < 0.75) {
          const tile = Tile.Grass(iz);
          Island.putTileAt(iz, tile.id, {x, y});

          if (Math.random() < 0.25) {
            const berry = Thing.Berry(iz);
            Island.putThingOn(iz, berry.id, tile.id);
          }
        }

    for (let x = 0; x < iz.w; x++)
      for (let y = 0; y < iz.h; y++)
        if (!Island.getTileAt(iz, {x, y})) {
          const n = Island.getTileAt(iz, Where.northOf({x, y}))?.is !== GRASS ? 0 : 1;
          const e = Island.getTileAt(iz, Where.eastOf ({x, y}))?.is !== GRASS ? 0 : 1;
          const s = Island.getTileAt(iz, Where.southOf({x, y}))?.is !== GRASS ? 0 : 1;
          const w = Island.getTileAt(iz, Where.westOf ({x, y}))?.is !== GRASS ? 0 : 1;

          let tile;
          if (n + e + s + w === 0) tile = Tile.DeepWater(iz);
          else                     tile = Tile.Water    (iz);
          Island.putTileAt(iz, tile.id, {x, y});
        }
  },

  addTile(iz: Island, tile: Tile) {
    if (!_checkTileWithIdDoesNotExist(iz, tile.id)) return;
    iz.tiles[tile.id] = tile;
  },

  addThing(iz: Island, thing: Thing) {
    if (!_checkThingWithIdDoesNotExist(iz, thing.id)) return;
    iz.things[thing.id] = thing;
  },

  addScrog(iz: Island, scrog: Scrog) {
    if (!_checkScrogWithIdDoesNotExist(iz, scrog.id)) return;
    iz.scrogs[scrog.id] = scrog;
  },

  addSound(iz: Island, sound: Sound) {
    if (!_checkSoundWithIdDoesNotExist(iz, sound.id)) return;
    iz.sounds[sound.id] = sound;
  },

  removeTile(iz: Island, id: string) {
    if (!_checkTileWithIdExists(iz, id)) return;
    delete iz.tiles[id];

    while (id in iz.grid)
      iz.grid[iz.grid.indexOf(id)] = undefined;
  },

  removeThing(iz: Island, id: string) {
    if (!_checkThingWithIdExists(iz, id)) return;
    delete iz.things[id];

    for (const tile of Object.values(iz.tiles))
      if (tile && tile.thingId === id)
        tile.thingId = undefined;
  },

  removeScrog(iz: Island, id: string) {
    if (!_checkScrogWithIdExists(iz, id)) return;
    delete iz.scrogs[id];

    for (const tile of Object.values(iz.tiles))
      if (tile && tile.scrogId === id)
        tile.scrogId = undefined;
  },

  removeSound(iz: Island, id: string) {
    if (!_checkSoundWithIdExists(iz, id)) return;
    delete iz.sounds[id];

    for (const tile of Object.values(iz.tiles))
      if (tile && tile.soundId === id)
        tile.soundId = undefined;
  },

  getTileWithId(iz: Island, id: string) {
    if (!_checkTileWithIdExists(iz, id)) return;
    return iz.tiles[id];
  },

  getThingWithId(iz: Island, id: string) {
    if (!_checkThingWithIdExists(iz, id)) return;
    return iz.things[id];
  },

  getScrogWithId(iz: Island, id: string) {
    if (!_checkScrogWithIdExists(iz, id)) return;
    return iz.scrogs[id];
  },

  getSoundWithId(iz: Island, id: string) {
    if (!_checkSoundWithIdExists(iz, id)) return;
    return iz.sounds[id];
  },

  getTileAt(iz: Island, where: Where) {
    const at = _at(iz, where);
    if (!_checkInBounds(iz, where)) return;
    const id = iz.grid[at];
    if (!                            id ) return;
    if (!_checkTileWithIdExists(iz, id)) return;
    return iz.tiles[id];
  },

  getThingAt(iz: Island, where: Where) {
    const tile = Island.getTileAt(iz, where);
    if (!tile        ) return;
    if (!tile.thingId) return;
    return Island.getThingWithId(iz, tile.thingId);
  },

  getScrogAt(iz: Island, where: Where) {
    const tile = Island.getTileAt(iz, where);
    if (!tile        ) return;
    if (!tile.scrogId) return;
    return Island.getScrogWithId(iz, tile.scrogId);
  },

  getSoundAt(iz: Island, where: Where) {
    const tile = Island.getTileAt(iz, where);
    if (!tile        ) return;
    if (!tile.soundId) return;
    return Island.getSoundWithId(iz, tile.soundId);
  },

  putTileAt(iz: Island, id: string | undefined, where: Where) {
    const at = _at(iz, where);
    if (      !_checkInBounds        (iz, where)) return;
    if (      !_checkGridIsEmptyAt   (iz, at   )) return;
    if (id && !_checkTileWithIdExists(iz, id   )) return;
    iz.grid[at] = id;
  },

  putScrogAt(iz: Island, id: string | undefined, where: Where) {
    const tile = Island.getTileAt(iz, where);
    if (!_checkTileExists(tile)) return;
    tile.scrogId = id;
  },

  putThingAt(iz: Island, id: string | undefined, where: Where) {
    const tile = Island.getTileAt(iz, where);
    if (!_checkTileExists(tile)) return;
    tile.thingId = id;
  },

  putSoundAt(iz: Island, id: string | undefined, where: Where) {
    const tile = Island.getTileAt(iz, where);
    if (!_checkTileExists(tile)) return;
    tile.soundId = id;
  },

  putScrogOn(iz: Island, id: string | undefined, on: string) {
    const tile = Island.getTileWithId(iz, on);
    if (!_checkTileExists(tile)) return;
    tile.scrogId = id;
  },

  putThingOn(iz: Island, id: string | undefined, on: string) {
    const tile = Island.getTileWithId(iz, on);
    if (!_checkTileExists(tile)) return;
    tile.thingId = id;
  },

  putSoundOn(iz: Island, id: string | undefined, on: string) {
    const tile = Island.getTileWithId(iz, on);
    if (!_checkTileExists(tile)) return;
    tile.soundId = id;
  }
}

function _in(iz: Island, {x, y}: Where) {
  return (
    x >= 0 && x < iz.w && 
    y >= 0 && y < iz.h
  );
}

function _at(iz: Island, {x, y}: Where) {
  return y * iz.w + x;
}

function _checkTileExists(tile: Tile | undefined): tile is Tile {
  if (!tile) {
    console.warn(`[_checkTileExists] Tile does not exist.`);
    return false;
  }
  return true;
}

function _checkInBounds(iz: Island, {x, y}: Where) {
  if (!_in(iz, {x, y})) {
    console.warn(`[_checkInBounds] Where '${x}, ${y}' is out of bounds.`);
    return false;
  }
  return true;
}

function _checkTileWithIdExists(iz: Island, id: string) {
  if (!(id in iz.tiles)) {
    console.warn(`[_checkTileWithIdExists] Tile with '${id}' does not exist.`);
    return false;
  }
  return true;
}

function _checkThingWithIdExists(iz: Island, id: string) {
  if (!(id in iz.things)) {
    console.warn(`[_checkThingWithIdExists] Thing with '${id}' does not exist.`);
    return false;
  }
  return true;
}

function _checkScrogWithIdExists(iz: Island, id: string) {
  if (!(id in iz.scrogs)) {
    console.warn(`[_checkScrogWithIdExists] Scrog with '${id}' does not exist.`);
    return false;
  }
  return true;
}

function _checkSoundWithIdExists(iz: Island, id: string) {
  if (!(id in iz.sounds)) {
    console.warn(`[_checkSoundWithIdExists] Sound with '${id}' does not exist.`);
    return false;
  }
  return true;
}

function _checkTileWithIdDoesNotExist(iz: Island, id: string) {
  if (id in iz.tiles) {
    console.warn(`[_checkTileWithIdDoesNotExist] Tile with '${id}' already exists.`);
    return false;
  }
  return true;
}

function _checkThingWithIdDoesNotExist(iz: Island, id: string) {
  if (id in iz.things) {
    console.warn(`[_checkThingWithIdDoesNotExist] Thing with '${id}' already exists.`);
    return false;
  }
  return true;
}

function _checkScrogWithIdDoesNotExist(iz: Island, id: string) {
  if (id in iz.scrogs) {
    console.warn(`[_checkScrogWithIdDoesNotExist] Scrog with '${id}' already exists.`);
    return false;
  }
  return true;
}

function _checkSoundWithIdDoesNotExist(iz: Island, id: string) {
  if (id in iz.sounds) {
    console.warn(`[_checkSoundWithIdDoesNotExist] Sound with '${id}' already exists.`);
    return false;
  }
  return true;
}

function _checkGridIsEmptyAt(iz: Island, at: number) {
  if (iz.grid[at]) {
    console.warn(`[_checkGridIsEmptyAt] Grid at index '${at}' is not empty.`);
    return false;
  }
  return true;
}