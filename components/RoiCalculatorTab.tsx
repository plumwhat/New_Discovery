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
    const numericValue = parseFloat(value) || 0; // Keep 0 if parsing fails or empty
    setAppState(prev => {
      const newModuleRoiData = { ...prev.roiCalculator[selectedModuleId!] };
      if (inputId in newModuleRoiData) { // Global ROI fields like 'annualSalary'
        (newModuleRoiData as any)[inputId] = value === "" ? "" : numericValue; // Store as number, or empty string if user clears it
      } else { // Module-specific inputs
        newModuleRoiData.inputs = { ...newModuleRoiData.inputs, [inputId]: value }; // Keep as string for input field, parse in calculation
      }
      return {
        ...prev,
        roiCalculator: { ...prev.roiCalculator, [selectedModuleId!]: newModuleRoiData }
      };
    });
  }, [selectedModuleId, setAppState]);
  
  const calculateRoi = useCallback((moduleDataToCalculate: RoiModuleState, moduleId: string) => {
    const { annualSalary, inputs, annualSoftwareCost, upfrontProfServicesCost, solutionLifespanYears } = moduleDataToCalculate;
    const resolvedAnnualSalary = typeof annualSalary === 'string' ? parseFloat(annualSalary) || 0 : annualSalary || 0;
    const hourlyRate = resolvedAnnualSalary > 0 && HOURLY_RATE_DIVISOR > 0 ? resolvedAnnualSalary / HOURLY_RATE_DIVISOR : 0;
    
    let totalAnnualGrossSavings = 0;
    const savingsCalculationWorkings: RoiResults['savingsCalculationWorkings'] = [];

    if (moduleId === 'accountsPayable') {
        const numInvoicesPerMonth = getInputValue(inputs, 'ap_roi_numInvoicesPerMonth');
        const avgManualProcessingTimePerInvoiceMins = getInputValue(inputs, 'ap_roi_avgManualProcessingTimePerInvoiceMins');
        const currentInvoiceErrorRatePercentage = getInputValue(inputs, 'ap_roi_currentInvoiceErrorRatePercentage') / 100;
        const avgTimeToResolveExceptionMins = getInputValue(inputs, 'ap_roi_avgTimeToResolveExceptionMins');
        const annualValueMissedEarlyPaymentDiscounts = getInputValue(inputs, 'ap_roi_annualValueMissedEarlyPaymentDiscounts');
        const annualCostPhysicalInvoiceStorage = getInputValue(inputs, 'ap_roi_annualCostPhysicalInvoiceStorage');
        
        if (numInvoicesPerMonth > 0 && avgManualProcessingTimePerInvoiceMins > 0 && hourlyRate > 0) {
            const timeSavedPerInvoiceMins = avgManualProcessingTimePerInvoiceMins * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const annualTimeSavingHours = (numInvoicesPerMonth * timeSavedPerInvoiceMins / 60) * 12;
            const laborSavingsProcessing = annualTimeSavingHours * hourlyRate;
            totalAnnualGrossSavings += laborSavingsProcessing;
            savingsCalculationWorkings.push({
                category: "Labor Savings (Invoice Processing Time Reduction)",
                formula: `(${numInvoicesPerMonth} invoices/mo * ${avgManualProcessingTimePerInvoiceMins} mins/invoice * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved / 60 mins/hr * 12 mo) * $${hourlyRate.toFixed(2)}/hr`,
                result: laborSavingsProcessing,
                inputsUsed: { numInvoicesPerMonth, avgManualProcessingTimePerInvoiceMins, hourlyRate }
            });
        }
        
        if (numInvoicesPerMonth > 0 && currentInvoiceErrorRatePercentage > 0 && avgTimeToResolveExceptionMins > 0 && hourlyRate > 0) {
            const errorsPerMonth = numInvoicesPerMonth * currentInvoiceErrorRatePercentage;
            const timeSpentResolvingErrorsMinsPerMonth = errorsPerMonth * avgTimeToResolveExceptionMins;
            const timeSavedResolvingErrorsMinsPerMonth = (timeSpentResolvingErrorsMinsPerMonth * AUTOMATION_ERROR_REDUCTION_PERCENTAGE);
            const errorReductionSavings = (timeSavedResolvingErrorsMinsPerMonth / 60) * 12 * hourlyRate;

            totalAnnualGrossSavings += errorReductionSavings;
            savingsCalculationWorkings.push({
                category: "Savings (Error Reduction & Resolution Time)",
                formula: `((${numInvoicesPerMonth} invoices/mo * ${currentInvoiceErrorRatePercentage*100}% error rate * ${avgTimeToResolveExceptionMins} mins/error * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% reduction) / 60 mins/hr * 12 mo) * $${hourlyRate.toFixed(2)}/hr`,
                result: errorReductionSavings,
                inputsUsed: { numInvoicesPerMonth, currentInvoiceErrorRatePercentage, avgTimeToResolveExceptionMins, hourlyRate }
            });
        }

        if (annualValueMissedEarlyPaymentDiscounts > 0) {
            totalAnnualGrossSavings += annualValueMissedEarlyPaymentDiscounts;
            savingsCalculationWorkings.push({
                category: "Captured Early Payment Discounts",
                formula: `Directly from input: Missed EPD value $${annualValueMissedEarlyPaymentDiscounts}`,
                result: annualValueMissedEarlyPaymentDiscounts,
                inputsUsed: { annualValueMissedEarlyPaymentDiscounts }
            });
        }

        if (annualCostPhysicalInvoiceStorage > 0) {
            totalAnnualGrossSavings += annualCostPhysicalInvoiceStorage;
            savingsCalculationWorkings.push({
                category: "Reduced Physical Invoice Storage Costs",
                formula: `Directly from input: Storage cost $${annualCostPhysicalInvoiceStorage}`,
                result: annualCostPhysicalInvoiceStorage,
                inputsUsed: { annualCostPhysicalInvoiceStorage }
            });
        }

    } else { 
        const manualTaskTimeHrsWeek = getInputValue(inputs, 'def_roi_manualTaskTimeHrsWeek') || (getInputValue(inputs, 'om_roi_avgManualOrderEntryTimeMins') / 60 * (getInputValue(inputs, 'om_roi_numSalesOrdersPerMonth') / 4.33) );
        const numEmployees = getInputValue(inputs, 'def_roi_numberOfEmployeesPerformingTask') || getInputValue(inputs, 'ap_roi_numFTEs') || 1;
        
        if (manualTaskTimeHrsWeek > 0 && numEmployees > 0 && hourlyRate > 0) {
            const timeSavedPerWeek = manualTaskTimeHrsWeek * AUTOMATION_TIME_SAVING_PERCENTAGE * numEmployees;
            const genericAnnualSavings = timeSavedPerWeek * 52 * hourlyRate;
            totalAnnualGrossSavings += genericAnnualSavings;
            savingsCalculationWorkings.push({
                category: "Generic Time Savings (Manual Task Reduction)",
                formula: `(${manualTaskTimeHrsWeek.toFixed(2)} hrs/wk/employee * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved * ${numEmployees} employees * 52 wks) * $${hourlyRate.toFixed(2)}/hr`,
                result: genericAnnualSavings,
                inputsUsed: { manualTaskTimeHrsWeek, numEmployees, hourlyRate }
            });
        }
    }
    
    const resolvedAnnualSoftwareCost = typeof annualSoftwareCost === 'string' ? parseFloat(annualSoftwareCost) || 0 : annualSoftwareCost || 0;
    const resolvedUpfrontProfServicesCost = typeof upfrontProfServicesCost === 'string' ? parseFloat(upfrontProfServicesCost) || 0 : upfrontProfServicesCost || 0;
    const resolvedSolutionLifespanYears = typeof solutionLifespanYears === 'string' ? parseInt(solutionLifespanYears, 10) || 0 : solutionLifespanYears || 0;

    const totalInvestmentOverLifespan = resolvedUpfrontProfServicesCost + (resolvedAnnualSoftwareCost * resolvedSolutionLifespanYears);
    const totalSavingsOverLifespan = totalAnnualGrossSavings * resolvedSolutionLifespanYears;
    const totalNetBenefitOverLifespan = totalSavingsOverLifespan - totalInvestmentOverLifespan;
    const overallRoiPercentage = totalInvestmentOverLifespan > 0 ? (totalNetBenefitOverLifespan / totalInvestmentOverLifespan) * 100 : (totalNetBenefitOverLifespan > 0 ? Infinity : 0) ;


    const annualBreakdown: RoiResults['annualBreakdown'] = [];
    let cumulativeNetCashFlow = 0;
    let paybackPeriodMonths = Infinity;

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

        if (paybackPeriodMonths === Infinity && cumulativeNetCashFlow >= 0) {
             if (prevCumulativeNetCashFlow < 0 && netCashFlowYear > 0) { // Crossed from negative to positive this year
                paybackPeriodMonths = ((i - 1) * 12) + ((-prevCumulativeNetCashFlow / netCashFlowYear) * 12);
            } else if (prevCumulativeNetCashFlow < 0 && netCashFlowYear === 0 && cumulativeNetCashFlow === 0) { // Landed exactly on zero with zero CF this year
                paybackPeriodMonths = i * 12;
            } else if (prevCumulativeNetCashFlow === 0 && cumulativeNetCashFlow === 0) { // Started at zero and stayed zero
                paybackPeriodMonths = (i-1) * 12; // Payback was immediate or at end of prior year
            } else if (cumulativeNetCashFlow >= 0) { // Became positive
                 paybackPeriodMonths = i * 12; // Default to end of current year if logic above doesn't catch precise point
            }
             if (resolvedUpfrontProfServicesCost === 0 && totalAnnualGrossSavings > resolvedAnnualSoftwareCost && i === 1) { // Profitable from year 1 with no upfront
                paybackPeriodMonths = 0; // Immediate payback
            }
        }
    }
     if (paybackPeriodMonths === Infinity && cumulativeNetCashFlow < 0) {
        paybackPeriodMonths = Infinity; 
    } else if (paybackPeriodMonths < 0) { 
        paybackPeriodMonths = 0;
    }


    const results: RoiResults = {
        totalAnnualGrossSavings,
        totalInvestmentOverLifespan,
        upfrontInvestment: resolvedUpfrontProfServicesCost,
        annualRecurringSoftwareCost: resolvedAnnualSoftwareCost,
        solutionLifespanYears: resolvedSolutionLifespanYears,
        overallRoiPercentage,
        totalNetBenefitOverLifespan,
        paybackPeriodMonths,
        savingsCalculationWorkings,
        annualBreakdown,
    };

    setAppState(prev => {
      // Ensure we are updating the correct module's data, with the newly calculated results.
      // moduleDataToCalculate already contains the inputs used for this calculation.
      const updatedModuleWithResults = {
        ...moduleDataToCalculate,
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

    const demoSpecificInputs = (selectedModuleId === 'accountsPayable') 
        ? {
            ap_roi_numInvoicesPerMonth: "5000",
            ap_roi_avgManualProcessingTimePerInvoiceMins: "15",
            ap_roi_currentInvoiceErrorRatePercentage: "5",
            ap_roi_avgTimeToResolveExceptionMins: "30",
            ap_roi_annualValueMissedEarlyPaymentDiscounts: "10000",
            ap_roi_annualCostPhysicalInvoiceStorage: "2000",
            ap_roi_numFTEs: "5",
        } 
        : { // Default demo inputs
            def_roi_manualTaskTimeHrsWeek: "20",
            def_roi_numberOfEmployeesPerformingTask: "3",
            def_roi_errorRatePercentage: "10",
            def_roi_costPerError: "50",
        };
    
    // Ensure all input fields defined in ROI_INPUT_TEMPLATES for the module have a string value, even if empty
    const templateInputs = ROI_INPUT_TEMPLATES[selectedModuleId] || ROI_INPUT_TEMPLATES.default;
    const allDemoInputsWithStringValues = templateInputs.reduce((acc, inputField) => {
        acc[inputField.id] = demoSpecificInputs[inputField.id] ?? (inputField.type === 'number' ? "0" : ""); // Ensure string, default to "0" for numbers if not in demoSpecificInputs
        return acc;
    }, {} as { [key: string]: string });


    const newModuleDataWithDemoValues: RoiModuleState = {
        ...currentModuleBaseData, // Start with existing structure
        annualSalary: 75000,     // Apply demo global settings
        annualSoftwareCost: 12000,
        upfrontProfServicesCost: 8000,
        solutionLifespanYears: 3,
        inputs: { // Merge, ensuring all template fields are present as strings
            ...currentModuleBaseData.inputs, // Keep any existing unrelated inputs (though usually reset)
            ...allDemoInputsWithStringValues // Override with demo values, ensuring string type
        },
        results: null // Clear previous results
    };
    
    setAppState(prev => ({
        ...prev,
        roiCalculator: {
            ...prev.roiCalculator,
            [selectedModuleId]: newModuleDataWithDemoValues
        }
    }));
    
    // Call calculateRoi with the exact data that was just prepared for the state
    calculateRoi(newModuleDataWithDemoValues, selectedModuleId);

  }, [selectedModuleId, appState.roiCalculator, setAppState, calculateRoi]);


  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">ROI Calculator for {moduleConfig.name}</h2>
        <p className="text-sm text-gray-500 mb-6">Enter the following metrics to estimate potential ROI.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6 p-4 border rounded-md bg-gray-50">
           <Input
            label="Average Annual Employee Salary ($)"
            id="annualSalary"
            type="number" // Input type is number for browser behavior
            value={currentModuleRoiData.annualSalary?.toString() ?? ""} // Display as string
            onChange={(e) => handleInputChange('annualSalary', e.target.value)}
            placeholder="e.g., 60000"
          />
          <Input
            label="Annual Software Cost ($)"
            id="annualSoftwareCost"
            type="number"
            value={currentModuleRoiData.annualSoftwareCost?.toString() ?? ""}
            onChange={(e) => handleInputChange('annualSoftwareCost', e.target.value)}
            placeholder="e.g., 10000"
          />
          <Input
            label="Upfront Professional Services Cost ($)"
            id="upfrontProfServicesCost"
            type="number"
            value={currentModuleRoiData.upfrontProfServicesCost?.toString() ?? ""}
            onChange={(e) => handleInputChange('upfrontProfServicesCost', e.target.value)}
            placeholder="e.g., 5000"
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
              placeholder={`Enter value`}
            />
          ))}
        </div>
        <div className="flex space-x-3">
            <Button onClick={() => calculateRoi(currentModuleRoiData, selectedModuleId)} variant="primary">Calculate ROI</Button>
            <Button onClick={populateDemoData} variant="secondary">Populate with Demo Data</Button>
        </div>
      </div>

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
                     (currentModuleRoiData.results.totalNetBenefitOverLifespan > 0 ? "Very High (Effectively Infinite)" : "N/A")}
                </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg shadow">
                <div className="text-xs text-yellow-600 uppercase tracking-wider">Payback Period</div>
                <div className="text-2xl font-bold text-yellow-700">
                    {isFinite(currentModuleRoiData.results.paybackPeriodMonths) ? 
                     (currentModuleRoiData.results.paybackPeriodMonths <= 0 && currentModuleRoiData.results.totalNetBenefitOverLifespan > 0 ? "Immediate" : `${currentModuleRoiData.results.paybackPeriodMonths.toFixed(1)} Months`) : 
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