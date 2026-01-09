import { IdentifyImageQuestion } from '@/types/question';

interface IdentifyImagePreviewProps {
  question: IdentifyImageQuestion;
  index: number;
}

export function IdentifyImagePreview({ question, index }: IdentifyImagePreviewProps) {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-start mb-4">
        <span className="question-number">{index}</span>
        <div className="flex-1">
          <p className="text-lg font-medium mb-2">
            {question.question || 'Identify the image below:'}
          </p>
          <span className="text-sm text-muted-foreground">
            [{question.marks} mark{question.marks > 1 ? 's' : ''}]
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-2 bg-card">
          <img 
            src={question.imageUrl} 
            alt="Question image"
            className="max-w-[300px] max-h-[250px] object-contain rounded"
          />
        </div>
        
        <div className="w-full max-w-md">
          <p className="text-sm text-muted-foreground mb-2">Answer:</p>
          <div className="h-12 border-b-2 border-foreground/50 w-full" />
        </div>
      </div>
    </div>
  );
}
