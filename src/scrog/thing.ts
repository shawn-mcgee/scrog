import { Color } from "./color";
import { uniqueId } from "./helpers";
import { Island } from "./island";
import { Where } from "./where";

export const BERRY = "berry" as const;

export type BERRY = typeof BERRY;

export type Thing = {
  readonly id: string
  readonly is: Thing.Is
  readonly color: Color
           where: Where
}

export namespace Thing {
  export type Is = BERRY
}

export const Thing = {
  new(id: string, is: Thing.Is, color: Color, where: Where = Where.new()) {
    return { id, is, color, where } satisfies Thing
  },

  Berry(on: Island) { 
    const thing = Thing.new(uniqueId(on.things), BERRY, Color.Red());
    Island.addThing(on, thing);
    return thing;
  },
}