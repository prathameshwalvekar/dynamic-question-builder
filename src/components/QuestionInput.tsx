import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Upload } from 'lucide-react';
import { Question, QuestionType } from '@/types/question';

interface QuestionInputProps {
  onAddQuestion: (question: Question) => void;
}

export function QuestionInput({ onAddQuestion }: QuestionInputProps) {
  const [type, setType] = useState<QuestionType>('fill-blank');
  const [marks, setMarks] = useState(1);
  
  // Fill blank
  const [fillBlankText, setFillBlankText] = useState('');
  
  // Word search
  const [words, setWords] = useState<string[]>(['']);
  const [gridSize, setGridSize] = useState(10);
  const [wsInstructions, setWsInstructions] = useState('');
  
  // Match words
  const [leftColumn, setLeftColumn] = useState<string[]>(['']);
  const [rightColumn, setRightColumn] = useState<string[]>(['']);
  
  // Identify image
  const [imageUrl, setImageUrl] = useState('');
  const [imageQuestion, setImageQuestion] = useState('');
  
  // Multiple choice
  const [mcQuestion, setMcQuestion] = useState('');
  const [mcOptions, setMcOptions] = useState<string[]>(['', '', '', '']);
  
  // True/False
  const [tfStatement, setTfStatement] = useState('');

  const handleAddQuestion = () => {
    const id = crypto.randomUUID();
    
    switch (type) {
      case 'fill-blank':
        if (!fillBlankText.trim()) return;
        onAddQuestion({
          id,
          type: 'fill-blank',
          text: fillBlankText,
          marks,
        });
        setFillBlankText('');
        break;
        
      case 'word-search':
        const validWords = words.filter(w => w.trim());
        if (validWords.length === 0) return;
        onAddQuestion({
          id,
          type: 'word-search',
          words: validWords,
          gridSize,
          instructions: wsInstructions,
          marks,
        });
        setWords(['']);
        setWsInstructions('');
        break;
        
      case 'match-words':
        const validLeft = leftColumn.filter(l => l.trim());
        const validRight = rightColumn.filter(r => r.trim());
        if (validLeft.length === 0 || validLeft.length !== validRight.length) return;
        onAddQuestion({
          id,
          type: 'match-words',
          leftColumn: validLeft,
          rightColumn: validRight,
          marks,
        });
        setLeftColumn(['']);
        setRightColumn(['']);
        break;
        
      case 'identify-image':
        if (!imageUrl.trim()) return;
        onAddQuestion({
          id,
          type: 'identify-image',
          imageUrl,
          question: imageQuestion || 'Identify the image below:',
          marks,
        });
        setImageUrl('');
        setImageQuestion('');
        break;
        
      case 'multiple-choice':
        const validOptions = mcOptions.filter(o => o.trim());
        if (!mcQuestion.trim() || validOptions.length < 2) return;
        onAddQuestion({
          id,
          type: 'multiple-choice',
          question: mcQuestion,
          options: validOptions,
          marks,
        });
        setMcQuestion('');
        setMcOptions(['', '', '', '']);
        break;
        
      case 'true-false':
        if (!tfStatement.trim()) return;
        onAddQuestion({
          id,
          type: 'true-false',
          statement: tfStatement,
          marks,
        });
        setTfStatement('');
        break;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-serif">Add Question</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Question Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as QuestionType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
                <SelectItem value="word-search">Word Search Puzzle</SelectItem>
                <SelectItem value="match-words">Match the Words</SelectItem>
                <SelectItem value="identify-image">Identify Image</SelectItem>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="true-false">True/False</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Marks</Label>
            <Input 
              type="number" 
              min={1} 
              value={marks}
              onChange={(e) => setMarks(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>

        {/* Fill Blank */}
        {type === 'fill-blank' && (
          <div className="space-y-2">
            <Label>Question Text (use ___ for blanks)</Label>
            <Textarea 
              value={fillBlankText}
              onChange={(e) => setFillBlankText(e.target.value)}
              placeholder="The capital of France is ___."
              className="min-h-[80px]"
            />
          </div>
        )}

        {/* Word Search */}
        {type === 'word-search' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Instructions (optional)</Label>
              <Input 
                value={wsInstructions}
                onChange={(e) => setWsInstructions(e.target.value)}
                placeholder="Find the hidden animals in the grid"
              />
            </div>
            <div className="space-y-2">
              <Label>Grid Size ({gridSize}x{gridSize})</Label>
              <Input 
                type="range" 
                min={8} 
                max={15}
                value={gridSize}
                onChange={(e) => setGridSize(parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Words to Hide</Label>
              {words.map((word, i) => (
                <div key={i} className="flex gap-2">
                  <Input 
                    value={word}
                    onChange={(e) => {
                      const newWords = [...words];
                      newWords[i] = e.target.value;
                      setWords(newWords);
                    }}
                    placeholder={`Word ${i + 1}`}
                  />
                  {words.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setWords(words.filter((_, idx) => idx !== i))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setWords([...words, ''])}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Word
              </Button>
            </div>
          </div>
        )}

        {/* Match Words */}
        {type === 'match-words' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Column A (Left)</Label>
                {leftColumn.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <Input 
                      value={item}
                      onChange={(e) => {
                        const newLeft = [...leftColumn];
                        newLeft[i] = e.target.value;
                        setLeftColumn(newLeft);
                      }}
                      placeholder={`Item ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label>Column B (Right)</Label>
                {rightColumn.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <Input 
                      value={item}
                      onChange={(e) => {
                        const newRight = [...rightColumn];
                        newRight[i] = e.target.value;
                        setRightColumn(newRight);
                      }}
                      placeholder={`Match ${i + 1}`}
                    />
                    {leftColumn.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setLeftColumn(leftColumn.filter((_, idx) => idx !== i));
                          setRightColumn(rightColumn.filter((_, idx) => idx !== i));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setLeftColumn([...leftColumn, '']);
                setRightColumn([...rightColumn, '']);
              }}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Pair
            </Button>
          </div>
        )}

        {/* Identify Image */}
        {type === 'identify-image' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Question</Label>
              <Input 
                value={imageQuestion}
                onChange={(e) => setImageQuestion(e.target.value)}
                placeholder="What animal is shown in the image?"
              />
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <div className="flex gap-2 items-center">
                <Input 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste image URL or upload"
                  className="flex-1"
                />
                <Label className="cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button variant="outline" size="icon" asChild>
                    <span><Upload className="h-4 w-4" /></span>
                  </Button>
                </Label>
              </div>
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="max-h-32 rounded border"
                />
              )}
            </div>
          </div>
        )}

        {/* Multiple Choice */}
        {type === 'multiple-choice' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Question</Label>
              <Input 
                value={mcQuestion}
                onChange={(e) => setMcQuestion(e.target.value)}
                placeholder="What is the largest planet?"
              />
            </div>
            <div className="space-y-2">
              <Label>Options</Label>
              {mcOptions.map((option, i) => (
                <Input 
                  key={i}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...mcOptions];
                    newOptions[i] = e.target.value;
                    setMcOptions(newOptions);
                  }}
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* True/False */}
        {type === 'true-false' && (
          <div className="space-y-2">
            <Label>Statement</Label>
            <Textarea 
              value={tfStatement}
              onChange={(e) => setTfStatement(e.target.value)}
              placeholder="The sun rises in the west."
              className="min-h-[80px]"
            />
          </div>
        )}

        <Button onClick={handleAddQuestion} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Question
        </Button>
      </CardContent>
    </Card>
  );
}
