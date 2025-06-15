import React, { useCallback, useState } from 'react';
import { TabProps, RoiInput as RoiInputType, RoiResults, RoiModuleState, RoiCalculationFactors } from '../types';
import { 
    ROI_INPUT_TEMPLATES, 
    HOURLY_RATE_DIVISOR, 
    ALL_MODULES, 
    DEMO_ROI_GLOBAL_SETTINGS,
    DEMO_ROI_SPECIFIC_INPUTS
} from '../constants';
import Input from './common/Input';
import Button from './common/Button';
import RoiCalculationSettingsModal from './RoiCalculationSettingsModal';

const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const getInputValue = (inputs: RoiModuleState['inputs'], key: string): number => {
    const val = inputs[key];
    return typeof val === 'string' ? parseFloat(val) || 0 : (typeof val === 'number' ? val : 0);
};

const parseGlobalRoiInput = (value: string | number | undefined): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || 0;
    return 0;
};


const RoiCalculatorTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { selectedModuleId } = appState; // Removed isRoiAdminModalOpen as it's local
  const [isModalOpen, setIsModalOpen] = useState(false);


  if (!selectedModuleId) {
    return <div className="p-6 bg-white shadow rounded-lg text-gray-600">Please select a module first.</div>;
  }

  const currentModuleRoiData = appState.roiCalculator[selectedModuleId];
  const moduleConfig = ALL_MODULES.find(m => m.id === selectedModuleId);

  if (!currentModuleRoiData || !moduleConfig) {
    return <div className="p-6 bg-white shadow rounded-lg text-red-500">ROI configuration not found for module: {selectedModuleId}.</div>;
  }

  const moduleInputFields = ROI_INPUT_TEMPLATES[selectedModuleId] || ROI_INPUT_TEMPLATES.default;

  const handleInputChange = useCallback((inputId: keyof Pick<RoiModuleState, 'annualSalary' | 'annualSoftwareCost' | 'upfrontProfServicesCost' | 'solutionLifespanYears'> | string, value: string) => {
    setAppState(prev => {
      if (!selectedModuleId || !prev.roiCalculator[selectedModuleId]) return prev;
      const newModuleRoiData = { ...prev.roiCalculator[selectedModuleId] };
      
      if (['annualSalary', 'annualSoftwareCost', 'upfrontProfServicesCost', 'solutionLifespanYears'].includes(inputId)) {
        (newModuleRoiData as any)[inputId] = value; 
      } else { 
        newModuleRoiData.inputs = { ...newModuleRoiData.inputs, [inputId]: value }; 
      }
      // Set results to null when inputs change, to indicate recalculation is needed
      newModuleRoiData.results = null; 
      return {
        ...prev,
        roiCalculator: { ...prev.roiCalculator, [selectedModuleId]: newModuleRoiData }
      };
    });
  }, [selectedModuleId, setAppState]);
  
  const calculateRoi = useCallback((moduleDataToCalculate: RoiModuleState, moduleId: string) => {
    const { annualSalary, inputs, annualSoftwareCost, upfrontProfServicesCost, solutionLifespanYears, calculationFactors } = moduleDataToCalculate;
    
    const resolvedAnnualSalary = parseGlobalRoiInput(annualSalary);
    const hourlyRate = resolvedAnnualSalary > 0 && HOURLY_RATE_DIVISOR > 0 ? resolvedAnnualSalary / HOURLY_RATE_DIVISOR : 0;
    
    let totalAnnualGrossSavings = 0;
    const savingsCalculationWorkings: RoiResults['savingsCalculationWorkings'] = [];

    const timeSavingPercentage = calculationFactors.timeSavingPercentage;
    const errorReductionPercentage = calculationFactors.errorReductionPercentage;

    if (moduleId === 'accountsPayable') {
        const numInvoicesPerMonth = getInputValue(inputs, 'ap_roi_numInvoicesPerMonth');
        const avgManualProcessingTimePerInvoiceMins = getInputValue(inputs, 'ap_roi_avgManualProcessingTimePerInvoiceMins');
        const currentInvoiceErrorRatePercentage = getInputValue(inputs, 'ap_roi_currentInvoiceErrorRatePercentage') / 100;
        const avgTimeToResolveExceptionMins = getInputValue(inputs, 'ap_roi_avgTimeToResolveExceptionMins');
        const annualValueMissedEarlyPaymentDiscounts = getInputValue(inputs, 'ap_roi_annualValueMissedEarlyPaymentDiscounts');
        const annualCostPhysicalInvoiceStorage = getInputValue(inputs, 'ap_roi_annualCostPhysicalInvoiceStorage');
        
        if (numInvoicesPerMonth > 0 && avgManualProcessingTimePerInvoiceMins > 0 && hourlyRate > 0 && timeSavingPercentage > 0) {
            const timeSavedPerInvoiceMins = avgManualProcessingTimePerInvoiceMins * timeSavingPercentage;
            const annualTimeSavingHours = (numInvoicesPerMonth * timeSavedPerInvoiceMins / 60) * 12;
            const laborSavingsProcessing = annualTimeSavingHours * hourlyRate;
            totalAnnualGrossSavings += laborSavingsProcessing;
            savingsCalculationWorkings.push({
                category: "Labor Savings (Invoice Processing Time Reduction)",
                formula: `(${numInvoicesPerMonth} invoices/mo * ${avgManualProcessingTimePerInvoiceMins} mins/invoice * ${timeSavingPercentage*100}% saved / 60 mins/hr * 12 mo) * $${hourlyRate.toFixed(2)}/hr`,
                result: laborSavingsProcessing,
                inputsUsed: { "Number of Invoices/Month": numInvoicesPerMonth, "Avg Manual Processing Time/Invoice (mins)": avgManualProcessingTimePerInvoiceMins, "Hourly Rate": hourlyRate.toFixed(2), "Time Saving Factor": `${(timeSavingPercentage*100).toFixed(0)}%` }
            });
        }
        
        if (numInvoicesPerMonth > 0 && currentInvoiceErrorRatePercentage > 0 && avgTimeToResolveExceptionMins > 0 && hourlyRate > 0 && errorReductionPercentage > 0) {
            const errorsPerMonth = numInvoicesPerMonth * currentInvoiceErrorRatePercentage;
            const timeSpentResolvingErrorsMinsPerMonth = errorsPerMonth * avgTimeToResolveExceptionMins;
            const timeSavedResolvingErrorsMinsPerMonth = (timeSpentResolvingErrorsMinsPerMonth * errorReductionPercentage);
            const errorReductionSavingsVal = (timeSavedResolvingErrorsMinsPerMonth / 60) * 12 * hourlyRate;

            totalAnnualGrossSavings += errorReductionSavingsVal;
            savingsCalculationWorkings.push({
                category: "Savings (Error Reduction & Resolution Time)",
                formula: `((${numInvoicesPerMonth} invoices/mo * ${currentInvoiceErrorRatePercentage*100}% error rate * ${avgTimeToResolveExceptionMins} mins/error * ${errorReductionPercentage*100}% reduction) / 60 mins/hr * 12 mo) * $${hourlyRate.toFixed(2)}/hr`,
                result: errorReductionSavingsVal,
                inputsUsed: { "Number of Invoices/Month": numInvoicesPerMonth, "Current Error Rate": `${(currentInvoiceErrorRatePercentage*100).toFixed(0)}%`, "Avg Time to Resolve Exception (mins)": avgTimeToResolveExceptionMins, "Hourly Rate": hourlyRate.toFixed(2), "Error Reduction Factor": `${(errorReductionPercentage*100).toFixed(0)}%`}
            });
        }

        if (annualValueMissedEarlyPaymentDiscounts > 0) {
            totalAnnualGrossSavings += annualValueMissedEarlyPaymentDiscounts;
             savingsCalculationWorkings.push({ category: "Captured Early Payment Discounts", formula: `Direct input`, result: annualValueMissedEarlyPaymentDiscounts, inputsUsed: {"Annual Value Missed Early Payment Discounts": annualValueMissedEarlyPaymentDiscounts} });
        }
        if (annualCostPhysicalInvoiceStorage > 0) {
            totalAnnualGrossSavings += annualCostPhysicalInvoiceStorage;
            savingsCalculationWorkings.push({ category: "Reduced Physical Storage Costs", formula: `Direct input`, result: annualCostPhysicalInvoiceStorage, inputsUsed: {"Annual Cost Physical Invoice Storage": annualCostPhysicalInvoiceStorage} });
        }

    } else if (moduleId === 'claimsDeductions') { 
        const deductionsProcessedPerMonth = getInputValue(inputs, 'cd_roi_deductionsProcessedPerMonth');
        const avgResearchTimePerDeductionHrs = getInputValue(inputs, 'cd_roi_avgResearchTimePerDeductionHrs');
        // const percentageDeductionsInvalid = getInputValue(inputs, 'cd_roi_percentageDeductionsInvalidPercentage') / 100; // Example if used for error reduction
        
        if (deductionsProcessedPerMonth > 0 && avgResearchTimePerDeductionHrs > 0 && hourlyRate > 0 && timeSavingPercentage > 0) {
            const annualResearchHours = deductionsProcessedPerMonth * avgResearchTimePerDeductionHrs * 12;
            const savedResearchHours = annualResearchHours * timeSavingPercentage;
            const laborSavingsResearch = savedResearchHours * hourlyRate;
            totalAnnualGrossSavings += laborSavingsResearch;
            savingsCalculationWorkings.push({
                category: "Labor Savings (Deduction Research Time)",
                formula: `(${deductionsProcessedPerMonth}/mo * ${avgResearchTimePerDeductionHrs} hrs/ded * 12 mo * ${timeSavingPercentage*100}% saved) * $${hourlyRate.toFixed(2)}/hr`,
                result: laborSavingsResearch,
                inputsUsed: { "Deductions Processed/Month": deductionsProcessedPerMonth, "Avg Research Time/Deduction (hrs)": avgResearchTimePerDeductionHrs, "Hourly Rate": hourlyRate.toFixed(2), "Time Saving Factor": `${(timeSavingPercentage*100).toFixed(0)}%`}
            });
        }
        // Example: Add error reduction savings if relevant for claims/deductions
        const numTransactions = deductionsProcessedPerMonth; // Use deductions as 'transactions'
        const errorRateInput = getInputValue(inputs, 'cd_roi_percentageDeductionsInvalidPercentage') / 100; // % of deductions invalid could be an 'error rate'
        const timeToFixErrorInput = getInputValue(inputs, 'cd_roi_avgResearchTimePerDeductionHrs') * 60; // Research time could be 'time to fix' in mins

        if (numTransactions > 0 && errorRateInput > 0 && timeToFixErrorInput > 0 && hourlyRate > 0 && errorReductionPercentage > 0) {
            const errorsPerMonth = numTransactions * errorRateInput;
            const timeSpentResolvingErrorsMinsPerMonth = errorsPerMonth * timeToFixErrorInput; // This is total research time on invalid ones
            const timeSavedResolvingErrorsMinsPerMonth = (timeSpentResolvingErrorsMinsPerMonth * errorReductionPercentage); // Time saved on this subset
            const errorReductionSavingsVal = (timeSavedResolvingErrorsMinsPerMonth / 60) * 12 * hourlyRate;
            
            // Avoid double counting with labor savings if they overlap too much.
            // This example assumes errorReductionPercentage applies to the 'invalid' portion specifically.
            // For true distinctness, input labels and logic might need refinement.
            // totalAnnualGrossSavings += errorReductionSavingsVal; // Be cautious about adding if similar to above
             savingsCalculationWorkings.push({
                category: "Savings (Improved Invalid Deduction Handling)",
                formula: `((${numTransactions}/mo * ${errorRateInput*100}% invalid * ${timeToFixErrorInput} mins/ded * ${errorReductionPercentage*100}% reduction) / 60 * 12) * $${hourlyRate.toFixed(2)}/hr`,
                result: errorReductionSavingsVal, // This is a potential saving, ensure it's additive if distinct
                inputsUsed: {"Deductions/Month": numTransactions, "Invalid Deduction Rate": `${(errorRateInput*100).toFixed(0)}%`, "Research Time/Invalid (mins)": timeToFixErrorInput, "Hourly Rate": hourlyRate.toFixed(2), "Error Handling Improvement": `${(errorReductionPercentage*100).toFixed(0)}%`}
            });
        }


    } else { // Generic Calculation
        const manualTaskTimeHrsWeek = getInputValue(inputs, 'def_roi_manualTaskTimeHrsWeek');
        const numEmployees = getInputValue(inputs, 'def_roi_numberOfEmployeesPerformingTask') || 1; 
        
        if (manualTaskTimeHrsWeek > 0 && numEmployees > 0 && hourlyRate > 0 && timeSavingPercentage > 0) {
            const timeSavedPerWeekTotal = manualTaskTimeHrsWeek * timeSavingPercentage * numEmployees;
            const genericAnnualTimeSavings = timeSavedPerWeekTotal * 52 * hourlyRate;
            totalAnnualGrossSavings += genericAnnualTimeSavings;
            savingsCalculationWorkings.push({
                category: "Generic Time Savings (Manual Task Reduction)",
                formula: `(${manualTaskTimeHrsWeek.toFixed(1)} hrs/wk/emp * ${timeSavingPercentage*100}% saved * ${numEmployees} emp * 52 wks) * $${hourlyRate.toFixed(2)}/hr`,
                result: genericAnnualTimeSavings,
                inputsUsed: { "Manual Task Time (hrs/wk/emp)": manualTaskTimeHrsWeek.toFixed(1), "Number of Employees": numEmployees, "Hourly Rate": hourlyRate.toFixed(2), "Time Saving Factor": `${(timeSavingPercentage*100).toFixed(0)}%` }
            });
        }

        const numTransactionsPerMonth = getInputValue(inputs, 'def_roi_numTransactionsPerMonth');
        const errorRate = getInputValue(inputs, 'def_roi_errorRatePercentage') / 100;
        const costPerErrorMaterial = getInputValue(inputs, 'def_roi_costPerError');
        const timeToFixErrorMins = getInputValue(inputs, 'def_roi_avgTimeToFixErrorMins');

        if (numTransactionsPerMonth > 0 && errorRate > 0 && errorReductionPercentage > 0) {
            const annualTransactions = numTransactionsPerMonth * 12;
            const currentAnnualErrors = annualTransactions * errorRate;
            const errorsReducedAnnually = currentAnnualErrors * errorReductionPercentage;
            
            if (costPerErrorMaterial > 0) {
                const materialErrorSavingsVal = errorsReducedAnnually * costPerErrorMaterial;
                totalAnnualGrossSavings += materialErrorSavingsVal;
                 savingsCalculationWorkings.push({
                    category: "Generic Savings (Reduced Material Cost of Errors)",
                    formula: `(${numTransactionsPerMonth} trans/mo * 12 * ${errorRate*100}% error rate * ${errorReductionPercentage*100}% reduction) * $${costPerErrorMaterial.toFixed(2)}/error`,
                    result: materialErrorSavingsVal,
                    inputsUsed: { "Transactions/Month": numTransactionsPerMonth, "Error Rate": `${(errorRate*100).toFixed(0)}%`, "Cost per Error ($)": costPerErrorMaterial.toFixed(2), "Error Reduction Factor": `${(errorReductionPercentage*100).toFixed(0)}%` }
                });
            }
            if (timeToFixErrorMins > 0 && hourlyRate > 0) {
                const laborTimeSavedFixingErrorsHrsAnnual = (errorsReducedAnnually * timeToFixErrorMins) / 60;
                const laborErrorFixSavingsVal = laborTimeSavedFixingErrorsHrsAnnual * hourlyRate;
                totalAnnualGrossSavings += laborErrorFixSavingsVal;
                 savingsCalculationWorkings.push({
                    category: "Generic Savings (Reduced Labor to Fix Errors)",
                    formula: `(((${numTransactionsPerMonth} trans/mo * 12 * ${errorRate*100}% error rate * ${errorReductionPercentage*100}% reduction) * ${timeToFixErrorMins} mins/error) / 60) * $${hourlyRate.toFixed(2)}/hr`,
                    result: laborErrorFixSavingsVal,
                    inputsUsed: { "Transactions/Month": numTransactionsPerMonth, "Error Rate": `${(errorRate*100).toFixed(0)}%`, "Time to Fix Error (mins)": timeToFixErrorMins, "Hourly Rate": hourlyRate.toFixed(2), "Error Reduction Factor": `${(errorReductionPercentage*100).toFixed(0)}%` }
                });
            }
        }
    }
    
    const resolvedAnnualSoftwareCost = parseGlobalRoiInput(annualSoftwareCost);
    const resolvedUpfrontProfServicesCost = parseGlobalRoiInput(upfrontProfServicesCost);
    const resolvedSolutionLifespanYears = Math.max(1, parseGlobalRoiInput(solutionLifespanYears) || 1); 

    const totalInvestmentOverLifespan = resolvedUpfrontProfServicesCost + (resolvedAnnualSoftwareCost * resolvedSolutionLifespanYears);
    const totalSavingsOverLifespan = totalAnnualGrossSavings * resolvedSolutionLifespanYears;
    const totalNetBenefitOverLifespan = totalSavingsOverLifespan - totalInvestmentOverLifespan;
    const overallRoiPercentage = totalInvestmentOverLifespan > 0 ? (totalNetBenefitOverLifespan / totalInvestmentOverLifespan) * 100 : (totalNetBenefitOverLifespan > 0 ? Infinity : 0) ;


    const annualBreakdown: RoiResults['annualBreakdown'] = [];
    let cumulativeNetCashFlow = 0;
    let paybackPeriodMonthsCalculated: number | null = null; // Use null to indicate not yet found

    for (let i = 1; i <= resolvedSolutionLifespanYears; i++) {
        const investmentThisYear = (i === 1) ? resolvedUpfrontProfServicesCost : 0;
        const netCashFlowYear = totalAnnualGrossSavings - resolvedAnnualSoftwareCost - investmentThisYear;
        const prevCumulativeNetCashFlow = cumulativeNetCashFlow;
        cumulativeNetCashFlow += netCashFlowYear;
        
        annualBreakdown.push({
            year: i,
            grossSavings: totalAnnualGrossSavings,
            softwareCost: resolvedAnnualSoftwareCost,
            investment: investmentThisYear,
            netCashFlow: netCashFlowYear,
            cumulativeNetCashFlow: cumulativeNetCashFlow
        });

        if (paybackPeriodMonthsCalculated === null && cumulativeNetCashFlow >= 0) {
            if (prevCumulativeNetCashFlow < 0 && netCashFlowYear > 0) { // Crossed from negative to positive
                paybackPeriodMonthsCalculated = ((i - 1) * 12) + ((-prevCumulativeNetCashFlow / netCashFlowYear) * 12);
            } else if (cumulativeNetCashFlow >=0 && i === 1 ) { // Profitable from year 1 (or even month 0)
                 // if upfront is 0 and profitable Y1, payback is immediate (0)
                if (resolvedUpfrontProfServicesCost === 0 && totalAnnualGrossSavings > resolvedAnnualSoftwareCost) {
                    paybackPeriodMonthsCalculated = 0;
                } else if (netCashFlowYear > 0) { // Positive cash flow in Y1 with upfront costs
                    paybackPeriodMonthsCalculated = (resolvedUpfrontProfServicesCost / (totalAnnualGrossSavings - resolvedAnnualSoftwareCost)) * 12;
                    if(paybackPeriodMonthsCalculated < 0) paybackPeriodMonthsCalculated = 0; // If somehow negative (e.g. no upfront and high savings)
                    if(paybackPeriodMonthsCalculated > 12) paybackPeriodMonthsCalculated = Math.min(paybackPeriodMonthsCalculated, 12); // Cap at 12 for Y1 payback
                } else { // No positive cash flow in Y1, but cumulative is >=0 (e.g. all costs = 0)
                     paybackPeriodMonthsCalculated = 0;
                }
            } else if (cumulativeNetCashFlow >=0 && prevCumulativeNetCashFlow >=0 && i === 1) { // starts profitable
                 paybackPeriodMonthsCalculated = 0;
            }
        }
    }
    
    let finalPaybackPeriodMonths: number;
    if (paybackPeriodMonthsCalculated === null) { // Never broke even
        finalPaybackPeriodMonths = Infinity; 
    } else {
        finalPaybackPeriodMonths = paybackPeriodMonthsCalculated;
    }
    // Ensure payback is not longer than lifespan if it occurred
    if (finalPaybackPeriodMonths > resolvedSolutionLifespanYears * 12) {
        finalPaybackPeriodMonths = Infinity;
    }
     if (totalNetBenefitOverLifespan <= 0 && totalInvestmentOverLifespan > 0 && finalPaybackPeriodMonths !== Infinity) {
      // If overall negative benefit, but somehow payback was calculated (e.g. Y1 profit then losses), mark as no payback
      finalPaybackPeriodMonths = Infinity;
    }


    const results: RoiResults = {
        totalAnnualGrossSavings,
        totalInvestmentOverLifespan,
        upfrontInvestment: resolvedUpfrontProfServicesCost,
        annualRecurringSoftwareCost: resolvedAnnualSoftwareCost,
        solutionLifespanYears: resolvedSolutionLifespanYears,
        overallRoiPercentage,
        totalNetBenefitOverLifespan,
        paybackPeriodMonths: finalPaybackPeriodMonths,
        savingsCalculationWorkings,
        annualBreakdown,
    };

    setAppState(prev => {
      const updatedModuleWithResults = {
        ...moduleDataToCalculate, // Contains the inputs and factors used for this calculation run
        results: results
      };
      return {
        ...prev,
        roiCalculator: {
          ...prev.roiCalculator,
          [moduleId]: updatedModuleWithResults
        }
      };
    });

  }, [setAppState]);

  const populateDemoData = useCallback(() => {
    if (!selectedModuleId) return;

    const currentModuleBaseData = appState.roiCalculator[selectedModuleId];
    const demoSpecificInputs = DEMO_ROI_SPECIFIC_INPUTS[selectedModuleId] || DEMO_ROI_SPECIFIC_INPUTS.default;
    
    const templateInputs = ROI_INPUT_TEMPLATES[selectedModuleId] || ROI_INPUT_TEMPLATES.default;
    const allDemoInputsWithStringValues = templateInputs.reduce((acc, inputField) => {
        acc[inputField.id] = demoSpecificInputs[inputField.id] ?? (inputField.type === 'number' ? "0" : "");
        return acc;
    }, {} as { [key: string]: string });


    const newModuleDataWithDemoValues: RoiModuleState = {
        ...currentModuleBaseData, 
        annualSalary: DEMO_ROI_GLOBAL_SETTINGS.annualSalary,
        annualSoftwareCost: DEMO_ROI_GLOBAL_SETTINGS.annualSoftwareCost,
        upfrontProfServicesCost: DEMO_ROI_GLOBAL_SETTINGS.upfrontProfServicesCost,
        solutionLifespanYears: DEMO_ROI_GLOBAL_SETTINGS.solutionLifespanYears,
        inputs: allDemoInputsWithStringValues,
        calculationFactors: { ...currentModuleBaseData.defaultCalculationFactors }, 
        results: null 
    };
    
    // Set state first to update inputs and factors
    setAppState(prev => ({
        ...prev,
        roiCalculator: {
            ...prev.roiCalculator,
            [selectedModuleId]: newModuleDataWithDemoValues
        }
    }));
    
    // Then calculate with this new state
    calculateRoi(newModuleDataWithDemoValues, selectedModuleId);

  }, [selectedModuleId, appState.roiCalculator, setAppState, calculateRoi]);

  const handleOpenAdminModal = () => setIsModalOpen(true);
  const handleCloseAdminModal = () => setIsModalOpen(false);

  const handleSaveRoiFactors = useCallback((newFactors: RoiCalculationFactors) => {
    if (!selectedModuleId) return;

    // Get the most current version of the module data from appState
    // This ensures we're not using a stale 'currentModuleRoiData' from the parent scope of this callback
    const moduleDataForUpdate = appState.roiCalculator[selectedModuleId];
    
    const newModuleDataWithUpdatedFactors: RoiModuleState = {
      ...moduleDataForUpdate, // Use the latest inputs and global settings
      calculationFactors: newFactors, // Apply the new factors
      results: null, // Clear previous results to indicate re-calculation is pending or happening
    };

    // Update the state with the module data that includes the new factors
    setAppState(prev => ({
      ...prev,
      roiCalculator: {
        ...prev.roiCalculator,
        [selectedModuleId]: newModuleDataWithUpdatedFactors,
      }
    }));

    // Explicitly call calculateRoi with the state that has the new factors
    calculateRoi(newModuleDataWithUpdatedFactors, selectedModuleId);
  }, [selectedModuleId, appState.roiCalculator, calculateRoi, setAppState]);


  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-8">
      <div>
        <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl font-semibold text-gray-800">ROI Calculator for {moduleConfig.name}</h2>
            <Button onClick={handleOpenAdminModal} variant="ghost" size="sm">Calculation Settings</Button>
        </div>
        <p className="text-sm text-gray-500 mb-6">Enter the following metrics to estimate potential ROI. Results will clear if inputs are changed.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6 p-4 border rounded-md bg-gray-50">
           <Input
            label="Average Annual Employee Salary ($)"
            id="annualSalary"
            type="number" 
            value={currentModuleRoiData.annualSalary?.toString() ?? ""} 
            onChange={(e) => handleInputChange('annualSalary', e.target.value)}
            placeholder="e.g., 75000"
          />
          <Input
            label="Annual Software Cost ($)"
            id="annualSoftwareCost"
            type="number"
            value={currentModuleRoiData.annualSoftwareCost?.toString() ?? ""}
            onChange={(e) => handleInputChange('annualSoftwareCost', e.target.value)}
            placeholder="e.g., 15000"
          />
          <Input
            label="Upfront Professional Services Cost ($)"
            id="upfrontProfServicesCost"
            type="number"
            value={currentModuleRoiData.upfrontProfServicesCost?.toString() ?? ""}
            onChange={(e) => handleInputChange('upfrontProfServicesCost', e.target.value)}
            placeholder="e.g., 7000"
          />
           <Input
            label="Solution Lifespan (Years)"
            id="solutionLifespanYears"
            type="number"
            value={currentModuleRoiData.solutionLifespanYears?.toString() ?? ""}
            onChange={(e) => handleInputChange('solutionLifespanYears', e.target.value)}
            placeholder="e.g., 3"
            min="1"
            max="10"
          />
          {moduleInputFields.map(input => (
            <Input
              key={input.id}
              label={`${input.label}${input.unit ? ` (${input.unit})` : ''}`}
              id={`${selectedModuleId}-${input.id}`}
              type={input.type}
              value={currentModuleRoiData.inputs[input.id]?.toString() || ""}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              placeholder={input.placeholder || (input.type === 'number' ? 'Enter number' : 'Enter text')}
            />
          ))}
        </div>
        <div className="flex space-x-3">
            <Button 
                onClick={() => calculateRoi(currentModuleRoiData, selectedModuleId)} 
                variant="primary"
                disabled={currentModuleRoiData.results !== null} // Disable if results are already shown and inputs haven't changed
                title={currentModuleRoiData.results !== null ? "Change inputs to re-enable calculation" : "Calculate ROI"}
            >
                Calculate ROI
            </Button>
            <Button onClick={populateDemoData} variant="secondary">Populate with Demo Data</Button>
        </div>
      </div>

      {isModalOpen && selectedModuleId && (
        <RoiCalculationSettingsModal
            isOpen={isModalOpen}
            onClose={handleCloseAdminModal}
            moduleName={moduleConfig.name}
            currentFactors={currentModuleRoiData.calculationFactors}
            defaultFactors={currentModuleRoiData.defaultCalculationFactors}
            onSave={handleSaveRoiFactors}
        />
      )}

      {currentModuleRoiData.results && (
        <div className="pt-6 border-t border-gray-200 space-y-6">
          <h3 className="text-lg font-semibold text-blue-700">Estimated ROI Results</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg shadow">
                <div className="text-xs text-blue-500 uppercase tracking-wider">Total Annual Gross Savings</div>
                <div className="text-2xl font-bold text-blue-700">{formatCurrency(currentModuleRoiData.results.totalAnnualGrossSavings)}</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg shadow">
                <div className="text-xs text-blue-500 uppercase tracking-wider">Total Net Benefit ({currentModuleRoiData.results.solutionLifespanYears} yrs)</div>
                <div className="text-2xl font-bold text-blue-700">{formatCurrency(currentModuleRoiData.results.totalNetBenefitOverLifespan)}</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg shadow">
                <div className="text-xs text-red-500 uppercase tracking-wider">Total Investment ({currentModuleRoiData.results.solutionLifespanYears} yrs)</div>
                <div className="text-2xl font-bold text-red-700">{formatCurrency(currentModuleRoiData.results.totalInvestmentOverLifespan)}</div>
            </div>
             <div className="p-4 bg-green-50 rounded-lg shadow">
                <div className="text-xs text-green-500 uppercase tracking-wider">Overall ROI ({currentModuleRoiData.results.solutionLifespanYears} yrs)</div>
                <div className="text-2xl font-bold text-green-700">
                    {isFinite(currentModuleRoiData.results.overallRoiPercentage) ? 
                     `${currentModuleRoiData.results.overallRoiPercentage.toFixed(1)}%` : 
                     (currentModuleRoiData.results.totalNetBenefitOverLifespan > 0 ? "Infinite (Positive Benefit, No/Zero Investment)" : "N/A")}
                </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg shadow">
                <div className="text-xs text-yellow-600 uppercase tracking-wider">Payback Period</div>
                <div className="text-2xl font-bold text-yellow-700">
                    {currentModuleRoiData.results.paybackPeriodMonths === 0 ? "Immediate" :
                     isFinite(currentModuleRoiData.results.paybackPeriodMonths) && currentModuleRoiData.results.paybackPeriodMonths > 0 ? 
                     `${currentModuleRoiData.results.paybackPeriodMonths.toFixed(1)} Months` : 
                     (currentModuleRoiData.results.totalNetBenefitOverLifespan <=0 ? 'N/A (No Payback)' : `> ${currentModuleRoiData.results.solutionLifespanYears*12} Months`)}
                </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">Savings Calculation Workings:</h4>
            <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-md">
              {currentModuleRoiData.results.savingsCalculationWorkings.map((item, idx) => (
                <div key={idx} className="p-3 border rounded bg-white shadow-sm">
                  <p className="font-semibold text-gray-700">{item.category}: <span className="font-bold text-green-600">{formatCurrency(item.result)}</span></p>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="font-medium">Formula:</span> {item.formula}
                  </p>
                  <details className="text-xs text-gray-500 mt-1">
                    <summary className="cursor-pointer hover:text-gray-700 font-medium">Inputs Used</summary>
                    <ul className="list-disc list-inside pl-4 mt-1 space-y-0.5">
                    {Object.entries(item.inputsUsed).map(([key, value]) => (
                        <li key={key}><span className="font-normal">{key}:</span> {typeof value === 'number' ? value.toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:2}) : value}</li>
                    ))}
                    </ul>
                  </details>
                </div>
              ))}
               {!currentModuleRoiData.results.savingsCalculationWorkings.length && <p className="text-gray-500">No specific savings categories calculated based on current inputs or factors.</p>}
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">Annual Financial Breakdown ({currentModuleRoiData.results.solutionLifespanYears} Years):</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">Year</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">Gross Savings</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">Software Cost</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">Upfront Investment</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">Net Cash Flow (Year)</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">Cumulative Net Cash Flow</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentModuleRoiData.results.annualBreakdown.map(item => (
                    <tr key={item.year}>
                      <td className="px-3 py-2 whitespace-nowrap">{item.year}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{formatCurrency(item.grossSavings)}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{formatCurrency(item.softwareCost)}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{formatCurrency(item.investment)}</td>
                      <td className={`px-3 py-2 whitespace-nowrap font-semibold ${item.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(item.netCashFlow)}
                      </td>
                      <td className={`px-3 py-2 whitespace-nowrap font-semibold ${item.cumulativeNetCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(item.cumulativeNetCashFlow)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoiCalculatorTab;