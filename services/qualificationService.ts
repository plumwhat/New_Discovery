
import { QualificationQuestion, QualificationStatus } from '../types';

/**
 * Evaluates a qualification section based on answers, questions, and thresholds.
 * Calculates the total score and determines the qualification status.
 *
 * @param answers - An object mapping question IDs to their numerical answer values (or empty string if not answered).
 * @param questions - An array of QualificationQuestion objects for the section.
 * @param thresholds - An object containing 'qualified' and 'clarification' score thresholds.
 * @returns An object containing the calculated 'score' and determined 'status'.
 */
export const evaluateQualificationSection = (
  answers: { [key: string]: number | "" },
  questions: QualificationQuestion[],
  thresholds: { qualified: number; clarification: number; }
): { score: number, status: QualificationStatus } => {
  let score = 0;
  questions.forEach(q => {
    const answerVal = answers[q.id];
    if (typeof answerVal === 'number') { // Ensure it's a number, not an empty string
      score += answerVal;
    }
  });

  let status: QualificationStatus;
  if (score >= thresholds.qualified) {
    status = QualificationStatus.QUALIFIED;
  } else if (score >= thresholds.clarification) {
    status = QualificationStatus.CLARIFICATION_REQUIRED;
  } else {
    status = QualificationStatus.NOT_SUITABLE;
  }
  return { score, status };
};