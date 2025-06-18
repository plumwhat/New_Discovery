
import React, { useCallback } from 'react';
import { ScorecardAnswer, TabProps } from '../types';
import { SCORECARD_QUESTIONS } from '../constants';
import RadioGroup from './common/RadioGroup';

const OpportunityScorecardTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { answers, totalScore } = appState.opportunityScorecard;

  const handleAnswerChange = useCallback((questionId: string, value: ScorecardAnswer) => {
    setAppState(prev => {
      const newAnswers = { ...prev.opportunityScorecard.answers, [questionId]: value };
      let score = 0;
      SCORECARD_QUESTIONS.forEach(q => {
        if (newAnswers[q.id] === 'yes') {
          score += 20;
        }
      });
      return {
        ...prev,
        opportunityScorecard: {
          answers: newAnswers,
          totalScore: score,
        },
      };
    });
  }, [setAppState]);

  return (
    <div className="space-y-6 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Opportunity Scorecard</h2>
      {SCORECARD_QUESTIONS.map(question => (
        <div key={question.id} className="py-4 border-b border-gray-200 last:border-b-0">
          <p className="text-md font-medium text-gray-700 mb-2">{question.text}</p>
          <RadioGroup
            name={`scorecard-${question.id}`}
            options={[
              { value: 'yes', label: 'Yes (20 pts)' },
              { value: 'no', label: 'No (0 pts)' },
              { value: 'unsure', label: 'Unsure (0 pts)' },
            ]}
            selectedValue={answers[question.id] || ""}
            onChange={(value) => handleAnswerChange(question.id, value as ScorecardAnswer)}
          />
        </div>
      ))}
      <div className="mt-6 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-semibold text-gray-800">
          Total Score: <span className="text-blue-600">{totalScore} / 100</span>
        </h3>
      </div>
    </div>
  );
};

export default OpportunityScorecardTab;
