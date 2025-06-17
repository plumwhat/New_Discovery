
import React, { useCallback } from 'react';
import { TabProps, RoiInput as RoiInputType, RoiResults, RoiModuleState } from '../types';
import { ROI_INPUT_TEMPLATES, HOURLY_RATE_DIVISOR, ALL_MODULES, AUTOMATION_TIME_SAVING_PERCENTAGE, AUTOMATION_ERROR_REDUCTION_PERCENTAGE } from '../constants';
import Input from './common/Input';
import Button from './common/Button';

const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const getInputValue = (inputs: RoiModuleState['inputs'], key: string): number => {
    const val = inputs[key];
    return typeof val === 'string' ? parseFloat(val) || 0 : val || 0;
};


const RoiCalculatorTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { selectedModuleId } = appState;

  if (!selectedModuleId) {
    return <div className="p-6 bg-white shadow rounded-lg text-gray-600">Please select a module first.</div>;
  }

  const currentModuleRoiData = appState.roiCalculator[selectedModuleId];
  const moduleConfig = ALL_MODULES.find(m => m.id === selectedModuleId);

  if (!currentModuleRoiData || !moduleConfig) {
    return <div className="p-6 bg-white shadow rounded-lg text-red-500">ROI configuration not found for module: {selectedModuleId}.</div>;
  }

  const moduleInputFields = ROI_INPUT_TEMPLATES[selectedModuleId] || ROI_INPUT_TEMPLATES.default;

  const handleInputChange = useCallback((inputId: keyof RoiModuleState | string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setAppState(prev => {
      const newModuleRoiData = { ...prev.roiCalculator[selectedModuleId] };
      if (inputId in newModuleRoiData) { // Global ROI fields
        (newModuleRoiData as any)[inputId] = numericValue;
      } else { // Module-specific inputs
        newModuleRoiData.inputs = { ...newModuleRoiData.inputs, [inputId]: value }; // Keep as string for input field, parse in calculation
      }
      return {
        ...prev,
        roiCalculator: { ...prev.roiCalculator, [selectedModuleId]: newModuleRoiData }
      };
    });
  }, [selectedModuleId, setAppState]);
  
  const calculateRoi = useCallback(() => {
    const { annualSalary, inputs, annualSoftwareCost, upfrontProfServicesCost, solutionLifespanYears } = currentModuleRoiData;
    const hourlyRate = annualSalary > 0 && HOURLY_RATE_DIVISOR > 0 ? annualSalary / HOURLY_RATE_DIVISOR : 0;
    let totalAnnualGrossSavings = 0;
    const savingsCalculationWorkings: RoiResults['savingsCalculationWorkings'] = [];

    // Module-specific calculations
    if (selectedModuleId === 'accountsPayable') {
        const numInvoicesPerMonth = getInputValue(inputs, 'ap_roi_numInvoicesPerMonth');
        const avgManualProcessingTimePerInvoiceMins = getInputValue(inputs, 'ap_roi_avgManualProcessingTimePerInvoiceMins');
        const currentInvoiceErrorRatePercentage = getInputValue(inputs, 'ap_roi_currentInvoiceErrorRatePercentage') / 100;
        const avgTimeToResolveExceptionMins = getInputValue(inputs, 'ap_roi_avgTimeToResolveExceptionMins');
        const annualValueMissedEarlyPaymentDiscounts = getInputValue(inputs, 'ap_roi_annualValueMissedEarlyPaymentDiscounts');
        const annualCostPhysicalInvoiceStorage = getInputValue(inputs, 'ap_roi_annualCostPhysicalInvoiceStorage');
        // const numFTEs = getInputValue(inputs, 'ap_roi_numFTEs'); // numFTEs is used in generic if not specific


        // 1. Labor savings from reduced processing time
        if (numInvoicesPerMonth > 0 && avgManualProcessingTimePerInvoiceMins > 0 && hourlyRate > 0) {
            const timeSavedPerInvoiceMins = avgManualProcessingTimePerInvoiceMins * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const annualTimeSavingHours = (numInvoicesPerMonth * timeSavedPerInvoiceMins / 60) * 12;
            const laborSavingsProcessing = annualTimeSavingHours * hourlyRate;
            totalAnnualGrossSavings += laborSavingsProcessing;
            savingsCalculationWorkings.push({
                category: "Labor Savings (Invoice Processing Time Reduction)",
                formula: `(${numInvoicesPerMonth} invoices/mo * ${avgManualProcessingTimePerInvoiceMins} mins/invoice * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved / 60 mins/hr * 12 mo) * $${hourlyRate.toFixed(2)}/hr`,
                result: laborSavingsProcessing,
                inputsUsed: { numInvoicesPerMonth, avgManualProcessingTimePerInvoiceMins, hourlyRate, AUTOMATION_TIME_SAVING_PERCENTAGE }
            });
        }
        
        // 2. Savings from error reduction
        if (numInvoicesPerMonth > 0 && currentInvoiceErrorRatePercentage > 0 && avgTimeToResolveExceptionMins > 0 && hourlyRate > 0) {
            const errorsPerMonth = numInvoicesPerMonth * currentInvoiceErrorRatePercentage;
            // const errorsReducedPerMonth = errorsPerMonth * AUTOMATION_ERROR_REDUCTION_PERCENTAGE; // This is the reduction amount
            const timeSpentResolvingErrorsMinsPerMonth = errorsPerMonth * avgTimeToResolveExceptionMins;
            const timeSavedResolvingErrorsMinsPerMonth = (timeSpentResolvingErrorsMinsPerMonth * AUTOMATION_ERROR_REDUCTION_PERCENTAGE);
            const errorReductionSavings = (timeSavedResolvingErrorsMinsPerMonth / 60) * 12 * hourlyRate;

            totalAnnualGrossSavings += errorReductionSavings;
            savingsCalculationWorkings.push({
                category: "Savings (Error Reduction & Resolution Time)",
                formula: `((${numInvoicesPerMonth} invoices/mo * ${currentInvoiceErrorRatePercentage*100}% error rate * ${avgTimeToResolveExceptionMins} mins/error * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% reduction) / 60 mins/hr * 12 mo) * $${hourlyRate.toFixed(2)}/hr`,
                result: errorReductionSavings,
                inputsUsed: { numInvoicesPerMonth, currentInvoiceErrorRatePercentage, avgTimeToResolveExceptionMins, hourlyRate, AUTOMATION_ERROR_REDUCTION_PERCENTAGE }
            });
        }

        // 3. Captured early payment discounts
        if (annualValueMissedEarlyPaymentDiscounts > 0) {
            totalAnnualGrossSavings += annualValueMissedEarlyPaymentDiscounts;
            savingsCalculationWorkings.push({
                category: "Captured Early Payment Discounts",
                formula: `Directly from input: Missed EPD value $${annualValueMissedEarlyPaymentDiscounts}`,
                result: annualValueMissedEarlyPaymentDiscounts,
                inputsUsed: { annualValueMissedEarlyPaymentDiscounts }
            });
        }

        // 4. Reduced physical storage costs
        if (annualCostPhysicalInvoiceStorage > 0) {
            totalAnnualGrossSavings += annualCostPhysicalInvoiceStorage;
            savingsCalculationWorkings.push({
                category: "Reduced Physical Invoice Storage Costs",
                formula: `Directly from input: Storage cost $${annualCostPhysicalInvoiceStorage}`,
                result: annualCostPhysicalInvoiceStorage,
                inputsUsed: { annualCostPhysicalInvoiceStorage }
            });
        }
    } else if (selectedModuleId === 'orderManagement') {
        const numSalesOrdersPerMonth = getInputValue(inputs, 'om_roi_numSalesOrdersPerMonth');
        const avgManualOrderEntryTimeMins = getInputValue(inputs, 'om_roi_avgManualOrderEntryTimeMins');
        const currentOrderErrorRatePercentage = getInputValue(inputs, 'om_roi_currentOrderErrorRatePercentage') / 100;
        const avgCostToReworkOrderError = getInputValue(inputs, 'om_roi_avgCostToReworkOrderError');
        // const numFTEs = getInputValue(inputs, 'om_roi_numFTEs'); // Used in generic if needed

        // 1. Labor savings from reduced order entry time
        if (numSalesOrdersPerMonth > 0 && avgManualOrderEntryTimeMins > 0 && hourlyRate > 0) {
            const timeSavedPerOrderMins = avgManualOrderEntryTimeMins * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const annualTimeSavingHours = (numSalesOrdersPerMonth * timeSavedPerOrderMins / 60) * 12;
            const laborSavingsOrderEntry = annualTimeSavingHours * hourlyRate;
            totalAnnualGrossSavings += laborSavingsOrderEntry;
            savingsCalculationWorkings.push({
                category: "Labor Savings (Order Entry Time Reduction)",
                formula: `(${numSalesOrdersPerMonth} orders/mo * ${avgManualOrderEntryTimeMins} mins/order * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved / 60 mins/hr * 12 mo) * $${hourlyRate.toFixed(2)}/hr`,
                result: laborSavingsOrderEntry,
                inputsUsed: { numSalesOrdersPerMonth, avgManualOrderEntryTimeMins, hourlyRate, AUTOMATION_TIME_SAVING_PERCENTAGE }
            });
        }

        // 2. Savings from reduced order errors (direct cost saving)
        if (numSalesOrdersPerMonth > 0 && currentOrderErrorRatePercentage > 0 && avgCostToReworkOrderError > 0) {
            const errorsPerMonth = numSalesOrdersPerMonth * currentOrderErrorRatePercentage;
            const errorsReducedPerMonth = errorsPerMonth * AUTOMATION_ERROR_REDUCTION_PERCENTAGE;
            const annualErrorCostSavings = errorsReducedPerMonth * avgCostToReworkOrderError * 12;
            totalAnnualGrossSavings += annualErrorCostSavings;
            savingsCalculationWorkings.push({
                category: "Savings (Reduced Order Rework Costs)",
                formula: `(${numSalesOrdersPerMonth} orders/mo * ${currentOrderErrorRatePercentage*100}% error rate * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% reduction * $${avgCostToReworkOrderError}/error * 12 mo)`,
                result: annualErrorCostSavings,
                inputsUsed: { numSalesOrdersPerMonth, currentOrderErrorRatePercentage, avgCostToReworkOrderError, AUTOMATION_ERROR_REDUCTION_PERCENTAGE }
            });
        }

    } else { // Generic fallback for other modules
        const manualTaskTimeHrsWeek = getInputValue(inputs, 'def_roi_manualTaskTimeHrsWeek');
        const numEmployees = getInputValue(inputs, 'def_roi_numberOfEmployeesPerformingTask') || 1;
        
        if (manualTaskTimeHrsWeek > 0 && numEmployees > 0 && hourlyRate > 0) {
            const timeSavedPerWeek = manualTaskTimeHrsWeek * AUTOMATION_TIME_SAVING_PERCENTAGE * numEmployees;
            const genericAnnualSavings = timeSavedPerWeek * 52 * hourlyRate;
            totalAnnualGrossSavings += genericAnnualSavings;
            savingsCalculationWorkings.push({
                category: "Generic Time Savings (Manual Task Reduction)",
                formula: `(${manualTaskTimeHrsWeek.toFixed(2)} hrs/wk/employee * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved * ${numEmployees} employees * 52 wks) * $${hourlyRate.toFixed(2)}/hr`,
                result: genericAnnualSavings,
                inputsUsed: { manualTaskTimeHrsWeek, numEmployees, hourlyRate, AUTOMATION_TIME_SAVING_PERCENTAGE }
            });
        }
    }
    
    const totalInvestmentOverLifespan = upfrontProfServicesCost + (annualSoftwareCost * solutionLifespanYears);
    const totalSavingsOverLifespan = totalAnnualGrossSavings * solutionLifespanYears;
    const totalNetBenefitOverLifespan = totalSavingsOverLifespan - totalInvestmentOverLifespan;
    const overallRoiPercentage = totalInvestmentOverLifespan > 0 ? (totalNetBenefitOverLifespan / totalInvestmentOverLifespan) * 100 : (totalNetBenefitOverLifespan > 0 ? Infinity : 0);


    const annualBreakdown: RoiResults['annualBreakdown'] = [];
    let cumulativeNetCashFlow = 0;
    let paybackPeriodMonths = Infinity; // Default to Infinity

    for (let i = 1; i <= solutionLifespanYears; i++) {
        const investmentThisYear = (i === 1) ? upfrontProfServicesCost : 0;
        const netCashFlowYear = totalAnnualGrossSavings - annualSoftwareCost - investmentThisYear;
        const prevCumulativeNetCashFlow = cumulativeNetCashFlow;
        cumulativeNetCashFlow += netCashFlowYear;
        
        annualBreakdown.push({
            year: i,
            grossSavings: totalAnnualGrossSavings,
            softwareCost: annualSoftwareCost,
            investment: investmentThisYear,
            netCashFlow: netCashFlowYear,
            cumulativeNetCashFlow: cumulativeNetCashFlow
        });

        if (paybackPeriodMonths === Infinity && cumulativeNetCashFlow >= 0) {
          if (netCashFlowYear > 0) { // If positive cash flow in the year payback occurs
            paybackPeriodMonths = ((i - 1) - (prevCumulativeNetCashFlow / netCashFlowYear)) * 12;
          } else if (cumulativeNetCashFlow === 0 && prevCumulativeNetCashFlow < 0) { // Payback exactly at year end
            paybackPeriodMonths = i * 12;
          } else if (prevCumulativeNetCashFlow === 0 && i === 1 && netCashFlowYear >=0 ) { // Payback at start of first year or during Y1
             paybackPeriodMonths = 0; // or i * 12 if payback is exactly at year 1 end and cashflow is 0
          } else if (prevCumulativeNetCashFlow < 0 && netCashFlowYear === 0 && cumulativeNetCashFlow ===0 ) { // If payback happens due to zero cash flow making cumulative zero
             paybackPeriodMonths = i * 12;
          } else if (prevCumulativeNetCashFlow === 0 && netCashFlowYear === 0 && i===1) { // starts at 0 and stays 0
            paybackPeriodMonths = 0; // or Infinity if no investment and no savings
          } else if (netCashFlowYear <= 0 && cumulativeNetCashFlow >= 0) { // If payback occurs but current year cashflow is not positive (e.g. initial investment paid back by previous positive flows)
            paybackPeriodMonths = (i-1)*12; // Payback was at end of previous year
          }
        }
    }
    
    if (paybackPeriodMonths === Infinity && cumulativeNetCashFlow < 0) { // If never paid back
        // Keep paybackPeriodMonths as Infinity
    } else if (paybackPeriodMonths < 0) { // If paid back instantly or calculation results in negative
        paybackPeriodMonths = 0;
    } else if (paybackPeriodMonths > solutionLifespanYears * 12) {
        paybackPeriodMonths = Infinity; // Exceeds lifespan
    }


    const results: RoiResults = {
        totalAnnualGrossSavings,
        totalInvestmentOverLifespan,
        upfrontInvestment: upfrontProfServicesCost,
        annualRecurringSoftwareCost: annualSoftwareCost,
        solutionLifespanYears,
        overallRoiPercentage,
        totalNetBenefitOverLifespan,
        paybackPeriodMonths,
        savingsCalculationWorkings,
        annualBreakdown,
    };

    setAppState(prev => ({
        ...prev,
        roiCalculator: {
            ...prev.roiCalculator,
            [selectedModuleId]: { ...prev.roiCalculator[selectedModuleId], results }
        }
    }));

  }, [currentModuleRoiData, selectedModuleId, setAppState]);

  const populateDemoData = useCallback(() => {
    const demoValues: Partial<RoiModuleState> & { inputs: RoiModuleState['inputs'] } = { // Ensure inputs is not partial
        annualSalary: 75000,
        annualSoftwareCost: 12000,
        upfrontProfServicesCost: 8000,
        solutionLifespanYears: 3,
        inputs: {}, // Initialize inputs
    };

    if (selectedModuleId === 'accountsPayable') {
        demoValues.inputs = {
            ap_roi_numInvoicesPerMonth: "5000",
            ap_roi_avgManualProcessingTimePerInvoiceMins: "15",
            ap_roi_currentInvoiceErrorRatePercentage: "5",
            ap_roi_avgTimeToResolveExceptionMins: "30",
            ap_roi_annualValueMissedEarlyPaymentDiscounts: "10000",
            ap_roi_annualCostPhysicalInvoiceStorage: "2000",
            ap_roi_numFTEs: "5",
        };
    } else if (selectedModuleId === 'orderManagement') {
        demoValues.inputs = {
            om_roi_numSalesOrdersPerMonth: "2000",
            om_roi_avgManualOrderEntryTimeMins: "10",
            om_roi_currentOrderErrorRatePercentage: "4",
            om_roi_avgCostToReworkOrderError: "25",
            om_roi_numFTEs: "3",
        };
    } else { 
        // Generic defaults for modules without specific demo data
        // Ensure these keys exist in ROI_INPUT_TEMPLATES.default
        demoValues.inputs = {
            def_roi_manualTaskTimeHrsWeek: "20",       // Make sure this ID is in default template
            def_roi_numberOfEmployeesPerformingTask: "3", // Make sure this ID is in default template
            // Add other default keys if necessary, e.g., for error rate or cost per error if your default template uses them
        };
    }
    
    setAppState(prev => {
        const existingModuleData = prev.roiCalculator[selectedModuleId];
        const updatedModuleRoiData: RoiModuleState = {
            ...existingModuleData,
            annualSalary: demoValues.annualSalary ?? existingModuleData.annualSalary,
            annualSoftwareCost: demoValues.annualSoftwareCost ?? existingModuleData.annualSoftwareCost,
            upfrontProfServicesCost: demoValues.upfrontProfServicesCost ?? existingModuleData.upfrontProfServicesCost,
            solutionLifespanYears: demoValues.solutionLifespanYears ?? existingModuleData.solutionLifespanYears,
            inputs: { ...existingModuleData.inputs, ...demoValues.inputs },
            results: null 
        };
      return {
        ...prev,
        roiCalculator: { ...prev.roiCalculator, [selectedModuleId]: updatedModuleRoiData }
      };
    });
    setTimeout(calculateRoi, 100); // Recalculate after state update
  }, [selectedModuleId, setAppState, calculateRoi]);


  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">ROI Calculator for {moduleConfig.name}</h2>
        <p className="text-sm text-gray-500 mb-6">Enter the following metrics to estimate potential ROI.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6 p-4 border rounded-md bg-gray-50">
           <Input
            label="Average Annual Employee Salary ($)"
            id="annualSalary"
            type="number"
            value={currentModuleRoiData.annualSalary.toString()}
            onChange={(e) => handleInputChange('annualSalary', e.target.value)}
            placeholder="e.g., 60000"
          />
          <Input
            label="Annual Software Cost ($)"
            id="annualSoftwareCost"
            type="number"
            value={currentModuleRoiData.annualSoftwareCost.toString()}
            onChange={(e) => handleInputChange('annualSoftwareCost', e.target.value)}
            placeholder="e.g., 10000"
          />
          <Input
            label="Upfront Professional Services Cost ($)"
            id="upfrontProfServicesCost"
            type="number"
            value={currentModuleRoiData.upfrontProfServicesCost.toString()}
            onChange={(e) => handleInputChange('upfrontProfServicesCost', e.target.value)}
            placeholder="e.g., 5000"
          />
           <Input
            label="Solution Lifespan (Years)"
            id="solutionLifespanYears"
            type="number"
            value={currentModuleRoiData.solutionLifespanYears.toString()}
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
              placeholder={`Enter value`}
            />
          ))}
        </div>
        <div className="flex space-x-3">
            <Button onClick={calculateRoi} variant="primary">Calculate ROI</Button>
            <Button onClick={populateDemoData} variant="secondary">Populate with Demo Data</Button>
        </div>
      </div>

      {currentModuleRoiData.results && (
        <div className="pt-6 border-t border-gray-200 space-y-6">
          <h3 className="text-lg font-semibold text-blue-700">Estimated ROI Results</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg shadow">
                <div className="text-xs text-blue-500 uppercase tracking-wider">Total Annual Gross Savings</div>
                {currentModuleRoiData.results.savingsCalculationWorkings && currentModuleRoiData.results.savingsCalculationWorkings.length > 0 && (
                  <div className="mt-1 mb-2 text-xs text-blue-600 space-y-0.5">
                    {currentModuleRoiData.results.savingsCalculationWorkings.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.category}:</span>
                        <span className="font-medium">{formatCurrency(item.result)}</span>
                      </div>
                    ))}
                     <hr className="my-1 border-blue-200"/>
                  </div>
                )}
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
                    {isFinite(currentModuleRoiData.results.overallRoiPercentage) ? `${currentModuleRoiData.results.overallRoiPercentage.toFixed(1)}%` : 'N/A'}
                </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg shadow">
                <div className="text-xs text-yellow-600 uppercase tracking-wider">Payback Period</div>
                <div className="text-2xl font-bold text-yellow-700">
                    {isFinite(currentModuleRoiData.results.paybackPeriodMonths) ? 
                     `${currentModuleRoiData.results.paybackPeriodMonths.toFixed(1)} Months` : 
                     (currentModuleRoiData.results.totalNetBenefitOverLifespan <=0 && currentModuleRoiData.results.totalInvestmentOverLifespan > 0 ? 'N/A (No Payback)' : 
                     (currentModuleRoiData.results.totalInvestmentOverLifespan === 0 && currentModuleRoiData.results.totalAnnualGrossSavings > 0 ? 'Instant' : 
                     (currentModuleRoiData.results.totalInvestmentOverLifespan === 0 && currentModuleRoiData.results.totalAnnualGrossSavings === 0 ? 'N/A' : `> ${currentModuleRoiData.results.solutionLifespanYears*12} Months`)))}
                </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">Detailed Savings Calculation Workings:</h4>
            <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-md">
              {currentModuleRoiData.results.savingsCalculationWorkings.map((item, idx) => (
                <div key={idx} className="p-3 border rounded bg-white shadow-sm">
                  <p className="font-semibold text-gray-700">{item.category}: <span className="font-bold text-green-600">{formatCurrency(item.result)}</span></p>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="font-medium">Formula:</span> {item.formula}
                  </p>
                  <details className="text-xs text-gray-500 mt-1">
                    <summary className="cursor-pointer hover:text-gray-700">Inputs Used</summary>
                    <ul className="list-disc list-inside pl-2">
                    {Object.entries(item.inputsUsed).map(([key, value]) => (
                        <li key={key}>{key}: {typeof value === 'number' ? value.toFixed(2) : value}</li>
                    ))}
                    </ul>
                  </details>
                </div>
              ))}
               {!currentModuleRoiData.results.savingsCalculationWorkings.length && <p className="text-gray-500">No specific savings categories calculated based on current inputs.</p>}
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
