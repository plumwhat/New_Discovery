

import React, { useCallback, useEffect, useMemo } from 'react';
import { QualificationQuestion, QualificationStatus, QualificationSectionState, ModuleQualificationQuestions, TabProps } from '../types';
import { 
    QUALIFICATION_QUESTIONS_BY_MODULE, 
    DEFAULT_QUALIFICATION_THRESHOLDS,
    ALL_MODULES, // Import ALL_MODULES to get module name
    initialQualificationSectionState
} from '../constants';
import Select from './common/Select';
import Button from './common/Button';

const QualificationSection: React.FC<{
  title: string;
  questions: QualificationQuestion[];
  sectionState: QualificationSectionState;
  onAnswerChange: (questionId: string, value: number | "") => void;
  onCheckStatus: () => void;
  moduleName?: string; // Optional module name for dynamic question text
}> = ({ title, questions, sectionState, onAnswerChange, onCheckStatus, moduleName }) => {
  
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
      {questions.map(q => {
        // Replace placeholder in question text if moduleName is provided
        const questionText = moduleName && q.text.includes("[Module Name]") 
                           ? q.text.replace(/\[Module Name\]/g, moduleName) 
                           : q.text;
        return (
            <div key={q.id} className="mb-4">
            <Select
                label={questionText}
                id={`${title.toLowerCase().replace(/\s/g, '-')}-${q.id}`}
                value={sectionState.answers[q.id] || ""}
                onChange={(e) => onAnswerChange(q.id, e.target.value === "" ? "" : parseInt(e.target.value))}
                options={q.options.map(opt => ({ value: opt.value, label: opt.label }))}
                placeholder="Select an option"
            />
            </div>
        );
      })}
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
  const { qualitative, quantitative } = appState.qualification;
  const { selectedModuleId } = appState;

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

  // Reset qualification answers when module changes
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
      // Do not recalculate score/status here, let Check Status button do it
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
      // Using default thresholds for now, can be made dynamic later if needed
      if (score >= DEFAULT_QUALIFICATION_THRESHOLDS.qualified) {
        status = QualificationStatus.QUALIFIED;
      } else if (score >= DEFAULT_QUALIFICATION_THRESHOLDS.clarification) {
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
  }, [setAppState, dynamicQualQualQuestions, dynamicQualQuantQuestions]);


  if (!selectedModuleId) {
    return (
        <div className="p-6 bg-white shadow rounded-lg text-gray-600">
            Please select a module first to view module-specific qualification questions.
        </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Qualification Assessment for {currentModuleName}</h2>
      </div>

      <QualificationSection
        title="Qualitative Assessment"
        questions={dynamicQualQualQuestions}
        sectionState={qualitative}
        onAnswerChange={(qId, val) => updateSectionState('qualitative', qId, val)}
        onCheckStatus={() => checkSectionStatus('qualitative')}
        moduleName={currentModuleName}
      />
      <QualificationSection
        title="Quantitative Assessment"
        questions={dynamicQualQuantQuestions}
        sectionState={quantitative}
        onAnswerChange={(qId, val) => updateSectionState('quantitative', qId, val)}
        onCheckStatus={() => checkSectionStatus('quantitative')}
        moduleName={currentModuleName}
      />
    </div>
  );
};

export default QualificationTab;
