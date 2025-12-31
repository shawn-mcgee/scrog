import { uniqueId } from "./helpers";
import { Island } from "./island";
import { Where } from "./where";

export const SPLASH = "splash" as const;
export const RUSTLE = "rustle" as const;
export const CHOMP  = "chomp"  as const;
export const CROAK  = "croak"  as const;
export const OUCH   = "ouch"   as const;

export type SPLASH = typeof SPLASH;
export type RUSTLE = typeof RUSTLE;
export type CHOMP  = typeof CHOMP ;
export type CROAK  = typeof CROAK ;
export type OUCH   = typeof OUCH  ;

export type Sound = {
  readonly id   : string;
  readonly is   : Sound.Is
           where: Where
}

export namespace Sound {
  export type Is = SPLASH | RUSTLE | CHOMP | CROAK | OUCH
}

export const Sound = {
  new(id: string, is: Sound.Is, where: Where = Where.new()) {
    return { id, is, where } satisfies Sound
  },

  Splash(iz: Island, where: Where = Where.new()) { 
    const sound = Sound.new(uniqueId(iz.sounds), SPLASH, where);
    Island.addSound(iz, sound);
    return sound;
  },

  Rustle(iz: Island, where: Where = Where.new()) { 
    const sound = Sound.new(uniqueId(iz.sounds), RUSTLE, where);
    Island.addSound(iz, sound);
    return sound;
  },

  Chomp (iz: Island, where: Where = Where.new()) { 
    const sound = Sound.new(uniqueId(iz.sounds), CHOMP , where);
    Island.addSound(iz, sound);
    return sound;
  },

  Croak (iz: Island, where: Where = Where.new()) { 
    const sound = Sound.new(uniqueId(iz.sounds), CROAK , where);
    Island.addSound(iz, sound);
    return sound;
  },

  Ouch  (iz: Island, where: Where = Where.new()) { 
    const sound = Sound.new(uniqueId(iz.sounds), OUCH  , where);
    Island.addSound(iz, sound);
    return sound;
  },
}