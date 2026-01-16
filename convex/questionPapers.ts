import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveQuestionPaper = mutation({
  args: {
    title: v.string(),
    subject: v.optional(v.string()),
    class: v.optional(v.string()),
    duration: v.optional(v.string()),
    instructions: v.array(v.string()),
    totalMarks: v.number(),
    questions: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        marks: v.number(),
        text: v.optional(v.string()),
        words: v.optional(v.array(v.string())),
        gridSize: v.optional(v.number()),
        instructions: v.optional(v.string()),
        leftColumn: v.optional(v.array(v.string())),
        rightColumn: v.optional(v.array(v.string())),
        imageUrl: v.optional(v.string()),
        question: v.optional(v.string()),
        options: v.optional(v.array(v.string())),
        statement: v.optional(v.string()),
        lines: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const paperId = await ctx.db.insert("questionPapers", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return paperId;
  },
});

export const getQuestionPapers = query({
  handler: async (ctx) => {
    const papers = await ctx.db.query("questionPapers").order("desc").collect();
    return papers;
  },
});

export const getQuestionPaper = query({
  args: { id: v.id("questionPapers") },
  handler: async (ctx, args) => {
    const paper = await ctx.db.get(args.id);
    return paper;
  },
});

export const deleteQuestionPaper = mutation({
  args: { id: v.id("questionPapers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateQuestionPaper = mutation({
  args: {
    id: v.id("questionPapers"),
    title: v.string(),
    subject: v.optional(v.string()),
    class: v.optional(v.string()),
    duration: v.optional(v.string()),
    instructions: v.array(v.string()),
    totalMarks: v.number(),
    questions: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        marks: v.number(),
        text: v.optional(v.string()),
        words: v.optional(v.array(v.string())),
        gridSize: v.optional(v.number()),
        instructions: v.optional(v.string()),
        leftColumn: v.optional(v.array(v.string())),
        rightColumn: v.optional(v.array(v.string())),
        imageUrl: v.optional(v.string()),
        question: v.optional(v.string()),
        options: v.optional(v.array(v.string())),
        statement: v.optional(v.string()),
        lines: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...paperData } = args;
    await ctx.db.patch(id, {
      ...paperData,
      updatedAt: Date.now(),
    });
    return id;
  },
});
