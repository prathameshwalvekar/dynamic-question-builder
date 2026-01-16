import { MultipleChoiceQuestion } from '@/types/question';

interface MultipleChoicePreviewProps {
  question: MultipleChoiceQuestion;
  index: number;
}

export function MultipleChoicePreview({ question, index }: MultipleChoicePreviewProps) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="mb-6 animate-fade-in">
      <div className="text-sm font-semibold text-primary mb-2">Multiple Choice</div>
      <div className="flex items-start">
        <span className="question-number">{index}</span>
        <div className="flex-1">
          <p className="text-lg mb-3">{question.question}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-2">
            {question.options.map((option, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded border-2 border-muted-foreground/40 flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {letters[i]}
                </span>
                <span>{option}</span>
              </div>
            ))}
          </div>

          <span className="text-sm text-muted-foreground mt-3 block">
            [{question.marks} mark{question.marks > 1 ? 's' : ''}]
          </span>
        </div>
      </div>
    </div>
  );
}
