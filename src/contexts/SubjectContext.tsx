import React, { createContext, useContext, useState } from 'react';

export interface Subject {
  id: string;
  name: string;
  description?: string;
}

interface SubjectContextType {
  subjects: Subject[];
  addSubject: (subject: Subject) => void;
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

export const SubjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const addSubject = (subject: Subject) => {
    setSubjects((prevSubjects) => [...prevSubjects, subject]);
  };

  const removeSubject = (subjectId: string) => {
    setSubjects((prevSubjects) => prevSubjects.filter(subject => subject.id !== subjectId));
  };

  return (
    <SubjectContext.Provider value={{ subjects, addSubject, removeSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};
