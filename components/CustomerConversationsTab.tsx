
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { TabProps, ConversationStepId, ConversationExchange, ServiceType, CustomerConversationState, TabId, Module, ExportFormat, ScriptItemType, ScriptItem, ConversationSectionConfig } from '../types';
import { FINANCE_MODULES, BUSINESS_MODULES, ALL_MODULES, ITS_MODULES } from '../constants/moduleConstants';
import Button from './common/Button';
import Textarea from './common/Textarea';
import Input from './common/Input';
import RadioGroup from './common/RadioGroup';
import { ChevronRightIcon, ChevronLeftIcon, CheckCircleIcon, XCircleIcon, ArrowDownTrayIcon, ChatBubbleLeftIcon, EyeIcon } from './common/Icons';
import { triggerDownload, generateCustomerConversationExportContent } from '../services/exportService';
import { generateUUID } from '../utils/textUtils';
import { getResellerCompanyName } from '../services/configService';


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
  const { customerConversations, customerCompany, dateCompleted, customerName } = appState;
  const { activeSectionId, completedSectionIds, exchangeAnswers, moduleExchangeAnswers, currentServiceFocus, explorationInput, followUpDetails, generalNotes, exchanges } = customerConversations; 
  const tabIdValue = TabId.CUSTOMER_CONVERSATIONS;
  const sectionsContainerRef = useRef<HTMLDivElement>(null);

  const [showSummary, setShowSummary] = useState<boolean>(false);

  const handleAnswerChange = useCallback((itemId: string, value: string) => {
    setAppState(prev => ({
      ...prev,
      customerConversations: {
        ...prev.customerConversations,
        exchangeAnswers: { ...prev.customerConversations.exchangeAnswers, [itemId]: value }
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
          [groupId]: { ...(prev.customerConversations.moduleExchangeAnswers[groupId] || {}), [moduleId]: value }
        }
      }
    }));
  }, [setAppState]);

  const handleDirectStateChange = useCallback((property: keyof CustomerConversationState['followUpDetails'] | 'explorationInput' | 'generalNotes', value: any) => {
      setAppState(prev => {
        const newState = { ...prev.customerConversations };
        if (['contactName', 'contactEmail', 'meetingDate', 'meetingTime', 'notes'].includes(property)) {
          (newState.followUpDetails as any)[property] = value;
        } else if (property === 'explorationInput') {
          newState.explorationInput = value as string;
        } else if (property === 'generalNotes') {
          newState.generalNotes = value as string;
        } else if (property === 'interestConfirmed' || property === 'specialistNeeded') {
          (newState.followUpDetails as any)[property] = value;
        }
        return { ...prev, customerConversations: newState };
      });
  }, [setAppState]);

  const handleContinue = useCallback(() => {
    const currentSectionConfig = SCRIPT_SECTIONS_CONFIG.find(s => s.id === activeSectionId);
    if (!currentSectionConfig) return;

    let updatedStateFromPostLogic: Partial<Pick<CustomerConversationState, 'currentServiceFocus' | 'followUpDetails' | 'explorationInput'>> = {};
    if (currentSectionConfig.postLogic) {
      // Create a temporary state for postLogic to work on, including any pending direct changes
      const tempStateForLogic = { ...customerConversations };
      if (updatedStateFromPostLogic.explorationInput) tempStateForLogic.explorationInput = updatedStateFromPostLogic.explorationInput;
      //... apply other pending changes if any

      updatedStateFromPostLogic = currentSectionConfig.postLogic(tempStateForLogic, exchangeAnswers);
    }
    
    const newExchanges: ConversationExchange[] = [];
    currentSectionConfig.scriptItems.forEach(item => {
      if (item.type === 'script') {
        newExchanges.push({ id: generateUUID(), sectionId: activeSectionId, scriptItemId: item.id, type: 'script_presented', promptText: item.text });
      } else if (item.type === 'question_textarea' && exchangeAnswers[item.id]) {
        newExchanges.push({ id: generateUUID(), sectionId: activeSectionId, scriptItemId: item.id, type: 'question_answered', promptText: item.text, answerText: exchangeAnswers[item.id] });
      } else if (item.type === 'input_prompt' && item.targetStateProperty) {
         const value = item.targetStateProperty === 'explorationInput' ? explorationInput : followUpDetails[item.targetStateProperty as keyof typeof followUpDetails];
         if (value) newExchanges.push({ id: generateUUID(), sectionId: activeSectionId, scriptItemId: item.id, type: 'question_answered', promptText: item.text, answerText: String(value) });
      } else if (item.type === 'interest_buttons' && followUpDetails.interestConfirmed !== null) {
          newExchanges.push({ id: generateUUID(), sectionId: activeSectionId, scriptItemId: item.id, type: 'question_answered', promptText: item.text, answerText: followUpDetails.interestConfirmed ? 'Interest Confirmed' : 'Interest Declined' });
      } else if (item.type === 'module_question_group' && moduleExchangeAnswers[item.id]) {
          Object.entries(moduleExchangeAnswers[item.id]).forEach(([moduleId, answer]) => {
              if (answer) newExchanges.push({ id: generateUUID(), sectionId: activeSectionId, scriptItemId: item.id, type: 'module_question_answered', moduleKey: moduleId, answerText: answer });
          });
      } else if (item.type === 'final_notes' && generalNotes) {
          newExchanges.push({ id: generateUUID(), sectionId: activeSectionId, scriptItemId: item.id, type: 'note_taken', promptText: item.text, answerText: generalNotes });
      }
    });

    setAppState(prev => {
        const nextSectionId = currentSectionConfig.nextSectionId;
        const nextSectionConfig = nextSectionId ? SCRIPT_SECTIONS_CONFIG.find(s => s.id === nextSectionId) : null;
        let preLogicUpdates: Partial<CustomerConversationState> = {};
        if (nextSectionConfig?.preLogic) {
          preLogicUpdates = nextSectionConfig.preLogic({ ...prev.customerConversations, ...updatedStateFromPostLogic });
        }
        
        if (!nextSectionId) setShowSummary(true);

        return {
            ...prev,
            customerConversations: {
                ...prev.customerConversations,
                ...updatedStateFromPostLogic,
                ...preLogicUpdates,
                exchanges: [...prev.customerConversations.exchanges, ...newExchanges],
                completedSectionIds: [...prev.customerConversations.completedSectionIds, activeSectionId],
                activeSectionId: nextSectionId || activeSectionId,
                exchangeAnswers: {},
            }
        };
    });
  }, [activeSectionId, setAppState, exchangeAnswers, customerConversations, explorationInput, followUpDetails, moduleExchangeAnswers, generalNotes]);

  const handleBack = useCallback(() => {
    setShowSummary(false);
    const currentSectionIndex = SCRIPT_SECTIONS_CONFIG.findIndex(s => s.id === activeSectionId);
    if (currentSectionIndex > 0) {
      setAppState(prev => ({
        ...prev,
        customerConversations: {
          ...prev.customerConversations,
          activeSectionId: SCRIPT_SECTIONS_CONFIG[currentSectionIndex - 1].id,
          completedSectionIds: prev.customerConversations.completedSectionIds.filter(id => id !== SCRIPT_SECTIONS_CONFIG[currentSectionIndex - 1].id)
        }
      }));
    }
  }, [activeSectionId, setAppState]);

  const handleExport = useCallback(() => {
    const content = generateCustomerConversationExportContent(customerConversations, customerCompany, dateCompleted, ExportFormat.HTML);
    const filename = `ConversationLog_${customerCompany || 'Client'}_${dateCompleted}.html`;
    triggerDownload(content, filename, 'html');
  }, [customerConversations, customerCompany, dateCompleted]);

  const modulesForFocus = useMemo(() => {
    if (currentServiceFocus === ServiceType.FINANCE) return FINANCE_MODULES;
    if (currentServiceFocus === ServiceType.BUSINESS) return BUSINESS_MODULES;
    if (currentServiceFocus === ServiceType.ITS) return ITS_MODULES;
    return [];
  }, [currentServiceFocus]);

  const renderModuleQuestionGroup = (item: ScriptItem) => {
    if (item.moduleServiceFocus !== currentServiceFocus) return null;
    return (
      <div key={item.id} className="p-3 bg-gray-100 rounded-md space-y-3">
        <h4 className="font-semibold text-gray-700">{item.text}</h4>
        {modulesForFocus.length > 0 ? (
          modulesForFocus.map(module => (
            <Textarea
              key={module.id}
              id={`${item.id}-${module.id}`}
              label={`Challenges related to ${module.name}:`}
              value={moduleExchangeAnswers[item.id]?.[module.id] || ''}
              onChange={(e) => handleModuleAnswerChange(item.id, module.id, e.target.value)}
              placeholder="Note down specific customer comments or pain points..."
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No specific modules for this focus area. Use the general challenges box below.</p>
        )}
      </div>
    );
  };
  
  const onInterestChange = useCallback((isInterested: boolean) => {
      handleDirectStateChange('interestConfirmed', isInterested);
  }, [handleDirectStateChange]);

  const renderScriptItem = (item: ScriptItem) => {
    const textWithPlaceholders = item.text
      .replace(/\[Customer Name\]/g, customerName || 'there')
      .replace(/\[Your Name\]/g, 'I')
      .replace(/\[Your Company\]/g, getResellerCompanyName() || 'our company')
      .replace(/\[SERVICE_FOCUS_TEXT\]/g, currentServiceFocus || 'the identified area');

    switch (item.type) {
      case 'script':
        return <p key={item.id} className="p-3 bg-blue-50 text-blue-800 rounded-md">{textWithPlaceholders}</p>;
      case 'question_textarea':
        return <Textarea key={item.id} id={item.id} label={textWithPlaceholders} value={exchangeAnswers[item.id] || ''} onChange={(e) => handleAnswerChange(item.id, e.target.value)} placeholder={item.placeholder} />;
      case 'input_prompt':
        return <Input key={item.id} id={item.id} label={textWithPlaceholders} value={(item.targetStateProperty === 'explorationInput' ? explorationInput : followUpDetails[item.targetStateProperty as keyof typeof followUpDetails]) as string || ''} onChange={(e) => handleDirectStateChange(item.targetStateProperty!, e.target.value)} placeholder={item.placeholder} />;
      case 'module_question_group':
        return renderModuleQuestionGroup(item);
      case 'interest_buttons':
        return (
          <div key={item.id} className="p-3 bg-gray-100 rounded-md">
            <p className="text-gray-700 font-medium mb-2">{textWithPlaceholders}</p>
            <div className="flex gap-4">
              <Button onClick={() => onInterestChange(true)} variant={followUpDetails.interestConfirmed === true ? "success" : "secondary"} icon={<CheckCircleIcon />}>Confirm Interest</Button>
              <Button onClick={() => onInterestChange(false)} variant={followUpDetails.interestConfirmed === false ? "danger" : "secondary"} icon={<XCircleIcon />}>Decline Interest</Button>
            </div>
          </div>
        );
      case 'final_notes':
         return <Textarea key={item.id} id={item.id} label={textWithPlaceholders} value={generalNotes} onChange={(e) => handleDirectStateChange('generalNotes', e.target.value)} placeholder={item.placeholder} rows={5} />;
      default:
        return null;
    }
  };

  const currentSectionConfig = SCRIPT_SECTIONS_CONFIG.find(s => s.id === activeSectionId);
  const currentSectionIndex = SCRIPT_SECTIONS_CONFIG.findIndex(s => s.id === activeSectionId);

  const renderContent = () => {
    if (showSummary) {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Conversation Summary</h3>
          <p>The guided conversation has concluded. Review the generated log and export it for your records or to share with colleagues.</p>
          <div className="p-4 border rounded-md bg-gray-50 max-h-96 overflow-y-auto">
            {exchanges.map(ex => (
              <div key={ex.id} className="py-2 border-b last:border-b-0">
                <p className="text-xs font-bold text-gray-500">{ex.sectionId}</p>
                <p className="font-semibold text-gray-700">{ex.promptText || ALL_MODULES.find(m => m.id === ex.moduleKey)?.name || 'Note'}</p>
                <p className="text-gray-600 pl-4">{ex.answerText}</p>
              </div>
            ))}
          </div>
          <Button onClick={handleExport} icon={<ArrowDownTrayIcon />}>Export Full Log (HTML)</Button>
        </div>
      );
    }

    if (!currentSectionConfig) return <p>Conversation ended or invalid state.</p>;

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">{currentSectionConfig.title}</h3>
        <div className="space-y-4">
          {currentSectionConfig.scriptItems.map(item => renderScriptItem(item))}
        </div>
      </div>
    );
  };
  
  return (
    <section id={`${tabIdValue}-section`} aria-labelledby={`${tabIdValue}-heading`} className="p-6 bg-white shadow rounded-lg">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h2 id={`${tabIdValue}-heading`} className="text-2xl font-semibold text-gray-800 flex items-center">
          <ChatBubbleLeftIcon className="w-8 h-8 mr-2 text-[#01916D]" />
          Customer Conversation Guide
        </h2>
        {exchanges.length > 0 && (
          <Button onClick={handleExport} variant="secondary" size="sm" icon={<ArrowDownTrayIcon />}>Export Log</Button>
        )}
      </div>

      <div className="flex gap-8">
        <nav className="w-1/4 space-y-1">
          {SCRIPT_SECTIONS_CONFIG.map(section => (
            <button key={section.id}
              className={`w-full text-left p-2 rounded-md text-sm font-medium flex items-center ${
                activeSectionId === section.id ? 'bg-[#E6F4F1] text-[#01916D]' : 
                completedSectionIds.includes(section.id) ? 'text-gray-400 hover:bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
              }`}
              disabled={!completedSectionIds.includes(section.id) && activeSectionId !== section.id}
            >
              {completedSectionIds.includes(section.id) && activeSectionId !== section.id ? (
                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
              ) : (
                <div className={`w-5 h-5 mr-2 flex items-center justify-center`}>
                    <div className={`w-2 h-2 rounded-full ${activeSectionId === section.id ? 'bg-[#01916D]' : 'bg-gray-400'}`}></div>
                </div>
              )}
              {section.title}
            </button>
          ))}
        </nav>
        <div className="w-3/4 p-4 border rounded-lg bg-gray-50">
            {renderContent()}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t flex justify-between items-center">
        <Button onClick={handleBack} disabled={currentSectionIndex === 0} icon={<ChevronLeftIcon />}>
          Back
        </Button>
        {!showSummary && (
          <Button onClick={handleContinue} disabled={!currentSectionConfig.nextSectionId && activeSectionId === SCRIPT_SECTIONS_CONFIG[SCRIPT_SECTIONS_CONFIG.length-1].id} icon={<ChevronRightIcon />} iconPosition="right">
            {currentSectionConfig.nextSectionId ? 'Continue' : 'Finish Conversation'}
          </Button>
        )}
      </div>
    </section>
  );
};

export default CustomerConversationsTab;