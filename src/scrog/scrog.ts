export type Island = {
  tiles : Array<Tile>
  things: {[id: string]: Thing}
  scrogs: {[id: string]: Scrog}

  w: number;
  h: number;
}

export type Tile = {
  kind: Tile.Kind
  x   : number
  y   : number

  color  : Color
  sound ?: Sound
  thing ?: string
  scrog ?: string
}

export type Thing = {
  kind: Thing.Kind
  id  : string
  x   : number
  y   : number

  color: Color
}

export type Scrog = {
  id: string;
  x : number;
  y : number;

  color : Color;
  things: Array<string>
  facing: Absolute
}

export const Tiles = {
  WATER           : "water"            as const, // walkable
  WATER_LILY      : "water_lily"       as const, // walkable
  WATER_STONE     : "water_stone"      as const, // obstacle

  DEEP_WATER      : "deep_water"       as const, // hazard
  DEEP_WATER_LILY : "deep_water_lily"  as const, // walkable
  DEEP_WATER_STONE: "deep_water_stone" as const, // walkable

  GRASS           : "grass"            as const, // walkable
  GRASS_TREE      : "grass_tree"       as const, // obstacle

  SAND            : "sand"             as const, // walkable
  SAND_TREE       : "sand_tree"        as const, // obstacle
}

export const NORTH = "north" as const;
export const SOUTH = "south" as const;
export const EAST  = "east"  as const;
export const WEST  = "west"  as const;
export const HERE  = "here"  as const;
export const LEFT  = "left"  as const;
export const RIGHT = "right" as const;
export const AHEAD = "ahead" as const;


export type NORTH = typeof NORTH;
export type SOUTH = typeof SOUTH;
export type EAST  = typeof EAST;
export type WEST  = typeof WEST;
export type Absolute = NORTH | SOUTH | EAST | WEST;

export type HERE  = typeof HERE;
export type LEFT  = typeof LEFT;
export type RIGHT = typeof RIGHT;
export type AHEAD = typeof AHEAD;
export type Relative = HERE | LEFT | RIGHT | AHEAD;

export const Where = {
  northOf(x: number, y: number) {
    return [x, y-1] as const;
  },

  southOf(x: number, y: number) {
    return [x, y+1] as const;
  },

  eastOf(x: number, y: number) {
    return [x+1, y] as const;
  },

  westOf(x: number, y: number) {
    return [x-1, y] as const;
  },

  leftOf (x: number, y: number, facing: Absolute) {
    switch (facing) {
      case NORTH: return Where.westOf (x, y);
      case SOUTH: return Where.eastOf (x, y);
      case EAST : return Where.northOf(x, y);
      case WEST : return Where.southOf(x, y);
    }
  },

  rightOf(x: number, y: number, facing: Absolute) {
    switch (facing) {
      case NORTH: return Where.eastOf (x, y);
      case SOUTH: return Where.westOf (x, y);
      case EAST : return Where.southOf(x, y);
      case WEST : return Where.northOf(x, y);
    }
  },

  aheadOf(x: number, y: number, facing: Absolute) {
    switch (facing) {
      case NORTH: return Where.northOf(x, y);
      case SOUTH: return Where.southOf(x, y);
      case EAST : return Where.eastOf (x, y);
      case WEST : return Where.westOf (x, y);
    }
  },

  then(x: number, y: number, facing: Absolute, toward: Absolute | Relative) {
    switch (toward) {
      case HERE : return [x, y] as const;
      case LEFT : return Where.leftOf (x, y, facing);
      case RIGHT: return Where.rightOf(x, y, facing);
      case AHEAD: return Where.aheadOf(x, y, facing);
      case NORTH: return Where.northOf(x, y);
      case SOUTH: return Where.southOf(x, y);
      case EAST : return Where.eastOf (x, y);
      case WEST : return Where.westOf (x, y);
    }
  },
}

