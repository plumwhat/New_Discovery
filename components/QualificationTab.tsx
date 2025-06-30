

import React, { useCallback, useEffect, useMemo } from 'react';
import { QualificationQuestion, QualificationStatus, QualificationSectionState, ModuleQualificationQuestions, TabProps, TabId } from '../types';
import {
    QUALIFICATION_QUESTIONS_BY_MODULE,
    DEFAULT_QUALIFICATION_THRESHOLDS,
    initialQualificationSectionState
} from '../constants/qualificationConstants';
import { ALL_MODULES } from '../constants/moduleConstants';
import RadioGroup from './common/RadioGroup'; // Changed from Select
import Button from './common/Button';
import { evaluateQualificationSection } from '../services/qualificationService';

const QualificationSection: React.FC<{
  title: string;
  questions: QualificationQuestion[];
  sectionState: QualificationSectionState;
  onAnswerChange: (questionId: string, value: number | "") => void;
  onCheckStatus: () => void;
  moduleName?: string; // Optional module name for dynamic question text
  sectionId: string; // For unique heading IDs
}> = ({ title, questions, sectionState, onAnswerChange, onCheckStatus, moduleName, sectionId }) => {

  const getStatusColor = (status: QualificationStatus) => {
    switch (status) {
      case QualificationStatus.QUALIFIED: return "text-green-700 bg-green-100"; // Adjusted for better contrast
      case QualificationStatus.CLARIFICATION_REQUIRED: return "text-yellow-700 bg-yellow-100"; // Adjusted
      case QualificationStatus.NOT_SUITABLE: return "text-red-700 bg-red-100"; // Adjusted
      default: return "text-gray-700 bg-gray-100"; // Adjusted
    }
  };

  return (
    <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
      <h3 id={`${sectionId}-heading`} className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      {questions.map(q => {
        const questionText = moduleName && q.text.includes("[Module Name]")
                           ? q.text.replace(/\[Module Name\]/g, moduleName)
                           : q.text;
        return (
            <div key={q.id} className="mb-6"> {/* Increased margin for radio groups */}
            <RadioGroup
                label={questionText}
                name={`${sectionId}-${q.id}-radio`}
                options={q.options.map(opt => ({ value: opt.value, label: opt.label }))}
                selectedValue={sectionState.answers[q.id] === "" ? undefined : sectionState.answers[q.id]} // Handle empty string for unanswered
                onChange={(value) => onAnswerChange(q.id, value)}
            />
            </div>
        );
      })}
      <div className="mt-6 flex items-center justify-between">
        <Button onClick={onCheckStatus} variant="primary">Check Status</Button>
        <div 
            className={`px-4 py-2 rounded-md text-sm font-medium ${getStatusColor(sectionState.status)}`}
            aria-live="polite" // Announce status and score changes
        >
          Status: {sectionState.status} (Score: {sectionState.score})
        </div>
      </div>
    </div>
  );
};


const QualificationTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { qualitative, quantitative } = appState.qualification; 
  const { selectedModuleId } = appState;
  const tabId = TabId.QUALIFICATION;

  const currentModuleName = useMemo(() => {
    if (!selectedModuleId) return "Selected Module";
    const module = ALL_MODULES.find(m => m.id === selectedModuleId);
    return module ? module.name : "Selected Module";
  }, [selectedModuleId]);

  const {
    qualitative: dynamicQualQualQuestions,
    quantitative: dynamicQualQuantQuestions
  }: ModuleQualificationQuestions = useMemo(() => {
    if (selectedModuleId && QUALIFICATION_QUESTIONS_BY_MODULE[selectedModuleId]) {
      return QUALIFICATION_QUESTIONS_BY_MODULE[selectedModuleId];
    }
    return QUALIFICATION_QUESTIONS_BY_MODULE.default;
  }, [selectedModuleId]);

  useEffect(() => {
    setAppState(prev => ({
      ...prev,
      qualification: {
        ...prev.qualification,
        qualitative: { ...initialQualificationSectionState },
        quantitative: { ...initialQualificationSectionState },
      }
    }));
  }, [selectedModuleId, setAppState]);


  const updateSectionState = useCallback((section: 'qualitative' | 'quantitative', questionId: string, value: number | "") => {
    setAppState(prev => {
      const updatedSection = { ...prev.qualification[section] };
      updatedSection.answers = { ...updatedSection.answers, [questionId]: value };
      // No need to recalculate score/status here, it's done on "Check Status"
      return { ...prev, qualification: { ...prev.qualification, [section]: updatedSection }};
    });
  }, [setAppState]);

  const checkSectionStatus = useCallback((section: 'qualitative' | 'quantitative') => {
    setAppState(prev => {
      const currentSectionState = prev.qualification[section];
      const questionsForSection = section === 'qualitative' ? dynamicQualQualQuestions : dynamicQualQuantQuestions;
      const thresholds = DEFAULT_QUALIFICATION_THRESHOLDS;

      const { score, status } = evaluateQualificationSection(
        currentSectionState.answers,
        questionsForSection,
        thresholds
      );

      return {
        ...prev,
        qualification: {
          ...prev.qualification,
          [section]: {
            ...currentSectionState,
            score,
            status,
          }
        }
      };
    });
  }, [setAppState, dynamicQualQualQuestions, dynamicQualQuantQuestions]);


  if (!selectedModuleId) {
    return (
        <section 
            className="p-6 bg-white shadow rounded-lg text-gray-600"
            role="region"
            aria-labelledby={`${tabId}-placeholder-heading`}
        >
            <h2 id={`${tabId}-placeholder-heading`} className="sr-only">Qualification Information</h2>
            Please select a module first to view module-specific qualification questions.
        </section>
    );
  }

  return (
    <section 
      className="p-6 bg-white shadow rounded-lg"
      role="region"
      aria-labelledby={`${tabId}-heading`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 id={`${tabId}-heading`} className="text-xl font-semibold text-gray-800">Qualification Assessment for {currentModuleName}</h2>
      </div>

      <QualificationSection
        title="Qualitative Assessment"
        questions={dynamicQualQualQuestions}
        sectionState={qualitative}
        onAnswerChange={(qId, val) => updateSectionState('qualitative', qId, val)}
        onCheckStatus={() => checkSectionStatus('qualitative')}
        moduleName={currentModuleName}
        sectionId={`${tabId}-qualitative`}
      />
      <QualificationSection
        title="Quantitative Assessment"
        questions={dynamicQualQuantQuestions}
        sectionState={quantitative}
        onAnswerChange={(qId, val) => updateSectionState('quantitative', qId, val)}
        onCheckStatus={() => checkSectionStatus('quantitative')}
        moduleName={currentModuleName}
        sectionId={`${tabId}-quantitative`}
      />
    </section>
  );
};

export default QualificationTab;