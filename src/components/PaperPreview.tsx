import { QuestionPaper, Question } from '@/types/question';
import { FillBlankPreview } from './questions/FillBlankPreview';
import { WordSearchPreview } from './questions/WordSearchPreview';
import { MatchWordsPreview } from './questions/MatchWordsPreview';
import { IdentifyImagePreview } from './questions/IdentifyImagePreview';
import { MultipleChoicePreview } from './questions/MultipleChoicePreview';
import { TrueFalsePreview } from './questions/TrueFalsePreview';
import { Button } from './ui/button';
import { Printer } from 'lucide-react';

interface PaperPreviewProps {
  paper: QuestionPaper;
  questions: Question[];
}

export function PaperPreview({ paper, questions }: PaperPreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

  return (
    <div className="relative">
      <Button 
        onClick={handlePrint}
        className="absolute -top-12 right-0 no-print"
        variant="outline"
      >
        <Printer className="h-4 w-4 mr-2" /> Print Paper
      </Button>

      <div className="paper-texture rounded-lg shadow-xl border-2 border-border p-8 min-h-[800px]">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-foreground/20">
          <h1 className="text-3xl font-serif font-bold mb-2">{paper.title || 'Question Paper'}</h1>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            {paper.subject && <span>Subject: <strong className="text-foreground">{paper.subject}</strong></span>}
            {paper.class && <span>Class: <strong className="text-foreground">{paper.class}</strong></span>}
            {paper.duration && <span>Duration: <strong className="text-foreground">{paper.duration}</strong></span>}
            <span>Max Marks: <strong className="text-foreground">{paper.totalMarks || totalMarks}</strong></span>
          </div>
        </div>

        {/* Instructions */}
        {paper.instructions.length > 0 && (
          <div className="mb-8 p-4 bg-secondary/30 rounded-lg">
            <h2 className="font-serif font-semibold text-lg mb-2">General Instructions:</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              {paper.instructions.map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Questions */}
        {questions.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No questions added yet.</p>
            <p className="text-sm">Add questions from the left panel to see them here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question, index) => renderQuestion(question, index + 1))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t-2 border-foreground/20 text-center text-sm text-muted-foreground">
          <p>— End of Question Paper —</p>
        </div>
      </div>
    </div>
  );
}

function renderQuestion(question: Question, index: number) {
  switch (question.type) {
    case 'fill-blank':
      return <FillBlankPreview key={question.id} question={question} index={index} />;
    case 'word-search':
      return <WordSearchPreview key={question.id} question={question} index={index} />;
    case 'match-words':
      return <MatchWordsPreview key={question.id} question={question} index={index} />;
    case 'identify-image':
      return <IdentifyImagePreview key={question.id} question={question} index={index} />;
    case 'multiple-choice':
      return <MultipleChoicePreview key={question.id} question={question} index={index} />;
    case 'true-false':
      return <TrueFalsePreview key={question.id} question={question} index={index} />;
    default:
      return null;
  }
}
