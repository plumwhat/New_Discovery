
import React, { useCallback } from 'react';
import { RoiModuleState, TabProps, TabId, RoiInput } from '../types'; // Added RoiInput type
import { getRoiInputTemplates } from '../services/configService'; // Changed import
import { ROI_DEMO_DATA } from '../constants/roiDemoDataConstants'; // Import demo data
import { ALL_MODULES } from '../constants/moduleConstants';
import Input from './common/Input';
import Button from './common/Button';
import { InformationCircleIcon, LightBulbIcon } from './common/Icons'; // Added LightBulbIcon
import { performRoiCalculation } from '../services/roiService';
import { formatCurrency, getPaybackPeriodDisplay } from '../utils/formattingUtils';


const RoiCalculatorTab: React.FC<TabProps> = ({ appState, setAppState }) => {
  const { selectedModuleId } = appState;
  const tabIdValue = TabId.ROI_CALCULATOR; // Used for unique ID generation
  const dynamicRoiInputTemplates = getRoiInputTemplates(); // Get templates from config service

  if (!selectedModuleId) {
    return (
        <section
            className="p-6 bg-white shadow rounded-lg text-gray-600"
            role="region"
            aria-labelledby={`${tabIdValue}-placeholder-heading`}
        >
             <h2 id={`${tabIdValue}-placeholder-heading`} className="sr-only">ROI Calculator Information</h2>
            Please select a module first.
        </section>
    );
  }

  const currentModuleRoiData = appState.roiCalculator[selectedModuleId];
  const moduleConfig = ALL_MODULES.find(m => m.id === selectedModuleId);

  if (!currentModuleRoiData || !moduleConfig) {
    return (
        <section
            className="p-6 bg-white shadow rounded-lg text-red-500"
            role="region"
            aria-labelledby={`${tabIdValue}-error-heading`}
        >
            <h2 id={`${tabIdValue}-error-heading`} className="sr-only">ROI Calculator Error</h2>
            ROI configuration not found for module: {selectedModuleId}.
        </section>
    );
  }

  const moduleInputFields = dynamicRoiInputTemplates[selectedModuleId] || dynamicRoiInputTemplates.default;

  const handleInputChange = useCallback((inputId: keyof RoiModuleState | string, value: string) => {
    setAppState(prev => {
      const newModuleRoiData = { ...prev.roiCalculator[selectedModuleId] };
      if (inputId in newModuleRoiData && typeof (newModuleRoiData as any)[inputId] === 'number') {
        const numericValue = parseFloat(value.replace(/,/g, '')) || 0;
        (newModuleRoiData as any)[inputId] = numericValue;
      } else {
        newModuleRoiData.inputs = { ...newModuleRoiData.inputs, [inputId]: value };
      }
      return {
        ...prev,
        roiCalculator: { ...prev.roiCalculator, [selectedModuleId]: newModuleRoiData }
      };
    });
  }, [selectedModuleId, setAppState]);

  const calculateRoi = useCallback(() => {
    const results = performRoiCalculation(currentModuleRoiData, selectedModuleId, appState);
    setAppState(prev => ({
      ...prev,
      roiCalculator: {
        ...prev.roiCalculator,
        [selectedModuleId]: { ...prev.roiCalculator[selectedModuleId], results }
      }
    }));
  }, [selectedModuleId, currentModuleRoiData, setAppState, appState]);

  const handlePopulateDemoData = useCallback(() => {
    if (!selectedModuleId) return;

    const demoDataForModule = ROI_DEMO_DATA[selectedModuleId] || ROI_DEMO_DATA.default;

    setAppState(prev => {
      const currentData = prev.roiCalculator[selectedModuleId];
      const updatedData = {
        ...currentData,
        annualSalary: demoDataForModule.annualSalary,
        annualSoftwareCost: demoDataForModule.annualSoftwareCost,
        upfrontProfServicesCost: demoDataForModule.upfrontProfServicesCost,
        solutionLifespanYears: demoDataForModule.solutionLifespanYears,
        inputs: { ...demoDataForModule.inputs }, // Ensure all demo inputs are applied
        results: null, // Clear previous results to prompt recalculation
      };
      return {
        ...prev,
        roiCalculator: {
          ...prev.roiCalculator,
          [selectedModuleId]: updatedData,
        }
      };
    });
  }, [selectedModuleId, setAppState]);

  const renderInputSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        <Input
          label="Average Annual Employee Salary (for FTE costs)"
          id="annualSalary"
          type="number"
          value={currentModuleRoiData.annualSalary || ""}
          onChange={e => handleInputChange('annualSalary', e.target.value)}
          placeholder="e.g., 60000"
          isCurrency
        />
        <Input
          label="Annual Software Cost (Estimate)"
          id="annualSoftwareCost"
          type="number"
          value={currentModuleRoiData.annualSoftwareCost || ""}
          onChange={e => handleInputChange('annualSoftwareCost', e.target.value)}
          placeholder="e.g., 10000"
          isCurrency
        />
        <Input
          label="Upfront Prof. Services / Implementation (Estimate)"
          id="upfrontProfServicesCost"
          type="number"
          value={currentModuleRoiData.upfrontProfServicesCost || ""}
          onChange={e => handleInputChange('upfrontProfServicesCost', e.target.value)}
          placeholder="e.g., 5000"
          isCurrency
        />
         <Input
          label="Solution Lifespan (Years for ROI calc)"
          id="solutionLifespanYears"
          type="number"
          value={currentModuleRoiData.solutionLifespanYears || ""}
          onChange={e => handleInputChange('solutionLifespanYears', e.target.value)}
          placeholder="e.g., 3 or 5"
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-md font-semibold text-gray-700 mb-3">Module-Specific Metrics for {moduleConfig.name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          {moduleInputFields.map(input => (
            <Input
              key={input.id}
              label={input.label}
              id={`${selectedModuleId}-${input.id}`} // Make ID more unique
              type={input.type}
              value={currentModuleRoiData.inputs[input.id] || ""}
              onChange={e => handleInputChange(input.id, e.target.value)}
              placeholder={`Enter ${input.label.toLowerCase()}`}
              unit={input.unit}
              isCurrency={input.isCurrency}
            />
          ))}
        </div>
      </div>

      <Button onClick={calculateRoi} variant="primary" size="lg" className="w-full md:w-auto">Calculate ROI</Button>
    </div>
  );

  const renderResultsSection = () => {
    const results = currentModuleRoiData.results;
    if (!results) return null;

    const paybackDisplay = getPaybackPeriodDisplay(
        results.paybackPeriodMonths,
        results.solutionLifespanYears,
        results.totalNetBenefitOverLifespan,
        results.totalInvestmentOverLifespan,
        results.totalAnnualGrossSavings
    );

    return (
      <div
        className="mt-8 p-6 bg-[#E6F4F1] border border-[#B3DDD4] rounded-lg shadow-md space-y-6" // Updated colors
        aria-live="polite" // Announce when results appear
      >
        <h2 className="text-xl font-semibold text-[#017a59] mb-4">ROI Calculation Results for {moduleConfig.name}</h2> {/* Updated color */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard title="Total Annual Gross Savings" value={formatCurrency(results.totalAnnualGrossSavings)} color="text-green-600" />
            <MetricCard title="Overall ROI Percentage" value={`${isFinite(results.overallRoiPercentage) ? results.overallRoiPercentage.toFixed(1) + '%' : 'N/A'}`} color="text-[#01916D]" /> {/* Updated color */}
            <MetricCard title="Payback Period" value={paybackDisplay} color="text-purple-600" />
            <MetricCard title={`Total Net Benefit (Over ${results.solutionLifespanYears} yrs)`} value={formatCurrency(results.totalNetBenefitOverLifespan)} color="text-green-700" />
            <MetricCard title="Upfront Investment" value={formatCurrency(results.upfrontInvestment)} color="text-red-600" />
            <MetricCard title="Annual Software Cost" value={formatCurrency(results.annualRecurringSoftwareCost)} color="text-orange-600" />
            <MetricCard title="Monthly Cost of Delay" value={formatCurrency(results.monthlyCostOfDelay)} color="text-yellow-700" icon={<InformationCircleIcon className="w-4 h-4 inline ml-1" title="Estimated monthly savings foregone by not implementing the solution."/>} />
        </div>

        <details className="bg-white p-4 rounded shadow">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-[#01916D]">Savings Calculation Workings</summary> {/* Updated hover color */}
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-600">
                {results.savingsCalculationWorkings.map((item, index) => (
                <li key={index}>
                    <strong>{item.category}:</strong> {formatCurrency(item.result)}
                    <br/>
                    <small className="text-gray-500 italic">Formula: {item.formula}</small>
                </li>
                ))}
            </ul>
        </details>

        <details className="bg-white p-4 rounded shadow">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-[#01916D]">Annual Financial Breakdown (Over {results.solutionLifespanYears} Years)</summary> {/* Updated hover color */}
            <div className="overflow-x-auto mt-2">
            <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-100 text-xs uppercase">
                <tr>
                    <th className="px-4 py-2">Year</th>
                    <th className="px-4 py-2">Gross Savings</th>
                    <th className="px-4 py-2">Software Cost</th>
                    <th className="px-4 py-2">Investment</th>
                    <th className="px-4 py-2">Net Cash Flow (Year)</th>
                    <th className="px-4 py-2">Cumulative Net Cash Flow</th>
                </tr>
                </thead>
                <tbody>
                {results.annualBreakdown.map(item => (
                    <tr key={item.year} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{item.year}</td>
                    <td className="px-4 py-2">{formatCurrency(item.grossSavings)}</td>
                    <td className="px-4 py-2">{formatCurrency(item.softwareCost)}</td>
                    <td className="px-4 py-2">{formatCurrency(item.investment)}</td>
                    <td className={`px-4 py-2 font-medium ${item.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(item.netCashFlow)}</td>
                    <td className={`px-4 py-2 font-bold ${item.cumulativeNetCashFlow >= 0 ? 'text-green-700' : 'text-red-700'}`}>{formatCurrency(item.cumulativeNetCashFlow)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </details>
      </div>
    );
  };

  return (
    <section
      className="p-6 bg-white shadow rounded-lg space-y-8"
      role="region"
      aria-labelledby={`${tabIdValue}-heading`}
    >
      <div className="flex justify-between items-center">
        <h2 id={`${tabIdValue}-heading`} className="text-xl font-semibold text-gray-800">ROI Calculator for {moduleConfig.name}</h2>
        <Button
            onClick={handlePopulateDemoData}
            variant="ghost"
            size="sm"
            icon={<LightBulbIcon />}
            iconPosition="left"
            disabled={!selectedModuleId}
            title="Populate with example data for this module"
        >
            Populate Demo Data
        </Button>
      </div>
      {renderInputSection()}
      {currentModuleRoiData.results && renderResultsSection()}
    </section>
  );
};

interface MetricCardProps {
    title: string;
    value: string;
    color?: string;
    icon?: React.ReactNode;
}
const MetricCard: React.FC<MetricCardProps> = ({ title, value, color = "text-gray-800", icon }) => (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-[#01916D]"> {/* Updated border color */}
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className={`text-2xl font-bold ${color}`}>{value} {icon}</p>
    </div>
);

export default RoiCalculatorTab;