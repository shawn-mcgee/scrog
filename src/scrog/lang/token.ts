


// scrog lang is minimal
// scrog lang is not whitespace sensitive
// scrog lang is case sensitive
// scrog lang has zero fancy syntax
// scrog lang relies heavily on keywords

import { AHEAD, HERE, LEFT, NORTH, RIGHT } from "../where";



export const Tokens = {
  ID : "id"  as const,

  // grouping
  L_PAREN: "(" as const,
  R_PAREN: ")" as const,
  COMMA  : "," as const,

  // arithmetic
  PLUS   : "+" as const,
  MINUS  : "-" as const,
  STAR   : "*" as const,
  SLASH  : "/" as const,
  PERCENT: "%" as const,

  // assignment
  EQUAL  : "="  as const,

  // comparison
  LT         : "<"  as const,
  GT         : ">"  as const,
  LTE        : "<=" as const,
  GTE        : ">=" as const,
  EQUAL_EQUAL: "==" as const,

  // dereference
  DOT   : "."      as const,

  // control
  IF    : "if"     as const,
  THEN  : "then"   as const,
  ELSE  : "else"   as const,
  END   : "end"    as const,
  WHILE : "while"  as const,
  BREAK : "break"  as const,
  SKIP  : "skip"   as const,

  // logic
  NOT   : "not"    as const,
  AND   : "and"    as const,
  OR    : "or"     as const,

  // literals
  NUMBER: "number" as const,
  STRING: "string" as const,

  // functions  
  FUN: "fun" as const,


  // constants
  NORTH: "north" as const,
  SOUTH: "south" as const,
  EAST : "east"  as const,
  WEST : "west"  as const,

  HERE : "here"  as const,
  LEFT : "left"  as const,
  RIGHT: "right" as const,
  AHEAD: "ahead" as const,

  TRUE : "true"  as const,
  FALSE: "false" as const,


}


// # this is a comment