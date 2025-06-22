
import React, { useCallback, useMemo, useEffect } from 'react';
import { TabProps, PainPointMode, PainPointLevel1Pain, PainPointLevel2Pain, PainPointAnswerOption, PainPointSolutionMapping, WaterfallLogEntry, WaterfallStep, PainPointLevel3Question, AccumulatedSolutionInfo, ReverseWaterfallCheatSheet, TabId } from '../types';
import { 
    PAIN_POINT_HIERARCHY, 
    REVERSE_WATERFALL_CHEAT_SHEETS, 
    initialPainPointsState
} from '../constants/painPointConstants';
import { ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB } from '../constants/moduleConstants';
import RadioGroup from './common/RadioGroup';
import Button from './common/Button';
import Select from './common/Select';
import { ArrowDownTrayIcon, CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon, EyeIcon, ArrowUturnLeftIcon } from './common/Icons';

export const PainPointsTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { painPoints } = appState;
  const tabIdValue = TabId.PAIN_POINTS;
  const { 
    activeMode, 
    currentWaterfallStep, 
    selectedL1PainId, 
    selectedL2PainId,
    selectedL3QuestionId,
    answeredL3QuestionIds,
    selectedL3AnswerId,
    waterfallConversationLog, 
    showNotAlignedMessage,
    currentL3AlignmentDetails,
    accumulatedL2Solutions,
    selectedProductForCheatSheet,
    showConversationView 
  } = painPoints;

  const dynamicPainPointHierarchy: PainPointLevel1Pain[] = PAIN_POINT_HIERARCHY;
  const dynamicReverseWaterfallCheatSheets: Record<string, ReverseWaterfallCheatSheet> = REVERSE_WATERFALL_CHEAT_SHEETS;


  useEffect(() => {
    let needsStateUpdate = false;
    let newPainPointsStatePartial = { ...painPoints }; 

    if (dynamicPainPointHierarchy.length === 0 && painPoints.activeMode === PainPointMode.WATERFALL) {
        console.warn(`PainPointsTab: Dynamic Pain Point Hierarchy is empty. Resetting Waterfall state.`);
        newPainPointsStatePartial = {
            ...initialPainPointsState, 
            activeMode: painPoints.activeMode, 
            showConversationView: painPoints.showConversationView, 
            waterfallConversationLog: painPoints.waterfallConversationLog, 
        };
        needsStateUpdate = true;
    } else {
        if (newPainPointsStatePartial.selectedL1PainId) {
            const l1Exists = dynamicPainPointHierarchy.some(p => p.id === newPainPointsStatePartial.selectedL1PainId);
            if (!l1Exists) {
                console.warn(`PainPointsTab: Stale L1 Pain ID found (${newPainPointsStatePartial.selectedL1PainId}). Resetting L1 selection.`);
                newPainPointsStatePartial = {
                    ...initialPainPointsState, 
                    activeMode: newPainPointsStatePartial.activeMode,
                    showConversationView: newPainPointsStatePartial.showConversationView,
                    waterfallConversationLog: newPainPointsStatePartial.waterfallConversationLog,
                };
                needsStateUpdate = true;
            }
        }

        if (!needsStateUpdate && newPainPointsStatePartial.selectedL1PainId && newPainPointsStatePartial.selectedL2PainId) {
            const currentL1 = dynamicPainPointHierarchy.find(p => p.id === newPainPointsStatePartial.selectedL1PainId);
            const l2Exists = currentL1?.level2Pains.some(p => p.id === newPainPointsStatePartial.selectedL2PainId);
            if (!l2Exists) {
                console.warn(`PainPointsTab: Stale L2 Pain ID found (${newPainPointsStatePartial.selectedL2PainId}). Resetting L2 selection.`);
                newPainPointsStatePartial = {
                    ...newPainPointsStatePartial, 
                    currentWaterfallStep: WaterfallStep.SELECT_L2_PAIN,
                    selectedL2PainId: null,
                    selectedL3QuestionId: null,
                    answeredL3QuestionIds: [],
                    selectedL3AnswerId: null,
                    currentL3AlignmentDetails: null,
                    accumulatedL2Solutions: [],
                };
                needsStateUpdate = true;
            }
        }
        
        if (!needsStateUpdate && newPainPointsStatePartial.selectedL1PainId && newPainPointsStatePartial.selectedL2PainId && newPainPointsStatePartial.selectedL3QuestionId) {
            const currentL1 = dynamicPainPointHierarchy.find(p => p.id === newPainPointsStatePartial.selectedL1PainId);
            const currentL2 = currentL1?.level2Pains.find(p => p.id === newPainPointsStatePartial.selectedL2PainId);
            const l3Exists = currentL2?.level3Questions.some(q => q.id === newPainPointsStatePartial.selectedL3QuestionId);
            if(!l3Exists) {
                console.warn(`PainPointsTab: Stale L3 Question ID found (${newPainPointsStatePartial.selectedL3QuestionId}). Resetting L3 question selection.`);
                newPainPointsStatePartial = {
                    ...newPainPointsStatePartial,
                    selectedL3QuestionId: null,
                    selectedL3AnswerId: null,
                    currentL3AlignmentDetails: null,
                    currentWaterfallStep: WaterfallStep.SELECT_L3_QUESTION,
                };
                needsStateUpdate = true;
            }
        }

        if (!needsStateUpdate && newPainPointsStatePartial.selectedL1PainId && newPainPointsStatePartial.selectedL2PainId) {
            const currentL1 = dynamicPainPointHierarchy.find(p => p.id === newPainPointsStatePartial.selectedL1PainId);
            const currentL2 = currentL1?.level2Pains.find(p => p.id === newPainPointsStatePartial.selectedL2PainId);
            if (currentL2) {
                const validL3IdsInCurrentL2 = new Set(currentL2.level3Questions.map(q => q.id));
                
                const prevAnsweredL3IdsLength = newPainPointsStatePartial.answeredL3QuestionIds.length;
                const updatedAnsweredL3Ids = newPainPointsStatePartial.answeredL3QuestionIds.filter(id => validL3IdsInCurrentL2.has(id));
                if (updatedAnsweredL3Ids.length !== prevAnsweredL3IdsLength) {
                     console.warn(`PainPointsTab: Pruned stale answered L3 question IDs.`);
                     newPainPointsStatePartial.answeredL3QuestionIds = updatedAnsweredL3Ids;
                     needsStateUpdate = true;
                }

                const prevAccumulatedSolutionsLength = newPainPointsStatePartial.accumulatedL2Solutions.length;
                const updatedAccumulatedSolutions = newPainPointsStatePartial.accumulatedL2Solutions.filter(sol => validL3IdsInCurrentL2.has(sol.questionId));
                if (updatedAccumulatedSolutions.length !== prevAccumulatedSolutionsLength) {
                    console.warn(`PainPointsTab: Pruned stale accumulated L2 solutions.`);
                    newPainPointsStatePartial.accumulatedL2Solutions = updatedAccumulatedSolutions;
                    needsStateUpdate = true;
                }
            }
        }
    }
    
    if (needsStateUpdate) {
        setAppState(prev => ({
            ...prev,
            painPoints: newPainPointsStatePartial 
        }));
    }

  }, [dynamicPainPointHierarchy, painPoints.activeMode, painPoints.selectedL1PainId, painPoints.selectedL2PainId, painPoints.selectedL3QuestionId, painPoints.showConversationView, painPoints.waterfallConversationLog, setAppState ]);


  const resetWaterfallState = useCallback((mode: PainPointMode) => {
    setAppState(prev => ({
      ...prev,
      painPoints: {
        ...initialPainPointsState, 
        activeMode: mode, 
        selectedProductForCheatSheet: mode === PainPointMode.REVERSE_WATERFALL && ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB.length > 0 
                                      ? ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB[0].id 
                                      : prev.painPoints.selectedProductForCheatSheet, 
      }
    }));
  }, [setAppState]);

  const handleModeChange = useCallback((mode: PainPointMode) => {
    resetWaterfallState(mode);
  }, [resetWaterfallState]);

  const addLogEntry = useCallback((entry: Omit<WaterfallLogEntry, 'timestamp'>) => {
    setAppState(prev => ({
      ...prev,
      painPoints: {
        ...prev.painPoints,
        waterfallConversationLog: [...prev.painPoints.waterfallConversationLog, entry]
      }
    }));
  }, [setAppState]);

  const handleL1PainSelect = useCallback((l1PainId: string) => {
    const l1Pain = dynamicPainPointHierarchy.find(p => p.id === l1PainId);
    if (!l1Pain) return;

    addLogEntry({ type: 'L1Pain', text: `Selected High-Level Business Pain: ${l1Pain.text}` });
    setAppState(prev => ({
      ...prev,
      painPoints: {
        ...prev.painPoints,
        selectedL1PainId: l1PainId,
        currentWaterfallStep: WaterfallStep.SELECT_L2_PAIN,
        selectedL2PainId: null,
        selectedL3QuestionId: null,
        answeredL3QuestionIds: [],
        selectedL3AnswerId: null,
        showNotAlignedMessage: false,
        currentL3AlignmentDetails: null,
        accumulatedL2Solutions: [],
      }
    }));
  }, [setAppState, dynamicPainPointHierarchy, addLogEntry]);

  const handleL2PainSelect = useCallback((l2PainId: string) => {
    const l1Pain = dynamicPainPointHierarchy.find(p => p.id === selectedL1PainId);
    const l2Pain = l1Pain?.level2Pains.find(p => p.id === l2PainId);
    if (!l2Pain) return;

    addLogEntry({ type: 'L2Pain', text: `Selected Process-Specific Pain: ${l2Pain.text}` });
    setAppState(prev => ({
      ...prev,
      painPoints: {
        ...prev.painPoints,
        selectedL2PainId: l2PainId,
        currentWaterfallStep: WaterfallStep.SELECT_L3_QUESTION,
        selectedL3QuestionId: null,
        answeredL3QuestionIds: [],
        selectedL3AnswerId: null,
        showNotAlignedMessage: false,
        currentL3AlignmentDetails: null,
        accumulatedL2Solutions: [],
      }
    }));
  }, [setAppState, selectedL1PainId, dynamicPainPointHierarchy, addLogEntry]);

  const handleL3QuestionSelect = useCallback((l3QuestionId: string) => {
    const l3QuestionText = dynamicPainPointHierarchy
        .flatMap(l1 => l1.level2Pains)
        .flatMap(l2 => l2.level3Questions)
        .find(q => q.id === l3QuestionId)?.text || 'Unknown Question';
    addLogEntry({ type: 'L3QuestionSelected', text: `Selected Question: ${l3QuestionText}` });
    setAppState(prev => ({
        ...prev,
        painPoints: {
            ...prev.painPoints,
            selectedL3QuestionId: l3QuestionId,
            currentWaterfallStep: WaterfallStep.ANSWER_L3_QUESTION,
            selectedL3AnswerId: null, 
            currentL3AlignmentDetails: null, 
        }
    }));
  }, [setAppState, dynamicPainPointHierarchy, addLogEntry]);


  const handleL3AnswerSelect = useCallback((answerId: string) => {
    const l1Pain = dynamicPainPointHierarchy.find(p => p.id === selectedL1PainId);
    const l2Pain = l1Pain?.level2Pains.find(p => p.id === selectedL2PainId);
    const currentL3Question = l2Pain?.level3Questions.find(q => q.id === selectedL3QuestionId);
    const selectedAnswer = currentL3Question?.answerOptions.find(opt => opt.id === answerId);

    if (!currentL3Question || !selectedAnswer) return;

    addLogEntry({ type: 'L3AnswerSelected', text: `Answered: ${selectedAnswer.text}` });
    
    let outcomeText = "";
    let newAccumulatedSolutions = [...accumulatedL2Solutions];

    if (selectedAnswer.leadsToSolutionMapping) {
        const solutionMapping = selectedAnswer.leadsToSolutionMapping;
        const solutions = solutionMapping.suggestedSolutionsProductIds
            .map(id => ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB.find(m => m.id === id)?.name)
            .filter(name => name)
            .join(', ');
        outcomeText = `Pain Identified: ${solutionMapping.painIdentified}. Suggested Solution(s): ${solutions || 'N/A'}`;
        addLogEntry({ type: 'L3Outcome', text: "Aligned with Solution", details: outcomeText });
        
        const accumulatedInfo: AccumulatedSolutionInfo = {
            questionId: currentL3Question.id,
            questionText: currentL3Question.text,
            answerId: selectedAnswer.id,
            answerText: selectedAnswer.text,
            solutionMapping: solutionMapping,
        };
        newAccumulatedSolutions.push(accumulatedInfo);
        
    } else if (selectedAnswer.isNotAligned) {
        outcomeText = "This aspect may not align with our core solutions.";
        addLogEntry({ type: 'L3Outcome', text: "Not Aligned for this Aspect", details: outcomeText });
    }
    
    setAppState(prev => ({
      ...prev,
      painPoints: {
        ...prev.painPoints,
        selectedL3AnswerId: answerId,
        currentWaterfallStep: WaterfallStep.SHOW_L3_OUTCOME,
        currentL3AlignmentDetails: selectedAnswer.leadsToSolutionMapping || null,
        answeredL3QuestionIds: [...prev.painPoints.answeredL3QuestionIds, selectedL3QuestionId!], 
        accumulatedL2Solutions: newAccumulatedSolutions,
      }
    }));
  }, [setAppState, selectedL1PainId, selectedL2PainId, selectedL3QuestionId, accumulatedL2Solutions, dynamicPainPointHierarchy, addLogEntry]);


  const handleContinueToNextL3QuestionSet = useCallback(() => {
    const l1Pain = dynamicPainPointHierarchy.find(p => p.id === selectedL1PainId);
    const l2Pain = l1Pain?.level2Pains.find(p => p.id === selectedL2PainId);
    
    if (!l2Pain) {
        console.error("L2 Pain not found in handleContinueToNextL3QuestionSet. Resetting Waterfall.");
        resetWaterfallState(PainPointMode.WATERFALL);
        return;
    }
    
    const remainingL3Ids = l2Pain.level3Questions.map(q => q.id).filter(id => !answeredL3QuestionIds.includes(id));

    if (remainingL3Ids.length > 0) {
        setAppState(prev => ({
            ...prev,
            painPoints: {
                ...prev.painPoints,
                selectedL3QuestionId: null, 
                selectedL3AnswerId: null,
                currentL3AlignmentDetails: null,
                currentWaterfallStep: WaterfallStep.SELECT_L3_QUESTION,
            }
        }));
    } else {
        setAppState(prev => ({
            ...prev,
            painPoints: {
                ...prev.painPoints,
                currentWaterfallStep: WaterfallStep.SHOW_L2_SUMMARY_OR_GLOBAL_OUTCOME,
                showNotAlignedMessage: prev.painPoints.accumulatedL2Solutions.length === 0, 
            }
        }));
    }
  }, [setAppState, selectedL1PainId, selectedL2PainId, answeredL3QuestionIds, dynamicPainPointHierarchy, resetWaterfallState]);


  const handleGlobalPainNotAligned = useCallback(() => {
    addLogEntry({ type: 'GlobalOutcome', text: "Pain Point Not Aligned with Core Solutions", details: "Recommendation: Follow up with a sales person. Use the 'Export' function to copy this conversation for the meeting invitation." });
    setAppState(prev => ({
        ...prev,
        painPoints: {
            ...prev.painPoints,
            showNotAlignedMessage: true, 
            currentWaterfallStep: WaterfallStep.SHOW_L2_SUMMARY_OR_GLOBAL_OUTCOME, 
            currentL3AlignmentDetails: null, 
        }
    }));
  }, [setAppState, addLogEntry]);

  const handleExportConversation = useCallback(() => {
    const filename = `PainPoint_Conversation_${appState.customerCompany || 'Client'}_${new Date().toISOString().slice(0,10)}.html`;
    
    let htmlContent = `
      <html>
        <head>
          <title>Pain Point Discovery Conversation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; color: #333; background-color: #f4f7f9;}
            .container { max-width: 800px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
            .info p { margin: 5px 0; }
            .log-entry { margin-bottom: 12px; padding: 12px; border-radius: 6px; border-left-width: 5px; border-left-style: solid; }
            .log-entry p { margin: 0 0 5px 0; }
            .log-entry p:last-child { margin-bottom: 0; }
            .L1Pain { background-color: #eaf5ff; border-left-color: #3498db; } /* Light Blue */
            .L2Pain { background-color: #d6eaf8; border-left-color: #2980b9; } /* Medium Blue */
            .L3QuestionSelected { background-color: #f9f9f9; border-left-color: #7f8c8d; margin-top:15px; }
            .L3QuestionSelected p { font-weight: bold; color: #34495e; }
            .L3AnswerSelected { background-color: #f1f2f6; border-left-color: #57606f; }
            .L3Outcome, .GlobalOutcome { font-weight: bold; }
            .L3Outcome.aligned { background-color: #e8f5e9; border-left-color: #4CAF50; color: #2e7d32;} /* Light Green */
            .L3Outcome.not-aligned-aspect { background-color: #fff9c4; border-left-color: #FFC107; color: #f57f17;} /* Light Yellow */
            .GlobalOutcome { background-color: #ffebee; border-left-color: #f44336; color: #c62828;} /* Light Red */
            .details { font-style: italic; color: #555; margin-top: 5px; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Pain Point Discovery Conversation</h1>
            <div class="info">
              <p><strong>Customer:</strong> ${appState.customerCompany || 'N/A'}</p>
              <p><strong>Date:</strong> ${appState.dateCompleted}</p>
            </div>
            <hr style="margin: 20px 0; border-color: #dfe6e9;"/>
    `;

    waterfallConversationLog.forEach(log => {
      let className = log.type;
      if (log.type === 'L3Outcome') {
        if (log.text === 'Aligned with Solution') className += ' aligned';
        else if (log.text === 'Not Aligned for this Aspect') className += ' not-aligned-aspect';
      }
      htmlContent += `<div class="log-entry ${className}">`;
      htmlContent += `<p>${log.text.replace(/\n/g, '<br/>')}</p>`;
      if (log.details) {
        htmlContent += `<p class="details">${log.details.replace(/\n/g, '<br/>')}</p>`;
      }
      htmlContent += `</div>`;
    });

    htmlContent += `</div></body></html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, [waterfallConversationLog, appState.customerCompany, appState.dateCompleted]);

  const handleProductSelectForCheatSheet = useCallback((productId: string) => {
    setAppState(prev => ({
      ...prev,
      painPoints: {
        ...prev.painPoints,
        selectedProductForCheatSheet: productId,
      }
    }));
  }, [setAppState]);

  const currentL2PainObject = useMemo(() => {
    if (!selectedL1PainId || !selectedL2PainId || dynamicPainPointHierarchy.length === 0) return null;
    const l1 = dynamicPainPointHierarchy.find(p => p.id === selectedL1PainId);
    return l1?.level2Pains.find(p => p.id === selectedL2PainId) || null;
  }, [selectedL1PainId, selectedL2PainId, dynamicPainPointHierarchy]);
  
  const l3QuestionsForCurrentL2 = useMemo(() => {
    return currentL2PainObject?.level3Questions || [];
  }, [currentL2PainObject]);

  const memoizedL3QuestionsToDisplay = useMemo(() => {
     return l3QuestionsForCurrentL2.filter(q => !answeredL3QuestionIds.includes(q.id));
  }, [l3QuestionsForCurrentL2, answeredL3QuestionIds]);


  const memoizedCurrentL3QuestionForAnswer = useMemo(() => {
    if (!selectedL3QuestionId) return null;
    return l3QuestionsForCurrentL2.find(q => q.id === selectedL3QuestionId) || null;
  }, [l3QuestionsForCurrentL2, selectedL3QuestionId]);

  useEffect(() => {
    if (
      currentWaterfallStep === WaterfallStep.SELECT_L3_QUESTION &&
      selectedL1PainId && 
      selectedL2PainId &&
      currentL2PainObject && 
      l3QuestionsForCurrentL2.length > 0 && 
      answeredL3QuestionIds.length === l3QuestionsForCurrentL2.length && 
      memoizedL3QuestionsToDisplay.length === 0 
    ) {
      handleContinueToNextL3QuestionSet();
    }
  }, [
    currentWaterfallStep,
    selectedL1PainId,
    selectedL2PainId,
    currentL2PainObject, 
    l3QuestionsForCurrentL2.length, 
    answeredL3QuestionIds.length,
    memoizedL3QuestionsToDisplay.length,
    handleContinueToNextL3QuestionSet,
  ]);


  const renderWaterfallMode = () => {
    const currentL1Pain = dynamicPainPointHierarchy.find(p => p.id === selectedL1PainId);
    const currentL2Pain = currentL1Pain?.level2Pains.find(p => p.id === selectedL2PainId);
    const currentL3QuestionToAnswer = memoizedCurrentL3QuestionForAnswer; 
    const selectedL3AnswerDetails = currentL3QuestionToAnswer?.answerOptions.find(opt => opt.id === selectedL3AnswerId);

    if (selectedL1PainId && !currentL1Pain && dynamicPainPointHierarchy.length > 0) {
        return <p className="text-red-500 p-4 bg-red-50 border border-red-200 rounded">Error: Selected Level 1 pain not found. The data might have changed. Please try restarting this section.</p>;
    }
    if (selectedL2PainId && !currentL2Pain && currentL1Pain) {
        return <p className="text-red-500 p-4 bg-red-50 border border-red-200 rounded">Error: Selected Level 2 pain not found. The data might have changed. Please select a Level 2 pain again.</p>;
    }


    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-md border border-blue-200">
          <p className="text-sm text-gray-700">
            You are in <strong>Waterfall Mode</strong>. This will guide you from a general business problem to a specific solution.
          </p>
          {(currentWaterfallStep > WaterfallStep.SELECT_L1_PAIN || waterfallConversationLog.length > 0) && 
            <Button onClick={() => resetWaterfallState(PainPointMode.WATERFALL)} variant="ghost" size="sm" className="!py-1 !px-2">Start Over</Button>
          }
        </div>

        {currentWaterfallStep === WaterfallStep.SELECT_L1_PAIN && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Step 1: What is the primary business challenge your customer is facing?</h3>
            {dynamicPainPointHierarchy.length === 0 ? (
                <p className="text-gray-500">No pain points configured. Please check admin settings.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dynamicPainPointHierarchy.map(l1Pain => (
                    <Button key={l1Pain.id} onClick={() => handleL1PainSelect(l1Pain.id)} variant="secondary" className="w-full text-left justify-start !py-3 h-auto">
                    {l1Pain.text}
                    </Button>
                ))}
                </div>
            )}
          </div>
        )}

        {currentWaterfallStep === WaterfallStep.SELECT_L2_PAIN && currentL1Pain && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Step 2: Which of these specific processes seems to be the biggest concern?</h3>
            <p className="text-sm text-gray-500 mb-3">Related to: <em>{currentL1Pain.text}</em></p>
             {currentL1Pain.level2Pains.length === 0 ? (
                <p className="text-gray-500">No specific process pains configured for this category. Please check admin settings or go back.</p>
            ) : (
                <div className="space-y-2">
                {currentL1Pain.level2Pains.map(l2Pain => (
                    <Button key={l2Pain.id} onClick={() => handleL2PainSelect(l2Pain.id)} variant="secondary" className="w-full text-left justify-start !py-3 h-auto">
                    {l2Pain.text}
                    </Button>
                ))}
                </div>
            )}
          </div>
        )}
        
        {currentWaterfallStep === WaterfallStep.SELECT_L3_QUESTION && currentL2Pain && l3QuestionsForCurrentL2.length > 0 && (
            <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                <h3 className="text-md font-semibold text-gray-700 mb-1">Step 3: Select a Discovery Question to ask:</h3>
                <p className="text-sm text-gray-500 mb-3">Related to: <em>{currentL2Pain.text}</em></p>
                {memoizedL3QuestionsToDisplay.length > 0 ? (
                  <div className="space-y-2">
                      {l3QuestionsForCurrentL2.map(l3q => {
                          const isAnswered = answeredL3QuestionIds.includes(l3q.id);
                          return (
                            <Button 
                              key={l3q.id} 
                              onClick={() => !isAnswered && handleL3QuestionSelect(l3q.id)} 
                              variant={isAnswered ? "secondary" : "secondary"}
                              className={`w-full text-left justify-start !py-3 h-auto ${isAnswered ? 'bg-orange-100 hover:bg-orange-200 border-orange-300 !text-orange-700 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                              disabled={isAnswered}
                            >
                                {l3q.text} {isAnswered && <span className="text-xs ml-2">(Answered)</span>}
                            </Button>
                          );
                      })}
                  </div>
                ) : (
                  <p className="text-gray-600">All questions for this path have been answered. Proceed to summary.</p> 
                )}
                <div className="mt-4">
                     <Button onClick={handleGlobalPainNotAligned} variant="danger" size="sm">Declare Pain Not Aligned (Skip Questions)</Button>
                </div>
            </div>
        )}
         {currentWaterfallStep === WaterfallStep.SELECT_L3_QUESTION && currentL2Pain && l3QuestionsForCurrentL2.length === 0 && (
            <div className="p-4 border border-yellow-200 rounded-lg shadow-sm bg-yellow-50">
                <p className="text-yellow-700">No discovery questions configured for: <em>{currentL2Pain.text}</em>. Please check admin settings or proceed to summary.</p>
                <Button onClick={() => setAppState(prev => ({...prev, painPoints: {...prev.painPoints, currentWaterfallStep: WaterfallStep.SHOW_L2_SUMMARY_OR_GLOBAL_OUTCOME, showNotAlignedMessage: true } }))} variant="primary" className="mt-3">View Summary</Button>
            </div>
        )}


        {currentWaterfallStep === WaterfallStep.ANSWER_L3_QUESTION && currentL3QuestionToAnswer && (
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-md font-semibold text-gray-700 mb-1">Provide Answer for:</h3>
            <p className="text-lg text-gray-800 mb-4">{currentL3QuestionToAnswer.text}</p>
            <div className="space-y-2">
              {currentL3QuestionToAnswer.answerOptions.map(opt => (
                <Button key={opt.id} onClick={() => handleL3AnswerSelect(opt.id)} variant="secondary" size="sm" className="w-full text-left justify-start !py-2 !px-3 h-auto min-h-[36px] items-center hover:bg-gray-100">
                  {opt.text}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {currentWaterfallStep === WaterfallStep.SHOW_L3_OUTCOME && selectedL3AnswerDetails && selectedL3QuestionId && (
          <div 
            className={`p-4 rounded-md shadow-sm ${currentL3AlignmentDetails ? 'bg-green-50 border border-green-300' : 'bg-yellow-50 border border-yellow-300'}`}
            aria-live="polite"
          >
            <h4 className="text-md font-semibold mb-2">Outcome for the recent question:</h4>
            <p className="mb-1"><strong>Question:</strong> {l3QuestionsForCurrentL2.find(q=>q.id === selectedL3QuestionId)?.text}</p>
            <p className="mb-3"><strong>Your Answer:</strong> {selectedL3AnswerDetails.text}</p>
            
            {currentL3AlignmentDetails && (
              <div className="space-y-1">
                <p><strong>Pain Identified:</strong> {currentL3AlignmentDetails.painIdentified}</p>
                <p><strong>Suggested Solution(s):</strong> 
                  {currentL3AlignmentDetails.suggestedSolutionsProductIds
                      .map(id => ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB.find(m => m.id === id)?.name)
                      .filter(name => name)
                      .join(', ') || 'N/A'}
                </p>
                <div className="mt-2 text-sm text-green-700 font-semibold flex items-center"><CheckCircleIcon className="w-5 h-5 mr-1"/> Aligned with Solution.</div>
              </div>
            )}
            {selectedL3AnswerDetails.isNotAligned && !currentL3AlignmentDetails && (
              <p className="text-yellow-700">This specific aspect may not align with our core solutions.</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={handleContinueToNextL3QuestionSet} variant="primary">
                {memoizedL3QuestionsToDisplay.filter(q => q.id !== selectedL3QuestionId).length > 0 ? "Continue with Remaining Questions" : "View Summary / Finish"}
              </Button>
            </div>
          </div>
        )}

        {currentWaterfallStep === WaterfallStep.SHOW_L2_SUMMARY_OR_GLOBAL_OUTCOME && (
            <div aria-live="polite">
                {showNotAlignedMessage && !accumulatedL2Solutions.length && ( 
                     <div className="p-4 border border-red-300 bg-red-50 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold text-red-700 flex items-center"><XCircleIcon className="w-5 h-5 mr-2"/>Action: Further Consultation Required</h3>
                        <p className="text-gray-700 mt-2">
                            Based on the information gathered for <em>{currentL2Pain?.text || 'the selected path'}</em>, the customer's primary needs may not be a direct fit for our core product suite.
                            <br />
                            <strong>Recommendation:</strong> Follow up with a <strong>sales person</strong>. Use the 'Export' function to copy this conversation for the meeting invitation.
                        </p>
                    </div>
                )}
                {accumulatedL2Solutions.length > 0 && (
                     <div className="p-4 border border-green-300 bg-green-50 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold text-green-700 flex items-center"><CheckCircleIcon className="w-5 h-5 mr-2"/>Potential Alignment Found for <em>{currentL2Pain?.text || 'the selected path'}</em>!</h3>
                        
                        <div className="mt-3 space-y-3">
                            {accumulatedL2Solutions.map((accSol, idx) => (
                                <div key={idx} className="p-3 border border-green-200 bg-white rounded">
                                    <p className="text-sm text-gray-600"><strong>Question:</strong> {accSol.questionText}</p>
                                    <p className="text-sm text-gray-600"><strong>Answer:</strong> {accSol.answerText}</p>
                                    <p className="text-sm text-green-700 mt-1">
                                        <strong>Pain Identified:</strong> {accSol.solutionMapping.painIdentified}
                                        <br/>
                                        <strong>Suggested Solution(s):</strong> {accSol.solutionMapping.suggestedSolutionsProductIds.map(id => ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB.find(m=>m.id===id)?.name).join(', ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-700 mt-3">
                            <strong>Recommendation:</strong> Review the exported conversation and discuss next steps with a <strong>sales person</strong>.
                        </p>
                         <Button variant="success" icon={<CheckCircleIcon/>} className="mt-3 w-full justify-center">
                            Aligned: Speak to Sales to Discuss Further
                        </Button>
                    </div>
                )}
                 {!showNotAlignedMessage && accumulatedL2Solutions.length === 0 && ( 
                     <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold text-yellow-700 flex items-center"><QuestionMarkCircleIcon className="w-5 h-5 mr-2"/>Discovery Complete for <em>{currentL2Pain?.text || 'the selected path'}</em> - Review Needed</h3>
                        <p className="text-gray-700 mt-2">
                            You have completed the questions for this path. No strong direct alignment was indicated by the answers for a specific module.
                            <br />
                            <strong>Recommendation:</strong> Export the conversation and review with a sales person to determine if there are underlying needs or if an alternative approach is required.
                        </p>
                    </div>
                )}
            </div>
        )}

        {waterfallConversationLog.length > 0 && (
          <div className="mt-6 pt-4 border-t flex flex-wrap gap-3">
            <Button onClick={() => setAppState(prev => ({ ...prev, painPoints: { ...prev.painPoints, showConversationView: true }}))} 
                    variant="secondary" icon={<EyeIcon />} iconPosition="left">
              View Conversation
            </Button>
            <Button onClick={handleExportConversation} variant="primary" icon={<ArrowDownTrayIcon />} iconPosition="left">
              Export Conversation (HTML)
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderReverseWaterfallMode = () => {
    const cheatSheet = selectedProductForCheatSheet ? dynamicReverseWaterfallCheatSheets[selectedProductForCheatSheet] : null;
    const selectedProduct = ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB.find(p => p.id === selectedProductForCheatSheet);

    return (
      <div className="space-y-6">
        <div className="bg-indigo-50 p-3 rounded-md border border-indigo-200">
          <p className="text-sm text-gray-700">
            You are in <strong>Reverse Waterfall Mode</strong>. Select a product to view a sales cheat sheet with key discovery questions and typical benefits.
          </p>
        </div>
        <Select
          label="Select Product Module for Cheat Sheet:"
          id="cheatSheetProductSelect"
          options={ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB.map(p => ({ value: p.id, label: `${p.name} (${p.technologyPartner || 'Generic'})` }))}
          value={selectedProductForCheatSheet || ""}
          onChange={(e) => handleProductSelectForCheatSheet(e.target.value)}
          placeholder="Select a product..."
        />
        {cheatSheet && selectedProduct && (
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 space-y-6" aria-live="polite">
            <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">Sales Cheat Sheet for: {selectedProduct.name}</h3>
                <p className="text-sm text-gray-600 mb-1"><strong>Technology Partner:</strong> {selectedProduct.technologyPartner || 'N/A'}</p>
                <p className="text-sm text-gray-600 mb-3"><strong>Objective:</strong> {cheatSheet.objective}</p>
                
                <div className="mb-4 p-3 bg-white border border-gray-200 rounded">
                    <p className="font-medium text-gray-700">Target High-Level Business Pain:</p>
                    <p className="text-gray-600">{cheatSheet.highLevelPain}</p>
                </div>
                <div className="mb-4 p-3 bg-white border border-gray-200 rounded">
                    <p className="font-medium text-gray-700">Target Specific Process Pain:</p>
                    <p className="text-gray-600">{cheatSheet.specificProcessPain}</p>
                </div>

                <h4 className="text-md font-semibold text-gray-700 mb-2 mt-4">Key Discovery Points & Aligning Answers:</h4>
                <ul className="space-y-3">
                {cheatSheet.keyDiscoveryPoints.map((point, index) => (
                    <li key={index} className="p-3 border border-gray-200 rounded-md bg-white">
                    <p className="font-medium text-gray-800">Q: {point.question}</p>
                    <p className="text-sm text-blue-600 mt-1"><em>Aligning A: {point.aligningAnswer}</em></p>
                    </li>
                ))}
                </ul>
            </div>
            
            {cheatSheet.keyBenefits && cheatSheet.keyBenefits.length > 0 && (
                <div className="p-4 border border-teal-300 bg-teal-50 rounded-lg shadow">
                    <h4 className="text-md font-semibold text-teal-700 mb-2">Key Benefits of {selectedProduct.name}:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-teal-800">
                        {cheatSheet.keyBenefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </div>
            )}

          </div>
        )}
        {!cheatSheet && selectedProductForCheatSheet && (
            <p className="text-yellow-600 p-3 bg-yellow-50 border border-yellow-200 rounded" aria-live="polite">Cheat sheet data not found for the selected product.</p>
        )}
      </div>
    );
  };

  if (showConversationView) {
    return (
        <section 
            className="p-6 bg-white shadow rounded-lg"
            role="region"
            aria-labelledby={`${tabIdValue}-conversation-log-heading`}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 id={`${tabIdValue}-conversation-log-heading`} className="text-xl font-semibold text-gray-800">Conversation Log</h2>
                <Button onClick={() => setAppState(prev => ({ ...prev, painPoints: { ...prev.painPoints, showConversationView: false }}))} 
                        variant="secondary" icon={<ArrowUturnLeftIcon />} iconPosition="left">
                  Back to Discovery
                </Button>
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto p-2 border rounded-md bg-gray-50">
                {waterfallConversationLog.map((log, index) => {
                    let className = log.type;
                    if (log.type === 'L3Outcome') {
                        if (log.text === 'Aligned with Solution') className += ' aligned';
                        else if (log.text === 'Not Aligned for this Aspect') className += ' not-aligned-aspect';
                    }
                    const entryClasses: Record<string, string> = {
                        L1Pain: "bg-blue-50 border-blue-300",
                        L2Pain: "bg-sky-50 border-sky-300",
                        L3QuestionSelected: "bg-gray-100 border-gray-300",
                        L3AnswerSelected: "bg-slate-100 border-slate-300",
                        L3Outcome_aligned: "bg-green-50 border-green-300 text-green-700",
                        L3Outcome_not_aligned_aspect: "bg-yellow-50 border-yellow-300 text-yellow-700",
                        GlobalOutcome: "bg-red-50 border-red-300 text-red-700",
                    };
                    const baseClass = "p-3 border rounded-md";
                    let determinedClass = entryClasses[log.type] || "bg-white border-gray-200";
                    if (log.type === 'L3Outcome') {
                        determinedClass = log.text === 'Aligned with Solution' ? entryClasses.L3Outcome_aligned : entryClasses.L3Outcome_not_aligned_aspect;
                    }


                    return (
                        <div key={index} className={`${baseClass} ${determinedClass}`}>
                            <p className="font-semibold">{log.type}: <span className="font-normal">{log.text}</span></p>
                            {log.details && <p className="text-sm italic text-gray-600 mt-1">Details: {log.details}</p>}
                        </div>
                    );
                })}
                {waterfallConversationLog.length === 0 && <p className="text-gray-500">No conversation logged yet.</p>}
            </div>
            <Button onClick={handleExportConversation} variant="primary" icon={<ArrowDownTrayIcon />} iconPosition="left" className="mt-4">
              Export Conversation (HTML)
            </Button>
        </section>
    );
  }

  return (
    <section 
      className="p-6 bg-white shadow rounded-lg"
      role="region"
      aria-labelledby={`${tabIdValue}-heading`}
    >
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h2 id={`${tabIdValue}-heading`} className="text-xl font-semibold text-gray-800">Pain Point Guided Discovery</h2>
        <RadioGroup<PainPointMode>
          name="painPointMode"
          options={[
            { value: PainPointMode.WATERFALL, label: "Waterfall Discovery" },
            { value: PainPointMode.REVERSE_WATERFALL, label: "Reverse Waterfall (Sales Cheat Sheet)" },
          ]}
          selectedValue={activeMode}
          onChange={handleModeChange}
          label="Select Mode:"
        />
      </div>
      {activeMode === PainPointMode.WATERFALL ? renderWaterfallMode() : renderReverseWaterfallMode()}
    </section>
  );
};
