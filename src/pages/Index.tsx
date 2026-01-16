import { useState } from 'react';
import { Question, QuestionPaper } from '@/types/question';
import { QuestionInput } from '@/components/QuestionInput';
import { PaperHeader } from '@/components/PaperHeader';
import { QuestionList } from '@/components/QuestionList';
import { PaperPreview } from '@/components/PaperPreview';
import { PaperManager } from '@/components/PaperManager';
import { FileText, Sparkles } from 'lucide-react';

const Index = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [paper, setPaper] = useState<QuestionPaper>({
    title: 'Half Yearly Examination',
    subject: 'General Knowledge',
    class: 'Class 5',
    duration: '2 Hours',
    totalMarks: 50,
    instructions: [
      'All questions are compulsory.',
      'Write neatly and legibly.',
      'Read each question carefully before answering.',
    ],
    sections: [],
  });

  const handleAddQuestion = (question: Question) => {
    setQuestions(prev => [...prev, question]);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleReorderQuestions = (reorderedQuestions: Question[]) => {
    setQuestions(reorderedQuestions);
  };

  const handleUpdatePaper = (updates: Partial<QuestionPaper>) => {
    setPaper(prev => ({ ...prev, ...updates }));
  };

  const handleLoadPaper = (loadedPaper: QuestionPaper, loadedQuestions: Question[]) => {
    setPaper(loadedPaper);
    setQuestions(loadedQuestions);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-50 no-print">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">
                Question Paper Generator
              </h1>
              <p className="text-sm text-muted-foreground">
                Create beautiful, printable question papers with ease
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>{questions.length} questions</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6 no-print">
            <PaperHeader paper={paper} onUpdate={handleUpdatePaper} />
            <QuestionInput onAddQuestion={handleAddQuestion} />
            <QuestionList questions={questions} onRemove={handleRemoveQuestion} onReorder={handleReorderQuestions} />
            <PaperManager paper={paper} questions={questions} onLoadPaper={handleLoadPaper} />
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-xl font-serif font-semibold mb-4 no-print">Paper Preview</h2>
            <PaperPreview paper={paper} questions={questions} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-6 mt-12 no-print">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Question Paper Generator • Create exam papers with various question types</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
