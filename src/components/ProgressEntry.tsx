
import React, { useState, useEffect } from 'react';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon, Book, Check, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useSubjects } from '@/contexts/SubjectContext';

interface Subject {
  id: string;
  name: string;
}

interface ProgressEntry {
  id: string;
  date: Date;
  subjectId: string;
  subjectName: string;
  hoursSpent: number;
  progressPercentage: number;
  notes: string;
}

const PROGRESS_ENTRIES_STORAGE_KEY = 'studyTrackerProgressEntries';

const ProgressEntry: React.FC = () => {
  const { subjects } = useSubjects();
  
  // Initialize entries from localStorage
  const [entries, setEntries] = useState<ProgressEntry[]>(() => {
    try {
      const storedEntries = localStorage.getItem(PROGRESS_ENTRIES_STORAGE_KEY);
      if (storedEntries) {
        const parsedEntries = JSON.parse(storedEntries);
        return parsedEntries.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading progress entries from localStorage:', error);
      return [];
    }
  });

  const [showEntryForm, setShowEntryForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSubject, setSelectedSubject] = useState('');
  const [hoursSpent, setHoursSpent] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(50);
  const [notes, setNotes] = useState('');
  
  // Save entries to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_ENTRIES_STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving progress entries to localStorage:', error);
    }
  }, [entries]);
  
  const handleSubmit = () => {
    if (!selectedSubject) {
      toast.error('Please select a subject');
      return;
    }
    
    const subjectName = subjects.find(s => s.id === selectedSubject)?.name || '';
    
    const newEntry: ProgressEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      subjectId: selectedSubject,
      subjectName,
      hoursSpent,
      progressPercentage,
      notes,
    };
    
    setEntries([...entries, newEntry]);
    toast.success('Progress entry added successfully!');
    
    setSelectedSubject('');
    setHoursSpent(1);
    setProgressPercentage(50);
    setNotes('');
    setShowEntryForm(false);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success('Progress entry deleted successfully!');
  };
  
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold gradient-text">Daily Progress</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Track your daily study progress</p>
          </div>
          
          <Button 
            onClick={() => setShowEntryForm(!showEntryForm)}
            className="mt-4 md:mt-0 bg-lavender-500 hover:bg-lavender-600 dark:bg-lavender-600 dark:hover:bg-lavender-700"
            type="button"
          >
            {showEntryForm ? 'Cancel' : '+ Add Progress Entry'}
          </Button>
        </div>
        
        {showEntryForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-gray-200">Add New Progress Entry</CardTitle>
                <CardDescription className="dark:text-gray-400">Record your study progress for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="dark:text-gray-300">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                          type="button"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => setSelectedDate(date || new Date())}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="dark:text-gray-300">Subject</Label>
                    <Select 
                      value={selectedSubject} 
                      onValueChange={setSelectedSubject}
                    >
                      <SelectTrigger className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id} className="dark:text-gray-200 dark:focus:bg-gray-700">
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hours" className="dark:text-gray-300">Hours Spent</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="hours"
                        type="number"
                        min={0}
                        max={24}
                        value={hoursSpent}
                        onChange={(e) => setHoursSpent(Number(e.target.value))}
                        className="w-20 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                      />
                      <span className="text-gray-500 dark:text-gray-400">hours</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="progress" className="dark:text-gray-300">Progress Made ({progressPercentage}%)</Label>
                    <Slider
                      id="progress"
                      min={0}
                      max={100}
                      step={5}
                      value={[progressPercentage]}
                      onValueChange={(value) => setProgressPercentage(value[0])}
                      className="py-4"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes" className="dark:text-gray-300">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="What did you accomplish today? Any challenges?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[100px] resize-none dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowEntryForm(false)} 
                  className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="dark:bg-lavender-600 dark:hover:bg-lavender-700"
                  type="button"
                >
                  <Check className="mr-2 h-4 w-4" /> Save Entry
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
        
        {entries.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
            <Book className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">No progress entries yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-2">
              At the end of each study day, record your progress to keep track of your journey
            </p>
            <Button 
              onClick={() => setShowEntryForm(true)} 
              className="mt-6 bg-lavender-500 hover:bg-lavender-600 dark:bg-lavender-600 dark:hover:bg-lavender-700"
              type="button"
            >
              + Add Your First Entry
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {entries.map((entry, index) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="card-hover dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl dark:text-gray-200">{entry.subjectName}</CardTitle>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{format(entry.date, "PP")}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteEntry(entry.id)} 
                          className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                          type="button"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Hours Spent</h4>
                        <p className="text-2xl font-bold dark:text-gray-200">{entry.hoursSpent}h</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Progress</h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-gradient-to-r from-lavender-400 to-lavender-600 dark:from-lavender-500 dark:to-lavender-700 h-2.5 rounded-full" 
                              style={{ width: `${entry.progressPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium dark:text-gray-300">{entry.progressPercentage}%</span>
                        </div>
                      </div>
                      <div className="md:text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                          type="button"
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </div>
                    </div>
                    
                    {entry.notes && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Notes</h4>
                        <p className="text-gray-600 dark:text-gray-300">{entry.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgressEntry;
