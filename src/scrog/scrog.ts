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

  Red(iz: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(iz.scrogs), Color.Red(), facing, where);
    iz.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Yellow(iz: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(iz.scrogs), Color.Yellow(), facing, where);
    iz.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Green(iz: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(iz.scrogs), Color.Green(), facing, where);
    iz.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Cyan(iz: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(iz.scrogs), Color.Cyan(), facing, where);
    iz.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Blue(iz: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(iz.scrogs), Color.Blue(), facing, where);
    iz.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Magenta(iz: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(iz.scrogs), Color.Magenta(), facing, where);
    iz.scrogs[scrog.id] = scrog;
    return scrog;
  },

  White(iz: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(iz.scrogs), Color.White(), facing, where);
    iz.scrogs[scrog.id] = scrog;
    return scrog;
  },

  Black(iz: Island, facing: Where.Absolute = EAST, where: Where = Where.new()) { 
    const scrog = Scrog.new(uniqueId(iz.scrogs), Color.Black(), facing, where);
    iz.scrogs[scrog.id] = scrog;
    return scrog;
  },  
}