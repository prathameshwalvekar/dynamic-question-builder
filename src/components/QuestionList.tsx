import { Question } from '@/types/question';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, GripVertical } from 'lucide-react';

interface QuestionListProps {
  questions: Question[];
  onRemove: (id: string) => void;
}

const questionTypeLabels: Record<string, string> = {
  'fill-blank': 'Fill in the Blank',
  'word-search': 'Word Search',
  'match-words': 'Match Words',
  'identify-image': 'Identify Image',
  'multiple-choice': 'Multiple Choice',
  'true-false': 'True/False',
};

export function QuestionList({ questions, onRemove }: QuestionListProps) {
  if (questions.length === 0) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="py-8 text-center text-muted-foreground">
          <p>No questions added yet.</p>
          <p className="text-sm">Add questions using the form above.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-serif">
          Added Questions ({questions.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {questions.map((q, index) => (
          <div 
            key={q.id}
            className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg group animate-scale-in"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground/50" />
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{questionTypeLabels[q.type]}</p>
              <p className="text-xs text-muted-foreground truncate">
                {getQuestionPreview(q)}
              </p>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {q.marks} mark{q.marks > 1 ? 's' : ''}
            </span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onRemove(q.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function getQuestionPreview(q: Question): string {
  switch (q.type) {
    case 'fill-blank':
      return q.text.slice(0, 50) + (q.text.length > 50 ? '...' : '');
    case 'word-search':
      return `${q.words.length} words in ${q.gridSize}x${q.gridSize} grid`;
    case 'match-words':
      return `${q.leftColumn.length} pairs to match`;
    case 'identify-image':
      return q.question;
    case 'multiple-choice':
      return q.question.slice(0, 50) + (q.question.length > 50 ? '...' : '');
    case 'true-false':
      return q.statement.slice(0, 50) + (q.statement.length > 50 ? '...' : '');
    default:
      return '';
  }
}
