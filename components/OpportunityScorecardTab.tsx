
import React, { useCallback } from 'react';
import { ScorecardAnswer, TabId, TabProps, ScorecardQuestion } from '../types'; // Added ScorecardQuestion type
import { getScorecardQuestions } from '../services/configService'; // Changed import
import RadioGroup from './common/RadioGroup';

const OpportunityScorecardTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { answers, totalScore } = appState.opportunityScorecard;
  const tabId = TabId.OPPORTUNITY_SCORECARD;
  const scorecardQuestions = getScorecardQuestions(); // Get questions from config service

  const handleAnswerChange = useCallback((questionId: string, value: ScorecardAnswer) => {
    setAppState(prev => {
      const newAnswers = { ...prev.opportunityScorecard.answers, [questionId]: value };
      let score = 0;
      // Use the dynamically fetched questions for scoring
      scorecardQuestions.forEach(q => {
        if (newAnswers[q.id] === 'yes') {
          score += 20; // Assuming 20 points per "yes" based on original design
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
  }, [setAppState, scorecardQuestions]);

  return (
    <section 
      className="space-y-6 p-6 bg-white shadow rounded-lg"
      role="region"
      aria-labelledby={`${tabId}-heading`}
    >
      <h2 id={`${tabId}-heading`} className="text-xl font-semibold text-gray-800">Opportunity Scorecard</h2>
      {scorecardQuestions.map(question => (
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
        <h3 
          className="text-lg font-semibold text-gray-800"
          aria-live="polite" // Announce score changes
        >
          Total Score: <span className="text-[#01916D]">{totalScore} / {scorecardQuestions.length * 20}</span> {/* Max score based on question count */}
        </h3>
      </div>
    </section>
  );
};

export default OpportunityScorecardTab;