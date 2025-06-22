
import React, { useCallback, useState } from 'react';
import { DiscoveryQuestion, DiscoveryAnswer, EditableDiscoveryQuestionsTemplates, TabProps, TabId } from '../types';
import { DISCOVERY_QUESTIONS_TEMPLATES } from '../constants/discoveryConstants';
import { ALL_MODULES } from '../constants/moduleConstants';
import Textarea from './common/Textarea';
import Button from './common/Button';
import { TrashIcon } from './common/Icons';

interface DiscoverySectionProps {
  title: string;
  questionsAndNotes: DiscoveryAnswer[];
  moduleQuestionsTemplate: DiscoveryQuestion[];
  moduleId: string;
  questionType: 'qualitative' | 'quantitative';
  onAnswerChange: (moduleId: string, type: 'qualitative' | 'quantitative', questionId: string, answer: string) => void;
  onAddCustomNote: (moduleId: string, type: 'qualitative' | 'quantitative', noteText: string) => void;
  onDeleteCustomItem: (moduleId: string, type: 'qualitative' | 'quantitative', itemId: string) => void;
  sectionId: string;
}

const DiscoverySection: React.FC<DiscoverySectionProps> = ({
  title,
  questionsAndNotes,
  moduleQuestionsTemplate,
  moduleId,
  questionType,
  onAnswerChange,
  onAddCustomNote,
  onDeleteCustomItem,
  sectionId
}) => {
  const [customNoteText, setCustomNoteText] = useState('');

  const handleAddNote = () => {
    if (customNoteText.trim()) {
      onAddCustomNote(moduleId, questionType, customNoteText.trim());
      setCustomNoteText('');
    }
  };

  return (
    <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
      <h3 id={`${sectionId}-heading`} className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      {questionsAndNotes.map((item) => {
        const originalQuestion = !item.isCustom ? moduleQuestionsTemplate.find(q => q.id === item.questionId) : null;
        const placeholder = item.isCustom
                            ? "Enter your note or observation..."
                            : (originalQuestion?.placeholderHint || "Enter customer's answer...");
        const labelText = item.isCustom ? "Custom Note:" : item.questionText;

        return (
          <div key={item.questionId} className="mb-6 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start">
              <label htmlFor={`${moduleId}-${questionType}-${item.questionId}`} className="text-md text-gray-700 mb-1 flex-grow">
                {item.isCustom ? <strong>Custom Note:</strong> : item.questionText}
              </label>
              {item.isCustom && (
                <Button
                  onClick={() => onDeleteCustomItem(moduleId, questionType, item.questionId)}
                  variant="danger"
                  size="sm"
                  className="ml-2 flex-shrink-0 !p-1"
                  aria-label="Delete note"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Textarea
              id={`${moduleId}-${questionType}-${item.questionId}`}
              value={item.answer}
              onChange={(e) => onAnswerChange(moduleId, questionType, item.questionId, e.target.value)}
              placeholder={placeholder}
              aria-label={labelText} // Use the actual question or "Custom Note" as aria-label
            />
          </div>
        );
      })}
      <div className="mt-6 space-y-2">
        <Textarea
          label={`Add Custom Note for ${title}`}
          id={`${moduleId}-${questionType}-customNoteInput`}
          value={customNoteText}
          onChange={(e) => setCustomNoteText(e.target.value)}
          placeholder="Type your custom note or observation here..."
          rows={3}
          aria-label={`Add Custom Note for ${title}`}
        />
        <Button onClick={handleAddNote} variant="secondary" size="sm">Add Note</Button>
      </div>
    </div>
  );
};


const DiscoveryQuestionsTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { selectedModuleId } = appState;
  const tabId = TabId.DISCOVERY_QUESTIONS;

  const dynamicDiscoveryTemplates = DISCOVERY_QUESTIONS_TEMPLATES;

  const currentModuleData = selectedModuleId ? appState.discoveryQuestions[selectedModuleId] : null;
  const currentModuleQuestionsTemplate = selectedModuleId
    ? dynamicDiscoveryTemplates[selectedModuleId] || { qualitative: [], quantitative: [] }
    : { qualitative: [], quantitative: [] };


  const handleAnswerChange = useCallback((moduleId: string, type: 'qualitative' | 'quantitative', questionId: string, answer: string) => {
    setAppState(prev => {
      const moduleState = { ...(prev.discoveryQuestions[moduleId] || { qualitative: [], quantitative: [] }) };
      const itemsList = [...(moduleState[type] || [])];
      const itemIndex = itemsList.findIndex(q => q.questionId === questionId);

      if (itemIndex !== -1) {
        itemsList[itemIndex] = { ...itemsList[itemIndex], answer };
        moduleState[type] = itemsList;
        return {
          ...prev,
          discoveryQuestions: { ...prev.discoveryQuestions, [moduleId]: moduleState }
        };
      }
      return prev;
    });
  }, [setAppState]);

  const handleAddCustomNote = useCallback((moduleId: string, type: 'qualitative' | 'quantitative', noteText: string) => {
    setAppState(prev => {
      const newNoteId = `custom-note-${crypto.randomUUID()}`;
      const newNote: DiscoveryAnswer = {
        questionId: newNoteId,
        questionText: `Custom Note (${type})`, // This is more for internal tracking
        answer: noteText,
        isCustom: true
      };

      const moduleState = { ...(prev.discoveryQuestions[moduleId] || { qualitative: [], quantitative: [] }) };
      const currentItems = moduleState[type] ? [...moduleState[type]] : [];
      moduleState[type] = [...currentItems, newNote];

      return {
        ...prev,
        discoveryQuestions: { ...prev.discoveryQuestions, [moduleId]: moduleState }
      };
    });
  }, [setAppState]);

  const handleDeleteCustomItem = useCallback((moduleId: string, type: 'qualitative' | 'quantitative', itemId: string) => {
    setAppState(prev => {
      const moduleState = { ...(prev.discoveryQuestions[moduleId] || { qualitative: [], quantitative: [] }) };
      const currentItems = moduleState[type] ? [...moduleState[type]] : [];
      moduleState[type] = currentItems.filter(item => item.questionId !== itemId);
      return {
        ...prev,
        discoveryQuestions: { ...prev.discoveryQuestions, [moduleId]: moduleState }
      };
    });
  }, [setAppState]);

  if (!selectedModuleId) {
    return (
        <section 
            className="p-6 bg-white shadow rounded-lg text-gray-600"
            role="region"
            aria-labelledby={`${tabId}-placeholder-heading`}
        >
            <h2 id={`${tabId}-placeholder-heading`} className="sr-only">Discovery Questions Information</h2>
            Please select a module first to view or add discovery questions and notes.
        </section>
    );
  }
  if (!currentModuleData || !currentModuleQuestionsTemplate) {
    return (
        <section 
            className="p-6 bg-white shadow rounded-lg text-red-600"
            role="region"
            aria-labelledby={`${tabId}-error-heading`}
        >
             <h2 id={`${tabId}-error-heading`} className="sr-only">Discovery Questions Error</h2>
            Error: Discovery questions configuration not found for this module. Please check constants.
        </section>
    );
  }

  const moduleName = appState.selectedModuleId ? ALL_MODULES.find(m => m.id === appState.selectedModuleId)?.name : "Selected Module";


  return (
    <section 
      className="p-6 bg-white shadow rounded-lg"
      role="region"
      aria-labelledby={`${tabId}-heading`}
    >
      <h2 id={`${tabId}-heading`} className="text-xl font-semibold text-gray-800 mb-6">Discovery Questions & Notes for {moduleName}</h2>
      <DiscoverySection
        title="Qualitative Insights"
        questionsAndNotes={currentModuleData.qualitative}
        moduleQuestionsTemplate={currentModuleQuestionsTemplate.qualitative}
        moduleId={selectedModuleId}
        questionType="qualitative"
        onAnswerChange={handleAnswerChange}
        onAddCustomNote={handleAddCustomNote}
        onDeleteCustomItem={handleDeleteCustomItem}
        sectionId={`${tabId}-qualitative`}
      />
      <DiscoverySection
        title="Quantitative Metrics & Data Points"
        questionsAndNotes={currentModuleData.quantitative}
        moduleQuestionsTemplate={currentModuleQuestionsTemplate.quantitative}
        moduleId={selectedModuleId}
        questionType="quantitative"
        onAnswerChange={handleAnswerChange}
        onAddCustomNote={handleAddCustomNote}
        onDeleteCustomItem={handleDeleteCustomItem}
        sectionId={`${tabId}-quantitative`}
      />
    </section>
  );
};

export default DiscoveryQuestionsTab;