export type Island = {
  scrogs: {[id: string]: Scrog}

  tiles: Array<Tile>
  w    : number;
  h    : number;
}

export type Tile = {
  kind: Tile.Kind
  scrog ?: Scrog
  x: number
  y: number
}


export type Scrog = {
  id: string
}

export const Tile = {
  Kind: {
    WATER     : "water"      as const, // walkable
    WATER_LILY: "water_lily" as const, // walkable
    WATER_ROCK: "water_rock" as const, // obstacle
    WATER_DEEP: "water_deep" as const, // hazard

    GRASS           : "grass"            as const, // walkable
    GRASS_TREE      : "grass_tree"       as const, // obstacle
    GRASS_BUSH      : "grass_bush"       as const, // walkable
    GRASS_BUSH_BERRY: "grass_bush_berry" as const, // walkable

    SAND       : "sand"        as const, // walkable
    SAND_SHELL : "sand_berry"  as const,
  }
}

export const Scrog = {
  Kind: {
    SCROG: "scrog" as const,
  }
}

export const Color ={
  RED   : "red"    as const, // grass_berry
  YELLOW: "yellow" as const, // sand
  GREEN : "green"  as const, // grass, water_lily
  BLUE  : "blue"   as const, // water, water_deep
}

export const Sound = {
  SPLASH: "splash" as const, // water, water_deep
  RUSTLE: "rustle" as const, // grass, grass_berry
  CRUNCH: "crunch" as const, // sand , sand_berry

  PLUCK : "pluck"  as const, // pluck()
  CHOMP : "chomp"  as const, // eat()
  CROAK : "croak"  as const, // croak()
  OUCH  : "ouch"   as const, // failed movement
}

export namespace Tile  {
  export type Kind = typeof Tile.Kind[keyof typeof Tile.Kind]
}

export namespace Scrog {
  export type Kind = typeof Scrog.Kind[keyof typeof Scrog.Kind]
}

