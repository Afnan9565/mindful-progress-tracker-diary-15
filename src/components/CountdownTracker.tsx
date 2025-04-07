
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Check, Trash2 } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger, 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { toast } from '@/lib/toast';

interface Exam {
  id: string;
  name: string;
  date: Date;
}

const CountdownTracker: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [newExamName, setNewExamName] = useState('');
  const [newExamDate, setNewExamDate] = useState<Date | undefined>(undefined);
  const [isAddingExam, setIsAddingExam] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const addExam = () => {
    if (newExamName && newExamDate) {
      const newExam: Exam = {
        id: Date.now().toString(),
        name: newExamName,
        date: newExamDate,
      };
      setExams([...exams, newExam]);
      setNewExamName('');
      setNewExamDate(undefined);
      setIsAddingExam(false);
      toast.success('Exam added successfully!');
    }
  };

  const deleteExam = (id: string) => {
    setExams(exams.filter(exam => exam.id !== id));
    toast.success('Exam deleted successfully!');
  };

  const getCountdown = (date: Date) => {
    const now = new Date();
    const days = differenceInDays(date, now);
    const hours = differenceInHours(date, now) % 24;
    const minutes = differenceInMinutes(date, now) % 60;

    if (days < 0) return 'Exam has passed';
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setNewExamDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold gradient-text">Exam Countdowns</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Keep track of your upcoming exams</p>
          </div>
          
          {!isAddingExam ? (
            <Button 
              onClick={() => setIsAddingExam(true)} 
              className="mt-4 md:mt-0 bg-lavender-500 hover:bg-lavender-600 dark:bg-lavender-600 dark:hover:bg-lavender-700"
              type="button"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Exam
            </Button>
          ) : (
            <motion.div 
              className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2 items-end z-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex-1">
                <Input
                  placeholder="Exam name"
                  value={newExamName}
                  onChange={(e) => setNewExamName(e.target.value)}
                  className="input-focus dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="min-w-[180px] justify-start dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newExamDate ? (
                      format(newExamDate, "PPP")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newExamDate}
                    onSelect={handleDateSelect}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <Button 
                onClick={addExam} 
                disabled={!newExamName || !newExamDate} 
                className="dark:bg-lavender-600 dark:hover:bg-lavender-700"
                type="button"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsAddingExam(false)} 
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                type="button"
              >
                Cancel
              </Button>
            </motion.div>
          )}
        </div>
        
        {exams.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg dark:text-gray-400">
            <p className="text-gray-500 dark:text-gray-400">No exams added yet. Add your first exam to start tracking!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <motion.div 
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="card-hover card-shadow overflow-hidden border-t-4 border-t-lavender-500 dark:bg-gray-800 dark:border-gray-700 dark:border-t-lavender-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold dark:text-gray-200">{exam.name}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteExam(exam.id)} 
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{format(exam.date, "PPP")}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-2">
                      <div className="text-3xl font-bold text-lavender-600 dark:text-lavender-400">
                        {getCountdown(exam.date)}
                      </div>
                      <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-lavender-400 to-lavender-600 dark:from-lavender-500 dark:to-lavender-700 h-2.5 rounded-full" 
                          style={{ 
                            width: `${Math.max(0, Math.min(100, 100 - (differenceInDays(exam.date, new Date()) / 30) * 100))}%` 
                          }}
                        ></div>
                      </div>
                    </div>
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

export default CountdownTracker;
