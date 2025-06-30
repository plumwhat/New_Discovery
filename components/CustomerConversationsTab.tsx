

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { TabProps, ConversationStepId, ConversationExchange, ServiceType, CustomerConversationState, TabId, Module, ExportFormat, ScriptItemType, ScriptItem, ConversationSectionConfig } from '../types'; // Renamed AutomationType to ServiceType
import { FINANCE_MODULES, BUSINESS_MODULES, ALL_MODULES, ITS_MODULES } from '../constants/moduleConstants'; // Added ITS_MODULES
import Button from './common/Button';
import Textarea from './common/Textarea';
import Input from './common/Input';
import RadioGroup from './common/RadioGroup';
import { ChevronRightIcon, ChevronLeftIcon, CheckCircleIcon, XCircleIcon, ArrowDownTrayIcon, PlusCircleIcon, MinusCircleIcon, ChatBubbleLeftIcon, ArrowUpIcon, EyeIcon } from './common/Icons';
import { triggerDownload, generateCustomerConversationExportContent } from '../services/exportService';


const SCRIPT_SECTIONS_CONFIG: ConversationSectionConfig[] = [
  {
    id: ConversationStepId.INTRODUCTION_OBJECTIVES,
    title: "1. Introduction & Objectives",
    scriptItems: [
      { id: "s1_intro", type: "script", text: "Good [morning/afternoon/evening], [Customer Name]. This is [Your Name] from [Your Company]. Thank you for taking the time to speak with me today. The main goal of our conversation is to understand your current processes, any challenges you might be facing, and to see if our solutions could potentially help your business." },
      { id: "s1_role_interest", type: "question_textarea", text: "To start, could you share a bit about your role and what specifically led you to connect with us today?", placeholder: "Customer's role, primary interests, pain points mentioned..." },
      { id: "s1_priorities_prompt", type: "script", text: "That's insightful, thank you. Looking ahead 6-12 months, what are your organisation's top business priorities? Are you focusing on cost reduction, enhancing efficiency, or tackling other significant challenges?" },
      { id: "s1_priorities_ans", type: "question_textarea", text: "Customer's response to priorities:", placeholder: "Record key priorities, strategic goals..." },
      { id: "s1_bottlenecks_q", type: "question_textarea", text: "Are there particular bottlenecks or inefficiencies your team is actively working to resolve?", placeholder: "Specific bottlenecks, current initiatives..." },
      { id: "s1_focus_area_q", type: "question_textarea", text: "Is your primary operational goal centred on improvements, scalability, customer satisfaction, or another key area?", placeholder: "Main operational drivers..." },
      { id: "s1_exploration_input_prompt", type: "input_prompt", text: "Based on this initial discussion, what key areas or processes seem most relevant for potential automation or service improvement? (e.g., 'finance', 'invoicing', 'documents', 'IT support', 'cybersecurity', 'cloud')", placeholder: "Keywords: finance, AP, documents, IT support, cloud...", targetStateProperty: "explorationInput" },
    ],
    nextSectionId: ConversationStepId.EXPLORATION_CHALLENGES,
    postLogic: (state, answers) => {
      let focus: ServiceType | null = null;
      const lowerInput = state.explorationInput.toLowerCase();
      if (lowerInput.includes('finance') || lowerInput.includes('ap') || lowerInput.includes('payable') || lowerInput.includes('receivable') || lowerInput.includes('invoice') || lowerInput.includes('cash') || lowerInput.includes('order processing')) {
          focus = ServiceType.FINANCE;
      } else if (lowerInput.includes('business') || lowerInput.includes('document') || lowerInput.includes('workflow') || lowerInput.includes('process map') || lowerInput.includes('operation')) {
          focus = ServiceType.BUSINESS;
      } else if (lowerInput.includes('it support') || lowerInput.includes('cybersecurity') || lowerInput.includes('cloud') || lowerInput.includes('network') || lowerInput.includes('managed services') || lowerInput.includes('it services') || lowerInput.includes('its')) {
          focus = ServiceType.ITS;
      }
      return { currentServiceFocus: focus, explorationInput: state.explorationInput }; 
    }
  },
  {
    id: ConversationStepId.EXPLORATION_CHALLENGES,
    title: "2. Exploration & Challenges",
    scriptItems: [
      { id: "s2_focus_intro", type: "script", text: "Thanks, that helps narrow things down. Let's explore the [SERVICE_FOCUS_TEXT] area a bit more." }, 
      { id: "s2_module_questions_finance", type: "module_question_group", text: "Finance Process Challenges", moduleServiceFocus: ServiceType.FINANCE }, 
      { id: "s2_module_questions_business", type: "module_question_group", text: "Business Process Challenges", moduleServiceFocus: ServiceType.BUSINESS }, 
      { id: "s2_module_questions_its", type: "module_question_group", text: "IT Service Challenges", moduleServiceFocus: ServiceType.ITS }, 
      { id: "s2_general_challenges", type: "question_textarea", text: "Are there any other significant challenges or inefficiencies in this area that we haven't touched upon?", placeholder: "Other related pain points or issues..." }
    ],
    nextSectionId: ConversationStepId.INTRODUCE_SOLUTION,
  },
  {
    id: ConversationStepId.INTRODUCE_SOLUTION,
    title: "3. Introduce Solution (High-Level)",
    scriptItems: [
      { id: "s3_solution_intro_script", type: "script", text: "From what you've described, it seems there are potential areas where we could assist. For instance, many clients achieve significant improvements by streamlining their [SERVICE_FOCUS_TEXT] processes/services. To ensure we align perfectly with your needs, I'd like to involve a specialist who can delve deeper into your specific goals and challenges." }, 
      { id: "s3_customer_reaction", type: "question_textarea", text: "What are your initial thoughts on that? Does this sound like something that could be beneficial?", placeholder: "Customer's reaction, level of interest..." },
      { id: "s3_interest_confirmed_buttons", type: "interest_buttons", text: "Based on their reaction, is there interest in exploring further with a specialist?" }
    ],
    nextSectionId: ConversationStepId.QUALIFY_ARRANGE_FOLLOW_UP,
    postLogic: (state) => ({ followUpDetails: {...state.followUpDetails, specialistNeeded: state.followUpDetails.interestConfirmed ? state.currentServiceFocus : null }}) 
  },
  {
    id: ConversationStepId.QUALIFY_ARRANGE_FOLLOW_UP,
    title: "4. Qualify & Arrange Follow-Up",
    scriptItems: [
      { id: "s4_confirm_interest_script", type: "script", text: "Great. So, to confirm, exploring this further sounds beneficial?" },
      { id: "s4_arrange_call_script", type: "script", text: "If so, I can arrange a brief 30-minute call with an expert in [SERVICE_FOCUS_TEXT] to discuss this in more detail. Would you be open to that?" }, 
      { id: "s4_contact_name", type: "input_prompt", text: "Who would be the best person for that follow-up call?", placeholder: "Contact Name", targetStateProperty: "contactName" },
      { id: "s4_contact_email", type: "input_prompt", text: "And their email address?", placeholder: "Contact Email", targetStateProperty: "contactEmail" },
      { id: "s4_meeting_date", type: "input_prompt", text: "Any preferred dates for the call next week?", placeholder: "e.g., Tuesday or Wednesday afternoon", targetStateProperty: "meetingDate" },
      { id: "s4_meeting_time", type: "input_prompt", text: "Any preferred times?", placeholder: "e.g., 2 PM EST", targetStateProperty: "meetingTime" },
      { id: "s4_specialist_needed_info", type: "script", text: "We'll ensure a [SERVICE_FOCUS_TEXT] specialist is on the call." }, 
      { id: "s4_additional_notes_fu", type: "question_textarea", text: "Any additional notes for scheduling or for the specialist?", placeholder: "Specific topics, other attendees...", targetStateProperty: "notes" },
    ],
    nextSectionId: ConversationStepId.WRAP_UP,
  },
  {
    id: ConversationStepId.WRAP_UP,
    title: "5. Wrap-Up",
    scriptItems: [
      { id: "s5_thank_you_script", type: "script", text: "Excellent. Thank you for your time today, [Customer Name]. It was valuable learning about your business. I'll send a follow-up email shortly confirming these details and proposing a few specific times for the specialist call. If anything else comes to mind, please feel free to reply to that email." },
      { id: "s5_final_notes", type: "final_notes", text: "Any final overall notes for this conversation?", placeholder: "Summarise key takeaways, next actions, sentiment...", targetStateProperty: "generalNotes" },
    ],
  },
];


const CustomerConversationsTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { customerConversations, customerCompany, dateCompleted } = appState;
  const { activeSectionId, completedSectionIds, exchangeAnswers, moduleExchangeAnswers, currentServiceFocus, explorationInput, followUpDetails, generalNotes, exchanges } = customerConversations; 
  const tabIdValue = TabId.CUSTOMER_CONVERSATIONS;
  const sectionsContainerRef = useRef<HTMLDivElement>(null);

  const [expandedNoteAreas, setExpandedNoteAreas] = useState<Record<string, boolean>>({});
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const handleToggleNoteArea = (itemId: string) => {
    setExpandedNoteAreas(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleAnswerChange = useCallback((itemId: string, value: string) => {
    setAppState(prev => ({
      ...prev,
      customerConversations: {
        ...prev.customerConversations,
        exchangeAnswers: {
          ...prev.customerConversations.exchangeAnswers,
          [itemId]: value,
        }
      }
    }));
  }, [setAppState]);
  
  const handleModuleAnswerChange = useCallback((groupId: string, moduleId: string, value: string) => {
    setAppState(prev => ({
      ...prev,
      customerConversations: {
        ...prev.customerConversations,
        moduleExchangeAnswers: {
          ...prev.customerConversations.moduleExchangeAnswers,
          [groupId]: {
            ...(prev.customerConversations.moduleExchangeAnswers[groupId] || {}),
            [moduleId]: value,
          }
        }
      }
    }));
  }, [setAppState]);

  const handleDirectStateChange = useCallback((property: keyof CustomerConversationState['followUpDetails'] | 'explorationInput' | 'generalNotes', value: any) => {
      setAppState(prev => {
        const newState = { ...prev.customerConversations };
        if (property === 'interestConfirmed') {
          newState.followUpDetails.interestConfirmed = value; 
        } else if (['contactName', 'contactEmail', 'meetingDate', 'meetingTime', 'notes', 'specialistNeeded'].includes(property)) {
          (newState.followUpDetails as any)[property] = value;
        } else if (property === 'explorationInput') {
          newState.explorationInput = value as string;
        } else if (property === 'generalNotes') {
          newState.generalNotes = value as string;
        }
        return { ...prev, customerConversations: newState };
      });
  }, [setAppState]);


  const handleContinue = useCallback(() => {
    const currentSectionConfig = SCRIPT_SECTIONS_CONFIG.find(s => s.id === activeSectionId);
    if (!currentSectionConfig) return;

    let updatedStateFromPostLogic: Partial<Pick<CustomerConversationState, 'currentServiceFocus' | 'followUpDetails' | 'explorationInput'>> = {}; 
    if (currentSectionConfig.postLogic) {
      updatedStateFromPostLogic = currentSectionConfig.postLogic(appState.customerConversations, exchangeAnswers);
    }
    
    const newExchanges: ConversationExchange[] = [];
    currentSectionConfig.scriptItems.forEach(item => {
      if (item.type === 'script') {
        newExchanges.push({
          id: crypto.randomUUID(), sectionId: activeSectionId, scriptItemId: item.id,
          type: 'script_presented', promptText: item.text
        });
      } else if (item.type === 'question_textarea' && exchangeAnswers[item.id]) {
        newExchanges.push({
          id: crypto.randomUUID(), sectionId: activeSectionId, scriptItemId: item.id,
          type: 'question_answered', promptText: item.text, answerText: exchangeAnswers[item.id]
        });
      } else if (item.type === 'input_prompt' && item.targetStateProperty) {
         const value = item.targetStateProperty === 'explorationInput' ? explorationInput : followUpDetails[item.targetStateProperty as keyof typeof followUpDetails];
         if (value !== undefined && value !== null && value !== '') {
            newExchanges.push({
              id: crypto.randomUUID(), sectionId: activeSectionId, scriptItemId: item.id,
              type: 'question_answered', promptText: item.text, answerText: String(value)
            });
         }
      } else if (item.type === 'interest_buttons' && followUpDetails.interestConfirmed !== null) {
          newExchanges.push({
            id: crypto.randomUUID(), sectionId: activeSectionId, scriptItemId: item.id,
            type: 'question_answered', promptText: item.text, answerText: String(followUpDetails.interestConfirmed)
          });
      } else if (item.type === 'radio_group' && item.targetStateProperty && followUpDetails[item.targetStateProperty as keyof typeof followUpDetails] !== null) {
          newExchanges.push({
            id: crypto.randomUUID(), sectionId: activeSectionId, scriptItemId: item.id,
            type: 'question_answered', promptText: item.text, answerText: String(followUpDetails[item.targetStateProperty as keyof typeof followUpDetails])
          });
      } else if (item.type === 'module_question_group' && moduleExchangeAnswers[item.id]) {
          Object.entries(moduleExchangeAnswers[item.id]).forEach(([moduleId, answer]) => {
            if (answer) {
              const module = ALL_MODULES.find(m => m.id === moduleId);
              newExchanges.push({
                id: crypto.randomUUID(), sectionId: activeSectionId, scriptItemId: item.id,
                type: 'module_question_answered', moduleKey: moduleId, 
                promptText: `Regarding ${module?.name || 'Unknown Module'}: ${item.text}`, 
                answerText: answer
              });
            }
          });
      } else if (item.type === 'final_notes' && generalNotes) {
         newExchanges.push({
            id: crypto.randomUUID(), sectionId: activeSectionId, scriptItemId: item.id,
            type: 'note_taken', promptText: item.text, answerText: generalNotes
          });
      }
    });
    if (updatedStateFromPostLogic.currentServiceFocus !== undefined && updatedStateFromPostLogic.currentServiceFocus !== currentServiceFocus) { 
        newExchanges.push({
            id: crypto.randomUUID(), sectionId: activeSectionId, type: 'focus_determined', answerText: updatedStateFromPostLogic.currentServiceFocus || "Not Determined" 
        });
    }


    setAppState(prev => ({
      ...prev,
      customerConversations: {
        ...prev.customerConversations,
        ...updatedStateFromPostLogic,
        completedSectionIds: [...new Set([...prev.customerConversations.completedSectionIds, activeSectionId])],
        activeSectionId: currentSectionConfig.nextSectionId || activeSectionId,
        exchanges: [...prev.customerConversations.exchanges, ...newExchanges],
      }
    }));

    if (currentSectionConfig.nextSectionId) {
      setTimeout(() => { 
        const nextSectionElement = document.getElementById(`section-${currentSectionConfig.nextSectionId}`);
        nextSectionElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

  }, [activeSectionId, appState.customerConversations, exchangeAnswers, moduleExchangeAnswers, explorationInput, followUpDetails, generalNotes, setAppState, currentServiceFocus]); 

  const handleExportConversation = () => {
    const filename = `CustomerConversation_${customerCompany.replace(/\s/g, '_') || 'Export'}_${dateCompleted}.html`;
    const content = generateCustomerConversationExportContent(customerConversations, customerCompany, dateCompleted, ExportFormat.HTML);
    triggerDownload(content, filename, 'html');
  };

  const handleInterestConfirmation = (isInterested: boolean) => {
    handleDirectStateChange('interestConfirmed', isInterested);
  };

  const renderScriptItem = (item: ScriptItem, sectionId: ConversationStepId) => {
    const focusText = currentServiceFocus || "relevant services"; 
    const itemText = item.text.replace(/\[SERVICE_FOCUS_TEXT\]/g, focusText); 

    switch (item.type) {
      case 'script':
        return <p key={item.id} className="text-md italic text-gray-700 my-3 p-3 bg-[#E6F4F1] border-l-4 border-[#01916D] rounded">{itemText}</p>; 
      case 'input_prompt':
        const value = item.targetStateProperty === 'explorationInput' 
          ? explorationInput 
          : item.targetStateProperty && followUpDetails.hasOwnProperty(item.targetStateProperty)
          ? followUpDetails[item.targetStateProperty as keyof typeof followUpDetails] || ''
          : '';
        return (
          <div key={item.id} className="my-3">
            <Input
              label={itemText}
              id={`${sectionId}-${item.id}`}
              value={String(value)}
              onChange={(e) => item.targetStateProperty && handleDirectStateChange(item.targetStateProperty as any, e.target.value)}
              placeholder={item.placeholder}
              className="bg-white"
            />
          </div>
        );
      case 'question_textarea':
        return (
          <div key={item.id} className="my-4 p-3 border border-gray-200 rounded-md bg-white shadow-sm">
            <p className="text-md font-medium text-gray-800 mb-2">{itemText}</p>
            <Button
              onClick={() => handleToggleNoteArea(item.id)}
              variant="secondary"
              size="sm"
              icon={expandedNoteAreas[item.id] ? <MinusCircleIcon /> : <ChatBubbleLeftIcon />}
              iconPosition="left"
              className="mb-2"
            >
              {expandedNoteAreas[item.id] ? 'Hide Notes' : 'Add/Edit Notes'}
            </Button>
            {expandedNoteAreas[item.id] && (
              <Textarea
                id={`${sectionId}-${item.id}-ans`}
                value={exchangeAnswers[item.id] || ''}
                onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                placeholder={item.placeholder || "Record customer's response here..."}
                rows={3}
                className="bg-yellow-50 focus:bg-white"
                aria-label={`Response to: ${itemText}`}
              />
            )}
          </div>
        );
      case 'module_question_group':
        if (item.moduleServiceFocus && item.moduleServiceFocus !== currentServiceFocus) return null;  
        let modulesToDisplay: Module[] = [];
        if (currentServiceFocus === ServiceType.FINANCE) modulesToDisplay = FINANCE_MODULES;
        else if (currentServiceFocus === ServiceType.BUSINESS) modulesToDisplay = BUSINESS_MODULES;
        else if (currentServiceFocus === ServiceType.ITS) modulesToDisplay = ITS_MODULES; 

        return (
          <div key={item.id} className="my-4 p-3 border border-indigo-200 rounded-md bg-indigo-50 shadow-sm">
            <h4 className="text-md font-semibold text-indigo-700 mb-2">{itemText.replace(/\[SERVICE_FOCUS_TEXT\]/g, focusText)}</h4>
            {modulesToDisplay.length > 0 ? modulesToDisplay.slice(0, 3).map(module => ( 
              <div key={module.id} className="my-3 p-2 border-t border-indigo-100">
                <p className="text-sm font-medium text-gray-800 mb-1">Regarding {module.name}: What are their current processes and any related challenges in this area?</p>
                <Button
                    onClick={() => handleToggleNoteArea(`${item.id}-${module.id}`)}
                    variant="secondary"
                    size="sm"
                    icon={expandedNoteAreas[`${item.id}-${module.id}`] ? <MinusCircleIcon /> : <ChatBubbleLeftIcon />}
                    className="!py-1 !px-2 mb-1 text-xs"
                >
                    {expandedNoteAreas[`${item.id}-${module.id}`] ? 'Hide' : 'Notes'} for {module.name}
                </Button>
                {expandedNoteAreas[`${item.id}-${module.id}`] && (
                    <Textarea
                        id={`${sectionId}-${item.id}-${module.id}-ans`}
                        value={moduleExchangeAnswers[item.id]?.[module.id] || ''}
                        onChange={(e) => handleModuleAnswerChange(item.id, module.id, e.target.value)}
                        placeholder={`Notes for ${module.name}...`}
                        rows={2}
                        className="bg-yellow-50 focus:bg-white text-sm"
                        aria-label={`Response for ${module.name}`}
                    />
                )}
              </div>
            )) : <p className="text-sm text-gray-500">No specific modules pre-selected for {focusText}. Use general challenges area.</p>}
          </div>
        );
        case 'interest_buttons':
            return (
                <div key={item.id} className="my-4 p-3 border border-gray-200 rounded-md bg-white shadow-sm">
                    <p className="text-md font-medium text-gray-800 mb-3">{itemText}</p>
                    <div className="flex space-x-3">
                        <Button
                            onClick={() => handleInterestConfirmation(true)}
                            variant={followUpDetails.interestConfirmed === true ? "success" : "secondary"}
                            className={`flex-1 ${followUpDetails.interestConfirmed === true ? 'ring-2 ring-green-500 ring-offset-1' : ''}`}
                            icon={<CheckCircleIcon />}
                        >
                            Yes, Positive Interest
                        </Button>
                        <Button
                            onClick={() => handleInterestConfirmation(false)}
                            variant={followUpDetails.interestConfirmed === false ? "danger" : "secondary"}
                            className={`flex-1 ${followUpDetails.interestConfirmed === false ? 'ring-2 ring-red-500 ring-offset-1' : ''}`}
                            icon={<XCircleIcon />}
                        >
                            No, Not Interested / Neutral
                        </Button>
                    </div>
                </div>
            );
       case 'final_notes':
        return (
            <div key={item.id} className="my-4 p-3 border border-gray-200 rounded-md bg-yellow-50 shadow-sm">
                 <Textarea
                    label={itemText}
                    id={`${sectionId}-${item.id}-ans`}
                    value={generalNotes}
                    onChange={(e) => handleDirectStateChange('generalNotes', e.target.value)}
                    placeholder={item.placeholder || "Summarise key takeaways, next actions, sentiment..."}
                    rows={4}
                    className="bg-white focus:bg-yellow-50"
                    aria-label={itemText}
                />
            </div>
        );
      default:
        return null;
    }
  };
  
  const renderConversationSummary = () => {
    if (!showSummary) return null;

    return (
        <div className="mt-8 p-4 border-2 border-dashed border-[#80C7B8] rounded-lg bg-[#E6F4F1] shadow-inner"> 
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#017a59]">Conversation Summary</h3> 
                <Button onClick={() => setShowSummary(false)} variant="secondary" size="sm">Close Summary</Button>
            </div>

            <div className="space-y-3 text-sm">
                <p><strong>Customer Company:</strong> {customerCompany || "N/A"}</p>
                <p><strong>Service Focus Determined:</strong> {currentServiceFocus || "Not yet determined"}</p> 
                {currentServiceFocus && <p><strong>Keywords for Focus:</strong> {explorationInput || "N/A"}</p>}
                
                <hr className="my-3" />

                {SCRIPT_SECTIONS_CONFIG.map(section => {
                    const sectionCompleted = completedSectionIds.includes(section.id) || section.id === activeSectionId;
                    if (!sectionCompleted) return null;

                    const sectionAnswers: JSX.Element[] = [];
                    section.scriptItems.forEach(item => {
                        let answer: string | boolean | null | undefined = undefined;
                        let questionText = item.text.replace(/\[SERVICE_FOCUS_TEXT\]/g, currentServiceFocus || "relevant services"); 

                        if (item.type === 'question_textarea' && exchangeAnswers[item.id]) {
                            answer = exchangeAnswers[item.id];
                        } else if (item.type === 'input_prompt' && item.targetStateProperty) {
                            answer = item.targetStateProperty === 'explorationInput' ? explorationInput : followUpDetails[item.targetStateProperty as keyof typeof followUpDetails];
                        } else if (item.type === 'interest_buttons') {
                            answer = followUpDetails.interestConfirmed;
                            questionText = item.text; 
                        } else if (item.type === 'module_question_group' && moduleExchangeAnswers[item.id]) {
                            const moduleDetails = Object.entries(moduleExchangeAnswers[item.id]).map(([modId, ans]) => {
                                const module = ALL_MODULES.find(m => m.id === modId);
                                return ans ? <li key={modId} className="ml-4">{module?.name || modId}: {ans}</li> : null;
                            }).filter(Boolean);
                            if (moduleDetails.length > 0) {
                                sectionAnswers.push(
                                    <div key={`${item.id}-module`} className="mt-1">
                                        <p><strong>{questionText}:</strong></p>
                                        <ul className="list-disc pl-5">{moduleDetails}</ul>
                                    </div>
                                );
                            }
                            return; 
                        } else if (item.type === 'final_notes' && generalNotes) {
                            answer = generalNotes;
                        }
                        
                        if (answer !== undefined && answer !== null && answer !== '') {
                            sectionAnswers.push(
                                <p key={item.id}><strong>{questionText}:</strong> {typeof answer === 'boolean' ? (answer ? 'Yes' : 'No') : String(answer)}</p>
                            );
                        }
                    });

                    if (sectionAnswers.length > 0) {
                        return (
                            <div key={section.id} className="mb-2">
                                <h4 className="font-semibold text-[#017a59]">{section.title}</h4> 
                                {sectionAnswers}
                            </div>
                        );
                    }
                    return null;
                })}
                
                <hr className="my-3" />
                <h4 className="font-semibold text-[#017a59]">Follow-Up Details:</h4> 
                <p><strong>Interest Confirmed for Specialist:</strong> {followUpDetails.interestConfirmed === null ? 'N/A' : (followUpDetails.interestConfirmed ? 'Yes' : 'No')}</p>
                {followUpDetails.interestConfirmed && <p><strong>Specialist Needed For:</strong> {followUpDetails.specialistNeeded || currentServiceFocus || 'N/A'}</p>}
                <p><strong>Contact Name:</strong> {followUpDetails.contactName || 'N/A'}</p>
                <p><strong>Contact Email:</strong> {followUpDetails.contactEmail || 'N/A'}</p>
                <p><strong>Meeting Date:</strong> {followUpDetails.meetingDate || 'N/A'}</p>
                <p><strong>Meeting Time:</strong> {followUpDetails.meetingTime || 'N/A'}</p>
                <p><strong>Follow-Up Notes:</strong> {followUpDetails.notes || 'N/A'}</p>
                
                <hr className="my-3" />
                <p><strong>General Conversation Notes:</strong> {generalNotes || 'N/A'}</p>
            </div>
        </div>
    );
  };


  return (
    <section 
      className="p-4 md:p-6 bg-white shadow rounded-lg"
      role="region"
      aria-labelledby={`${tabIdValue}-heading`}
    >
      <div className="flex flex-wrap justify-between items-center mb-6 border-b pb-4">
        <h2 id={`${tabIdValue}-heading`} className="text-xl font-semibold text-gray-800">Customer Conversation Guide</h2>
        <Button 
            onClick={handleExportConversation} 
            variant="secondary" 
            size="sm"
            icon={<ArrowDownTrayIcon />} 
            iconPosition="left"
        >
            Export Conversation (HTML)
        </Button>
      </div>
      
      <div ref={sectionsContainerRef} className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
        {SCRIPT_SECTIONS_CONFIG.map((sectionConfig) => {
          const isVisible = sectionConfig.id === activeSectionId || completedSectionIds.includes(sectionConfig.id);
          if (!isVisible) return null;

          const isActive = sectionConfig.id === activeSectionId;
          
          return (
            <div
              key={sectionConfig.id}
              id={`section-${sectionConfig.id}`}
              className={`mb-8 p-4 border rounded-lg transition-all duration-300 ${isActive ? 'border-[#01916D] shadow-lg bg-[#E6F4F1]' : 'border-gray-300 bg-gray-50'}`} 
              aria-live={isActive ? "polite" : "off"}
              aria-labelledby={`section-title-${sectionConfig.id}`}
            >
              <h3 id={`section-title-${sectionConfig.id}`} className={`text-lg font-semibold mb-4 ${isActive ? 'text-[#017a59]' : 'text-gray-700'}`}> 
                {sectionConfig.title} {isActive && <span className="text-sm font-normal text-[#01916D]">(Current Step)</span>} 
              </h3>
              
              {sectionConfig.scriptItems.map(item => renderScriptItem(item, sectionConfig.id))}

              {isActive && sectionConfig.nextSectionId && (
                <Button onClick={handleContinue} icon={<ChevronRightIcon />} iconPosition="right" variant="primary" className="mt-4">
                  Continue to {SCRIPT_SECTIONS_CONFIG.find(s => s.id === sectionConfig.nextSectionId)?.title.substring(3) || "Next Step"}
                </Button>
              )}
              {isActive && !sectionConfig.nextSectionId && ( 
                  <div className="mt-6 pt-4 border-t border-gray-200 space-x-3">
                     <Button 
                        onClick={() => setShowSummary(true)} 
                        variant="primary" 
                        icon={<EyeIcon />}
                        disabled={showSummary}
                    >
                        View Conversation Summary
                    </Button>
                  </div>
              )}
            </div>
          );
        })}
        {renderConversationSummary()}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
          <Button 
            onClick={() => sectionsContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            variant="ghost"
            icon={<ArrowUpIcon />}
            iconPosition="left"
          >
            Scroll to Top
          </Button>
      </div>
    </section>
  );
};

export default CustomerConversationsTab;