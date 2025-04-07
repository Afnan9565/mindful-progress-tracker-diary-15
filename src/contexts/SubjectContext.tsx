
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Subject {
  id: string;
  name: string;
  description?: string;
}

interface SubjectContextType {
  subjects: Subject[];
  addSubject: (subject: Subject) => void;
  updateSubject: (id: string, updatedSubject: Partial<Subject>) => void;
  removeSubject: (subjectId: string) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const useSubjects = (): SubjectContextType => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error("useSubjects must be used within a SubjectProvider");
  }
  return context;
};

const LOCAL_STORAGE_KEY = 'studyTrackerSubjects';

export const SubjectProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state from localStorage if available
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    try {
      const storedSubjects = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedSubjects ? JSON.parse(storedSubjects) : [];
    } catch (error) {
      console.error('Error loading subjects from localStorage:', error);
      return [];
    }
  });

  // Save to localStorage whenever subjects change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subjects));
    } catch (error) {
      console.error('Error saving subjects to localStorage:', error);
    }
  }, [subjects]);

  const addSubject = (subject: Subject) => {
    setSubjects((prevSubjects) => [...prevSubjects, subject]);
  };

  const updateSubject = (id: string, updatedSubject: Partial<Subject>) => {
    setSubjects((prevSubjects) => 
      prevSubjects.map((subject) => 
        subject.id === id ? { ...subject, ...updatedSubject } : subject
      )
    );
  };

  const removeSubject = (subjectId: string) => {
    setSubjects((prevSubjects) => prevSubjects.filter(subject => subject.id !== subjectId));
  };

  return (
    <SubjectContext.Provider value={{ subjects, addSubject, updateSubject, removeSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};
