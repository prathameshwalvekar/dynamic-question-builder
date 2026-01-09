import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionPaper } from '@/types/question';

interface PaperHeaderProps {
  paper: QuestionPaper;
  onUpdate: (paper: Partial<QuestionPaper>) => void;
}

export function PaperHeader({ paper, onUpdate }: PaperHeaderProps) {
  return (
    <Card className="border-2 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-serif">Paper Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Paper Title</Label>
          <Input 
            value={paper.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Half Yearly Examination"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input 
              value={paper.subject}
              onChange={(e) => onUpdate({ subject: e.target.value })}
              placeholder="English"
            />
          </div>
          <div className="space-y-2">
            <Label>Class</Label>
            <Input 
              value={paper.class}
              onChange={(e) => onUpdate({ class: e.target.value })}
              placeholder="Class 5"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Duration</Label>
            <Input 
              value={paper.duration}
              onChange={(e) => onUpdate({ duration: e.target.value })}
              placeholder="2 Hours"
            />
          </div>
          <div className="space-y-2">
            <Label>Total Marks</Label>
            <Input 
              type="number"
              value={paper.totalMarks}
              onChange={(e) => onUpdate({ totalMarks: parseInt(e.target.value) || 0 })}
              placeholder="100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Instructions (one per line)</Label>
          <Textarea 
            value={paper.instructions.join('\n')}
            onChange={(e) => onUpdate({ instructions: e.target.value.split('\n').filter(i => i.trim()) })}
            placeholder="All questions are compulsory.&#10;Write neatly and legibly."
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
