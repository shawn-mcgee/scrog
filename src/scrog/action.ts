import type { Where } from "./where";

export const CREATE_MEMORY = "createMemory";
export const UPDATE_MEMORY = "updateMemory";
export const DELETE_MEMORY = "deleteMemory";
export const HOP  = "hop";
export const EAT  = "eat";
export const TURN = "turn";

export type CREATE_MEMORY = typeof CREATE_MEMORY;
export type UPDATE_MEMORY = typeof UPDATE_MEMORY;
export type DELETE_MEMORY = typeof DELETE_MEMORY;

export type HOP  = typeof HOP;
export type EAT  = typeof EAT;
export type TURN = typeof TURN;

export type CreateMemory = {
  kind    : CREATE_MEMORY;
  id      : string;
  newValue: number | string;
}

export type UpdateMemory = {
  kind : UPDATE_MEMORY;
  id   : string;
  oldValue: number | string;
  newValue: number | string;
}

export type DeleteMemory = {
  kind    : DELETE_MEMORY;
  id      : string;
  oldValue: number | string;
}

export type Hop = {
  kind: HOP;
  id: string;
  from: Where;
  to  : Where;
}

export type Turn = {
  kind: TURN;
  id  : string;
  from: Where.Absolute;
  to  : Where.Absolute;
}

