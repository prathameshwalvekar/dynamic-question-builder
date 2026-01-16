import { WordSearchQuestion } from '@/types/question';
import { generateWordSearchGrid } from '@/utils/wordSearchGenerator';
import { useMemo } from 'react';

interface WordSearchPreviewProps {
  question: WordSearchQuestion;
  index: number;
}

export function WordSearchPreview({ question, index }: WordSearchPreviewProps) {
  const grid = useMemo(() => 
    generateWordSearchGrid(question.words, question.gridSize),
    [question.words, question.gridSize]
  );

  return (
    <div className="mb-8 animate-fade-in">
      <div className="text-sm font-semibold text-primary mb-2">Word Search</div>
      <div className="flex items-start mb-4">
        <span className="question-number">{index}</span>
        <div className="flex-1">
          <p className="text-lg font-medium mb-2">
            {question.instructions || 'Find the hidden words in the grid below:'}
          </p>
          <span className="text-sm text-muted-foreground">
            [{question.marks} mark{question.marks > 1 ? 's' : ''}]
          </span>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        {/* Grid */}
        <div 
          className="inline-grid gap-0 border-2 border-puzzle-grid rounded-lg overflow-hidden shadow-md"
          style={{ 
            gridTemplateColumns: `repeat(${question.gridSize}, 2.5rem)` 
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="puzzle-grid-cell bg-card"
              >
                {cell}
              </div>
            ))
          )}
        </div>

        {/* Word List */}
        <div className="bg-secondary/50 rounded-lg p-4 min-w-[200px]">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
            Words to Find
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {question.words.map((word, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 text-sm"
              >
                <span className="w-4 h-4 border-2 border-muted-foreground/40 rounded" />
                <span className="font-medium">{word}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
