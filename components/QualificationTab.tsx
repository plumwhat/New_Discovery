

import React, { useCallback } from 'react';
import { TabProps, QualificationQuestion, QualificationStatus, QualificationSectionState } from '../types';
import { 
    QUALIFICATION_QUESTIONS_QUALITATIVE, 
    QUALIFICATION_QUESTIONS_QUANTITATIVE, 
    DEFAULT_QUALIFICATION_THRESHOLDS 
} from '../constants';
import Select from './common/Select';
import Button from './common/Button';
// Removed: import AdminSettingsPanel from './QualificationAdminSettingsPanel';
// Removed: import { useEditableData } from '../hooks/useEditableData';

const QualificationSection: React.FC<{
  title: string;
  questions: QualificationQuestion[];
  sectionState: QualificationSectionState;
  onAnswerChange: (questionId: string, value: number | "") => void;
  onCheckStatus: () => void;
  thresholds: { qualified: number; clarification: number };
}> = ({ title, questions, sectionState, onAnswerChange, onCheckStatus, thresholds }) => {
  
  const getStatusColor = (status: QualificationStatus) => {
    switch (status) {
      case QualificationStatus.QUALIFIED: return "text-green-600 bg-green-100";
      case QualificationStatus.CLARIFICATION_REQUIRED: return "text-yellow-600 bg-yellow-100";
      case QualificationStatus.NOT_SUITABLE: return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      {questions.map(q => (
        <div key={q.id} className="mb-4">
          <Select
            label={q.text}
            id={`${title.toLowerCase().replace(/\s/g, '-')}-${q.id}`}
            value={sectionState.answers[q.id] || ""}
            onChange={(e) => onAnswerChange(q.id, e.target.value === "" ? "" : parseInt(e.target.value))}
            options={q.options.map(opt => ({ value: opt.value, label: opt.label }))}
            placeholder="Select an option"
          />
        </div>
      ))}
      <div className="mt-6 flex items-center justify-between">
        <Button onClick={onCheckStatus} variant="primary">Check Status</Button>
        <div className={`px-4 py-2 rounded-md text-sm font-medium ${getStatusColor(sectionState.status)}`}>
          Status: {sectionState.status} (Score: {sectionState.score})
        </div>
      </div>
    </div>
  );
};


const QualificationTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { qualitative, quantitative, adminSettings, showAdminSettings } = appState.qualification;

  // Use static constants directly
  const dynamicQualQualQuestions = QUALIFICATION_QUESTIONS_QUALITATIVE;
  const dynamicQualQuantQuestions = QUALIFICATION_QUESTIONS_QUANTITATIVE;


  const updateSectionState = useCallback((section: 'qualitative' | 'quantitative', questionId: string, value: number | "") => {
    setAppState(prev => {
      const updatedSection = { ...prev.qualification[section] };
      updatedSection.answers = { ...updatedSection.answers, [questionId]: value };
      return { ...prev, qualification: { ...prev.qualification, [section]: updatedSection }};
    });
  }, [setAppState]);

  const checkSectionStatus = useCallback((section: 'qualitative' | 'quantitative') => {
    setAppState(prev => {
      const currentSection = prev.qualification[section];
      const questions = section === 'qualitative' ? dynamicQualQualQuestions : dynamicQualQuantQuestions;
      let score = 0;
      questions.forEach(q => {
        const answerVal = currentSection.answers[q.id];
        if (typeof answerVal === 'number') {
          score += answerVal;
        }
      });

      let status: QualificationStatus;
      // Use hardcoded default thresholds or values from appState.qualification.adminSettings.thresholds
      // For now, assuming the built-in adminSettings functionality for thresholds can remain if desired by user,
      // as it doesn't use useEditableData or localStorage for thresholds.
      // If user wants even this "Admin Settings" button removed, the thresholds should be hardcoded here.
      // Based on "remove the admin ability in the Qualification tab", this button & panel should go.
      // So, using DEFAULT_QUALIFICATION_THRESHOLDS.
      if (score > DEFAULT_QUALIFICATION_THRESHOLDS.qualified) {
        status = QualificationStatus.QUALIFIED;
      } else if (score > DEFAULT_QUALIFICATION_THRESHOLDS.clarification) {
        status = QualificationStatus.CLARIFICATION_REQUIRED;
      } else {
        status = QualificationStatus.NOT_SUITABLE;
      }
      
      return {
        ...prev,
        qualification: {
          ...prev.qualification,
          [section]: {
            ...currentSection,
            score,
            status,
          }
        }
      };
    });
  }, [setAppState, dynamicQualQualQuestions, dynamicQualQuantQuestions]); // Removed adminSettings.thresholds dependency

  // Removed handleAdminSettingsSave, handleRestoreDefaults, toggleAdminSettings


  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Qualification Assessment</h2>
        {/* Removed Admin Settings button */}
      </div>

      {/* Removed AdminSettingsPanel rendering */}

      <QualificationSection
        title="Qualitative Assessment"
        questions={dynamicQualQualQuestions}
        sectionState={qualitative}
        onAnswerChange={(qId, val) => updateSectionState('qualitative', qId, val)}
        onCheckStatus={() => checkSectionStatus('qualitative')}
        thresholds={DEFAULT_QUALIFICATION_THRESHOLDS} // Use default or appState.qualification.adminSettings.thresholds
      />
      <QualificationSection
        title="Quantitative Assessment"
        questions={dynamicQualQuantQuestions}
        sectionState={quantitative}
        onAnswerChange={(qId, val) => updateSectionState('quantitative', qId, val)}
        onCheckStatus={() => checkSectionStatus('quantitative')}
        thresholds={DEFAULT_QUALIFICATION_THRESHOLDS} // Use default or appState.qualification.adminSettings.thresholds
      />
    </div>
  );
};

export default QualificationTab;