import { Color } from "./color";
import { uniqueId } from "./helpers";
import type { Island } from "./island";
import { AHEAD, EAST, HERE, LEFT, RIGHT, Where } from "./where";


export type Scrog = {
  readonly id: string;
  color: Color;
  where: Where;
  facing: Where.Absolute;
  memory: {[id: string]: any}
}

export const Scrog = {
  new(id: string, color: Color, facing: Where.Absolute = EAST, where: Where = Where.new()) {
    return { id, color, facing, memory: { }, where } satisfies Scrog
  }
}