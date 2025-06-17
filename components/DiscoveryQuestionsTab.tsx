
import React, { useCallback, useState } from 'react';
import { TabProps, DiscoveryQuestion, DiscoveryAnswer } from '../types';
import { DISCOVERY_QUESTIONS_TEMPLATES } from '../constants';
import Input from './common/Input';
import Textarea from './common/Textarea';
import Button from './common/Button';

interface DiscoverySectionProps {
  title: string;
  questions: DiscoveryAnswer[];
  moduleId: string;
  questionType: 'qualitative' | 'quantitative';
  onAnswerChange: (moduleId: string, type: 'qualitative' | 'quantitative', questionId: string, answer: string) => void;
  onAddCustomQuestion: (moduleId: string, type: 'qualitative' | 'quantitative', questionText: string) => void;
  onDeleteCustomQuestion: (moduleId: string, type: 'qualitative' | 'quantitative', questionId: string) => void;
}

const DiscoverySection: React.FC<DiscoverySectionProps> = ({
  title,
  questions,
  moduleId,
  questionType,
  onAnswerChange,
  onAddCustomQuestion,
  onDeleteCustomQuestion
}) => {
  const [customQuestionText, setCustomQuestionText] = useState('');

  const handleAddCustom = () => {
    if (customQuestionText.trim()) {
      onAddCustomQuestion(moduleId, questionType, customQuestionText.trim());
      setCustomQuestionText('');
    }
  };
  
  return (
    <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      {questions.map((item, index) => (
        <div key={item.questionId} className="mb-6 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
          <div className="flex justify-between items-start">
            <p className="text-md text-gray-700 mb-1 flex-grow">
              {item.isCustom ? <em>{item.questionText} (Custom)</em> : item.questionText}
            </p>
            {item.isCustom && (
              <Button 
                onClick={() => onDeleteCustomQuestion(moduleId, questionType, item.questionId)} 
                variant="danger" 
                size="sm"
                className="ml-2 flex-shrink-0 !p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.242.078 3.223.226M5.256 5.79c-.087.135-.168.274-.246.414M18.744 5.79c.087.135.168.274.246.414M15 8.25V5.75c0-1.242-1.008-2.25-2.25-2.25H11.25C10.008 3.5 9 4.508 9 5.75v2.5M12 10.5h.008v.008H12v-.008z" />
                </svg>
              </Button>
            )}
          </div>
          <Textarea
            id={`${moduleId}-${questionType}-${item.questionId}`}
            value={item.answer}
            onChange={(e) => onAnswerChange(moduleId, questionType, item.questionId, e.target.value)}
            placeholder="Enter customer's answer (Text)..."
          />
        </div>
      ))}
      <div className="mt-6 space-y-2">
        <Input
          type="text"
          value={customQuestionText}
          onChange={(e) => setCustomQuestionText(e.target.value)}
          placeholder="Type your custom question here..."
          label="Add Custom Question"
        />
        <Button onClick={handleAddCustom} variant="secondary" size="sm">Add Question</Button>
      </div>
    </div>
  );
};


const DiscoveryQuestionsTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { selectedModuleId } = appState;

  const currentModuleData = selectedModuleId ? appState.discoveryQuestions[selectedModuleId] : null;

  const handleAnswerChange = useCallback((moduleId: string, type: 'qualitative' | 'quantitative', questionId: string, answer: string) => {
    setAppState(prev => {
      const moduleState = { ...prev.discoveryQuestions[moduleId] };
      const questionSet = [...moduleState[type]];
      const questionIndex = questionSet.findIndex(q => q.questionId === questionId);
      if (questionIndex !== -1) {
        questionSet[questionIndex] = { ...questionSet[questionIndex], answer };
        moduleState[type] = questionSet;
        return {
          ...prev,
          discoveryQuestions: { ...prev.discoveryQuestions, [moduleId]: moduleState }
        };
      }
      return prev;
    });
  }, [setAppState]);

  const handleAddCustomQuestion = useCallback((moduleId: string, type: 'qualitative' | 'quantitative', questionText: string) => {
    setAppState(prev => {
      const newQuestionId = `custom-${crypto.randomUUID()}`;
      const newQuestion: DiscoveryAnswer = { 
        questionId: newQuestionId, 
        questionText: questionText, 
        answer: '', 
        isCustom: true 
      };
      
      const moduleState = { ...prev.discoveryQuestions[moduleId] };
      moduleState[type] = [...moduleState[type], newQuestion];
      
      return {
        ...prev,
        discoveryQuestions: { ...prev.discoveryQuestions, [moduleId]: moduleState }
      };
    });
  }, [setAppState]);

  const handleDeleteCustomQuestion = useCallback((moduleId: string, type: 'qualitative' | 'quantitative', questionId: string) => {
    setAppState(prev => {
      const moduleState = { ...prev.discoveryQuestions[moduleId] };
      moduleState[type] = moduleState[type].filter(q => q.questionId !== questionId);
      return {
        ...prev,
        discoveryQuestions: { ...prev.discoveryQuestions, [moduleId]: moduleState }
      };
    });
  }, [setAppState]);

  if (!selectedModuleId) {
    return <div className="p-6 bg-white shadow rounded-lg text-gray-600">Please select a module first.</div>;
  }
  if (!currentModuleData) {
     // This case should ideally not happen if initial state is populated correctly
    return <div className="p-6 bg-white shadow rounded-lg text-red-600">Error: Discovery questions not found for this module.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Discovery Questions for {selectedModuleId}</h2>
      <DiscoverySection
        title="Qualitative Questions"
        questions={currentModuleData.qualitative}
        moduleId={selectedModuleId}
        questionType="qualitative"
        onAnswerChange={handleAnswerChange}
        onAddCustomQuestion={handleAddCustomQuestion}
        onDeleteCustomQuestion={handleDeleteCustomQuestion}
      />
      <DiscoverySection
        title="Quantitative Questions (Metrics)"
        questions={currentModuleData.quantitative}
        moduleId={selectedModuleId}
        questionType="quantitative"
        onAnswerChange={handleAnswerChange}
        onAddCustomQuestion={handleAddCustomQuestion}
        onDeleteCustomQuestion={handleDeleteCustomQuestion}
      />
    </div>
  );
};

export default DiscoveryQuestionsTab;
