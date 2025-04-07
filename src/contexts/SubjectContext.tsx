
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Subject {
  id: string;
  name: string;
  description?: string;
}

interface SubjectContextType {
  subjects: Subject[];
  addSubject: (subject: Subject) => void;
  removeSubject: (id: string) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const useSubjects = () => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('useSubjects must be used within a SubjectProvider');
  }
  return context;
};

export const SubjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Mathematics', description: 'Advanced calculus and algebra' },
    { id: '2', name: 'Physics', description: 'Classical mechanics and thermodynamics' },
    { id: '3', name: 'Computer Science', description: 'Data structures and algorithms' },
  ]);

  const addSubject = (subject: Subject) => {
    setSubjects((prevSubjects) => [...prevSubjects, subject]);
  };

  const removeSubject = (id: string) => {
    setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id));
  };

  return (
    <SubjectContext.Provider value={{ subjects, addSubject, removeSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};
