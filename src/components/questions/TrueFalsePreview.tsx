import { TrueFalseQuestion } from '@/types/question';

interface TrueFalsePreviewProps {
  question: TrueFalseQuestion;
  index: number;
}

export function TrueFalsePreview({ question, index }: TrueFalsePreviewProps) {
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex items-start">
        <span className="question-number">{index}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <p className="text-lg flex-1">{question.statement}</p>
            <div className="flex items-center gap-4 shrink-0">
              <label className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-success" />
                <span className="text-sm font-medium">True</span>
              </label>
              <label className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-destructive" />
                <span className="text-sm font-medium">False</span>
              </label>
            </div>
          </div>
          <span className="text-sm text-muted-foreground mt-2 block">
            [{question.marks} mark{question.marks > 1 ? 's' : ''}]
          </span>
        </div>
      </div>
    </div>
  );
}
