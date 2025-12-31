import { Color } from "./color";
import { uniqueId } from "./helpers";
import type { Island } from "./island";
import { EAST, Where } from "./where";


export type Scrog = {
  readonly id: string;
  color: Color;
  where: Where;
  facing: Where.Absolute;
}

export const Scrog = {
  new(id: string, color: Color, facing: Where.Absolute = EAST, where: Where = Where.new()) {
    return { id, color, facing, where } satisfies Scrog
  },

  Red(on: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(on.scrogs), Color.Red(), facing, where);
    on.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Yellow(on: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(on.scrogs), Color.Yellow(), facing, where);
    on.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Green(on: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(on.scrogs), Color.Green(), facing, where);
    on.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Cyan(on: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(on.scrogs), Color.Cyan(), facing, where);
    on.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Blue(on: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(on.scrogs), Color.Blue(), facing, where);
    on.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Magenta(on: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(on.scrogs), Color.Magenta(), facing, where);
    on.scrogs[scrog.id] = scrog;
    return scrog;
  },

  White(on: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(on.scrogs), Color.White(), facing, where);
    on.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Black(on: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(on.scrogs), Color.Black(), facing, where);
    on.scrogs[scrog.id] = scrog;
    return scrog;
  },  
}