

import React, { useState, useCallback, useMemo } from 'react';
import { TabProps, ConversationStepId, ConversationExchange, AutomationType, CustomerConversationState } from '../types';
import { FINANCE_MODULES, BUSINESS_MODULES, ALL_MODULES } from '../constants';
import Button from './common/Button';
import Textarea from './common/Textarea';
import Input from './common/Input';
import RadioGroup from './common/RadioGroup';
import { ChevronRightIcon, ChevronLeftIcon, CheckCircleIcon, XCircleIcon, ArrowDownTrayIcon } from './common/Icons';
import { triggerDownload, generateCustomerConversationExportContent } from '../services/exportService';

const STEPS_CONFIG = [
  { id: ConversationStepId.INTRODUCTION_OBJECTIVES, label: "1. Intro & Objectives" },
  { id: ConversationStepId.EXPLORATION_CHALLENGES, label: "2. Exploration" },
  { id: ConversationStepId.INTRODUCE_SOLUTION, label: "3. Solution Intro" },
  { id: ConversationStepId.QUALIFY_ARRANGE_FOLLOW_UP, label: "4. Qualify & Follow-up" },
  { id: ConversationStepId.WRAP_UP, label: "5. Wrap-up" },
];

const CustomerConversationsTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { customerConversations, customerCompany, dateCompleted } = appState;
  const { currentStep, exchanges, currentAutomationFocus, explorationInput, followUpDetails, generalNotes } = customerConversations;

  // Local state for current inputs within a step
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>({});
  const [currentModuleAnswers, setCurrentModuleAnswers] = useState<Record<string, Record<string, string>>>({}); // { [groupId]: { [moduleId]: answer } }
  const [currentExplorationInput, setCurrentExplorationInput] = useState(explorationInput);
  const [currentFollowUpDetails, setCurrentFollowUpDetails] = useState(followUpDetails);
  const [currentGeneralNotes, setCurrentGeneralNotes] = useState(generalNotes);

  const addExchange = useCallback((exchangeData: Partial<ConversationExchange>, stepIdOverride?: ConversationStepId) => {
    setAppState(prev => ({
      ...prev,
      customerConversations: {
        ...prev.customerConversations,
        exchanges: [
          ...prev.customerConversations.exchanges,
          {
            id: crypto.randomUUID(),
            stepId: stepIdOverride || prev.customerConversations.currentStep,
            type: 'script', // default
            prompt: '',
            answer: '',
            ...exchangeData,
          } as ConversationExchange,
        ],
      },
    }));
  }, [setAppState]);

  const updateStateValue = useCallback((key: keyof CustomerConversationState, value: any) => {
    setAppState(prev => ({
      ...prev,
      customerConversations: {
        ...prev.customerConversations,
        [key]: value,
      },
    }));
     // Sync local states if they are direct mirrors of appState
    if (key === 'explorationInput') setCurrentExplorationInput(value);
    if (key === 'followUpDetails') setCurrentFollowUpDetails(value);
    if (key === 'generalNotes') setCurrentGeneralNotes(value);
  }, [setAppState]);


  const handleInputChange = (id: string, value: string) => {
    setCurrentAnswers(prev => ({ ...prev, [id]: value }));
  };
  
  const handleModuleAnswerChange = (groupId: string, moduleId: string, value: string) => {
    setCurrentModuleAnswers(prev => ({
      ...prev,
      [groupId]: {
        ...(prev[groupId] || {}),
        [moduleId]: value,
      },
    }));
  };

  const navigateStep = (direction: 'next' | 'prev' | ConversationStepId) => {
    const currentIndex = STEPS_CONFIG.findIndex(s => s.id === currentStep);
    let nextStepId: ConversationStepId;

    if (typeof direction === 'string' && (direction === 'next' || direction === 'prev')) {
        if (direction === 'next' && currentIndex < STEPS_CONFIG.length - 1) {
            nextStepId = STEPS_CONFIG[currentIndex + 1].id;
        } else if (direction === 'prev' && currentIndex > 0) {
            nextStepId = STEPS_CONFIG[currentIndex - 1].id;
        } else {
            return; // Cannot move further
        }
    } else if (typeof direction === 'string') { // Direct navigation
        nextStepId = direction as ConversationStepId;
        if (!STEPS_CONFIG.some(s => s.id === nextStepId)) return; // Invalid step
    } else {
        return; // Should not happen
    }
    
    updateStateValue('currentStep', nextStepId);
    setCurrentAnswers({}); // Clear temp answers when moving steps
    setCurrentModuleAnswers({});
  };


  const scriptsAndQuestions = useMemo(() => {
    const introObjScripts = {
      s1_role_interest: "To start, could you share a bit about your role and what specifically led you to connect with us today?",
      s1_priorities_prompt: "That's insightful, thank you. Looking ahead 6-12 months, what are your organisation's top business priorities? Are you focusing on cost reduction, enhancing efficiency, or tackling other significant challenges?",
      q1_bottlenecks: "Are there particular bottlenecks or inefficiencies your team is actively working to resolve?",
      q1_focus_area: "Is your primary operational goal centred on improvements, scalability, customer satisfaction, or another key area?",
    };

    const solutionIntroScripts = {
      finance: "From what you've described, it seems there are potential areas where we could assist. For instance, many clients achieve significant improvements by streamlining their Finance processes. To ensure we align perfectly with your needs, I'd like to involve a specialist who can delve deeper into your specific goals and challenges.",
      business: "From what you've described, it seems there are potential areas where we could assist. For instance, many clients achieve significant improvements by streamlining their Business processes. To ensure we align perfectly with your needs, I'd like to involve a specialist who can delve deeper into your specific goals and challenges.",
      generic: "From what you've described, it seems there are potential areas where we could assist. Many clients achieve significant improvements by streamlining various operational processes. To ensure we align perfectly with your needs, I'd like to involve a specialist who can delve deeper into your specific goals and challenges."
    };
    
    const qualifyFollowUpScripts = {
      q4_explore_further: "Does exploring this further sound beneficial?",
      s4_arrange_call_finance: "If so, I can arrange a brief 30-minute call with an expert in Finance Automation to discuss this in more detail. Would you be open to that?",
      s4_arrange_call_business: "If so, I can arrange a brief 30-minute call with an expert in Business Automation to discuss this in more detail. Would you be open to that?",
      s4_arrange_call_generic: "If so, I can arrange a brief 30-minute call with one of our experts to discuss this in more detail. Would you be open to that?"
    };

    const wrapUpScripts = {
      s5_thank_you: "Thank you for your time today. It was valuable learning about your business. I'll send a follow-up email shortly with the meeting details. If anything else comes to mind, please feel free to reply to that email."
    };

    return { introObjScripts, solutionIntroScripts, qualifyFollowUpScripts, wrapUpScripts };
  }, []);
  
  const handleStep1Submit = () => {
    addExchange({ type: 'script', prompt: scriptsAndQuestions.introObjScripts.s1_role_interest });
    addExchange({ type: 'question', prompt: scriptsAndQuestions.introObjScripts.s1_role_interest, answer: currentAnswers['s1_role_interest_ans'] || "" });
    
    addExchange({ type: 'script', prompt: scriptsAndQuestions.introObjScripts.s1_priorities_prompt });
    addExchange({ type: 'question', prompt: scriptsAndQuestions.introObjScripts.s1_priorities_prompt, answer: currentAnswers['s1_priorities_ans'] || "" });
    
    addExchange({ type: 'question', prompt: scriptsAndQuestions.introObjScripts.q1_bottlenecks, answer: currentAnswers['q1_bottlenecks_ans'] || "" });
    addExchange({ type: 'question', prompt: scriptsAndQuestions.introObjScripts.q1_focus_area, answer: currentAnswers['q1_focus_area_ans'] || "" });
    
    updateStateValue('explorationInput', currentExplorationInput);

    let focus: AutomationType | null = null;
    const lowerInput = currentExplorationInput.toLowerCase();
    if (lowerInput.includes('finance') || lowerInput.includes('ap') || lowerInput.includes('payable') || lowerInput.includes('receivable') || lowerInput.includes('invoice') || lowerInput.includes('order processing') || lowerInput.includes('cash')) {
        focus = AutomationType.FINANCE;
    } else if (lowerInput.includes('business') || lowerInput.includes('document') || lowerInput.includes('workflow') || lowerInput.includes('process map') || lowerInput.includes('operation')) {
        focus = AutomationType.BUSINESS;
    }
    updateStateValue('currentAutomationFocus', focus);
    addExchange({ type: 'note', prompt: 'Inferred Automation Focus', answer: focus || 'Not clearly determined yet', automationFocus: focus });
    
    navigateStep('next');
  };

  const handleStep2Submit = () => {
    const moduleGroupId = `module_group_${currentAutomationFocus || 'generic'}`;
    const promptsForGroup = (currentAutomationFocus === AutomationType.FINANCE ? FINANCE_MODULES : (currentAutomationFocus === AutomationType.BUSINESS ? BUSINESS_MODULES : [])).slice(0, 3).map(m => ({
        moduleId: m.id,
        moduleName: m.name,
        promptQuestion: `Regarding ${m.name}, what are your current processes and any related challenges?`,
        answer: currentModuleAnswers[moduleGroupId]?.[m.id] || ""
    }));

    addExchange({
        type: 'module_question_group',
        prompt: `Focused ${currentAutomationFocus || 'General Automation'}`,
        modulePrompts: promptsForGroup,
        answer: `User explored ${currentAutomationFocus || 'general automation'} modules.`
    });
    navigateStep('next');
  };
  
  const handleStep3Submit = (customerResponsePositive: boolean) => {
    const scriptKey = currentAutomationFocus === AutomationType.FINANCE ? 'finance' : currentAutomationFocus === AutomationType.BUSINESS ? 'business' : 'generic';
    const script = scriptsAndQuestions.solutionIntroScripts[scriptKey];
    addExchange({ type: 'script', prompt: script });
    addExchange({ type: 'question', prompt: "Customer's reaction to solution introduction:", answer: currentAnswers['s3_customer_reaction'] || ""});

    if (customerResponsePositive) {
        updateStateValue('followUpDetails', { ...currentFollowUpDetails, interestConfirmed: true, specialistNeeded: currentAutomationFocus });
        navigateStep('next');
    } else {
        updateStateValue('followUpDetails', { ...currentFollowUpDetails, interestConfirmed: false });
        addExchange({ type: 'note', prompt: 'Lead Qualification', answer: 'Customer response not strongly positive for immediate follow-up with specialist.' });
        navigateStep(ConversationStepId.WRAP_UP); 
    }
  };

  const handleStep4Submit = () => {
    addExchange({ type: 'question', prompt: scriptsAndQuestions.qualifyFollowUpScripts.q4_explore_further, answer: currentFollowUpDetails.interestConfirmed ? "Yes" : "No" });
    
    const scriptKey = currentFollowUpDetails.specialistNeeded === AutomationType.FINANCE ? 's4_arrange_call_finance' : currentFollowUpDetails.specialistNeeded === AutomationType.BUSINESS ? 's4_arrange_call_business' : 's4_arrange_call_generic';
    addExchange({ type: 'script', prompt: scriptsAndQuestions.qualifyFollowUpScripts[scriptKey] });

    addExchange({ type: 'note', prompt: 'Follow-Up Details Arranged', answer: JSON.stringify(currentFollowUpDetails) });
    updateStateValue('followUpDetails', currentFollowUpDetails);
    navigateStep('next');
  };
  
  const handleStep5Submit = () => {
    addExchange({type: 'script', prompt: scriptsAndQuestions.wrapUpScripts.s5_thank_you });
    addExchange({type: 'note', prompt: 'Final Conversation Notes', answer: currentGeneralNotes});
    updateStateValue('generalNotes', currentGeneralNotes);
    alert("Conversation Concluded and Logged!");
  };

  const handleExportConversation = () => {
    const filename = `CustomerConversation_${customerCompany.replace(/\s/g, '_') || 'Export'}_${dateCompleted}.html`;
    const content = generateCustomerConversationExportContent(customerConversations, customerCompany, dateCompleted);
    triggerDownload(content, filename, 'html');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case ConversationStepId.INTRODUCTION_OBJECTIVES:
        return (
          <div className="space-y-4">
            <p className="text-sm italic text-gray-600">Script: "{scriptsAndQuestions.introObjScripts.s1_role_interest}"</p>
            <Textarea label="Customer's Response (Role & Interest):" id="s1_role_interest_ans" value={currentAnswers['s1_role_interest_ans'] || ''} onChange={e => handleInputChange('s1_role_interest_ans', e.target.value)} />
            
            <p className="text-sm italic text-gray-600 mt-4">Script: "{scriptsAndQuestions.introObjScripts.s1_priorities_prompt}"</p>
            <Textarea label="Customer's Response (Priorities):" id="s1_priorities_ans" value={currentAnswers['s1_priorities_ans'] || ''} onChange={e => handleInputChange('s1_priorities_ans', e.target.value)} />

            <p className="text-sm italic text-gray-600 mt-4">Question: "{scriptsAndQuestions.introObjScripts.q1_bottlenecks}"</p>
            <Textarea label="Customer's Response (Bottlenecks):" id="q1_bottlenecks_ans" value={currentAnswers['q1_bottlenecks_ans'] || ''} onChange={e => handleInputChange('q1_bottlenecks_ans', e.target.value)} />

            <p className="text-sm italic text-gray-600 mt-4">Question: "{scriptsAndQuestions.introObjScripts.q1_focus_area}"</p>
            <Textarea label="Customer's Response (Focus Area):" id="q1_focus_area_ans" value={currentAnswers['q1_focus_area_ans'] || ''} onChange={e => handleInputChange('q1_focus_area_ans', e.target.value)} />
            
            <Input label="Keywords from discussion (e.g., 'finance', 'documents', 'AP', 'workflow'):" id="explorationInput" value={currentExplorationInput} onChange={e => setCurrentExplorationInput(e.target.value)} placeholder="Helps determine automation focus"/>
            <Button onClick={handleStep1Submit} icon={<ChevronRightIcon />} iconPosition="right">Determine Focus &amp; Proceed</Button>
          </div>
        );
      case ConversationStepId.EXPLORATION_CHALLENGES:
        const modulesToShow = currentAutomationFocus === AutomationType.FINANCE 
            ? FINANCE_MODULES 
            : currentAutomationFocus === AutomationType.BUSINESS 
            ? BUSINESS_MODULES 
            : [];
        const moduleGroupId = `module_group_${currentAutomationFocus || 'generic'}`;

        return (
          <div className="space-y-4">
            <h3 className="text-md font-semibold">Exploring {currentAutomationFocus || "Potential Automation Areas"}</h3>
            {modulesToShow.length > 0 ? modulesToShow.slice(0,3).map(module => ( // Show first 3 relevant modules
              <div key={module.id} className="p-3 border rounded-md bg-gray-50">
                <p className="text-sm italic text-gray-600">High-level question for {module.name}: "Regarding {module.name}, what are your current processes and any related challenges?"</p>
                <Textarea 
                  label={`Notes on ${module.name}:`} 
                  id={`module_ans_${module.id}`} 
                  value={currentModuleAnswers[moduleGroupId]?.[module.id] || ''} 
                  onChange={e => handleModuleAnswerChange(moduleGroupId, module.id, e.target.value)} 
                  rows={2}
                />
              </div>
            )) : <p className="text-gray-500">No specific modules pre-selected. Describe general challenges.</p>}
            <Textarea label="General Challenges / Other Areas Discussed:" id="general_challenges_ans" value={currentAnswers['general_challenges_ans'] || ''} onChange={e => handleInputChange('general_challenges_ans', e.target.value)} />
            <Button onClick={handleStep2Submit} icon={<ChevronRightIcon />} iconPosition="right">Proceed to Solution Intro</Button>
          </div>
        );
      case ConversationStepId.INTRODUCE_SOLUTION:
        const scriptKey = currentAutomationFocus === AutomationType.FINANCE ? 'finance' : currentAutomationFocus === AutomationType.BUSINESS ? 'business' : 'generic';
        return (
          <div className="space-y-4">
            <p className="text-sm italic text-gray-600">Script: "{scriptsAndQuestions.solutionIntroScripts[scriptKey]}"</p>
            <Textarea label="Customer's Response / Notes:" id="s3_customer_reaction" value={currentAnswers['s3_customer_reaction'] || ''} onChange={e => handleInputChange('s3_customer_reaction', e.target.value)} />
            <div className="flex space-x-2">
                <Button onClick={() => handleStep3Submit(true)} variant="success" icon={<CheckCircleIcon />} iconPosition="left">Response Positive</Button>
                <Button onClick={() => handleStep3Submit(false)} variant="danger" icon={<XCircleIcon />} iconPosition="left">Response Negative/Neutral</Button>
            </div>
          </div>
        );
      case ConversationStepId.QUALIFY_ARRANGE_FOLLOW_UP:
        const specialistNeededScriptKey = currentFollowUpDetails.specialistNeeded === AutomationType.FINANCE ? 's4_arrange_call_finance' : currentFollowUpDetails.specialistNeeded === AutomationType.BUSINESS ? 's4_arrange_call_business' : 's4_arrange_call_generic';
        return (
          <div className="space-y-4">
            <RadioGroup
                label={scriptsAndQuestions.qualifyFollowUpScripts.q4_explore_further}
                name="interestConfirmed"
                options={[{value: "true", label:"Yes"}, {value: "false", label: "No"}]}
                selectedValue={currentFollowUpDetails.interestConfirmed === null ? "" : currentFollowUpDetails.interestConfirmed.toString()}
                onChange={(val) => setCurrentFollowUpDetails(prev => ({...prev, interestConfirmed: val === "true"}))}
            />
            {currentFollowUpDetails.interestConfirmed && (
                <>
                    <p className="text-sm italic text-gray-600 mt-4">Script: "{scriptsAndQuestions.qualifyFollowUpScripts[specialistNeededScriptKey]}"</p>
                    <Input label="Contact Name for Follow-up:" id="contactName" value={currentFollowUpDetails.contactName} onChange={e => setCurrentFollowUpDetails(prev => ({...prev, contactName: e.target.value}))} />
                    <Input label="Contact Email:" type="email" id="contactEmail" value={currentFollowUpDetails.contactEmail} onChange={e => setCurrentFollowUpDetails(prev => ({...prev, contactEmail: e.target.value}))} />
                    <Input label="Proposed Meeting Date (YYYY-MM-DD):" type="date" id="meetingDate" value={currentFollowUpDetails.meetingDate} onChange={e => setCurrentFollowUpDetails(prev => ({...prev, meetingDate: e.target.value}))} />
                    <Input label="Proposed Meeting Time (HH:MM):" type="time" id="meetingTime" value={currentFollowUpDetails.meetingTime} onChange={e => setCurrentFollowUpDetails(prev => ({...prev, meetingTime: e.target.value}))} />
                    <Input label="Specialist Needed (auto-filled):" id="specialistNeeded" value={currentFollowUpDetails.specialistNeeded || "N/A"} readOnly />
                    <Textarea label="Additional Notes for Follow-up Scheduling:" id="followUpNotes" value={currentFollowUpDetails.notes} onChange={e => setCurrentFollowUpDetails(prev => ({...prev, notes: e.target.value}))} />
                </>
            )}
            <Button onClick={handleStep4Submit} icon={<ChevronRightIcon />} iconPosition="right">Log Follow-Up &amp; Proceed</Button>
          </div>
        );
      case ConversationStepId.WRAP_UP:
        return (
          <div className="space-y-4">
            <p className="text-sm italic text-gray-600">Script: "{scriptsAndQuestions.wrapUpScripts.s5_thank_you}"</p>
            <Textarea label="Any final general notes for this conversation:" id="generalNotes" value={currentGeneralNotes} onChange={e => setCurrentGeneralNotes(e.target.value)} />
            <div className="flex flex-wrap gap-2">
                <Button onClick={handleStep5Submit} variant="primary">Finish Conversation</Button>
                <Button 
                    onClick={handleExportConversation} 
                    variant="secondary" 
                    icon={<ArrowDownTrayIcon />} 
                    iconPosition="left"
                >
                    Export Conversation (HTML)
                </Button>
            </div>
          </div>
        );
      default:
        return <p>Unknown step.</p>;
    }
  };
  
  const currentStepIndex = STEPS_CONFIG.findIndex(s => s.id === currentStep);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Conversation Guide</h2>
        
        <div className="mb-6 flex flex-wrap justify-center items-center gap-1 border-b pb-3">
            {STEPS_CONFIG.map((step, index) => (
            <React.Fragment key={step.id}>
                <Button
                    onClick={() => navigateStep(step.id)}
                    variant={currentStep === step.id ? 'primary' : 'secondary'}
                    size="sm"
                    className={`!px-2 !py-1 md:!px-3 md:!py-1.5 ${currentStepIndex > index ? '!bg-green-500 hover:!bg-green-600' : ''}`}
                    title={step.label.substring(step.label.indexOf(". ") + 2)}
                >
                    <span className="hidden sm:inline">{step.label}</span>
                    <span className="sm:hidden">{step.label.substring(0, step.label.indexOf("."))}</span>
                </Button>
                {index < STEPS_CONFIG.length - 1 && <ChevronRightIcon className="w-4 h-4 text-gray-400 hidden md:inline"/>}
            </React.Fragment>
            ))}
        </div>

        <div className="current-step-content p-4 border rounded-md bg-gray-50 min-h-[300px]">
            {renderCurrentStep()}
        </div>

        <div className="mt-6 flex justify-between">
            <Button onClick={() => navigateStep('prev')} disabled={currentStepIndex === 0} icon={<ChevronLeftIcon/>} iconPosition="left">
                Previous
            </Button>
            <Button onClick={() => navigateStep('next')} disabled={currentStepIndex === STEPS_CONFIG.length - 1} icon={<ChevronRightIcon/>} iconPosition="right">
                Next
            </Button>
        </div>

        {exchanges.length > 0 && (
            <details className="mt-6 text-sm">
                <summary className="cursor-pointer text-blue-600 hover:text-blue-800">View Conversation Log ({exchanges.length} entries)</summary>
                <div className="mt-2 p-3 bg-gray-100 rounded max-h-96 overflow-y-auto space-y-2">
                    {exchanges.map(ex => (
                        <div key={ex.id} className="p-2 border-b">
                            <p><strong>Step:</strong> {ex.stepId}</p>
                            <p><strong>Type:</strong> {ex.type}</p>
                            <p><strong>Prompt/Script:</strong> {ex.prompt}</p>
                            {ex.type === 'question' && <p><strong>Answer:</strong> {ex.answer}</p>}
                            {ex.type === 'module_question_group' && ex.modulePrompts?.map(mp => (
                                <div key={mp.moduleId} className="ml-4 pl-2 border-l">
                                    <p><strong>Module:</strong> {mp.moduleName}</p>
                                    <p><strong>Q:</strong> {mp.promptQuestion}</p>
                                    <p><strong>A:</strong> {mp.answer}</p>
                                </div>
                            ))}
                             {ex.type === 'note' && <p><strong>Details:</strong> {ex.answer}</p>}
                            {ex.automationFocus && <p><em>Focus: {ex.automationFocus}</em></p>}
                        </div>
                    ))}
                </div>
            </details>
        )}
    </div>
  );
};

export default CustomerConversationsTab;