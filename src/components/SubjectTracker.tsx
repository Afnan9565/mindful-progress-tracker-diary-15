
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Book } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/lib/toast';
import { motion } from 'framer-motion';

interface Subject {
  id: string;
  name: string;
  description: string;
  milestones: Milestone[];
  color: string;
}

interface Milestone {
  id: string;
  text: string;
  date: Date;
  completed: boolean;
}

const COLORS = [
  'bg-lavender-100 text-lavender-800 border-lavender-300',
  'bg-softBlue-100 text-softBlue-800 border-softBlue-300',
  'bg-green-100 text-green-800 border-green-300',
  'bg-amber-100 text-amber-800 border-amber-300',
  'bg-rose-100 text-rose-800 border-rose-300',
];

const SubjectTracker: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({ name: '', description: '' });
  const [newMilestone, setNewMilestone] = useState({ subjectId: '', text: '' });
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addSubject = () => {
    if (newSubject.name) {
      const colorIndex = subjects.length % COLORS.length;
      const subject: Subject = {
        id: Date.now().toString(),
        name: newSubject.name,
        description: newSubject.description,
        milestones: [],
        color: COLORS[colorIndex],
      };
      setSubjects([...subjects, subject]);
      setNewSubject({ name: '', description: '' });
      setIsDialogOpen(false);
      toast.success('Subject added successfully!');
    }
  };

  const addMilestone = (subjectId: string) => {
    if (newMilestone.text && subjectId) {
      const updatedSubjects = subjects.map(subject => {
        if (subject.id === subjectId) {
          const milestone: Milestone = {
            id: Date.now().toString(),
            text: newMilestone.text,
            date: new Date(),
            completed: false,
          };
          return {
            ...subject,
            milestones: [...subject.milestones, milestone],
          };
        }
        return subject;
      });
      setSubjects(updatedSubjects);
      setNewMilestone({ subjectId: '', text: '' });
      setIsAddingMilestone(false);
      toast.success('Milestone added!');
    }
  };

  const toggleMilestoneCompletion = (subjectId: string, milestoneId: string) => {
    const updatedSubjects = subjects.map(subject => {
      if (subject.id === subjectId) {
        const updatedMilestones = subject.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });
        return { ...subject, milestones: updatedMilestones };
      }
      return subject;
    });
    setSubjects(updatedSubjects);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold gradient-text">Subject Milestones</h2>
            <p className="text-gray-600 mt-2">Track your learning milestones for each subject</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-lavender-500 hover:bg-lavender-600">
                <Plus className="mr-2 h-4 w-4" /> Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Subject</DialogTitle>
                <DialogDescription>
                  Create a new subject to track your learning milestones
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject-name">Subject Name</Label>
                  <Input
                    id="subject-name"
                    placeholder="Enter subject name"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    className="input-focus"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject-description">Description</Label>
                  <Textarea
                    id="subject-description"
                    placeholder="Brief description of the subject"
                    value={newSubject.description}
                    onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                    className="resize-none input-focus"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={addSubject} disabled={!newSubject.name}>Add Subject</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {subjects.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
            <Book className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-gray-700">No subjects yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto mt-2">
              Start by adding your first subject to track your milestones and progress
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)} 
              className="mt-6 bg-lavender-500 hover:bg-lavender-600"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Your First Subject
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {subjects.map((subject) => (
              <motion.div 
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="card-shadow h-full">
                  <CardHeader className={`pb-2 ${subject.color.split(' ')[0]}`}>
                    <CardTitle className="flex justify-between items-center">
                      <span>{subject.name}</span>
                      <Badge variant="outline" className={subject.color}>
                        {subject.milestones.filter(m => m.completed).length}/{subject.milestones.length} Completed
                      </Badge>
                    </CardTitle>
                    <CardDescription>{subject.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wider mb-4">Milestones</h4>
                    
                    {subject.milestones.length === 0 ? (
                      <p className="text-gray-400 text-center py-4">No milestones added yet</p>
                    ) : (
                      <ul className="space-y-3">
                        {subject.milestones.map((milestone) => (
                          <li 
                            key={milestone.id} 
                            className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50"
                          >
                            <div className="flex-shrink-0">
                              <input
                                type="checkbox"
                                checked={milestone.completed}
                                onChange={() => toggleMilestoneCompletion(subject.id, milestone.id)}
                                className="rounded text-lavender-500 focus:ring-lavender-500 h-5 w-5"
                              />
                            </div>
                            <div className={`flex-1 ${milestone.completed ? 'line-through text-gray-400' : ''}`}>
                              {milestone.text}
                              <div className="text-xs text-gray-400 mt-1">
                                Added on {milestone.date.toLocaleDateString()}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {isAddingMilestone && newMilestone.subjectId === subject.id ? (
                      <div className="mt-6 flex flex-col space-y-3">
                        <Input
                          placeholder="Enter milestone"
                          value={newMilestone.text}
                          onChange={(e) => setNewMilestone({ ...newMilestone, text: e.target.value })}
                          className="input-focus"
                        />
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => addMilestone(subject.id)} 
                            disabled={!newMilestone.text}
                            size="sm"
                          >
                            Add
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setIsAddingMilestone(false);
                              setNewMilestone({ subjectId: '', text: '' });
                            }}
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                  
                  <CardFooter className="justify-between border-t pt-4">
                    {!isAddingMilestone ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setIsAddingMilestone(true);
                          setNewMilestone({ subjectId: subject.id, text: '' });
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Milestone
                      </Button>
                    ) : null}
                    
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit Subject
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubjectTracker;
