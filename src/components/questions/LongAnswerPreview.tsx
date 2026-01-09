import { LongAnswerQuestion } from '@/types/question';

interface LongAnswerPreviewProps {
  question: LongAnswerQuestion;
  index: number;
}

export function LongAnswerPreview({ question, index }: LongAnswerPreviewProps) {
  const lines = question.lines || 8;
  
  return (
    <div className="question-block">
      <div className="flex justify-between items-start mb-3">
        <p className="font-medium">
          <span className="mr-2">{index}.</span>
          {question.question}
        </p>
        <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
          [{question.marks} {question.marks === 1 ? 'mark' : 'marks'}]
        </span>
      </div>
      <div className="ml-6 space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className="border-b border-dashed border-foreground/40 h-6"
          />
        ))}
      </div>
    </div>
  );
}
