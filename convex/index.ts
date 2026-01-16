export type FunctionReference<PublicOrInternal extends "public" | "internal", 
  FunctionType extends "query" | "mutation" | "action", 
  Args extends Record<string, any> = Record<string, any>> = {
  args: Args;
  returns: any;
  functionType: FunctionType;
  publicOrInternal: PublicOrInternal;
};

export type GenericFunctionCtx = any;
export type GenericActionCtx = any;
export type GenericMutationCtx = any;
export type GenericQueryCtx = any;

export type Infer<Obj> = Obj extends Record<string, any> ? Obj : never;
export type ObjectType = Record<string, any>;

export type FunctionArgs<T extends FunctionReference<any, any, any>> = T["args"];

export type Id<TableName extends string = string> = `${TableName}_${number}`;

export type TableNames = "questionPapers";
