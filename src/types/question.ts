export type QuestionType = 
  | 'fill-blank' 
  | 'word-search' 
  | 'match-words' 
  | 'identify-image'
  | 'multiple-choice'
  | 'true-false'
  | 'short-answer'
  | 'long-answer';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  marks: number;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill-blank';
  text: string; // Use ___ for blanks
}

export interface WordSearchQuestion extends BaseQuestion {
  type: 'word-search';
  words: string[];
  gridSize: number;
  instructions?: string;
}

export interface MatchWordsQuestion extends BaseQuestion {
  type: 'match-words';
  leftColumn: string[];
  rightColumn: string[];
}

export interface IdentifyImageQuestion extends BaseQuestion {
  type: 'identify-image';
  imageUrl: string;
  question: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  question: string;
  options: string[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  statement: string;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short-answer';
  question: string;
  lines?: number;
}

export interface LongAnswerQuestion extends BaseQuestion {
  type: 'long-answer';
  question: string;
  lines?: number;
}

export type Question = 
  | FillBlankQuestion 
  | WordSearchQuestion 
  | MatchWordsQuestion 
  | IdentifyImageQuestion
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | ShortAnswerQuestion
  | LongAnswerQuestion;

export interface QuestionPaper {
  title: string;
  subject: string;
  class: string;
  duration: string;
  totalMarks: number;
  instructions: string[];
  sections: {
    name: string;
    questions: Question[];
  }[];
}