export const Tile = {
  new(kind: Tile.Kind, color: Color, x=0, y=0) {
    return { kind, color, x, y } satisfies Tile
  },

  Water(iz: Island) {
    return Tile.new(Tiles.WATER, Colors.BLUE);
  },

  WaterLily(iz: Island) {
    return Tile.new(Tiles.WATER_LILY, Colors.GREEN);
  },

  WaterStone(iz: Island) {
    return Tile.new(Tiles.WATER_STONE, Colors.GRAY);
  },

  DeepWater(iz: Island) {
    return Tile.new(Tiles.DEEP_WATER, Colors.BLUE);
  },

  DeepWaterLily(iz: Island) {
    return Tile.new(Tiles.DEEP_WATER_LILY, Colors.GREEN);
  },

  DeepWaterStone(iz: Island) {
    return Tile.new(Tiles.DEEP_WATER_STONE, Colors.GRAY);
  },

  Grass(iz: Island) {
    return Tile.new(Tiles.GRASS, Colors.GREEN);
  },

  GrassTree(iz: Island) {
    return Tile.new(Tiles.GRASS_TREE, Colors.BROWN);
  },

  Sand(iz: Island) {
    return Tile.new(Tiles.SAND, Colors.YELLOW);
  },

  SandTree(iz: Island) {
    return Tile.new(Tiles.SAND_TREE, Colors.BROWN);
  },
}

export const Things = {
  BERRY: "berry" as const,
  STONE: "stone" as const,
}

export const Thing = {
  new(id: string, kind: Thing.Kind, color: Color, x=0, y=0) {
    return {
      id, kind, color, x, y,
    } satisfies Thing
  },

  Berry(iz: Island) {
    return Thing.new(uniqueId(iz.things), Things.BERRY, Colors.RED);
  },

  Stone(iz: Island) {
    return Thing.new(uniqueId(iz.things), Things.STONE, Colors.GRAY);
  },
}

export const Colors = {
  RED   : "red"    as const, // berry
  ORANGE: "orange" as const, 
  YELLOW: "yellow" as const,
  GREEN : "green"  as const, // grass, water_lily
  BLUE  : "blue"   as const, // water, water_deep
  PURPLE: "purple" as const,
  GRAY  : "gray"   as const, // rock
  BROWN : "brown"  as const,
}

export type Color = typeof Colors[keyof typeof Colors]

export const Sounds = {
  SPLASH: "splash" as const,
  RUSTLE: "rustle" as const,
  


  GULP  : "gulp"   as const,
  CROAK : "croak"  as const,

  OUCH  : "ouch"   as const,
}

export type Sound = typeof Sounds[keyof typeof Sounds]

export const Scrog = {
  new(id: string, color: Color, x=0, y=0) {
    return {
      id, color, x, y, things: [], facing: NORTH,
    } satisfies Scrog
  }
}

export namespace Tile  {
  export type Kind = typeof Tiles[keyof typeof Tiles]
}

export namespace Thing  {
  export type Kind = typeof Things[keyof typeof Things]
}

export namespace Scrog {

}

function uniqueId(ids: {[id: string]: any}) {
  let id = crypto.randomUUID();
  while (id in ids)
      id = crypto.randomUUID();
  return id;
}

