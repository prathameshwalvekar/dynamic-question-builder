import { useState, useEffect } from 'react';
import { QuestionPaper, Question } from '@/types/question';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Save, FolderOpen, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

// Mock storage for now - replace with actual Convex implementation later
const mockStorage = {
  papers: [] as any[],
  savePaper: async (paper: any) => {
    const newPaper = { ...paper, _id: `paper_${Date.now()}`, createdAt: Date.now() };
    mockStorage.papers.push(newPaper);
    return newPaper._id;
  },
  getPapers: async () => mockStorage.papers,
  getPaper: async (id: string) => mockStorage.papers.find(p => p._id === id),
  deletePaper: async (id: string) => {
    const index = mockStorage.papers.findIndex(p => p._id === id);
    if (index > -1) {
      mockStorage.papers.splice(index, 1);
    }
  }
};

interface PaperManagerProps {
  paper: QuestionPaper;
  questions: Question[];
  onLoadPaper?: (paper: QuestionPaper, questions: Question[]) => void;
}

export function PaperManager({ paper, questions, onLoadPaper }: PaperManagerProps) {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [saveTitle, setSaveTitle] = useState(paper.title || 'Untitled Paper');
  const [saveSubject, setSaveSubject] = useState(paper.subject || '');
  const [saveClass, setSaveClass] = useState(paper.class || '');
  const [saveDuration, setSaveDuration] = useState(paper.duration || '');
  const [saveInstructions, setSaveInstructions] = useState(paper.instructions.join('\n'));
  const [savedPapers, setSavedPapers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    loadSavedPapers();
  }, []);

  const loadSavedPapers = async () => {
    try {
      const papers = await mockStorage.getPapers();
      setSavedPapers(papers);
    } catch (error) {
      console.error('Failed to load papers:', error);
    }
  };

  const handleSavePaper = async () => {
    try {
      setIsLoading(true);
      const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
      const instructions = saveInstructions.split('\n').filter(i => i.trim());
      
      await mockStorage.savePaper({
        title: saveTitle,
        subject: saveSubject || undefined,
        class: saveClass || undefined,
        duration: saveDuration || undefined,
        instructions,
        totalMarks,
        questions: questions.map(q => ({
          id: q.id,
          type: q.type,
          marks: q.marks,
          text: 'text' in q ? q.text : undefined,
          words: 'words' in q ? q.words : undefined,
          gridSize: 'gridSize' in q ? q.gridSize : undefined,
          instructions: 'instructions' in q ? q.instructions : undefined,
          leftColumn: 'leftColumn' in q ? q.leftColumn : undefined,
          rightColumn: 'rightColumn' in q ? q.rightColumn : undefined,
          imageUrl: 'imageUrl' in q ? q.imageUrl : undefined,
          question: 'question' in q ? q.question : undefined,
          options: 'options' in q ? q.options : undefined,
          statement: 'statement' in q ? q.statement : undefined,
          lines: 'lines' in q ? q.lines : undefined,
        })),
      });
      
      toast.success('Question paper saved successfully!');
      setIsSaveDialogOpen(false);
      await loadSavedPapers();
    } catch (error) {
      toast.error('Failed to save question paper');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadPaper = async (paperId: string) => {
    try {
      const paperData = await mockStorage.getPaper(paperId);
      if (paperData && onLoadPaper) {
        const loadedQuestions: Question[] = paperData.questions.map(q => {
          const baseQuestion = {
            id: q.id,
            type: q.type as any,
            marks: q.marks,
          };
          
          if (q.text) return { ...baseQuestion, text: q.text };
          if (q.words) return { ...baseQuestion, words: q.words, gridSize: q.gridSize || 10, instructions: q.instructions || '' };
          if (q.leftColumn) return { ...baseQuestion, leftColumn: q.leftColumn, rightColumn: q.rightColumn || [] };
          if (q.imageUrl) return { ...baseQuestion, imageUrl: q.imageUrl, question: q.question || 'Identify the image below:' };
          if (q.options) return { ...baseQuestion, question: q.question || '', options: q.options };
          if (q.statement) return { ...baseQuestion, statement: q.statement };
          if (q.lines !== undefined) return { ...baseQuestion, question: q.question || '', lines: q.lines };
          
          return baseQuestion;
        });
        
        const loadedPaper: QuestionPaper = {
          title: paperData.title,
          subject: paperData.subject || '',
          class: paperData.class || '',
          duration: paperData.duration || '',
          instructions: paperData.instructions,
          totalMarks: paperData.totalMarks,
          sections: [{
            name: 'Questions',
            questions: loadedQuestions
          }]
        };
        
        onLoadPaper(loadedPaper, loadedQuestions);
        toast.success('Question paper loaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to load question paper');
      console.error(error);
    }
  };

  const handleDeletePaper = async (paperId: string) => {
    try {
      await mockStorage.deletePaper(paperId);
      toast.success('Question paper deleted successfully!');
      await loadSavedPapers();
    } catch (error) {
      toast.error('Failed to delete question paper');
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Save Button */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Question Paper
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Save Question Paper</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
                placeholder="Enter paper title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={saveSubject}
                onChange={(e) => setSaveSubject(e.target.value)}
                placeholder="e.g., Mathematics"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Input
                id="class"
                value={saveClass}
                onChange={(e) => setSaveClass(e.target.value)}
                placeholder="e.g., Grade 10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={saveDuration}
                onChange={(e) => setSaveDuration(e.target.value)}
                placeholder="e.g., 2 hours"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions (one per line)</Label>
              <Textarea
                id="instructions"
                value={saveInstructions}
                onChange={(e) => setSaveInstructions(e.target.value)}
                placeholder="Read all questions carefully&#10;Write clearly&#10;Manage your time"
                className="min-h-[80px]"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSavePaper} className="flex-1">
                Save Paper
              </Button>
              <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Saved Papers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Saved Papers ({savedPapers?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {savedPapers && savedPapers.length > 0 ? (
            <div className="space-y-2">
              {savedPapers.map((savedPaper) => (
                <div
                  key={savedPaper._id}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{savedPaper.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {savedPaper.subject && `${savedPaper.subject} • `}
                      {savedPaper.questions.length} questions • {savedPaper.totalMarks} marks
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(savedPaper.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLoadPaper(savedPaper._id)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Load
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeletePaper(savedPaper._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No saved papers yet. Save your first paper to see it here.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
