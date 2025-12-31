import type { Scrog } from "./scrog"
import type { Sound } from "./sound"
import type { Thing } from "./thing"
import type { Tile  } from "./tile"
import { Where } from "./where"

export type Cell = {
  readonly where: Where
  tileId ?: string;
  thingId?: string;
  scrogId?: string;
  soundId?: string;
}

const Cell = {
  new(where: Where = Where.new()) {
    return { where } satisfies Cell
  }
}

export type Island = {
  tiles : {[tileId : string]: Tile }
  things: {[thingId: string]: Thing}
  scrogs: {[scrogId: string]: Scrog}
  sounds: {[soundId: string]: Sound}

  readonly grid: Array<Cell>
  readonly w   : number
  readonly h   : number
}

export const Island = {
  new(
    w = 10, 
    h = 10
  ) {
    const grid = Array(w * h).fill(0).map((_, i) => {
      const row = Math.floor(i / w);
      const col = Math.floor(i % w);
      return Cell.new([row, col]);
    })
    return {
      tiles : {},
      things: {},
      scrogs: {},
      sounds: {},
      grid, w, h
    } satisfies Island;
  },

  addTile(iz: Island, tile: Tile) {
    if (tile.id in iz.tiles)
      throw `[addTile] Tile with id '${tile.id}' already exists.`;
    iz.tiles[tile.id] = tile;
  },

  addThing(iz: Island, thing: Thing) {
    if (thing.id in iz.things)
      throw `[addThing] Thing with id '${thing.id}' already exists.`;
    iz.things[thing.id] = thing;
  },

  addScrog(iz: Island, scrog: Scrog) {
    if (scrog.id in iz.scrogs)
      throw `[addScrog] Scrog with id '${scrog.id}' already exists.`;
    iz.scrogs[scrog.id] = scrog;
  },

  addSound(iz: Island, sound: Sound) {
    if (sound.id in iz.sounds)
      throw `[addSound] Sound with id '${sound.id}' already exists.`;
    iz.sounds[sound.id] = sound;
  },

  removeTile(iz: Island, id: string) {
    if (!(id in iz.tiles)) {
      console.warn(`[removeTile] Tile with id '${id}' does not exist.`);
      return;
    }

    delete iz.tiles[id];
    for (const cell of iz.grid)
      if (cell.tileId === id)
        delete cell.tileId;
  },

  removeThing(iz: Island, id: string) {
    if (!(id in iz.things)) {
      console.warn(`[removeThing] Thing with id '${id}' does not exist.`);
      return;
    }

    delete iz.things[id];
    for (const cell of iz.grid)
      if (cell.thingId === id)
        delete cell.thingId;
  },

  removeScrog(iz: Island, id: string) {
    if (!(id in iz.scrogs)) {
      console.warn(`[removeScrog] Scrog with id '${id}' does not exist.`);
      return;
    }

    delete iz.scrogs[id];
    for (const cell of iz.grid)
      if (cell.scrogId === id)
        delete cell.scrogId;
  },

  removeSound(iz: Island, id: string) {
    if (!(id in iz.sounds)) {
      console.warn(`[removeSound] Sound with id '${id}' does not exist.`);
      return;
    }

    delete iz.sounds[id];
    for (const cell of iz.grid)
      if (cell.soundId === id)
        delete cell.soundId;
  },

  getTileWithId(iz: Island, id: string) {
    if (!(id in iz.tiles)) {
      console.warn(`[getTileWithId] Tile with id '${id}' does not exist.`);
      return undefined;
    }
    return iz.tiles[id];
  },

  getThingWithId(iz: Island, id: string) {
    if (!(id in iz.things)) {
      console.warn(`[getThingWithId] Thing with id '${id}' does not exist.`);
      return undefined;
    }
    return iz.things[id];
  },

  getScrogWithId(iz: Island, id: string) {
    if (!(id in iz.scrogs)) {
      console.warn(`[getScrogWithId] Scrog with id '${id}' does not exist.`);
      return undefined;
    }
    return iz.scrogs[id];
  },

  getSoundWithId(iz: Island, id: string) {
    if (!(id in iz.sounds)) {
      console.warn(`[getSoundWithId] Sound with id '${id}' does not exist.`);
      return undefined;
    }
    return iz.sounds[id];
  },

  getTileAt(iz: Island, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[getTileAt] Grid at ${where} is out of bounds.`);
      return undefined;
    }

    const cell = iz.grid[_at(iz, where)];

    if (!cell       ) {
      console.warn(`[getTileAt] Grid at ${where} is undefined.`);
      return undefined;
    }

    if (!cell.tileId) {
      console.warn(`[getTileAt] Grid at ${where} has no tileId.`);
      return undefined;
    }

    return Island.getTileWithId(iz, cell.tileId);
  },

  getThingAt(iz: Island, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[getThingAt] Grid at ${where} is out of bounds.`);
      return undefined;
    }

    const cell = iz.grid[_at(iz, where)];

    if (!cell        ) {
      console.warn(`[getThingAt] Grid at ${where} is undefined.`);
      return undefined;
    }

    if (!cell.thingId) {
      console.warn(`[getThingAt] Grid at ${where} has no thingId.`);
      return undefined;
    }

    return Island.getThingWithId(iz, cell.thingId);
  },

  getScrogAt(iz: Island, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[getScrogAt] Grid at ${where} is out of bounds.`);
      return undefined;
    }

    const cell = iz.grid[_at(iz, where)];

    if (!cell        ) {
      console.warn(`[getScrogAt] Grid at ${where} is undefined.`);
      return undefined;
    }

    if (!cell.scrogId) {
      console.warn(`[getScrogAt] Grid at ${where} has no scrogId.`);
      return undefined;
    }

    return Island.getScrogWithId(iz, cell.scrogId);
  },

  getSoundAt(iz: Island, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[getSoundAt] Grid at ${where} is out of bounds.`);
      return undefined;
    }

    const cell = iz.grid[_at(iz, where)];

    if (!cell        ) {
      console.warn(`[getSoundAt] Grid at ${where} is undefined.`);
      return undefined;
    }

    if (!cell.soundId) {
      console.warn(`[getSoundAt] Grid at ${where} has no soundId.`);
      return undefined;
    }

    return Island.getSoundWithId(iz, cell.soundId);
  },

  putTileAt(iz: Island, id: string | undefined, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[putTileAt] Grid at ${where} is out of bounds.`);
      return;
    }      

    const cell = iz.grid[_at(iz, where)];

    if (!cell) {
      console.warn(`[putTileAt] Grid at ${where} is undefined.`);
      return;
    }

    if (id) {
      const tile = Island.getTileWithId(iz, id);      

      if (!tile) 
        throw `[putTileAt] Tile with id '${id}' does not exist.`;

      for (const cell of iz.grid)
        if (cell.tileId === id)
          throw `[putTileAt] Tile with id '${id}' already exists at ${where}.`;

      tile.where = [...where];
    }

    cell.tileId = id;
  },

  putThingAt(iz: Island, id: string | undefined, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[putThingAt] Grid at ${where} is out of bounds.`);
      return;
    }

    const cell = iz.grid[_at(iz, where)];

    if (!cell) {
      console.warn(`[putThingAt] Grid at ${where} is undefined.`);
      return;
    }

    if (id) {
      const thing = Island.getThingWithId(iz, id);      

      if (!thing) 
        throw `[putThingAt] Thing with id '${id}' does not exist.`;

      for (const cell of iz.grid)
        if (cell.thingId === id)
          throw `[putThingAt] Thing with id '${id}' already exists at ${where}.`;

      thing.where = [...where];
    }

    cell.thingId = id;
  },

  putScrogAt(iz: Island, id: string | undefined, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[putScrogAt] Grid at ${where} is out of bounds.`);
      return;
    }

    const cell = iz.grid[_at(iz, where)];

    if (!cell) {
      console.warn(`[putScrogAt] Grid at ${where} is undefined.`);
      return;
    }

    if (id) {
      const scrog = Island.getScrogWithId(iz, id);      

      if (!scrog) 
        throw `[putScrogAt] Scrog with id '${id}' does not exist.`;

      for (const cell of iz.grid)
        if (cell.scrogId === id)
          throw `[putScrogAt] Scrog with id '${id}' already exists at ${where}.`;

      scrog.where = [...where];
    }

    cell.scrogId = id;
  },

  putSoundAt(iz: Island, id: string | undefined, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[putSoundAt] Grid at ${where} is out of bounds.`);
      return;
    }

    const cell = iz.grid[_at(iz, where)];

    if (!cell) {
      console.warn(`[putSoundAt] Grid at ${where} is undefined.`);
      return;
    }

    if (id) {
      const sound = Island.getSoundWithId(iz, id);      

      if (!sound) 
        throw `[putSoundAt] Sound with id '${id}' does not exist.`;

      for (const cell of iz.grid)
        if (cell.soundId === id)
          throw `[putSoundAt] Sound with id '${id}' already exists at ${where}.`;

      sound.where = [...where];
    }

    cell.soundId = id;
  },
}

function _in(iz: Island, [row, col]: Where) {
  return (
    col >= 0 && col < iz.w && 
    row >= 0 && row < iz.h
  );
}

function _at(iz: Island, [row, col]: Where) {
  return row * iz.w + col;
}