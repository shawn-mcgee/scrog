export type List    = { is: "list"   , items: Array<List | Number | String | Boolean> }
export type Number  = { is: "number" , value: number  }
export type String  = { is: "string" , value: string  }
export type Boolean = { is: "boolean", value: boolean }

export namespace List {
  export type Cat = { is: "list.cat", lhs: List.Like, rhs: List.Like }

  export type Like = List | Cat | Variable.Get | Function.Result
}

export namespace Number {
  export type Pos = { is: "number.pos", value: Number.Like }
  export type Neg = { is: "number.neg", value: Number.Like }
  export type Add = { is: "number.add", lhs: Number.Like, rhs: Number.Like }
  export type Sub = { is: "number.sub", lhs: Number.Like, rhs: Number.Like }
  export type Mul = { is: "number.mul", lhs: Number.Like, rhs: Number.Like }
  export type Div = { is: "number.div", lhs: Number.Like, rhs: Number.Like }
  export type Mod = { is: "number.mod", lhs: Number.Like, rhs: Number.Like }

  export type Like = Number | Pos | Neg | Add | Sub | Mul | Div | Mod | Variable.Get | Function.Result
}

export namespace String {
  export type Cat = { is: "string.cat", lhs: String.Like, rhs: String.Like }

  export type Like = String | Cat | Variable.Get | Function.Result
}

export namespace Boolean {
  export type Not = { is: "boolean.not", value: Boolean.Like }
  export type And = { is: "boolean.and", lhs: Boolean.Like, rhs: Boolean.Like }
  export type Or  = { is: "boolean.or" , lhs: Boolean.Like, rhs: Boolean.Like }

  export type In = 
    | { is: "boolean.in", lhs: List   .Like, rhs: List  .Like }
    | { is: "boolean.in", lhs: Number .Like, rhs: List  .Like }
    | { is: "boolean.in", lhs: String .Like, rhs: List  .Like }
    | { is: "boolean.in", lhs: Boolean.Like, rhs: List  .Like }
    | { is: "boolean.in", lhs: String .Like, rhs: String.Like }

  export type Is =
    | { is: "boolean.is", lhs: List   .Like, rhs: List   .Like }
    | { is: "boolean.is", lhs: Number .Like, rhs: Number .Like }
    | { is: "boolean.is", lhs: String .Like, rhs: String .Like }
    | { is: "boolean.is", lhs: Boolean.Like, rhs: Boolean.Like }

  export type Lt = 
    | { is: "boolean.lt", lhs: Number.Like, rhs: Number.Like }
    | { is: "boolean.lt", lhs: String.Like, rhs: String.Like }

  export type Gt = 
    | { is: "boolean.gt", lhs: Number.Like, rhs: Number.Like }
    | { is: "boolean.gt", lhs: String.Like, rhs: String.Like }

  export type Lte = 
    | { is: "boolean.lte", lhs: Number.Like, rhs: Number.Like }
    | { is: "boolean.lte", lhs: String.Like, rhs: String.Like }

  export type Gte = 
    | { is: "boolean.gte", lhs: Number.Like, rhs: Number.Like }
    | { is: "boolean.gte", lhs: String.Like, rhs: String.Like }

  export type Like = Boolean | Not | And | Or | Is | Lt | Gt | Lte | Gte | Variable.Get | Function.Result
}

export type Expression = List.Like | Number.Like | String.Like | Boolean.Like

export namespace Variable {
  export type Get = { is: "variable.get", id: string                    }
  export type Set = { is: "variable.set", id: string, value: Expression }
}

export namespace Function {
  export type Result = { is: "function.run", id: string, with: Array<Expression>                         }
  export type Define = { is: "function.set", id: string, with: Array<  string  >, body: Array<Statement> }
}

export namespace Control {
  export type If   = { is: "control.if", 
    when  : Boolean.Like, 
    then  : Array<Statement>, 
    else ?: Array<Statement> 
  }

  export type Loop = { is: "control.loop",
    when ?: Boolean.Like,
    body  : Array<Statement>
  }
}

export type Statement = 
  | Variable.Set
  | Function.Define
  | Function.Result
  | Control.If
  | Control.Loop


export type Program = Array<Statement>






export const example: Program = [
  { is: "variable.set", id: "i", value: { is: "number", value: 0 } },
  { is: "control.loop",
    when: {
      is: "boolean.lt",
      lhs: { is: "variable.get", id: "i" },
      rhs: { is: "number", value: 10 }
    },
    body: [
      { is: "variable.set", id: "i", value: {
        is: "number.add",
        lhs: { is: "variable.get", id: "i" },
        rhs: { is: "number", value: 1 }
      }}
    ]}
]