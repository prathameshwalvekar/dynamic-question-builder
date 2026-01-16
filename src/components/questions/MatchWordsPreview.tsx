import { MatchWordsQuestion } from '@/types/question';
import { useMemo } from 'react';

interface MatchWordsPreviewProps {
  question: MatchWordsQuestion;
  index: number;
}

export function MatchWordsPreview({ question, index }: MatchWordsPreviewProps) {
  // Shuffle right column for display
  const shuffledRight = useMemo(() => {
    const shuffled = [...question.rightColumn];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [question.rightColumn]);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div className="mb-8 animate-fade-in">
      <div className="text-sm font-semibold text-primary mb-2">Match Words</div>
      <div className="flex items-start mb-4">
        <span className="question-number">{index}</span>
        <div className="flex-1">
          <p className="text-lg font-medium mb-2">
            Match the following by drawing lines to connect related items:
          </p>
          <span className="text-sm text-muted-foreground">
            [{question.marks} mark{question.marks > 1 ? 's' : ''}]
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-[1fr_80px_1fr] gap-4 items-start max-w-2xl w-full">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="text-center font-semibold text-sm uppercase tracking-wide text-muted-foreground pb-2 border-b">
              Column A
            </div>
            {question.leftColumn.map((item, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 p-3 bg-card rounded-lg border shadow-sm"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Connection Area */}
          <div className="flex flex-col items-center justify-center h-full pt-10">
            {question.leftColumn.map((_, i) => (
              <div key={i} className="flex-1 flex items-center w-full">
                <div className="match-connector w-full" />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="text-center font-semibold text-sm uppercase tracking-wide text-muted-foreground pb-2 border-b">
              Column B
            </div>
            {shuffledRight.map((item, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 p-3 bg-card rounded-lg border shadow-sm"
              >
                <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {letters[i]}
                </span>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Answer space */}
      <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
        <p className="text-sm font-medium text-muted-foreground mb-2">Your Answers:</p>
        <div className="flex flex-wrap gap-4">
          {question.leftColumn.map((_, i) => (
            <span key={i} className="text-sm">
              {i + 1} → <span className="blank-line inline-block min-w-[40px]" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
