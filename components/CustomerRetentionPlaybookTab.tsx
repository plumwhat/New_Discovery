
import React, { useCallback, useMemo } from 'react';
import { TabProps, ServiceType, TabId } from '../types';
import { RETENTION_PLAYBOOK_STAGES } from '../constants/retentionConstants';
import { ClipboardDocumentCheckIcon, CheckCircleIcon } from './common/Icons';

const CustomerRetentionPlaybookTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { customerRetention, selectedServiceType } = appState;
  const tabIdValue = TabId.CUSTOMER_RETENTION_PLAYBOOK;

  const handleToggleAction = useCallback((actionId: string) => {
    setAppState(prev => {
      const newCompletedActions = { ...prev.customerRetention.completedActions };
      newCompletedActions[actionId] = !newCompletedActions[actionId];
      return {
        ...prev,
        customerRetention: {
          ...prev.customerRetention,
          completedActions: newCompletedActions,
        }
      };
    });
  }, [setAppState]);

  const isITServices = selectedServiceType === ServiceType.ITS;

  return (
    <section 
      id={`${tabIdValue}-section`}
      className="p-4 sm:p-6 bg-white shadow rounded-lg"
      aria-labelledby={`${tabIdValue}-heading`}
    >
      <div className="mb-8">
        <h2 id={`${tabIdValue}-heading`} className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
          <ClipboardDocumentCheckIcon className="w-7 h-7 mr-3 text-[#01916D]" />
          Customer Retention Playbook
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          A strategic guide to proactively manage customer renewals. Select actions as they are completed to track your progress.
        </p>
        <div className="mt-4 p-3 rounded-md bg-indigo-50 border border-indigo-200 text-sm text-indigo-700">
          <strong>Current Focus:</strong> The playbook content is tailored for a <strong className="font-semibold">{isITServices ? 'IT Services' : 'Finance/Business Automation'}</strong> customer. Change the "Service" in the main controls to switch focus.
        </div>
      </div>

      <div className="relative">
        {/* Vertical line for the timeline */}
        <div className="absolute left-4 sm:left-6 top-2 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>

        <div className="space-y-12">
          {RETENTION_PLAYBOOK_STAGES.map((stage, stageIndex) => {
            const strategy = isITServices && stage.strategy.its ? stage.strategy.its : stage.strategy.default;
            const actions = isITServices ? stage.actions.its : stage.actions.default;
            const totalActions = actions.length;
            const completedCount = actions.filter(action => customerRetention.completedActions[action.id]).length;
            const progressPercentage = totalActions > 0 ? (completedCount / totalActions) * 100 : 0;

            return (
              <div key={stage.id} className="relative pl-10 sm:pl-16">
                {/* Timeline Dot */}
                <div className={`absolute left-4 sm:left-6 top-2 -ml-2 h-4 w-4 rounded-full ${completedCount === totalActions ? 'bg-green-500' : 'bg-[#01916D]'}`}></div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">{stage.title}</h3>
                      <p className="text-sm font-medium text-[#017a59]">{stage.timeframe}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 text-sm font-semibold text-gray-600">
                      {completedCount} / {totalActions} Actions Complete
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700">Objective:</h4>
                      <p className="text-sm text-gray-600">{stage.objective}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Strategy Focus:</h4>
                      <p className="text-sm text-gray-600">{strategy}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Key Actions:</h4>
                      <ul className="space-y-2 mt-2">
                        {actions.map(action => (
                          <li key={action.id}>
                            <label className="flex items-start p-2 rounded-md transition-colors hover:bg-green-50 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!customerRetention.completedActions[action.id]}
                                onChange={() => handleToggleAction(action.id)}
                                className="h-5 w-5 rounded border-gray-300 text-[#01916D] focus:ring-[#017a59] mt-0.5"
                              />
                              <span className={`ml-3 text-sm ${customerRetention.completedActions[action.id] ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CustomerRetentionPlaybookTab;
