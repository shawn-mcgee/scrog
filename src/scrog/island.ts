import type { Scrog } from "./scrog"
import { Sound } from "./sound"
import { BERRY, type Thing } from "./thing"
import { DEEP_WATER, GRASS, WATER, type Tile  } from "./tile"
import { AHEAD, HERE, LEFT, RIGHT, Where } from "./where"

export type Square = {
  readonly where: Where
  tileId ?: string;
  thingId?: string;
  scrogId?: string;
  soundId?: string;
}

const Square = {
  new(where: Where = Where.new()) {
    return { where } satisfies Square
  }
}

export type Island = {
  tiles : {[tileId : string]: Tile }
  things: {[thingId: string]: Thing}
  scrogs: {[scrogId: string]: Scrog}
  sounds: {[soundId: string]: Sound}

  readonly squares: Array<Square>
  readonly w      : number
  readonly h      : number
}

export const Island = {
  new(
    w = 10, 
    h = 10
  ) {
    const squares = Array(w * h).fill(0).map((_, i) => {
      const row = Math.floor(i / w);
      const col = Math.floor(i % w);
      return Square.new([row, col]);
    })
    return {
      tiles : {},
      things: {},
      scrogs: {},
      sounds: {},
      squares, w, h
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
    for (const square of iz.squares)
      if (square.tileId === id)
        delete square.tileId;
  },

  removeThing(iz: Island, id: string) {
    if (!(id in iz.things)) {
      console.warn(`[removeThing] Thing with id '${id}' does not exist.`);
      return;
    }

    delete iz.things[id];
    for (const square of iz.squares)
      if (square.thingId === id)
        delete square.thingId;
  },

  removeScrog(iz: Island, id: string) {
    if (!(id in iz.scrogs)) {
      console.warn(`[removeScrog] Scrog with id '${id}' does not exist.`);
      return;
    }

    delete iz.scrogs[id];
    for (const square of iz.squares)
      if (square.scrogId === id)
        delete square.scrogId;
  },

  removeSound(iz: Island, id: string) {
    if (!(id in iz.sounds)) {
      console.warn(`[removeSound] Sound with id '${id}' does not exist.`);
      return;
    }

    delete iz.sounds[id];
    for (const square of iz.squares)
      if (square.soundId === id)
        delete square.soundId;
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

    const square = iz.squares[_at(iz, where)];

    if (!square       ) {
      console.warn(`[getTileAt] Grid at ${where} is undefined.`);
      return undefined;
    }

    if (!square.tileId) {
      console.warn(`[getTileAt] Grid at ${where} has no tileId.`);
      return undefined;
    }

    return Island.getTileWithId(iz, square.tileId);
  },

  getThingAt(iz: Island, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[getThingAt] Grid at ${where} is out of bounds.`);
      return undefined;
    }

    const square = iz.squares[_at(iz, where)];

    if (!square        ) {
      console.warn(`[getThingAt] Grid at ${where} is undefined.`);
      return undefined;
    }

    if (!square.thingId) {
      console.warn(`[getThingAt] Grid at ${where} has no thingId.`);
      return undefined;
    }

    return Island.getThingWithId(iz, square.thingId);
  },

  getScrogAt(iz: Island, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[getScrogAt] Grid at ${where} is out of bounds.`);
      return undefined;
    }

    const square = iz.squares[_at(iz, where)];

    if (!square        ) {
      console.warn(`[getScrogAt] Grid at ${where} is undefined.`);
      return undefined;
    }

    if (!square.scrogId) {
      console.warn(`[getScrogAt] Grid at ${where} has no scrogId.`);
      return undefined;
    }

    return Island.getScrogWithId(iz, square.scrogId);
  },

  getSoundAt(iz: Island, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[getSoundAt] Grid at ${where} is out of bounds.`);
      return undefined;
    }

    const square = iz.squares[_at(iz, where)];

    if (!square        ) {
      console.warn(`[getSoundAt] Grid at ${where} is undefined.`);
      return undefined;
    }

    if (!square.soundId) {
      console.warn(`[getSoundAt] Grid at ${where} has no soundId.`);
      return undefined;
    }

    return Island.getSoundWithId(iz, square.soundId);
  },

  putTileAt(iz: Island, id: string | undefined, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[putTileAt] Grid at ${where} is out of bounds.`);
      return;
    }      

    const square = iz.squares[_at(iz, where)];

    if (!square) {
      console.warn(`[putTileAt] Grid at ${where} is undefined.`);
      return;
    }

    if (id) {
      const tile = Island.getTileWithId(iz, id);      

      if (!tile) 
        throw `[putTileAt] Tile with id '${id}' does not exist.`;

      for (const square of iz.squares)
        if (square.tileId === id)
          throw `[putTileAt] Tile with id '${id}' already exists at ${where}.`;

      tile.where = [...where];
    }

    square.tileId = id;
  },

  putThingAt(iz: Island, id: string | undefined, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[putThingAt] Grid at ${where} is out of bounds.`);
      return;
    }

    const square = iz.squares[_at(iz, where)];

    if (!square) {
      console.warn(`[putThingAt] Grid at ${where} is undefined.`);
      return;
    }

    if (id) {
      const thing = Island.getThingWithId(iz, id);      

      if (!thing) 
        throw `[putThingAt] Thing with id '${id}' does not exist.`;

      for (const square of iz.squares)
        if (square.thingId === id)
          throw `[putThingAt] Thing with id '${id}' already exists at ${where}.`;

      thing.where = [...where];
    }

    square.thingId = id;
  },

  putScrogAt(iz: Island, id: string | undefined, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[putScrogAt] Grid at ${where} is out of bounds.`);
      return;
    }

    const square = iz.squares[_at(iz, where)];

    if (!square) {
      console.warn(`[putScrogAt] Grid at ${where} is undefined.`);
      return;
    }

    if (id) {
      const scrog = Island.getScrogWithId(iz, id);      

      if (!scrog) 
        throw `[putScrogAt] Scrog with id '${id}' does not exist.`;

      for (const square of iz.squares)
        if (square.scrogId === id)
          throw `[putScrogAt] Scrog with id '${id}' already exists at ${where}.`;

      scrog.where = [...where];
    }

    square.scrogId = id;
  },

  putSoundAt(iz: Island, id: string | undefined, where: Where) {
    if (!_in(iz, where)) {
      console.warn(`[putSoundAt] Grid at ${where} is out of bounds.`);
      return;
    }

    const square = iz.squares[_at(iz, where)];

    if (!square) {
      console.warn(`[putSoundAt] Grid at ${where} is undefined.`);
      return;
    }

    if (id) {
      const sound = Island.getSoundWithId(iz, id);      

      if (!sound) 
        throw `[putSoundAt] Sound with id '${id}' does not exist.`;

      for (const square of iz.squares)
        if (square.soundId === id)
          throw `[putSoundAt] Sound with id '${id}' already exists at ${where}.`;

      sound.where = [...where];
    }

    square.soundId = id;
  },

  scrogHop(iz: Island, id: string) {
    const scrog = Island.getScrogWithId(iz, id);

    if (!scrog)
      throw `[scrogHop] Scrog with id '${id}' does not exist.`;

    const here  = scrog.where;
    const ahead = Where.to(scrog.where, scrog.facing, AHEAD);

    const scrogAhead = Island.getScrogAt(iz, ahead);

    if (scrogAhead) {
      // a friendly scrog is in the way
      Island.putSoundAt(iz, Sound.Ouch(iz, scrog.id).id, here);
      return;
    }

    const tileAhead  = Island.getTileAt (iz, ahead);    

    if (!tileAhead) {
      // at the edge of the island
      Island.putSoundAt(iz, Sound.Ouch(iz, scrog.id).id, here);
    } else if (tileAhead.is === GRASS) {
      // hop into the grass
      Island.putSoundAt(iz, Sound.Rustle(iz, scrog.id).id, ahead);
      Island.putScrogAt(iz, undefined, here);
      Island.putScrogAt(iz, scrog.id, ahead);
    } else if (tileAhead.is === WATER) {
      // hop into the water
      Island.putSoundAt(iz, Sound.Splash(iz, scrog.id).id, ahead);
      Island.putScrogAt(iz, undefined, here);
      Island.putScrogAt(iz, scrog.id, ahead);
    } else if (tileAhead.is === DEEP_WATER) {
      // drowns
      Island.putSoundAt(iz, Sound.Splash(iz, scrog.id).id, ahead);
      Island.putScrogAt(iz, undefined, here);
    }  
  },

  scrogTurn(iz: Island, id: string, where: LEFT | RIGHT) {
    const scrog = Island.getScrogWithId(iz, id);

    if (!scrog)
      throw `[scrogTurn] Scrog with id '${id}' does not exist.`;

    scrog.facing = Where.turn(scrog.facing, where);
  },

  scrogEat(iz: Island, id: string, where: HERE | AHEAD = HERE) {
    const scrog = Island.getScrogWithId(iz, id);

    if (!scrog)
      throw `[scrogEat] Scrog with id '${id}' does not exist.`;

    const here  = scrog.where;
    const ahead = Where.to(scrog.where, scrog.facing, AHEAD);

    if (where === HERE) {
      const thingHere = Island.getThingAt(iz, here);

      if (thingHere?.is === BERRY) {
        // eat the berry
        Island.putSoundAt(iz, Sound.Chomp(iz, scrog.id).id, here);
        Island.removeThing(iz, thingHere.id);
        return;
      }

    } else {
      const thingAhead = Island.getThingAt(iz, ahead);
      const scrogAhead = Island.getScrogAt(iz, ahead);

      if (thingAhead && thingAhead.is === BERRY) {
        // eat the berry
        Island.putSoundAt(iz, Sound.Chomp(iz, scrog.id).id, here);
        Island.removeThing(iz, thingAhead.id);
        return;
      }

      if (!thingAhead && scrogAhead) {
        // eat the scrog
        Island.putSoundAt(iz, Sound.Chomp(iz, scrog.id).id, here);
        Island.removeScrog(iz, scrogAhead.id);
        return;
      }
    }

    // no food
    Island.putSoundAt(iz, Sound.Ouch(iz, scrog.id).id, here);
  }
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