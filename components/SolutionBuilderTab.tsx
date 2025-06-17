

import React, { useState, useCallback, useEffect } from 'react';
import { TabProps, RequirementBlock, Module, RoiResults, ExportFormat } from '../types';
import { ALL_MODULES, MODULE_SPECIFIC_SOLUTION_CONTENT, RESELLER_COMPANY_NAME } from '../constants';
import Select from './common/Select';
import Textarea from './common/Textarea';
import Button from './common/Button';
import { 
    PlusCircleIcon, TrashIcon, DocumentDuplicateIcon, ArrowUturnLeftIcon, 
    DocumentTextIcon, BuildingBlocksIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon,
    ArrowDownTrayIcon
} from './common/Icons';
import { generateSolutionDocumentContent, triggerDownload } from '../services/exportService';


const SolutionBuilderTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { solutionBuilder, roiCalculator, selectedModuleId: currentSelectedModuleIdInApp, customerCompany, dateCompleted } = appState; // Use currentSelectedModuleIdInApp for ROI
  const { selectedCoreModuleId, requirementBlocks, showDocumentView, editingBlockId } = solutionBuilder;

  const [currentRequirement, setCurrentRequirement] = useState('');
  const [currentSolution, setCurrentSolution] = useState('');

  // Effect to populate form when editingBlockId changes
  useEffect(() => {
    if (editingBlockId) {
      const blockToEdit = requirementBlocks.find(block => block.id === editingBlockId);
      if (blockToEdit) {
        setCurrentRequirement(blockToEdit.requirement);
        setCurrentSolution(blockToEdit.solution);
      }
    } else {
      setCurrentRequirement('');
      setCurrentSolution('');
    }
  }, [editingBlockId, requirementBlocks]);


  const handleCoreModuleChange = useCallback((moduleId: string) => {
    setAppState(prev => ({
      ...prev,
      solutionBuilder: {
        ...prev.solutionBuilder,
        selectedCoreModuleId: moduleId,
        editingBlockId: null, 
      }
    }));
    setCurrentRequirement('');
    setCurrentSolution('');
  }, [setAppState]);

  const handleAddOrUpdateBlock = useCallback(() => {
    if (!currentRequirement.trim() || !currentSolution.trim()) {
      alert("Please enter both requirement and solution details.");
      return;
    }

    if (editingBlockId) { 
      setAppState(prev => ({
        ...prev,
        solutionBuilder: {
          ...prev.solutionBuilder,
          requirementBlocks: prev.solutionBuilder.requirementBlocks.map(block =>
            block.id === editingBlockId
              ? { ...block, requirement: currentRequirement, solution: currentSolution }
              : block
          ),
          editingBlockId: null, 
        }
      }));
    } else { 
      const newBlock: RequirementBlock = {
        id: crypto.randomUUID(),
        requirement: currentRequirement,
        solution: currentSolution,
      };
      setAppState(prev => ({
        ...prev,
        solutionBuilder: {
          ...prev.solutionBuilder,
          requirementBlocks: [...prev.solutionBuilder.requirementBlocks, newBlock],
        }
      }));
    }
    setCurrentRequirement('');
    setCurrentSolution('');
  }, [currentRequirement, currentSolution, editingBlockId, setAppState]);
  
  const handleEditBlock = useCallback((blockId: string) => {
    setAppState(prev => ({
      ...prev,
      solutionBuilder: { ...prev.solutionBuilder, editingBlockId: blockId }
    }));
  }, [setAppState]);

  const handleCancelEdit = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      solutionBuilder: { ...prev.solutionBuilder, editingBlockId: null }
    }));
  }, [setAppState]);


  const handleDeleteBlock = useCallback((blockId: string) => {
    if (editingBlockId === blockId) { 
      handleCancelEdit(); 
    }
    setAppState(prev => ({
      ...prev,
      solutionBuilder: {
        ...prev.solutionBuilder,
        requirementBlocks: prev.solutionBuilder.requirementBlocks.filter(block => block.id !== blockId),
      }
    }));
  }, [editingBlockId, handleCancelEdit, setAppState]);

  const handleDuplicateBlock = useCallback((blockId: string) => {
    const blockToDuplicate = requirementBlocks.find(block => block.id === blockId);
    if (blockToDuplicate) {
      const newBlock: RequirementBlock = {
        ...blockToDuplicate,
        id: crypto.randomUUID(),
      };
      const originalIndex = requirementBlocks.findIndex(block => block.id === blockId);
      const newBlocks = [...requirementBlocks];
      newBlocks.splice(originalIndex + 1, 0, newBlock);
      
      setAppState(prev => ({
        ...prev,
        solutionBuilder: {
          ...prev.solutionBuilder,
          requirementBlocks: newBlocks,
        }
      }));
    }
  }, [requirementBlocks, setAppState]);

  const handleMoveBlock = useCallback((blockId: string, direction: 'up' | 'down') => {
    const index = requirementBlocks.findIndex(block => block.id === blockId);
    if (index === -1) return;

    const newBlocks = [...requirementBlocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]]; 
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]]; 
    } else {
      return; 
    }
    
    setAppState(prev => ({
      ...prev,
      solutionBuilder: {
        ...prev.solutionBuilder,
        requirementBlocks: newBlocks,
      }
    }));
  }, [requirementBlocks, setAppState]);
  
  const toggleDocumentView = useCallback(() => {
    setAppState(prev => ({
        ...prev,
        solutionBuilder: {
            ...prev.solutionBuilder,
            showDocumentView: !prev.solutionBuilder.showDocumentView,
        }
    }));
  }, [setAppState]);
  
  const handleExportSolutionDocument = useCallback((format: ExportFormat.HTML | ExportFormat.MD) => {
    const content = generateSolutionDocumentContent(appState, format);
    const coreModule = ALL_MODULES.find(m => m.id === selectedCoreModuleId);
    const moduleName = coreModule ? coreModule.name.replace(/\s+/g, '_') : 'Solution';
    const companyNameClean = customerCompany.replace(/\s+/g, '_') || 'Customer';
    const filename = `${companyNameClean}_${moduleName}_Proposal_${dateCompleted}.${format}`;
    triggerDownload(content, filename, format);
  }, [appState, selectedCoreModuleId, customerCompany, dateCompleted]);


  const getSelectedCoreModule = (): Module | undefined => {
    return ALL_MODULES.find(m => m.id === selectedCoreModuleId);
  };
  
  const formatCurrency = (value?: number): string => {
    if (value === undefined || value === null) return 'N/A';
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  let defaultCoreElementsListLength = 0;
  if (selectedCoreModuleId) {
      const moduleContentDef = MODULE_SPECIFIC_SOLUTION_CONTENT[selectedCoreModuleId] || MODULE_SPECIFIC_SOLUTION_CONTENT.default;
      const coreModule = ALL_MODULES.find(m => m.id === selectedCoreModuleId);
      if (coreModule && moduleContentDef) { // Ensure coreModule and moduleContentDef are found
          const partnerDisplayName = moduleContentDef.technologyPartnerName;
          const coreModuleNameStr = coreModule.name;
          const coreElementsFromDef = moduleContentDef.coreElements(partnerDisplayName, coreModuleNameStr);
          defaultCoreElementsListLength = coreElementsFromDef ? coreElementsFromDef.length : 0;
      }
  }


  if (showDocumentView) {
    const coreModule = getSelectedCoreModule();
    const coreModuleNameStr = coreModule?.name || "N/A";
    
    const moduleContentDef = MODULE_SPECIFIC_SOLUTION_CONTENT[selectedCoreModuleId || 'default'] || MODULE_SPECIFIC_SOLUTION_CONTENT.default;
    const partnerDisplayName = moduleContentDef.technologyPartnerName;

    const executiveSummaryHtml = moduleContentDef.executiveSummaryBoilerplate(partnerDisplayName);
    const solutionOverviewHtml = moduleContentDef.solutionOverviewDetails(partnerDisplayName, coreModuleNameStr);
    const coreElementsList = moduleContentDef.coreElements(partnerDisplayName, coreModuleNameStr);
    
    const roiData: RoiResults | null = (selectedCoreModuleId && roiCalculator[selectedCoreModuleId]?.results) 
                                        ? roiCalculator[selectedCoreModuleId]!.results 
                                        : null;

    return (
      <div className="p-4 md:p-6 bg-white shadow rounded-lg space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-2 print:hidden">
          <h2 className="text-xl font-semibold text-gray-800">Solution Proposal Document</h2>
          <div className="flex flex-wrap gap-2">
            <Button 
                onClick={() => handleExportSolutionDocument(ExportFormat.HTML)}
                variant="secondary"
                icon={<ArrowDownTrayIcon />}
                iconPosition="left"
                size="sm"
            >
                Export Solution as HTML
            </Button>
            <Button 
                onClick={() => handleExportSolutionDocument(ExportFormat.MD)}
                variant="secondary"
                icon={<ArrowDownTrayIcon />}
                iconPosition="left"
                size="sm"
            >
                Export Solution as Markdown
            </Button>
            <Button 
              onClick={toggleDocumentView} 
              variant="primary"
              icon={<ArrowUturnLeftIcon />}
              iconPosition="left"
              size="sm"
            >
              Back to Builder
            </Button>
          </div>
        </div>
        
        <div className="prose max-w-none p-4 md:p-6 border border-gray-300 rounded-md bg-gray-50 print:border-none print:shadow-none print:bg-white">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-blue-700 mb-6">Solution Proposal for {coreModuleNameStr}</h1>
          <p className="text-center text-sm text-gray-600 mb-2">
            Prepared for: <strong>{customerCompany || "Valued Client"}</strong>
          </p>
          <p className="text-center text-sm text-gray-600 mb-6">
            Date: <strong>{dateCompleted}</strong>
          </p>
          
          <section>
            <h2 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-3">Executive Summary</h2>
            <p>This document outlines a proposed solution for <strong>{customerCompany || 'the client'}</strong> to address challenges and opportunities within <strong>{coreModuleNameStr}</strong> processes. Leveraging industry-leading technologies such as Esker for finance automation, M-Files for intelligent information management, and Nintex for advanced workflow capabilities, this solution aims to deliver significant operational efficiencies, enhanced control, and a strong return on investment.</p>
            <div dangerouslySetInnerHTML={{ __html: executiveSummaryHtml }} />
             {roiData && (
                <p className="mt-2">
                    The financial projections for the <strong>{coreModuleNameStr}</strong> module indicate a potential <strong>Total Annual Gross Savings of {formatCurrency(roiData.totalAnnualGrossSavings)}</strong>,
                    an <strong>Overall ROI of {roiData.overallRoiPercentage.toFixed(1)}%</strong> over {roiData.solutionLifespanYears} years,
                    and a <strong>Payback Period of approximately {isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} months` : 'N/A'}</strong>.
                </p>
            )}
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-3">Overview of the Proposed Solution</h2>
            <div dangerouslySetInnerHTML={{ __html: solutionOverviewHtml }} />
          </section>

          {(requirementBlocks.length > 0 || coreElementsList.length > 0) && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-3">Detailed Customer Solution & Requirements</h2>
              <h3 className="text-lg font-medium text-gray-800" style={{marginTop:0}}>Core Module: {coreModuleNameStr}</h3>
              {coreElementsList.length > 0 ? (
                <ul className="list-disc pl-5 my-2">
                  {coreElementsList.map((element, idx) => (
                    <li key={idx} className="mb-1">{element}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600 my-2"><i>Core functionalities for this module are tailored based on specific requirements.</i></p>
              )}

              {requirementBlocks.length > 0 && (
                <>
                  <h3 className="text-lg font-medium text-gray-800 mt-4">Specific Requirements & Solutions:</h3>
                  {requirementBlocks.map((block, index) => (
                    <div key={block.id} className="mt-3 py-3 border-t first:border-t-0">
                      <h4 className="text-md font-semibold text-gray-700">Priority {index + 1}: {block.requirement.length > 70 ? block.requirement.substring(0,70)+'...' : block.requirement}</h4>
                      <p className="ml-4 text-sm"><strong>Requirement:</strong> {block.requirement}</p>
                      <p className="ml-4 text-sm"><strong>Proposed Solution:</strong> {block.solution}</p>
                    </div>
                  ))}
                </>
              )}
            </section>
          )}


          {roiData && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-3">Expected Business Outcomes & ROI Highlights for {coreModuleNameStr}</h2>
              <p>The implementation of the proposed {coreModuleNameStr} solution, leveraging {partnerDisplayName}, is projected to yield significant financial and operational benefits:</p>
              <ul className="list-disc pl-6">
                <li><strong>Total Annual Gross Savings:</strong> {formatCurrency(roiData.totalAnnualGrossSavings)}</li>
                <li><strong>Total Net Benefit ({roiData.solutionLifespanYears} years):</strong> {formatCurrency(roiData.totalNetBenefitOverLifespan)}</li>
                <li><strong>Overall ROI ({roiData.solutionLifespanYears} years):</strong> {roiData.overallRoiPercentage.toFixed(1)}%</li>
                <li><strong>Payback Period:</strong> {isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} Months` : (roiData.totalNetBenefitOverLifespan <=0 ? 'Payback not achieved within lifespan' : `Exceeds ${roiData.solutionLifespanYears*12} Months`)}</li>
                <li><strong>Upfront Investment:</strong> {formatCurrency(roiData.upfrontInvestment)}</li>
                <li><strong>Annual Recurring Software Cost:</strong> {formatCurrency(roiData.annualRecurringSoftwareCost)}</li>
              </ul>
              <p className="text-sm mt-2">Note: These figures are estimates based on the data provided for the {coreModuleNameStr} module. A detailed breakdown of savings calculations is available in the ROI Calculator tab and related exports.</p>
            </section>
          )}
          {!roiData && (requirementBlocks.length > 0 || coreElementsList.length > 0) && (
             <p className="mt-4 text-sm text-gray-600"><i>Quantitative ROI analysis for the <strong>{coreModuleNameStr}</strong> module can be performed in the 'ROI Calculator' tab to complement this solution outline.</i></p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Solution Builder</h2>
        <p className="text-sm text-gray-500 mb-6">Visually construct the customer's solution. Start by selecting a core module, then add and prioritize requirement blocks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1 space-y-4 p-4 border border-blue-200 rounded-lg bg-blue-50 shadow">
          <Select
            label="1. Select Core Module for Solution"
            id="coreModuleSelect"
            value={selectedCoreModuleId || ""}
            onChange={(e) => handleCoreModuleChange(e.target.value)}
            options={ALL_MODULES.map(module => ({ value: module.id, label: module.name }))}
            placeholder="Choose a core module..."
          />
           <p className="text-xs text-blue-700">This module forms the foundation of the solution proposal.</p>
        </div>

        <div className="md:col-span-2 space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow">
          <h3 className="text-md font-semibold text-gray-700">{editingBlockId ? '2. Edit Requirement Block' : '2. Add Requirement Block'}</h3>
          <Textarea
            label="Customer Requirement"
            id="customerRequirement"
            value={currentRequirement}
            onChange={(e) => setCurrentRequirement(e.target.value)}
            placeholder="Describe the customer's specific need or pain point..."
            rows={3}
          />
          <Textarea
            label="Proposed Solution / How Software Solves It"
            id="proposedSolution"
            value={currentSolution}
            onChange={(e) => setCurrentSolution(e.target.value)}
            placeholder="Explain how the selected module (and any configurations) will address this requirement..."
            rows={3}
          />
          <div className="flex space-x-2">
            <Button 
              onClick={handleAddOrUpdateBlock} 
              variant="primary" 
              disabled={!selectedCoreModuleId}
              icon={editingBlockId ? <PencilIcon /> :<PlusCircleIcon />}
              iconPosition="left"
            >
              {editingBlockId ? 'Update Block' : 'Add Requirement Block'}
            </Button>
            {editingBlockId && (
              <Button onClick={handleCancelEdit} variant="secondary">Cancel Edit</Button>
            )}
          </div>
           {!selectedCoreModuleId && <p className="text-xs text-red-500">Please select a core module first to add/edit blocks.</p>}
        </div>
      </div>

      {selectedCoreModuleId && (
        <div className="mt-8">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <BuildingBlocksIcon className="w-6 h-6 mr-2 text-blue-500"/>
              Current Solution Build: {getSelectedCoreModule()?.name || "N/A"}
            </h3>
            {(requirementBlocks.length > 0 || defaultCoreElementsListLength > 0 ) && (
                 <Button 
                    onClick={toggleDocumentView} 
                    variant="ghost"
                    icon={<DocumentTextIcon/>}
                    iconPosition="left"
                    size="sm"
                >
                    View Solution Document
                </Button>
            )}
          </div>
          
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 min-h-[200px] flex flex-col items-center">
            <div className="bg-blue-600 text-white p-4 rounded-md shadow-lg text-center mb-6 min-w-[200px] max-w-xs">
              <h4 className="font-bold text-lg">{getSelectedCoreModule()?.name || "N/A"}</h4>
              <p className="text-xs opacity-80">(Core Module)</p>
            </div>

            {requirementBlocks.length > 0 ? (
              <div className="w-full max-w-3xl space-y-3">
                {requirementBlocks.map((block, index) => (
                  <div key={block.id} className={`p-3 rounded-md shadow hover:shadow-lg transition-shadow border ${editingBlockId === block.id ? 'bg-yellow-100 border-yellow-400' : 'bg-green-100 border-green-300'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <h5 className={`font-semibold ${editingBlockId === block.id ? 'text-yellow-800' : 'text-green-800'}`}>
                        Requirement Block {index + 1} 
                        <span className={`text-xs font-normal ml-1 ${editingBlockId === block.id ? 'text-yellow-700' : 'text-green-600'}`}>(Priority: {index + 1})</span>
                      </h5>
                      <div className="flex items-center space-x-1">
                        <Button 
                            onClick={() => handleMoveBlock(block.id, 'up')}
                            variant="ghost" size="sm" className="!p-1" title="Move Up"
                            disabled={index === 0}
                            icon={<ArrowUpIcon className={`w-4 h-4 ${index === 0 ? 'text-gray-300': 'text-slate-600 hover:text-slate-800'}`}/>}
                        />
                        <Button 
                            onClick={() => handleMoveBlock(block.id, 'down')}
                            variant="ghost" size="sm" className="!p-1" title="Move Down"
                            disabled={index === requirementBlocks.length - 1}
                            icon={<ArrowDownIcon className={`w-4 h-4 ${index === requirementBlocks.length - 1 ? 'text-gray-300': 'text-slate-600 hover:text-slate-800'}`}/>}
                        />
                         <Button 
                          onClick={() => handleEditBlock(block.id)} 
                          variant="ghost" size="sm" className="!p-1" title="Edit Block"
                          icon={<PencilIcon className="w-4 h-4 text-blue-600 hover:text-blue-800"/>}
                        />
                        <Button 
                          onClick={() => handleDuplicateBlock(block.id)} 
                          variant="ghost" size="sm" className="!p-1" title="Duplicate Block"
                          icon={<DocumentDuplicateIcon className="w-4 h-4 text-purple-600 hover:text-purple-800"/>}
                        />
                        <Button 
                          onClick={() => handleDeleteBlock(block.id)} 
                          variant="ghost" size="sm" className="!p-1" title="Delete Block"
                          icon={<TrashIcon className="w-4 h-4 text-red-500 hover:text-red-700"/>}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-1"><strong>Requirement:</strong> {block.requirement.substring(0,100)}{block.requirement.length > 100 ? '...' : ''}</p>
                    <p className="text-sm text-gray-600"><strong>Solution:</strong> {block.solution.substring(0,100)}{block.solution.length > 100 ? '...' : ''}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-4">No requirement blocks added yet. Use the form above to add blocks to your solution.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionBuilderTab;
