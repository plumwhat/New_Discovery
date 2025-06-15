
import React, { useCallback } from 'react';
import { TabProps, QualificationQuestion, QualificationStatus, QualificationSectionState, QualificationModuleData } from '../types';
import { QUALIFICATION_QUESTIONS_MODULE_TEMPLATES, DEFAULT_QUALIFICATION_THRESHOLDS, ALL_MODULES } from '../constants';
import Select from './common/Select';
import Button from './common/Button';
import AdminSettingsPanel from './QualificationAdminSettingsPanel';

interface QualificationSectionDisplayProps {
  title: string;
  questions: QualificationQuestion[];
  sectionState: QualificationSectionState;
  onAnswerChange: (questionId: string, value: number | "") => void;
  onCheckStatus: () => void;
}

const QualificationSectionDisplay: React.FC<QualificationSectionDisplayProps> = ({ title, questions, sectionState, onAnswerChange, onCheckStatus }) => {
  
  const getStatusColor = (status: QualificationStatus) => {
    switch (status) {
      case QualificationStatus.QUALIFIED: return "text-green-600 bg-green-100";
      case QualificationStatus.CLARIFICATION_REQUIRED: return "text-yellow-600 bg-yellow-100";
      case QualificationStatus.NOT_SUITABLE: return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  if (!questions || questions.length === 0) {
    return (
        <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
            <p className="text-gray-500">No qualification questions defined for this section or module yet.</p>
        </div>
    );
  }

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
            placeholder="Select an option (Rating 1-3)"
          />
        </div>
      ))}
      <div className="mt-6 flex items-center justify-between">
        <Button onClick={onCheckStatus} variant="primary">Check Status</Button>
        <div className={`px-4 py-2 rounded-md text-sm font-medium ${getStatusColor(sectionState.status)}`}>
          Status: {sectionState.status} (Avg Score: {sectionState.averageScore.toFixed(2)})
        </div>
      </div>
    </div>
  );
};


const QualificationTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { selectedModuleId } = appState;
  const { moduleData, adminSettings, showAdminSettings } = appState.qualification;

  const currentModuleQualificationData = selectedModuleId ? moduleData[selectedModuleId] : null;
  const questionTemplates = selectedModuleId ? (QUALIFICATION_QUESTIONS_MODULE_TEMPLATES[selectedModuleId] || QUALIFICATION_QUESTIONS_MODULE_TEMPLATES.default) : QUALIFICATION_QUESTIONS_MODULE_TEMPLATES.default;

  const updateSectionState = useCallback((moduleId: string, sectionType: 'qualitative' | 'quantitative', questionId: string, value: number | "") => {
    setAppState(prev => {
      const newModuleData = { ...prev.qualification.moduleData };
      if (!newModuleData[moduleId]) { // Should be initialized but good to check
        newModuleData[moduleId] = { 
          qualitative: { answers: {}, averageScore: 0, status: QualificationStatus.NOT_STARTED },
          quantitative: { answers: {}, averageScore: 0, status: QualificationStatus.NOT_STARTED },
        };
      }
      const sectionToUpdate = { ...newModuleData[moduleId][sectionType] };
      sectionToUpdate.answers = { ...sectionToUpdate.answers, [questionId]: value };
      
      newModuleData[moduleId] = { ...newModuleData[moduleId], [sectionType]: sectionToUpdate };
      
      return { ...prev, qualification: { ...prev.qualification, moduleData: newModuleData }};
    });
  }, [setAppState]);

  const checkSectionStatus = useCallback((moduleId: string, sectionType: 'qualitative' | 'quantitative') => {
    setAppState(prev => {
      const currentModuleQualData = prev.qualification.moduleData[moduleId];
      if (!currentModuleQualData) return prev;

      const currentSection = currentModuleQualData[sectionType];
      const questionsForSection = sectionType === 'qualitative' ? questionTemplates.qualitative : questionTemplates.quantitative;
      
      let sumOfRatings = 0;
      let answeredQuestionsCount = 0;

      questionsForSection.forEach(q => {
        const answerVal = currentSection.answers[q.id];
        if (typeof answerVal === 'number') {
          sumOfRatings += answerVal;
          answeredQuestionsCount++;
        }
      });

      const averageScore = answeredQuestionsCount > 0 ? sumOfRatings / answeredQuestionsCount : 0;

      let status: QualificationStatus;
      if (averageScore === 0 && answeredQuestionsCount === 0) {
        status = QualificationStatus.NOT_STARTED;
      } else if (averageScore > adminSettings.thresholds.qualifiedMinAverage) {
        status = QualificationStatus.QUALIFIED;
      } else if (averageScore >= adminSettings.thresholds.clarificationMinAverage) { // Note: >= for clarification lower bound
        status = QualificationStatus.CLARIFICATION_REQUIRED;
      } else {
        status = QualificationStatus.NOT_SUITABLE;
      }
      
      const updatedSectionState = { ...currentSection, averageScore, status };
      const newModuleData = { ...prev.qualification.moduleData, [moduleId]: { ...currentModuleQualData, [sectionType]: updatedSectionState }};
      
      return {
        ...prev,
        qualification: {
          ...prev.qualification,
          moduleData: newModuleData
        }
      };
    });
  }, [setAppState, adminSettings.thresholds, questionTemplates]);

  const handleAdminSettingsSave = useCallback((newThresholds: typeof adminSettings.thresholds) => {
    setAppState(prev => ({
      ...prev,
      qualification: {
        ...prev.qualification,
        adminSettings: { ...prev.qualification.adminSettings, thresholds: newThresholds },
        showAdminSettings: false,
      }
    }));
  }, [setAppState]);
  
  const handleRestoreDefaults = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      qualification: {
        ...prev.qualification,
        adminSettings: { 
          ...prev.qualification.adminSettings, 
          thresholds: { ...DEFAULT_QUALIFICATION_THRESHOLDS }
        },
      }
    }));
  }, [setAppState]);

  const toggleAdminSettings = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      qualification: { ...prev.qualification, showAdminSettings: !prev.qualification.showAdminSettings }
    }));
  }, [setAppState]);

  if (!selectedModuleId) {
    return <div className="p-6 bg-white shadow rounded-lg text-gray-600">Please select a module first.</div>;
  }
  if (!currentModuleQualificationData) {
     return <div className="p-6 bg-white shadow rounded-lg text-red-600">Error: Qualification data not found for this module. Try re-selecting.</div>;
  }
  const moduleName = ALL_MODULES.find(m => m.id === selectedModuleId)?.name || "Selected Module";


  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Qualification Assessment for {moduleName}</h2>
        <Button onClick={toggleAdminSettings} variant="ghost" size="sm">Admin Settings</Button>
      </div>

      {showAdminSettings && (
        <AdminSettingsPanel
          settings={adminSettings}
          onSave={handleAdminSettingsSave}
          onRestoreDefaults={handleRestoreDefaults}
          onClose={toggleAdminSettings}
        />
      )}

      <QualificationSectionDisplay
        title="Qualitative Assessment"
        questions={questionTemplates.qualitative}
        sectionState={currentModuleQualificationData.qualitative}
        onAnswerChange={(qId, val) => updateSectionState(selectedModuleId, 'qualitative', qId, val)}
        onCheckStatus={() => checkSectionStatus(selectedModuleId, 'qualitative')}
      />
      <QualificationSectionDisplay
        title="Quantitative Assessment"
        questions={questionTemplates.quantitative}
        sectionState={currentModuleQualificationData.quantitative}
        onAnswerChange={(qId, val) => updateSectionState(selectedModuleId, 'quantitative', qId, val)}
        onCheckStatus={() => checkSectionStatus(selectedModuleId, 'quantitative')}
      />
    </div>
  );
};

export default QualificationTab;
