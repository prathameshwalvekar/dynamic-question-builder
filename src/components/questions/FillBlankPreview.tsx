import { FillBlankQuestion } from '@/types/question';

interface FillBlankPreviewProps {
  question: FillBlankQuestion;
  index: number;
}

export function FillBlankPreview({ question, index }: FillBlankPreviewProps) {
  // Replace ___ with blank lines
  const parts = question.text.split(/(_+)/g);
  
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex items-start">
        <span className="question-number">{index}</span>
        <div className="flex-1">
          <p className="text-lg leading-relaxed">
            {parts.map((part, i) => 
              part.match(/^_+$/) ? (
                <span key={i} className="blank-line" />
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
          <span className="text-sm text-muted-foreground mt-2 block">
            [{question.marks} mark{question.marks > 1 ? 's' : ''}]
          </span>
        </div>
      </div>
    </div>
  );
}
