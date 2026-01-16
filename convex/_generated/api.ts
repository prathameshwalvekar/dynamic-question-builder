export type FunctionReference<FunctionType extends "query" | "mutation" | "action", 
  PublicOrInternal extends "public" | "internal" = "public",
  Args extends Record<string, any> = Record<string, any>> = {
  args: Args;
  returns: any;
  functionType: FunctionType;
  publicOrInternal: PublicOrInternal;
};

export const api = {
  questionPapers: {
    saveQuestionPaper: {} as FunctionReference<"mutation", "public", any>,
    getQuestionPapers: {} as FunctionReference<"query", "public", any>,
    getQuestionPaper: {} as FunctionReference<"query", "public", any>,
    deleteQuestionPaper: {} as FunctionReference<"mutation", "public", any>,
    updateQuestionPaper: {} as FunctionReference<"mutation", "public", any>,
  },
};
