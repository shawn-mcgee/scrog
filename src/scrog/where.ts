export const NORTH = "north" as const;
export const SOUTH = "south" as const;
export const EAST  = "east"  as const;
export const WEST  = "west"  as const;

export type NORTH = typeof NORTH;
export type SOUTH = typeof SOUTH;
export type EAST  = typeof EAST ;
export type WEST  = typeof WEST ;

export const HERE  = "here"  as const;
export const LEFT  = "left"  as const;
export const RIGHT = "right" as const;
export const AHEAD = "ahead" as const;

export type HERE  = typeof HERE ;
export type LEFT  = typeof LEFT ;
export type RIGHT = typeof RIGHT;
export type AHEAD = typeof AHEAD;

export namespace Where {
  export type Absolute = NORTH | SOUTH | EAST | WEST
  export type Relative = HERE | LEFT | RIGHT | AHEAD
}

export type Where = {
  readonly x: number
  readonly y: number
}

export const Where = {
  new(x = 0, y = 0) {
    return { x, y } satisfies Where
  },

  left (facing: Where.Absolute) {
    switch (facing) {
      case NORTH: return WEST;
      case SOUTH: return EAST;
      case EAST : return NORTH;
      case WEST : return SOUTH;
    }
  },

  right(facing: Where.Absolute) {
    switch (facing) {
      case NORTH: return EAST;
      case SOUTH: return WEST;
      case EAST : return SOUTH;
      case WEST : return NORTH;
    }
  },

  turn(facing: Where.Absolute, toward: LEFT | RIGHT) {
    switch (toward) {
      case LEFT : return Where.left (facing);
      case RIGHT: return Where.right(facing);
    }
  },

  northOf({x, y}: Where) {
    return Where.new(x, y-1);
  },

  southOf({x, y}: Where) {
    return Where.new(x, y+1);
  },

  eastOf({x, y}: Where) {
    return Where.new(x+1, y);
  },

  westOf({x, y}: Where) {
    return Where.new(x-1, y);
  },

  leftOf (where: Where, facing: Where.Absolute) {
    switch (facing) {
      case NORTH: return Where.westOf (where);
      case SOUTH: return Where.eastOf (where);
      case EAST : return Where.northOf(where);
      case WEST : return Where.southOf(where);
    }
  },

  rightOf(where: Where, facing: Where.Absolute) {
    switch (facing) {
      case NORTH: return Where.eastOf (where);
      case SOUTH: return Where.westOf (where);
      case EAST : return Where.southOf(where);
      case WEST : return Where.northOf(where);
    }
  },

  aheadOf(where: Where, facing: Where.Absolute) {
    switch (facing) {
      case NORTH: return Where.northOf(where);
      case SOUTH: return Where.southOf(where);
      case EAST : return Where.eastOf (where);
      case WEST : return Where.westOf (where);
    }
  },

  then(where: Where, facing: Where.Absolute, toward: Where.Absolute | Where.Relative) {
    switch (toward) {
      case HERE : return where;
      case LEFT : return Where.leftOf (where, facing);
      case RIGHT: return Where.rightOf(where, facing);
      case AHEAD: return Where.aheadOf(where, facing);
      case NORTH: return Where.northOf(where        );
      case SOUTH: return Where.southOf(where        );
      case EAST : return Where.eastOf (where        );
      case WEST : return Where.westOf (where        );
    }
  }
}