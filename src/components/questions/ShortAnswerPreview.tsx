import { ShortAnswerQuestion } from '@/types/question';

interface ShortAnswerPreviewProps {
  question: ShortAnswerQuestion;
  index: number;
}

export function ShortAnswerPreview({ question, index }: ShortAnswerPreviewProps) {
  const lines = question.lines || 2;
  
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
