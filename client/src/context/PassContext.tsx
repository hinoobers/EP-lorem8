import React, { createContext, useContext, useState } from 'react';

export type PassFormData = {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    gender: string;
    country: string;
    city: string;
    language: string;
    languageLevel: string;
    tagline: string;
  };
  workExperience: {
    title: string;
    company: string;
    workType: string;
    startDate: string;
    endDate: string;
    description: string;
    skills: string;
  };
  educationInfo: {
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    description: string;
  };
  skills: {
    technicalSkills?: string[];
    softSkills?: string[];
  };
};

interface PassContextType {
  formData: PassFormData;
  updatePersonalInfo: (data: Partial<PassFormData['personalInfo']>) => void;
  updateWorkExperience: (data: Partial<PassFormData['workExperience']>) => void;
  updateEducationInfo: (data: Partial<PassFormData['educationInfo']>) => void;
  updateSkills: (data: Partial<PassFormData['skills']>) => void;
  resetForm: () => void;
  getFormData: () => PassFormData;
}

const PassContext = createContext<PassContextType | undefined>(undefined);

const defaultFormData: PassFormData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    country: '',
    city: '',
    language: '',
    languageLevel: '',
    tagline: '',
  },
  workExperience: {
    title: '',
    company: '',
    workType: '',
    startDate: '',
    endDate: '',
    description: '',
    skills: '',
  },
  educationInfo: {
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
  },
  skills: {
    technicalSkills: [],
    softSkills: [],
  },
};

export function PassProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<PassFormData>(defaultFormData);

  const updatePersonalInfo = (data: Partial<PassFormData['personalInfo']>) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  const updateWorkExperience = (data: Partial<PassFormData['workExperience']>) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: { ...prev.workExperience, ...data },
    }));
  };

  const updateEducationInfo = (data: Partial<PassFormData['educationInfo']>) => {
    setFormData((prev) => ({
      ...prev,
      educationInfo: { ...prev.educationInfo, ...data },
    }));
  };

  const updateSkills = (data: Partial<PassFormData['skills']>) => {
    setFormData((prev) => ({
      ...prev,
      skills: { ...prev.skills, ...data },
    }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
  };

  const getFormData = () => formData;

  return (
    <PassContext.Provider
      value={{
        formData,
        updatePersonalInfo,
        updateWorkExperience,
        updateEducationInfo,
        updateSkills,
        resetForm,
        getFormData,
      }}
    >
      {children}
    </PassContext.Provider>
  );
}

export function usePassContext() {
  const context = useContext(PassContext);
  if (!context) {
    throw new Error('usePassContext must be used within PassProvider');
  }
  return context;
}
