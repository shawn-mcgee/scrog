import type { Scrog } from "./scrog"
import type { Sound } from "./sound"
import type { Thing } from "./thing"
import type { Tile  } from "./tile"
import type { Where } from "./where"

export type Island = {
  readonly tiles : {[tileId : string]: Tile }
  readonly things: {[thingId: string]: Thing}
  readonly scrogs: {[scrogId: string]: Scrog}
  readonly sounds: {[soundId: string]: Sound}

  readonly grid: Array<string | undefined>
  readonly w   : number
  readonly h   : number
}

export const Island = {
  new(
    w = 10, 
    h = 10
  ) {

  },

  addTile(iz: Island, tile: Tile) {
    if (!_assertTileWithIdDoesNotExist(iz, tile.id)) return;
    iz.tiles[tile.id] = tile;
  },

  addThing(iz: Island, thing: Thing) {
    if (!_assertThingWithIdDoesNotExist(iz, thing.id)) return;
    iz.things[thing.id] = thing;
  },

  addScrog(iz: Island, scrog: Scrog) {
    if (!_assertScrogWithIdDoesNotExist(iz, scrog.id)) return;
    iz.scrogs[scrog.id] = scrog;
  },

  addSound(iz: Island, sound: Sound) {
    if (!_assertSoundWithIdDoesNotExist(iz, sound.id)) return;
    iz.sounds[sound.id] = sound;
  },

  removeTile(iz: Island, id: string) {
    if (!_assertTileWithIdExists(iz, id)) return;
    delete iz.tiles[id];

    while (id in iz.grid)
      iz.grid[iz.grid.indexOf(id)] = undefined;
  },

  removeThing(iz: Island, id: string) {
    if (!_assertThingWithIdExists(iz, id)) return;
    delete iz.things[id];

    for (const tile of Object.values(iz.tiles))
      if (tile && tile.thingId === id)
        tile.thingId = undefined;
  },

  removeScrog(iz: Island, id: string) {
    if (!_assertScrogWithIdExists(iz, id)) return;
    delete iz.scrogs[id];

    for (const tile of Object.values(iz.tiles))
      if (tile && tile.scrogId === id)
        tile.scrogId = undefined;
  },

  removeSound(iz: Island, id: string) {
    if (!_assertSoundWithIdExists(iz, id)) return;
    delete iz.sounds[id];

    for (const tile of Object.values(iz.tiles))
      if (tile && tile.soundId === id)
        tile.soundId = undefined;
  },

  getTileWithId(iz: Island, id: string) {
    if (!_assertTileWithIdExists(iz, id)) return;
    return iz.tiles[id];
  },

  getThingWithId(iz: Island, id: string) {
    if (!_assertThingWithIdExists(iz, id)) return;
    return iz.things[id];
  },

  getScrogWithId(iz: Island, id: string) {
    if (!_assertScrogWithIdExists(iz, id)) return;
    return iz.scrogs[id];
  },

  getSoundWithId(iz: Island, id: string) {
    if (!_assertSoundWithIdExists(iz, id)) return;
    return iz.sounds[id];
  },

  getTileAt(iz: Island, where: Where) {
    const at = _at(iz, where);
    if (!_assertInBounds(iz, where)) return;
    const id = iz.grid[at];
    if (!                            id ) return;
    if (!_assertTileWithIdExists(iz, id)) return;
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
    if (      !_assertInBounds        (iz, where)) return;
    if (      !_assertGridIsEmptyAt   (iz, at   )) return;
    if (id && !_assertTileWithIdExists(iz, id   )) return;
    iz.grid[at] = id;
  },

  putScrogAt(iz: Island, id: string | undefined, where: Where) {
    const tile = Island.getTileAt(iz, where);
    if (!_assertTileExists(tile)) return;
    tile.scrogId = id;
  },

  putThingAt(iz: Island, id: string | undefined, where: Where) {
    const tile = Island.getTileAt(iz, where);
    if (!_assertTileExists(tile)) return;
    tile.thingId = id;
  },

  putSoundAt(iz: Island, id: string | undefined, where: Where) {
    const tile = Island.getTileAt(iz, where);
    if (!_assertTileExists(tile)) return;
    tile.soundId = id;
  },

  putScrogOn(iz: Island, id: string | undefined, on: string) {
    const tile = Island.getTileWithId(iz, on);
    if (!_assertTileExists(tile)) return;
    tile.scrogId = id;
  },

  putThingOn(iz: Island, id: string | undefined, on: string) {
    const tile = Island.getTileWithId(iz, on);
    if (!_assertTileExists(tile)) return;
    tile.thingId = id;
  },

  putSoundOn(iz: Island, id: string | undefined, on: string) {
    const tile = Island.getTileWithId(iz, on);
    if (!_assertTileExists(tile)) return;
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

function _assertTileExists(tile: Tile | undefined): tile is Tile {
  if (!tile) {
    console.warn(`[_assertTileExists] Tile does not exist.`);
    return false;
  }
  return true;
}

function _assertInBounds(iz: Island, {x, y}: Where) {
  if (!_in(iz, {x, y})) {
    console.warn(`[_assertInBounds] Where '${x}, ${y}' is out of bounds.`);
    return false;
  }
  return true;
}

function _assertTileWithIdExists(iz: Island, id: string) {
  if (!(id in iz.tiles)) {
    console.warn(`[_assertTileWithIdExists] Tile with '${id}' does not exist.`);
    return false;
  }
  return true;
}

function _assertThingWithIdExists(iz: Island, id: string) {
  if (!(id in iz.things)) {
    console.warn(`[_assertThingWithIdExists] Thing with '${id}' does not exist.`);
    return false;
  }
  return true;
}

function _assertScrogWithIdExists(iz: Island, id: string) {
  if (!(id in iz.scrogs)) {
    console.warn(`[_assertScrogWithIdExists] Scrog with '${id}' does not exist.`);
    return false;
  }
  return true;
}

function _assertSoundWithIdExists(iz: Island, id: string) {
  if (!(id in iz.sounds)) {
    console.warn(`[_assertSoundWithIdExists] Sound with '${id}' does not exist.`);
    return false;
  }
  return true;
}

function _assertTileWithIdDoesNotExist(iz: Island, id: string) {
  if (id in iz.tiles) {
    console.warn(`[_assertTileWithIdDoesNotExist] Tile with '${id}' already exists.`);
    return false;
  }
  return true;
}

function _assertThingWithIdDoesNotExist(iz: Island, id: string) {
  if (id in iz.things) {
    console.warn(`[_assertThingWithIdDoesNotExist] Thing with '${id}' already exists.`);
    return false;
  }
  return true;
}

function _assertScrogWithIdDoesNotExist(iz: Island, id: string) {
  if (id in iz.scrogs) {
    console.warn(`[_assertScrogWithIdDoesNotExist] Scrog with '${id}' already exists.`);
    return false;
  }
  return true;
}

function _assertSoundWithIdDoesNotExist(iz: Island, id: string) {
  if (id in iz.sounds) {
    console.warn(`[_assertSoundWithIdDoesNotExist] Sound with '${id}' already exists.`);
    return false;
  }
  return true;
}

function _assertGridIsEmptyAt(iz: Island, at: number) {
  if (iz.grid[at]) {
    console.warn(`[_assertGridIsEmptyAt] Grid at index '${at}' is not empty.`);
    return false;
  }
  return true;
}