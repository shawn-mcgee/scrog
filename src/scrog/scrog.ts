import type { Color } from "./color";
import { Where } from "./where";


export type Scrog = {
  readonly id: string;
  color: Color;
  where: Where;
}

export const Scrog = {
  new(id: string, color: Color, where: Where = Where.new()) {
    return { id, color, where } satisfies Scrog
  }
}