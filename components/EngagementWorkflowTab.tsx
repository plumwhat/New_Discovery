

import React, { useCallback } from 'react';
import { TabProps, TabId, EngagementStepStatus, EngagementWorkflowStep, EngagementAction, EngagementStepType } from '../types';
import Button from './common/Button';
import { TrashIcon, ArrowUpIcon, ArrowDownIcon, CircleStackIcon } from './common/Icons';

export const EngagementWorkflowTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { steps } = appState.engagementWorkflow;
  const tabIdValue = TabId.ENGAGEMENT_WORKFLOW;

  const handleRemoveStep = useCallback((index: number) => {
    setAppState(prev => {
      const newSteps = [...prev.engagementWorkflow.steps];
      newSteps.splice(index, 1);
      return {
        ...prev,
        engagementWorkflow: { ...prev.engagementWorkflow, steps: newSteps }
      };
    });
  }, [setAppState]);

  const handleMoveStep = useCallback((index: number, direction: 'up' | 'down') => {
    setAppState(prev => {
      const newSteps = [...prev.engagementWorkflow.steps];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= newSteps.length) return prev; 

      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];

      return {
        ...prev,
        engagementWorkflow: { ...prev.engagementWorkflow, steps: newSteps }
      };
    });
  }, [setAppState]);

  const handleToggleAction = useCallback((stepIndex: number, actionType: 'objectives' | 'salesActions', actionId: string) => {
    setAppState(prev => {
      const newSteps = JSON.parse(JSON.stringify(prev.engagementWorkflow.steps));
      const stepToUpdate = newSteps[stepIndex];
      if (!stepToUpdate) return prev;

      const actionList = stepToUpdate[actionType] as EngagementAction[];
      const actionToToggle = actionList.find(a => a.id === actionId);
      if (actionToToggle) {
        actionToToggle.completed = !actionToToggle.completed;
      }
      
      const totalActions = stepToUpdate.objectives.length + stepToUpdate.salesActions.length;
      const completedActions = stepToUpdate.objectives.filter((a: EngagementAction) => a.completed).length + stepToUpdate.salesActions.filter((a: EngagementAction) => a.completed).length;

      if (completedActions === 0) {
        stepToUpdate.status = EngagementStepStatus.PENDING;
      } else if (completedActions === totalActions) {
        stepToUpdate.status = EngagementStepStatus.COMPLETED;
      } else {
        stepToUpdate.status = EngagementStepStatus.IN_PROGRESS;
      }

      return {
        ...prev,
        engagementWorkflow: { ...prev.engagementWorkflow, steps: newSteps }
      };
    });
  }, [setAppState]);

  const getPhaseForStep = (stepType: EngagementStepType): string => {
    switch (stepType) {
      case EngagementStepType.PLAN_AND_PREPARE:
        return "Phase 1: Planning & Alignment";
      case EngagementStepType.OPEN_AND_CONNECT:
      case EngagementStepType.DISCOVER_AND_DIAGNOSE:
      case EngagementStepType.CRAFT_AND_VALIDATE_SOLUTION:
        return "Phase 2: Discovery & Solutioning";
      case EngagementStepType.PROPOSE_AND_PROVE_VALUE:
      case EngagementStepType.GAIN_COMMITMENT_AND_CLOSE:
        return "Phase 3: Value & Commitment";
      case EngagementStepType.IMPLEMENT_AND_EXPAND:
        return "Phase 4: Partnership & Growth";
      default:
        return "Uncategorized Steps";
    }
  };


  return (
    <section
      id={`${tabIdValue}-section`}
      aria-labelledby={`${tabIdValue}-heading`}
      className="p-4 sm:p-6 bg-white shadow rounded-lg"
    >
      <div className="mb-8">
        <h2 id={`${tabIdValue}-heading`} className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
          <CircleStackIcon className="w-7 h-7 mr-3 text-[#01916D]" />
          Strategic Engagement Workflow
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Plan and track your customer engagement based on value-selling principles, aligned with methodologies like Korn Ferry's.
        </p>
      </div>
      
      <div className="relative">
        {/* Vertical line for the timeline */}
        {steps.length > 1 && <div className="absolute left-4 sm:left-6 top-2 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>}
        
        <div className="space-y-6">
          {steps.map((step, index) => {
            const totalActions = step.objectives.length + step.salesActions.length;
            const completedActions = step.objectives.filter(a => a.completed).length + step.salesActions.filter(a => a.completed).length;
            const progressPercentage = totalActions > 0 ? (completedActions / totalActions) * 100 : 0;
            const isCompleted = step.status === EngagementStepStatus.COMPLETED;

            const currentPhase = getPhaseForStep(step.stepType);
            const isFirstOfPhase = index === 0 || getPhaseForStep(steps[index - 1].stepType) !== currentPhase;

            return (
              <div key={step.id}>
                {isFirstOfPhase && (
                  <div className="pt-6 pb-2 pl-10 sm:pl-16">
                    <h3 className="text-lg font-bold text-indigo-700">{currentPhase}</h3>
                    <hr className="mt-1 border-t-2 border-indigo-200" />
                  </div>
                )}
                <div className="relative pl-10 sm:pl-16 mt-4">
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 sm:left-6 top-2 -ml-2 h-4 w-4 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-[#01916D]'}`}></div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">{`${index + 1}. ${step.stepType}`}</h3>
                      <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-600">{completedActions} / {totalActions} Done</span>
                          <Button onClick={() => handleMoveStep(index, 'up')} disabled={index === 0} icon={<ArrowUpIcon className="w-4 h-4" />} size="sm" className="!p-2" aria-label="Move step up" />
                          <Button onClick={() => handleMoveStep(index, 'down')} disabled={index === steps.length - 1} icon={<ArrowDownIcon className="w-4 h-4" />} size="sm" className="!p-2" aria-label="Move step down" />
                          <Button onClick={() => handleRemoveStep(index)} variant="danger" icon={<TrashIcon className="w-4 h-4" />} size="sm" className="!p-2" aria-label="Remove step" />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-green-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Objectives</h4>
                        <ul className="space-y-2">
                          {step.objectives.map(action => (
                            <li key={action.id}>
                              <label className="flex items-start p-2 rounded-md transition-colors hover:bg-blue-50 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={action.completed}
                                  onChange={() => handleToggleAction(index, 'objectives', action.id)}
                                  className="h-5 w-5 rounded border-gray-300 text-[#01916D] focus:ring-[#017a59] mt-0.5"
                                />
                                <span className={`ml-3 text-sm ${action.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                  {action.text}
                                </span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Sales Actions</h4>
                        <ul className="space-y-2">
                          {step.salesActions.map(action => (
                            <li key={action.id}>
                              <label className="flex items-start p-2 rounded-md transition-colors hover:bg-green-50 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={action.completed}
                                  onChange={() => handleToggleAction(index, 'salesActions', action.id)}
                                  className="h-5 w-5 rounded border-gray-300 text-[#01916D] focus:ring-[#017a59] mt-0.5"
                                />
                                <span className={`ml-3 text-sm ${action.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                  {action.text}
                                </span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {steps.length === 0 && <p className="text-gray-500 text-center py-4">No steps in the workflow. You can reset application data to restore the default workflow.</p>}
      </div>
    </section>
  );
};