export const Island = {
  new(w=10, h=10) {

  },

  _has(iz: Island, x: number, y: number) {
    return (
      x >= 0 && x < iz.w && 
      y >= 0 && y < iz.h
    );
  },

  _at (iz: Island, x: number, y: number) {
    return y * iz.w + x;
  },

  getThingWithId(iz: Island, id: string) {
    if (id in iz.things)
      return iz.things[id];
  },

  getScrogWithId(iz: Island, id: string) {
    if (id in iz.scrogs)
      return iz.scrogs[id];
  },

  getTileWithThing(iz: Island, id: string) {
    for(const tile of iz.tiles)
      if (tile.thing === id)
        return tile;
  },

  getTileWithScrog(iz: Island, id: string) {
    for(const tile of iz.tiles)
      if (tile.scrog === id)
        return tile;
  },

  getTileAt(iz: Island, x: number, y: number) {
    if (Island._has(iz, x, y))
      return iz.tiles[Island._at(iz, x, y)];
  },

  getThingAt(iz: Island, x: number, y: number) {
    const tile = Island.getTileAt(iz, x, y);
    if (tile && tile.thing)
      return Island.getThingWithId(iz, tile.thing);
  },

  getScrogAt(iz: Island, x: number, y: number) {
    const tile = Island.getTileAt(iz, x, y);
    if (tile && tile.scrog)
      return Island.getScrogWithId(iz, tile.scrog);
  },

  putTileAt(iz: Island, x: number, y: number, tile: Tile) {
    if (Island._has(iz, x, y)) {
      iz.tiles[Island._at(iz, x, y)] = tile;
      tile.x = x;
      tile.y = y;
    }
  },

  putThingAt(iz: Island, x: number, y: number, id: string | undefined) {
    const tile = Island.getTileAt(iz, x, y);
    if (tile) {
      tile.thing = id;

      let thing;
      if (id && (thing = Island.getThingWithId(iz, id))) {
        thing.x = x;
        thing.y = y;
      }
    }
  },

  putScrogAt(iz: Island, x: number, y: number, id: string | undefined) {
    const tile = Island.getTileAt(iz, x, y);
    if (tile) { 
      tile.scrog = id;

      let scrog;
      if (id && (scrog = Island.getScrogWithId(iz, id))) {
        scrog.x = x;
        scrog.y = y;
      }
    }
  },

  getColorOf(iz: Island, tile: Tile) {
    let scrog;
    let thing;

    if (tile.scrog && (scrog = Island.getScrogWithId(iz, tile.scrog)))
      return scrog.color;

    if (tile.thing && (thing = Island.getThingWithId(iz, tile.thing)))
      return thing.color;

    return tile.color;
  },

  getColorAt(iz: Island, x: number, y: number) {
    const tile  =  Island.getTileAt(iz, x, y);
    if (tile) return Island.getColorOf(iz, tile);
  },

  getSoundAt(iz: Island, x: number, y: number) {
    const tile  =  Island.getTileAt(iz, x, y);
    if (tile) return tile.sound;
  },

  putSoundAt(iz: Island, x: number, y: number, sound: Sound) {
    const tile = Island.getTileAt(iz, x, y);
    if (tile) tile.sound = sound;
  },



  // scrog actions
  scrogHop (iz: Island, id: string) {
    const scrog = Island.getScrogWithId(iz, id);
    if (!scrog) return;

    const [x, y] = Where.then(scrog.x, scrog.y, scrog.facing, AHEAD);

    const from = Island.getTileAt(iz, scrog.x, scrog.y);
    const to   = Island.getTileAt(iz,       x,       y);

    if (!from) return; // ?? probably throw an error here ??

    if (!to) {
      // scrog is trying to go out of bounds, scrog mad
      from.sound = Sounds.OUCH;
      return;
    }

    switch (to.kind) {
      case Tiles.WATER           :
      case Tiles.WATER_LILY      :
      case Tiles.WATER_STONE     : 
      case Tiles.DEEP_WATER_LILY :
      case Tiles.DEEP_WATER_STONE: {
        // move and splash
        delete from.scrog;
        to.scrog   =   id;
        to.sound = Sounds.SPLASH;
      }; break;

      case Tiles.DEEP_WATER: {
        delete from.scrog;
        // to.scrog   =   id;
        to.sound   = Sounds.SPLASH;

        // frog is now dead
      }; break;

      case Tiles.GRASS: {
        // move and rustle
        delete from.scrog;
        to.scrog   =   id;
        to.sound = Sounds.RUSTLE;
      }; break;

      case Tiles.GRASS_TREE: 
      case Tiles.SAND_TREE : {
        // ouch
        from.sound = Sounds.OUCH;
      }; break;

      case Tiles.SAND: {
        delete from.scrog;
        to.scrog = id;
      }; break;
    }
  },

  scrogTurn(iz: Island, id: string, where: LEFT | RIGHT       ) {

  },

  scrogEat (iz: Island, id: string, where: HERE | AHEAD = HERE) {

  },

  scrogPush(iz: Island, id: string                            ) {

  },

  scrogLily(iz: Island, id: string, where: HERE | AHEAD = HERE) {

  },

  scrogCroak(iz: Island, id: string, sound: Sound = Sounds.CROAK) {

  },

  scrogHue  (iz: Island, id: string, color: Color) {
  },

  scrogSees (iz: Island, id: string, where: Relative) {

  },

  scrogHears(iz: Island, id: string, where: Relative) {

  },
}

