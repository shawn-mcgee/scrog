import { Color } from "./color";
import { uniqueId } from "./helpers";
import type { Island } from "./island";
import { Where } from "./where";

export const GRASS     = "grass"      as const;
export const WATER     = "water"      as const;
export const DEEP_WATER= "deep_water" as const;

export type GRASS     = typeof GRASS     ;
export type WATER     = typeof WATER     ;
export type DEEP_WATER= typeof DEEP_WATER;

export type Tile = {
  readonly id   : string
  readonly is   : Tile.Is
  readonly color: Color
           where: Where

  scrogId ?: string
  thingId ?: string
  soundId ?: string
}

export namespace Tile {
  export type Is = GRASS | WATER | DEEP_WATER
}

export const Tile = {
  new(id: string, is: Tile.Is, color: Color, where: Where = Where.new()) {
    return { id, is, color, where} satisfies Tile
  },

  Grass    (iz: Island, where: Where = Where.new()) { 
    const tile = Tile.new(uniqueId(iz.tiles), GRASS     , Color.Green(), where);
    iz.tiles[tile.id] = tile;
    return tile;
  },

  Water    (iz: Island, where: Where = Where.new()) { 
    const tile = Tile.new(uniqueId(iz.tiles), WATER     , Color.Blue (), where);
    iz.tiles[tile.id] = tile;
    return tile;
  },

  DeepWater(iz: Island, where: Where = Where.new()) { 
    const tile = Tile.new(uniqueId(iz.tiles), DEEP_WATER, Color.Blue (), where);
    iz.tiles[tile.id] = tile;
    return tile;
  },
}