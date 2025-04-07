
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Subject {
  id: string;
  name: string;
  description?: string;
}

interface SubjectContextType {
  subjects: Subject[];
  addSubject: (subject: Subject) => void;
  removeSubject: (id: string) => void;
  updateSubject: (subject: Subject) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const useSubjects = () => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('useSubjects must be used within a SubjectProvider');
  }
  return context;
};

// LocalStorage key
const SUBJECTS_STORAGE_KEY = 'mindful_progress_subjects';

export const SubjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or use default data
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const savedSubjects = localStorage.getItem(SUBJECTS_STORAGE_KEY);
    return savedSubjects 
      ? JSON.parse(savedSubjects) 
      : [
          { id: '1', name: 'Mathematics', description: 'Advanced calculus and algebra' },
          { id: '2', name: 'Physics', description: 'Classical mechanics and thermodynamics' },
          { id: '3', name: 'Computer Science', description: 'Data structures and algorithms' },
        ];
  });

  // Save to localStorage whenever subjects change
  useEffect(() => {
    localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = (subject: Subject) => {
    setSubjects((prevSubjects) => [...prevSubjects, subject]);
  };

  const removeSubject = (id: string) => {
    setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id));
  };

  const updateSubject = (updatedSubject: Subject) => {
    setSubjects((prevSubjects) => 
      prevSubjects.map((subject) => 
        subject.id === updatedSubject.id ? updatedSubject : subject
      )
    );
  };

  return (
    <SubjectContext.Provider value={{ subjects, addSubject, removeSubject, updateSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};
