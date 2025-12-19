export const RED    = "red"     as const;
export const YELLOW = "yellow"  as const;
export const GREEN  = "green"   as const;
export const CYAN   = "cyan"    as const;
export const BLUE   = "blue"    as const;
export const MAGENTA= "magenta" as const;
export const BLACK  = "black"   as const;
export const WHITE  = "white"   as const;

export type RED     = typeof RED    ;
export type YELLOW  = typeof YELLOW ;
export type GREEN   = typeof GREEN  ;
export type CYAN    = typeof CYAN   ;
export type BLUE    = typeof BLUE   ;
export type MAGENTA = typeof MAGENTA;
export type BLACK   = typeof BLACK  ;
export type WHITE   = typeof WHITE  ;

export type Color = {
  readonly is: Color.Is
}

export namespace Color {
  export type Is = RED | YELLOW | GREEN | CYAN | BLUE | MAGENTA | BLACK | WHITE
}

export const Color = {
  new(is: Color.Is) {
    return { is } satisfies Color
  },

  Red    () { return Color.new(RED    ); },
  Yellow () { return Color.new(YELLOW ); },
  Green  () { return Color.new(GREEN  ); },
  Cyan   () { return Color.new(CYAN   ); },
  Blue   () { return Color.new(BLUE   ); },
  Magenta() { return Color.new(MAGENTA); },
  Black  () { return Color.new(BLACK  ); },
  White  () { return Color.new(WHITE  ); },
}