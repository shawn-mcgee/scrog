export type Where = [number, number];

// directions
export type HERE  = "here" ;
export type LEFT  = "left" ;
export type RIGHT = "right";
export type AHEAD = "ahead";

export type Relative = HERE | LEFT | RIGHT | AHEAD;

export type NORTH = "north";
export type SOUTH = "south";
export type EAST  = "east" ;
export type WEST  = "west" ;

export type Absolute = NORTH | SOUTH | EAST | WEST;

// items
export type BERRY = "berry";

// tiles
export type GRASS      =      "grass";
export type WATER      =      "water";
export type DEEP_WATER = "deep_water";

// colors
export type WHITE   = "white";
export type RED     = "red";
export type GREEN   = "green";
export type BLUE    = "blue";
export type CYAN    = "cyan";
export type MAGENTA = "magenta";
export type YELLOW  = "yellow";
export type BLACK   = "black";

// sounds
export type RUSTLE = "rustle";
export type SPLASH = "splash";
export type CROAK  = "croak";
export type CHOMP  = "chomp";
export type OUCH   = "ouch";

export type Island = {
  squares: Array<Square>
  w      : number
  h      : number
}

export type Square = {
  sounds: Array<Sound>
}

export type Sound = {
  readonly id: string;
  readonly is: RUSTLE | SPLASH | CROAK | CHOMP | OUCH;
  readonly where: Where;
  readonly who  : string;
}

export type Scrog = {
  readonly id: string;
  memory: {[id: string]: any};
  facing: Absolute
  where : Where
}

export type Item = {
  readonly id: string;
  readonly is: BERRY ;
  readonly where: Where;
}















