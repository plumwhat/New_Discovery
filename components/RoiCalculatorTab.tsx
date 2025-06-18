
import React, { useCallback } from 'react';
import { RoiInput as RoiInputType, RoiResults, RoiModuleState, TabProps } from '../types';
import { ROI_INPUT_TEMPLATES, HOURLY_RATE_DIVISOR, ALL_MODULES, AUTOMATION_TIME_SAVING_PERCENTAGE, AUTOMATION_ERROR_REDUCTION_PERCENTAGE } from '../constants';
import Input from './common/Input';
import Button from './common/Button';

const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const getInputValue = (inputs: RoiModuleState['inputs'], key: string): number => {
    const val = inputs[key];
    return typeof val === 'string' ? parseFloat(val.replace(/,/g, '')) || 0 : val || 0;
};

const getPaybackPeriodDisplay = (results: RoiResults): string => {
    if (isFinite(results.paybackPeriodMonths)) {
        return `${results.paybackPeriodMonths.toFixed(1)} Months`;
    } else if (results.totalNetBenefitOverLifespan <= 0 && results.totalInvestmentOverLifespan > 0) {
        return 'N/A (No Payback)';
    } else if (results.totalInvestmentOverLifespan === 0 && results.totalAnnualGrossSavings > 0) {
        return 'Instant';
    } else if (results.totalInvestmentOverLifespan === 0 && results.totalAnnualGrossSavings === 0) {
        return 'N/A';
    } else { // This implies paybackPeriodMonths is Infinity and not covered by above specific N/A or Instant cases
        return `> ${results.solutionLifespanYears * 12} Months`;
    }
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
    setAppState(prev => {
      const newModuleRoiData = { ...prev.roiCalculator[selectedModuleId] };
      if (inputId in newModuleRoiData) { 
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
    const { annualSalary, inputs, annualSoftwareCost, upfrontProfServicesCost, solutionLifespanYears } = currentModuleRoiData;
    const hourlyRate = annualSalary > 0 && HOURLY_RATE_DIVISOR > 0 ? annualSalary / HOURLY_RATE_DIVISOR : 0;
    let totalAnnualGrossSavings = 0;
    const savingsCalculationWorkings: RoiResults['savingsCalculationWorkings'] = [];

    if (selectedModuleId === 'accountsPayable') {
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
                inputsUsed: { numInvoicesPerMonth, avgManualProcessingTimePerInvoiceMins, hourlyRate, AUTOMATION_TIME_SAVING_PERCENTAGE }
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
                inputsUsed: { numInvoicesPerMonth, currentInvoiceErrorRatePercentage, avgTimeToResolveExceptionMins, hourlyRate, AUTOMATION_ERROR_REDUCTION_PERCENTAGE }
            });
        }
        if (annualValueMissedEarlyPaymentDiscounts > 0) {
            totalAnnualGrossSavings += annualValueMissedEarlyPaymentDiscounts;
            savingsCalculationWorkings.push({ category: "Captured Early Payment Discounts", formula: `Direct input`, result: annualValueMissedEarlyPaymentDiscounts, inputsUsed: { annualValueMissedEarlyPaymentDiscounts } });
        }
        if (annualCostPhysicalInvoiceStorage > 0) {
            totalAnnualGrossSavings += annualCostPhysicalInvoiceStorage;
            savingsCalculationWorkings.push({ category: "Reduced Physical Invoice Storage Costs", formula: `Direct input`, result: annualCostPhysicalInvoiceStorage, inputsUsed: { annualCostPhysicalInvoiceStorage } });
        }
    } else if (selectedModuleId === 'orderManagement') {
        const numSalesOrdersPerMonth = getInputValue(inputs, 'om_roi_numSalesOrdersPerMonth');
        const avgManualOrderEntryTimeMins = getInputValue(inputs, 'om_roi_avgManualOrderEntryTimeMins');
        const currentOrderErrorRatePercentage = getInputValue(inputs, 'om_roi_currentOrderErrorRatePercentage') / 100;
        const avgCostToReworkOrderError = getInputValue(inputs, 'om_roi_avgCostToReworkOrderError');

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
    } else if (selectedModuleId === 'customerInquiryManagement') {
        const numInquiriesPerMonth = getInputValue(inputs, 'cim_roi_numInquiriesPerMonth');
        const avgHandleTimePerInquiryMins = getInputValue(inputs, 'cim_roi_avgHandleTimePerInquiryMins');
        const repeatInquiryRatePercentage = getInputValue(inputs, 'cim_roi_repeatInquiryRatePercentage') / 100;
        const costToResolveRepeatInquiry = getInputValue(inputs, 'cim_roi_costToResolveRepeatInquiry');

        if (numInquiriesPerMonth > 0 && avgHandleTimePerInquiryMins > 0 && hourlyRate > 0) {
            const timeSavedPerInquiryMins = avgHandleTimePerInquiryMins * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const annualTimeSavingHours = (numInquiriesPerMonth * timeSavedPerInquiryMins / 60) * 12;
            const laborSavingsHandling = annualTimeSavingHours * hourlyRate;
            totalAnnualGrossSavings += laborSavingsHandling;
            savingsCalculationWorkings.push({ category: "Labor Savings (Inquiry Handling Time)", result: laborSavingsHandling, formula: `(${numInquiriesPerMonth} inquires/mo * ${avgHandleTimePerInquiryMins} mins * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numInquiriesPerMonth, avgHandleTimePerInquiryMins, AUTOMATION_TIME_SAVING_PERCENTAGE, hourlyRate}});
        }
        if (numInquiriesPerMonth > 0 && repeatInquiryRatePercentage > 0 && costToResolveRepeatInquiry > 0) {
            const numRepeatInquiriesPerMonth = numInquiriesPerMonth * repeatInquiryRatePercentage;
            const numReducedRepeatInquiriesPerMonth = numRepeatInquiriesPerMonth * AUTOMATION_ERROR_REDUCTION_PERCENTAGE;
            const annualSavingsFromRepeats = numReducedRepeatInquiriesPerMonth * costToResolveRepeatInquiry * 12;
            totalAnnualGrossSavings += annualSavingsFromRepeats;
            savingsCalculationWorkings.push({ category: "Savings (Reduced Repeat Inquiries)", result: annualSavingsFromRepeats, formula: `(${numInquiriesPerMonth} inquiries/mo * ${repeatInquiryRatePercentage*100}% repeat rate * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% reduction) * $${costToResolveRepeatInquiry}/repeat * 12`, inputsUsed: {numInquiriesPerMonth, repeatInquiryRatePercentage, AUTOMATION_ERROR_REDUCTION_PERCENTAGE, costToResolveRepeatInquiry}});
        }
    } else if (selectedModuleId === 'cashApplication') {
        const numRemittancesPerMonth = getInputValue(inputs, 'ca_roi_numRemittancesPerMonth');
        const avgManualMatchRatePercentage = getInputValue(inputs, 'ca_roi_avgManualMatchRatePercentage') / 100;
        const timePerUnmatchedRemittanceMins = getInputValue(inputs, 'ca_roi_timePerUnmatchedRemittanceMins');
        const annualBankFeesForManualProcessing = getInputValue(inputs, 'ca_roi_annualBankFeesForManualProcessing');

        if (numRemittancesPerMonth > 0 && timePerUnmatchedRemittanceMins > 0 && hourlyRate > 0) {
            const numUnmatchedRemittancesPerMonth = numRemittancesPerMonth * (1 - avgManualMatchRatePercentage);
            const timeSavedOnUnmatchedMins = numUnmatchedRemittancesPerMonth * timePerUnmatchedRemittanceMins * AUTOMATION_TIME_SAVING_PERCENTAGE; // Assuming automation improves time on previously unmatched
            const annualLaborSavings = (timeSavedOnUnmatchedMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labor Savings (Resolving Unmatched Remittances)", result: annualLaborSavings, formula: `(${numRemittancesPerMonth} rem/mo * (1-${avgManualMatchRatePercentage*100}%) * ${timePerUnmatchedRemittanceMins} mins * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numRemittancesPerMonth, avgManualMatchRatePercentage, timePerUnmatchedRemittanceMins, AUTOMATION_TIME_SAVING_PERCENTAGE, hourlyRate}});
        }
        if (annualBankFeesForManualProcessing > 0) { // Assuming automation reduces these fees significantly
             const feeSavings = annualBankFeesForManualProcessing * 0.5; // Example: 50% reduction
             totalAnnualGrossSavings += feeSavings;
             savingsCalculationWorkings.push({ category: "Reduced Bank Fees", result: feeSavings, formula: `$${annualBankFeesForManualProcessing} * 50% (assumed reduction)`, inputsUsed: {annualBankFeesForManualProcessing}});
        }
    } else if (selectedModuleId === 'collectionManagement') {
        const numOverdueInvoicesManagedMonthly = getInputValue(inputs, 'col_roi_numOverdueInvoicesManagedMonthly');
        const avgCollectorTimePerInvoiceMins = getInputValue(inputs, 'col_roi_avgCollectorTimePerInvoiceMins');
        const badDebtPercentageOfRevenue = getInputValue(inputs, 'col_roi_badDebtPercentageOfRevenue') / 100;
        const totalAnnualRevenue = getInputValue(inputs, 'col_roi_totalAnnualRevenue');

        if (numOverdueInvoicesManagedMonthly > 0 && avgCollectorTimePerInvoiceMins > 0 && hourlyRate > 0) {
            const timeSavedPerInvoiceMins = avgCollectorTimePerInvoiceMins * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const annualLaborSavings = (numOverdueInvoicesManagedMonthly * timeSavedPerInvoiceMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labor Savings (Collector Efficiency)", result: annualLaborSavings, formula: `(${numOverdueInvoicesManagedMonthly} invoices/mo * ${avgCollectorTimePerInvoiceMins} mins * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numOverdueInvoicesManagedMonthly, avgCollectorTimePerInvoiceMins, AUTOMATION_TIME_SAVING_PERCENTAGE, hourlyRate}});
        }
        if (totalAnnualRevenue > 0 && badDebtPercentageOfRevenue > 0) {
            const currentBadDebtAmount = totalAnnualRevenue * badDebtPercentageOfRevenue;
            const badDebtReduction = currentBadDebtAmount * AUTOMATION_ERROR_REDUCTION_PERCENTAGE; // Assuming automation helps reduce bad debt
            totalAnnualGrossSavings += badDebtReduction;
            savingsCalculationWorkings.push({ category: "Reduced Bad Debt", result: badDebtReduction, formula: `($${totalAnnualRevenue} revenue * ${badDebtPercentageOfRevenue*100}% bad debt) * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% reduction`, inputsUsed: {totalAnnualRevenue, badDebtPercentageOfRevenue, AUTOMATION_ERROR_REDUCTION_PERCENTAGE}});
        }
    } else if (selectedModuleId === 'creditManagement') {
        const numCreditAppsPerMonth = getInputValue(inputs, 'crm_roi_numCreditAppsPerMonth');
        const avgTimeToProcessCreditAppManualHrs = getInputValue(inputs, 'crm_roi_avgTimeToProcessCreditAppManualHrs');
        const annualSalesLostDueToSlowCredit = getInputValue(inputs, 'crm_roi_annualSalesLostDueToSlowCredit');
        const costPerManualCreditReview = getInputValue(inputs, 'crm_roi_costPerManualCreditReview');

        if (numCreditAppsPerMonth > 0 && avgTimeToProcessCreditAppManualHrs > 0 && hourlyRate > 0) {
            const timeSavedPerAppHrs = avgTimeToProcessCreditAppManualHrs * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const annualLaborSavings = numCreditAppsPerMonth * timeSavedPerAppHrs * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labor Savings (Credit App Processing)", result: annualLaborSavings, formula: `(${numCreditAppsPerMonth} apps/mo * ${avgTimeToProcessCreditAppManualHrs} hrs * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}%) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numCreditAppsPerMonth, avgTimeToProcessCreditAppManualHrs, AUTOMATION_TIME_SAVING_PERCENTAGE, hourlyRate}});
        }
         if (numCreditAppsPerMonth > 0 && costPerManualCreditReview > 0) {
            const savedReviewCosts = numCreditAppsPerMonth * costPerManualCreditReview * AUTOMATION_TIME_SAVING_PERCENTAGE * 12; // Saved portion of the cost
            totalAnnualGrossSavings += savedReviewCosts;
            savingsCalculationWorkings.push({ category: "Reduced Cost per Credit Review", result: savedReviewCosts, formula: `(${numCreditAppsPerMonth} apps/mo * $${costPerManualCreditReview} * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved) * 12`, inputsUsed: {numCreditAppsPerMonth, costPerManualCreditReview, AUTOMATION_TIME_SAVING_PERCENTAGE}});
        }
        if (annualSalesLostDueToSlowCredit > 0) { // Assume automation recovers a portion
            const recoveredSales = annualSalesLostDueToSlowCredit * 0.5; // Example: 50% recovery
            totalAnnualGrossSavings += recoveredSales;
            savingsCalculationWorkings.push({ category: "Recovered Sales (Faster Credit Decisions)", result: recoveredSales, formula: `$${annualSalesLostDueToSlowCredit} * 50% (assumed recovery)`, inputsUsed: {annualSalesLostDueToSlowCredit}});
        }
    } else if (selectedModuleId === 'claimsDeductions') {
        const numClaimsDeductionsMonthly = getInputValue(inputs, 'cd_roi_numClaimsDeductionsMonthly');
        const avgTimePerClaimManualMins = getInputValue(inputs, 'cd_roi_avgTimePerClaimManualMins');
        const percentageInvalidDeductionsUnrecovered = getInputValue(inputs, 'cd_roi_percentageInvalidDeductionsUnrecovered') / 100;
        const avgValueInvalidDeduction = getInputValue(inputs, 'cd_roi_avgValueInvalidDeduction');

        if (numClaimsDeductionsMonthly > 0 && avgTimePerClaimManualMins > 0 && hourlyRate > 0) {
            const timeSavedPerClaimMins = avgTimePerClaimManualMins * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const annualLaborSavings = (numClaimsDeductionsMonthly * timeSavedPerClaimMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labor Savings (Claim/Deduction Processing)", result: annualLaborSavings, formula: `(${numClaimsDeductionsMonthly} claims/mo * ${avgTimePerClaimManualMins} mins * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numClaimsDeductionsMonthly, avgTimePerClaimManualMins, AUTOMATION_TIME_SAVING_PERCENTAGE, hourlyRate}});
        }
        if (numClaimsDeductionsMonthly > 0 && percentageInvalidDeductionsUnrecovered > 0 && avgValueInvalidDeduction > 0) {
            const numInvalidUnrecoveredMonthly = numClaimsDeductionsMonthly * percentageInvalidDeductionsUnrecovered; // This is an estimate of total invalid deductions monthly, then we apply unrecovered percentage
            // Let's assume the input `percentageInvalidDeductionsUnrecovered` is the portion of *all deductions processed* that are invalid AND unrecovered.
            // A more accurate model would be: Total Deductions * % Invalid * % of Invalid Currently Unrecovered.
            // Simpler: total value of currently unrecovered invalid deductions.
            // Let's use the provided inputs: assume automation helps recover a portion of currently unrecovered ones.
            const totalValueUnrecoveredAnnually = numClaimsDeductionsMonthly * percentageInvalidDeductionsUnrecovered * avgValueInvalidDeduction * 12; // This is the total potential if all were invalid
            // This is tricky. Let's assume `percentageInvalidDeductionsUnrecovered` applies to the `avgValueInvalidDeduction` for the volume `numClaimsDeductionsMonthly` where some are invalid.
            // Simplified: (Total Value of All Deductions * % that are invalid * % of those invalid that are currently unrecovered) * % improvement by automation
            // The inputs are a bit ambiguous for a perfect model. Let's assume a direct recovery:
            const annualValueRecovered = numClaimsDeductionsMonthly * avgValueInvalidDeduction * percentageInvalidDeductionsUnrecovered * AUTOMATION_ERROR_REDUCTION_PERCENTAGE * 12; // Recovering a % of those previously unrecovered
             totalAnnualGrossSavings += annualValueRecovered;
             savingsCalculationWorkings.push({ category: "Increased Recovery of Invalid Deductions", result: annualValueRecovered, formula: `(${numClaimsDeductionsMonthly}/mo * $${avgValueInvalidDeduction} * ${percentageInvalidDeductionsUnrecovered*100}% unrecovered * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% improved recovery) * 12`, inputsUsed: {numClaimsDeductionsMonthly, avgValueInvalidDeduction, percentageInvalidDeductionsUnrecovered, AUTOMATION_ERROR_REDUCTION_PERCENTAGE}});
        }
    } else if (selectedModuleId === 'expenseManagement') {
        const numExpenseReportsMonthly = getInputValue(inputs, 'em_roi_numExpenseReportsMonthly');
        const avgTimeProcessReportManualMins = getInputValue(inputs, 'em_roi_avgTimeProcessReportManualMins');
        const outOfPolicySpendPercentage = getInputValue(inputs, 'em_roi_outOfPolicySpendPercentage') / 100;
        const totalAnnualTAndESpend = getInputValue(inputs, 'em_roi_totalAnnualTAndESpend');

        if (numExpenseReportsMonthly > 0 && avgTimeProcessReportManualMins > 0 && hourlyRate > 0) {
            const timeSavedPerReportMins = avgTimeProcessReportManualMins * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const annualLaborSavings = (numExpenseReportsMonthly * timeSavedPerReportMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labor Savings (Expense Report Processing)", result: annualLaborSavings, formula: `(${numExpenseReportsMonthly} reports/mo * ${avgTimeProcessReportManualMins} mins * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numExpenseReportsMonthly, avgTimeProcessReportManualMins, AUTOMATION_TIME_SAVING_PERCENTAGE, hourlyRate}});
        }
        if (totalAnnualTAndESpend > 0 && outOfPolicySpendPercentage > 0) {
            const currentOutOfPolicyAmount = totalAnnualTAndESpend * outOfPolicySpendPercentage;
            const reductionInOutPolicy = currentOutOfPolicyAmount * AUTOMATION_ERROR_REDUCTION_PERCENTAGE; // Assuming automation reduces out-of-policy spend
            totalAnnualGrossSavings += reductionInOutPolicy;
            savingsCalculationWorkings.push({ category: "Reduced Out-of-Policy Spend", result: reductionInOutPolicy, formula: `($${totalAnnualTAndESpend} T&E spend * ${outOfPolicySpendPercentage*100}% out-of-policy) * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% reduction`, inputsUsed: {totalAnnualTAndESpend, outOfPolicySpendPercentage, AUTOMATION_ERROR_REDUCTION_PERCENTAGE}});
        }
    } else if (selectedModuleId === 'procurement') {
        const numPurchaseOrdersMonthly = getInputValue(inputs, 'proc_roi_numPurchaseOrdersMonthly');
        const avgManualPOTimeMins = getInputValue(inputs, 'proc_roi_avgManualPOTimeMins');
        const maverickSpendPercentage = getInputValue(inputs, 'proc_roi_maverickSpendPercentage') / 100;
        const totalAnnualIndirectSpend = getInputValue(inputs, 'proc_roi_totalAnnualIndirectSpend');

        if (numPurchaseOrdersMonthly > 0 && avgManualPOTimeMins > 0 && hourlyRate > 0) {
            const timeSavedPerPOMins = avgManualPOTimeMins * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const annualLaborSavings = (numPurchaseOrdersMonthly * timeSavedPerPOMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labor Savings (PO Processing)", result: annualLaborSavings, formula: `(${numPurchaseOrdersMonthly} POs/mo * ${avgManualPOTimeMins} mins * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numPurchaseOrdersMonthly, avgManualPOTimeMins, AUTOMATION_TIME_SAVING_PERCENTAGE, hourlyRate}});
        }
        if (totalAnnualIndirectSpend > 0 && maverickSpendPercentage > 0) {
            const currentMaverickSpendAmount = totalAnnualIndirectSpend * maverickSpendPercentage;
            // Assume maverick spend costs 10% more than compliant spend (conservative estimate)
            const maverickSpendPremium = 0.10; 
            const savingsFromReducedMaverickSpend = currentMaverickSpendAmount * maverickSpendPremium * AUTOMATION_ERROR_REDUCTION_PERCENTAGE; // Reduce maverick spend and save premium
            totalAnnualGrossSavings += savingsFromReducedMaverickSpend;
            savingsCalculationWorkings.push({ category: "Savings from Reduced Maverick Spend", result: savingsFromReducedMaverickSpend, formula: `($${totalAnnualIndirectSpend} indirect spend * ${maverickSpendPercentage*100}% maverick) * ${maverickSpendPremium*100}% premium * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% reduction`, inputsUsed: {totalAnnualIndirectSpend, maverickSpendPercentage, AUTOMATION_ERROR_REDUCTION_PERCENTAGE, maverickSpendPremium}});
        }
    } else if (selectedModuleId === 'invoiceDelivery') {
        const numInvoicesSentMonthly = getInputValue(inputs, 'id_roi_numInvoicesSentMonthly');
        const percentagePaperInvoices = getInputValue(inputs, 'id_roi_percentagePaperInvoices') / 100;
        const costPerPaperInvoice = getInputValue(inputs, 'id_roi_costPerPaperInvoice');
        const timeSavedPerInvoiceElectronicMins = getInputValue(inputs, 'id_roi_timeSavedPerInvoiceElectronicMins');

        if (numInvoicesSentMonthly > 0 && percentagePaperInvoices > 0 && costPerPaperInvoice > 0) {
            const numPaperInvoicesMonthly = numInvoicesSentMonthly * percentagePaperInvoices;
            // Assume automation helps transition most paper invoices to electronic
            const paperReductionFactor = 0.9; // e.g. 90% of paper invoices become electronic
            const annualPaperCostSavings = numPaperInvoicesMonthly * paperReductionFactor * costPerPaperInvoice * 12;
            totalAnnualGrossSavings += annualPaperCostSavings;
            savingsCalculationWorkings.push({ category: "Reduced Paper Invoice Costs", result: annualPaperCostSavings, formula: `(${numInvoicesSentMonthly} invoices/mo * ${percentagePaperInvoices*100}% paper * ${paperReductionFactor*100}% reduction) * $${costPerPaperInvoice}/invoice * 12`, inputsUsed: {numInvoicesSentMonthly, percentagePaperInvoices, costPerPaperInvoice, paperReductionFactor}});
        }
        if (numInvoicesSentMonthly > 0 && timeSavedPerInvoiceElectronicMins > 0 && hourlyRate > 0) {
            // This saving applies to invoices that become electronic
            const numElectronicTransition = numInvoicesSentMonthly * percentagePaperInvoices * 0.9; // Assuming 90% of paper goes electronic
            const annualLaborSavings = (numElectronicTransition * timeSavedPerInvoiceElectronicMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labor Savings (Admin for Electronic Delivery)", result: annualLaborSavings, formula: `(${numInvoicesSentMonthly} inv/mo * ${percentagePaperInvoices*100}% paper * 0.9 electronic conv. * ${timeSavedPerInvoiceElectronicMins} mins saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numInvoicesSentMonthly, percentagePaperInvoices, timeSavedPerInvoiceElectronicMins, hourlyRate}});
        }
    } else if (selectedModuleId === 'supplierManagement') {
        const numSuppliersOnboardedAnnually = getInputValue(inputs, 'sm_roi_numSuppliersOnboardedAnnually');
        const avgTimeOnboardSupplierManualHrs = getInputValue(inputs, 'sm_roi_avgTimeOnboardSupplierManualHrs');
        const costOfSupplierDataErrorsAnnual = getInputValue(inputs, 'sm_roi_costOfSupplierDataErrorsAnnual');
        const compliancePenaltyRiskCostAnnual = getInputValue(inputs, 'sm_roi_compliancePenaltyRiskCostAnnual');

        if (numSuppliersOnboardedAnnually > 0 && avgTimeOnboardSupplierManualHrs > 0 && hourlyRate > 0) {
            const timeSavedPerSupplierHrs = avgTimeOnboardSupplierManualHrs * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const annualLaborSavings = numSuppliersOnboardedAnnually * timeSavedPerSupplierHrs * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labor Savings (Supplier Onboarding)", result: annualLaborSavings, formula: `${numSuppliersOnboardedAnnually} suppliers/yr * ${avgTimeOnboardSupplierManualHrs} hrs * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numSuppliersOnboardedAnnually, avgTimeOnboardSupplierManualHrs, AUTOMATION_TIME_SAVING_PERCENTAGE, hourlyRate}});
        }
        if (costOfSupplierDataErrorsAnnual > 0) {
            const errorCostReduction = costOfSupplierDataErrorsAnnual * AUTOMATION_ERROR_REDUCTION_PERCENTAGE;
            totalAnnualGrossSavings += errorCostReduction;
            savingsCalculationWorkings.push({ category: "Reduced Costs from Supplier Data Errors", result: errorCostReduction, formula: `$${costOfSupplierDataErrorsAnnual} * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% reduction`, inputsUsed: {costOfSupplierDataErrorsAnnual, AUTOMATION_ERROR_REDUCTION_PERCENTAGE}});
        }
        if (compliancePenaltyRiskCostAnnual > 0) {
            const riskCostReduction = compliancePenaltyRiskCostAnnual * 0.5; // Assume 50% reduction with better SM
            totalAnnualGrossSavings += riskCostReduction;
            savingsCalculationWorkings.push({ category: "Reduced Compliance Risk Costs (SM)", result: riskCostReduction, formula: `$${compliancePenaltyRiskCostAnnual} * 50% (assumed reduction)`, inputsUsed: {compliancePenaltyRiskCostAnnual}});
        }
    } else if (selectedModuleId === 'documentManagement') {
        const numEmployeesUsingSystem = getInputValue(inputs, 'dm_roi_numEmployeesUsingSystem');
        const avgTimeSearchingDocsPerUserHrsWeek = getInputValue(inputs, 'dm_roi_avgTimeSearchingDocsPerUserHrsWeek');
        const annualPhysicalStorageCost = getInputValue(inputs, 'dm_roi_annualPhysicalStorageCost');
        const costOfNonComplianceAnnual = getInputValue(inputs, 'dm_roi_costOfNonComplianceAnnual');

        if (numEmployeesUsingSystem > 0 && avgTimeSearchingDocsPerUserHrsWeek > 0 && hourlyRate > 0) {
            const timeSavedPerUserHrsWeek = avgTimeSearchingDocsPerUserHrsWeek * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const annualLaborSavings = numEmployeesUsingSystem * timeSavedPerUserHrsWeek * 52 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labor Savings (Document Search Time)", result: annualLaborSavings, formula: `${numEmployeesUsingSystem} users * ${avgTimeSearchingDocsPerUserHrsWeek} hrs/wk saved searching * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% * 52 wks * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numEmployeesUsingSystem, avgTimeSearchingDocsPerUserHrsWeek, AUTOMATION_TIME_SAVING_PERCENTAGE, hourlyRate}});
        }
        if (annualPhysicalStorageCost > 0) { // Assume automation eliminates most of this
             const storageCostSavings = annualPhysicalStorageCost * 0.9; // 90% reduction
             totalAnnualGrossSavings += storageCostSavings;
             savingsCalculationWorkings.push({ category: "Reduced Physical Storage Costs", result: storageCostSavings, formula: `$${annualPhysicalStorageCost} * 90% (assumed reduction)`, inputsUsed: {annualPhysicalStorageCost}});
        }
        if (costOfNonComplianceAnnual > 0) {
            const complianceSavings = costOfNonComplianceAnnual * AUTOMATION_ERROR_REDUCTION_PERCENTAGE; // Reduced non-compliance
            totalAnnualGrossSavings += complianceSavings;
            savingsCalculationWorkings.push({ category: "Reduced Non-Compliance Costs (DM)", result: complianceSavings, formula: `$${costOfNonComplianceAnnual} * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% reduction`, inputsUsed: {costOfNonComplianceAnnual, AUTOMATION_ERROR_REDUCTION_PERCENTAGE}});
        }
    } else if (selectedModuleId === 'workflowManagement') {
        const numKeyWorkflowsTargeted = getInputValue(inputs, 'wm_roi_numKeyWorkflowsTargeted');
        const avgInstancesPerWorkflowMonthly = getInputValue(inputs, 'wm_roi_avgInstancesPerWorkflowMonthly');
        const avgManualTimeSavedPerInstanceHrs = getInputValue(inputs, 'wm_roi_avgManualTimeSavedPerInstanceHrs');
        const currentErrorRateInManualWorkflowsPercentage = getInputValue(inputs, 'wm_roi_currentErrorRateInManualWorkflowsPercentage') / 100;
        // Assuming avgTimeToCorrectErrorHrs is a general input or we could add wm_roi_avgTimeReworkWorkflowErrorHrs
        const avgTimeToCorrectErrorHrs = getInputValue(appState.roiCalculator.default?.inputs || {}, 'def_roi_avgTimeToCorrectErrorHrs') || 1; // Fallback to default if not specific

        if (numKeyWorkflowsTargeted > 0 && avgInstancesPerWorkflowMonthly > 0 && avgManualTimeSavedPerInstanceHrs > 0 && hourlyRate > 0) {
            // This avgManualTimeSavedPerInstanceHrs already implies the AUTOMATION_TIME_SAVING_PERCENTAGE effect
            const annualLaborSavings = numKeyWorkflowsTargeted * avgInstancesPerWorkflowMonthly * avgManualTimeSavedPerInstanceHrs * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labor Savings (Workflow Automation)", result: annualLaborSavings, formula: `${numKeyWorkflowsTargeted} workflows * ${avgInstancesPerWorkflowMonthly} inst/mo * ${avgManualTimeSavedPerInstanceHrs} hrs saved/inst * 12 mo * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numKeyWorkflowsTargeted, avgInstancesPerWorkflowMonthly, avgManualTimeSavedPerInstanceHrs, hourlyRate}});
        }
        if (numKeyWorkflowsTargeted > 0 && avgInstancesPerWorkflowMonthly > 0 && currentErrorRateInManualWorkflowsPercentage > 0 && avgTimeToCorrectErrorHrs > 0 && hourlyRate > 0) {
            const totalInstancesMonthly = numKeyWorkflowsTargeted * avgInstancesPerWorkflowMonthly;
            const errorsMonthly = totalInstancesMonthly * currentErrorRateInManualWorkflowsPercentage;
            const timeLostToErrorsMonthlyHrs = errorsMonthly * avgTimeToCorrectErrorHrs;
            const timeSavedFromErrorReductionMonthlyHrs = timeLostToErrorsMonthlyHrs * AUTOMATION_ERROR_REDUCTION_PERCENTAGE;
            const annualErrorSavings = timeSavedFromErrorReductionMonthlyHrs * 12 * hourlyRate;
            totalAnnualGrossSavings += annualErrorSavings;
            savingsCalculationWorkings.push({ category: "Savings (Reduced Workflow Errors & Rework)", result: annualErrorSavings, formula: `(${numKeyWorkflowsTargeted} workflows * ${avgInstancesPerWorkflowMonthly} inst/mo * ${currentErrorRateInManualWorkflowsPercentage*100}% error rate * ${avgTimeToCorrectErrorHrs} hrs/rework * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% reduction) * 12 mo * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numKeyWorkflowsTargeted, avgInstancesPerWorkflowMonthly, currentErrorRateInManualWorkflowsPercentage, avgTimeToCorrectErrorHrs, AUTOMATION_ERROR_REDUCTION_PERCENTAGE, hourlyRate}});
        }
    } else if (selectedModuleId === 'processMapping') {
        const numKeyProcessesToMap = getInputValue(inputs, 'pm_roi_numKeyProcessesToMap');
        const avgTimeToMapProcessManuallyHrs = getInputValue(inputs, 'pm_roi_avgTimeToMapProcessManuallyHrs');
        const annualCostProcessRelatedInefficiencies = getInputValue(inputs, 'pm_roi_annualCostProcessRelatedInefficiencies');
        const timeReductionForAuditsHrsPerYear = getInputValue(inputs, 'pm_roi_timeReductionForAuditsHrsPerYear');
        
        // Savings from faster mapping (one-time, or if recurring mapping effort)
        if (numKeyProcessesToMap > 0 && avgTimeToMapProcessManuallyHrs > 0 && hourlyRate > 0) {
             // Assume process mapping tools save 50% of manual mapping time
            const timeSavedMapping = numKeyProcessesToMap * avgTimeToMapProcessManuallyHrs * 0.50 * hourlyRate;
            // This is more like an upfront saving or efficiency, not annual recurring unless mapping is annual
            // For simplicity, let's treat it as an annual efficiency gain if processes are reviewed/updated annually.
            totalAnnualGrossSavings += (timeSavedMapping / solutionLifespanYears); // Amortize if one-time effort
             savingsCalculationWorkings.push({ category: "Efficiency (Process Mapping Time)", result: (timeSavedMapping / solutionLifespanYears), formula: `(${numKeyProcessesToMap} processes * ${avgTimeToMapProcessManuallyHrs} hrs * 50% saved * $${hourlyRate.toFixed(2)}/hr) / ${solutionLifespanYears} yrs`, inputsUsed: {numKeyProcessesToMap, avgTimeToMapProcessManuallyHrs, hourlyRate, solutionLifespanYears}});
        }
        if (annualCostProcessRelatedInefficiencies > 0) {
            // Assume good process mapping helps reduce 10-20% of these inefficiencies
            const inefficiencyReduction = annualCostProcessRelatedInefficiencies * 0.15; // 15% reduction
            totalAnnualGrossSavings += inefficiencyReduction;
            savingsCalculationWorkings.push({ category: "Reduced Process Inefficiency Costs", result: inefficiencyReduction, formula: `$${annualCostProcessRelatedInefficiencies} * 15% (assumed reduction from better maps)`, inputsUsed: {annualCostProcessRelatedInefficiencies}});
        }
        if (timeReductionForAuditsHrsPerYear > 0 && hourlyRate > 0) {
            const auditTimeSavingsCost = timeReductionForAuditsHrsPerYear * hourlyRate;
            totalAnnualGrossSavings += auditTimeSavingsCost;
            savingsCalculationWorkings.push({ category: "Savings (Audit Preparation Time)", result: auditTimeSavingsCost, formula: `${timeReductionForAuditsHrsPerYear} hrs/yr * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {timeReductionForAuditsHrsPerYear, hourlyRate}});
        }
    } else { // Default/Generic calculation using updated default inputs
        const manualTaskTimeHrsWeekPTE = getInputValue(inputs, 'def_roi_manualTaskTimeHrsWeekPTE');
        const numEmployeesPerformingTask = getInputValue(inputs, 'def_roi_numEmployeesPerformingTask');
        const errorRateManualTaskPercentage = getInputValue(inputs, 'def_roi_errorRateManualTaskPercentage') / 100;
        const avgTimeToCorrectErrorHrs = getInputValue(inputs, 'def_roi_avgTimeToCorrectErrorHrs');

        if (manualTaskTimeHrsWeekPTE > 0 && numEmployeesPerformingTask > 0 && hourlyRate > 0) {
            const totalManualHoursPerWeek = manualTaskTimeHrsWeekPTE * numEmployeesPerformingTask;
            const timeSavedPerWeek = totalManualHoursPerWeek * AUTOMATION_TIME_SAVING_PERCENTAGE;
            const genericAnnualLaborSavings = timeSavedPerWeek * 52 * hourlyRate;
            totalAnnualGrossSavings += genericAnnualLaborSavings;
            savingsCalculationWorkings.push({
                category: "Generic Labor Time Savings",
                formula: `(${manualTaskTimeHrsWeekPTE.toFixed(1)} hrs/wk/FTE * ${numEmployeesPerformingTask} FTEs * ${AUTOMATION_TIME_SAVING_PERCENTAGE*100}% saved * 52 wks) * $${hourlyRate.toFixed(2)}/hr`,
                result: genericAnnualLaborSavings,
                inputsUsed: { manualTaskTimeHrsWeekPTE, numEmployeesPerformingTask, hourlyRate, AUTOMATION_TIME_SAVING_PERCENTAGE }
            });
        }
        if (manualTaskTimeHrsWeekPTE > 0 && numEmployeesPerformingTask > 0 && errorRateManualTaskPercentage > 0 && avgTimeToCorrectErrorHrs > 0 && hourlyRate > 0) {
            // Estimate number of tasks based on total hours and an assumed avg task duration of 15 mins (0.25 hrs) if not specified.
            // This is a rough estimate if task volume isn't directly available.
            const avgTaskDurationForErrorCalc = 0.25; // hours
            const totalWorkHoursPerYear = manualTaskTimeHrsWeekPTE * numEmployeesPerformingTask * 52;
            const estimatedTasksPerYear = totalWorkHoursPerYear / avgTaskDurationForErrorCalc;
            
            const numErrorsPerYear = estimatedTasksPerYear * errorRateManualTaskPercentage;
            const timeLostToErrorsPerYearHrs = numErrorsPerYear * avgTimeToCorrectErrorHrs;
            const timeSavedFromErrorReductionHrs = timeLostToErrorsPerYearHrs * AUTOMATION_ERROR_REDUCTION_PERCENTAGE;
            const genericErrorReductionSavings = timeSavedFromErrorReductionHrs * hourlyRate;
            
            totalAnnualGrossSavings += genericErrorReductionSavings;
            savingsCalculationWorkings.push({
                category: "Generic Savings (Error Reduction & Rework)",
                formula: `(Est. Tasks: ${estimatedTasksPerYear.toFixed(0)}/yr * ${errorRateManualTaskPercentage*100}% error rate * ${avgTimeToCorrectErrorHrs} hrs/rework * ${AUTOMATION_ERROR_REDUCTION_PERCENTAGE*100}% reduction) * $${hourlyRate.toFixed(2)}/hr`,
                result: genericErrorReductionSavings,
                inputsUsed: { manualTaskTimeHrsWeekPTE, numEmployeesPerformingTask, errorRateManualTaskPercentage, avgTimeToCorrectErrorHrs, AUTOMATION_ERROR_REDUCTION_PERCENTAGE, hourlyRate, estimatedTasksPerYear }
            });
        }
    }
    
    const totalInvestmentOverLifespan = upfrontProfServicesCost + (annualSoftwareCost * solutionLifespanYears);
    const totalSavingsOverLifespan = totalAnnualGrossSavings * solutionLifespanYears;
    const totalNetBenefitOverLifespan = totalSavingsOverLifespan - totalInvestmentOverLifespan;
    const overallRoiPercentage = totalInvestmentOverLifespan > 0 ? (totalNetBenefitOverLifespan / totalInvestmentOverLifespan) * 100 : (totalNetBenefitOverLifespan > 0 ? Infinity : 0);

    const annualBreakdown: RoiResults['annualBreakdown'] = [];
    let cumulativeNetCashFlow = 0;
    let paybackPeriodMonths = Infinity; 

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
          if (netCashFlowYear > 0) { 
            paybackPeriodMonths = ((i - 1) - (prevCumulativeNetCashFlow / netCashFlowYear)) * 12;
          } else if (cumulativeNetCashFlow === 0 && prevCumulativeNetCashFlow < 0) { 
            paybackPeriodMonths = i * 12;
          } else if (prevCumulativeNetCashFlow === 0 && i === 1 && netCashFlowYear >=0 ) {
             paybackPeriodMonths = 0; 
          } else if (prevCumulativeNetCashFlow < 0 && netCashFlowYear === 0 && cumulativeNetCashFlow ===0 ) { 
             paybackPeriodMonths = i * 12;
          } else if (prevCumulativeNetCashFlow === 0 && netCashFlowYear === 0 && i===1) { 
            paybackPeriodMonths = (totalInvestmentOverLifespan === 0 && totalAnnualGrossSavings === 0) ? Infinity : 0;
          } else if (netCashFlowYear <= 0 && cumulativeNetCashFlow >= 0 && prevCumulativeNetCashFlow < 0) { 
            paybackPeriodMonths = (i-1)*12; 
          }
        }
    }
    
    if (paybackPeriodMonths === Infinity && cumulativeNetCashFlow < 0) { 
        // Stays Infinity
    } else if (paybackPeriodMonths < 0) { 
        paybackPeriodMonths = 0;
    } else if (paybackPeriodMonths > solutionLifespanYears * 12) {
        paybackPeriodMonths = Infinity; 
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

  }, [currentModuleRoiData, selectedModuleId, setAppState, appState.roiCalculator.default]);

  const populateDemoData = useCallback(() => {
    const demoValuesBase = {
        annualSalary: 75000,
        annualSoftwareCost: 12000,
        upfrontProfServicesCost: 8000,
        solutionLifespanYears: 3,
    };
    let specificInputs = {};

    switch(selectedModuleId) {
        case 'accountsPayable':
            specificInputs = {
                ap_roi_numInvoicesPerMonth: "5000",
                ap_roi_avgManualProcessingTimePerInvoiceMins: "15",
                ap_roi_currentInvoiceErrorRatePercentage: "5",
                ap_roi_avgTimeToResolveExceptionMins: "30",
                ap_roi_annualValueMissedEarlyPaymentDiscounts: "10000",
                ap_roi_annualCostPhysicalInvoiceStorage: "2000",
                ap_roi_numFTEs: "5",
            };
            break;
        case 'orderManagement':
            specificInputs = {
                om_roi_numSalesOrdersPerMonth: "2000",
                om_roi_avgManualOrderEntryTimeMins: "10",
                om_roi_currentOrderErrorRatePercentage: "4",
                om_roi_avgCostToReworkOrderError: "25",
                om_roi_numFTEs: "3",
            };
            break;
        case 'customerInquiryManagement':
            specificInputs = {
                cim_roi_numInquiriesPerMonth: "3000",
                cim_roi_avgHandleTimePerInquiryMins: "12",
                cim_roi_repeatInquiryRatePercentage: "15",
                cim_roi_costToResolveRepeatInquiry: "10",
            };
            break;
        case 'cashApplication':
            specificInputs = {
                ca_roi_numRemittancesPerMonth: "2500",
                ca_roi_avgManualMatchRatePercentage: "60",
                ca_roi_timePerUnmatchedRemittanceMins: "20",
                ca_roi_annualBankFeesForManualProcessing: "5000",
            };
            break;
        case 'collectionManagement':
            specificInputs = {
                col_roi_numOverdueInvoicesManagedMonthly: "500",
                col_roi_avgCollectorTimePerInvoiceMins: "25",
                col_roi_badDebtPercentageOfRevenue: "2",
                col_roi_totalAnnualRevenue: "10000000",
            };
            break;
        case 'creditManagement':
            specificInputs = {
                crm_roi_numCreditAppsPerMonth: "100",
                crm_roi_avgTimeToProcessCreditAppManualHrs: "4",
                crm_roi_annualSalesLostDueToSlowCredit: "50000",
                crm_roi_costPerManualCreditReview: "50",
            };
            break;
        case 'claimsDeductions':
            specificInputs = {
                cd_roi_numClaimsDeductionsMonthly: "300",
                cd_roi_avgTimePerClaimManualMins: "45",
                cd_roi_percentageInvalidDeductionsUnrecovered: "10",
                cd_roi_avgValueInvalidDeduction: "150",
            };
            break;
        case 'expenseManagement':
            specificInputs = {
                em_roi_numExpenseReportsMonthly: "400",
                em_roi_avgTimeProcessReportManualMins: "30",
                em_roi_outOfPolicySpendPercentage: "8",
                em_roi_totalAnnualTAndESpend: "1000000",
            };
            break;
        case 'procurement':
            specificInputs = {
                proc_roi_numPurchaseOrdersMonthly: "1000",
                proc_roi_avgManualPOTimeMins: "20",
                proc_roi_maverickSpendPercentage: "15",
                proc_roi_totalAnnualIndirectSpend: "5000000",
            };
            break;
        case 'invoiceDelivery':
            specificInputs = {
                id_roi_numInvoicesSentMonthly: "10000",
                id_roi_percentagePaperInvoices: "70",
                id_roi_costPerPaperInvoice: "1.50",
                id_roi_timeSavedPerInvoiceElectronicMins: "5",
            };
            break;
        case 'supplierManagement':
            specificInputs = {
                sm_roi_numSuppliersOnboardedAnnually: "50",
                sm_roi_avgTimeOnboardSupplierManualHrs: "8",
                sm_roi_costOfSupplierDataErrorsAnnual: "20000",
                sm_roi_compliancePenaltyRiskCostAnnual: "15000",
            };
            break;
        case 'documentManagement':
            specificInputs = {
                dm_roi_numEmployeesUsingSystem: "200",
                dm_roi_avgTimeSearchingDocsPerUserHrsWeek: "5",
                dm_roi_annualPhysicalStorageCost: "12000",
                dm_roi_costOfNonComplianceAnnual: "25000",
            };
            break;
        case 'workflowManagement':
            specificInputs = {
                wm_roi_numKeyWorkflowsTargeted: "10",
                wm_roi_avgInstancesPerWorkflowMonthly: "50", // Per workflow type, total instances = 10 * 50 = 500
                wm_roi_avgManualTimeSavedPerInstanceHrs: "0.75",
                wm_roi_currentErrorRateInManualWorkflowsPercentage: "10",
            };
            break;
        case 'processMapping':
            specificInputs = {
                pm_roi_numKeyProcessesToMap: "20",
                pm_roi_avgTimeToMapProcessManuallyHrs: "40",
                pm_roi_annualCostProcessRelatedInefficiencies: "75000",
                pm_roi_timeReductionForAuditsHrsPerYear: "100",
            };
            break;
        default: // Default module demo data
             specificInputs = {
                def_roi_manualTaskTimeHrsWeekPTE: "10",
                def_roi_numEmployeesPerformingTask: "5",
                def_roi_errorRateManualTaskPercentage: "5",
                def_roi_avgTimeToCorrectErrorHrs: "1",
            };
            break;
    }
    
    setAppState(prev => {
        const existingModuleData = prev.roiCalculator[selectedModuleId];
        const updatedModuleRoiData: RoiModuleState = {
            ...existingModuleData,
            ...demoValuesBase,
            inputs: { ...existingModuleData.inputs, ...specificInputs },
            results: null 
        };
      return {
        ...prev,
        roiCalculator: { ...prev.roiCalculator, [selectedModuleId]: updatedModuleRoiData }
      };
    });
  }, [selectedModuleId, setAppState]);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <h2 className="text-xl font-semibold text-gray-800">ROI Calculator for {moduleConfig.name}</h2>
        <div className="flex space-x-2">
            <Button onClick={populateDemoData} variant="ghost" size="sm">Load Demo Data</Button>
            <Button onClick={calculateRoi} variant="primary" size="sm">Calculate ROI</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
        <div>
            <Input
                label="Average Annual Employee Salary (Blended)"
                id="annualSalary"
                type="number"
                value={currentModuleRoiData.annualSalary.toString()}
                onChange={(e) => handleInputChange('annualSalary', e.target.value)}
                className="mb-2"
            />
             <p className="text-xs text-gray-500">Used to calculate hourly rate for time savings.</p>
        </div>
         <div>
            <Input
                label={`Annual Software Cost for ${moduleConfig.name} Solution`}
                id="annualSoftwareCost"
                type="number"
                value={currentModuleRoiData.annualSoftwareCost.toString()}
                onChange={(e) => handleInputChange('annualSoftwareCost', e.target.value)}
                className="mb-2"
            />
            <p className="text-xs text-gray-500">Estimated annual subscription/licensing cost.</p>
        </div>
        <div>
            <Input
                label="Upfront Professional Services Cost"
                id="upfrontProfServicesCost"
                type="number"
                value={currentModuleRoiData.upfrontProfServicesCost.toString()}
                onChange={(e) => handleInputChange('upfrontProfServicesCost', e.target.value)}
                className="mb-2"
            />
            <p className="text-xs text-gray-500">One-time implementation, configuration, training costs.</p>
        </div>
         <div>
            <Input
                label="Solution Lifespan (Years)"
                id="solutionLifespanYears"
                type="number"
                value={currentModuleRoiData.solutionLifespanYears.toString()}
                onChange={(e) => handleInputChange('solutionLifespanYears', e.target.value)}
                min="1"
                max="10"
                className="mb-2"
            />
            <p className="text-xs text-gray-500">Typical period for ROI calculation (e.g., 3 or 5 years).</p>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-700 mb-4 border-t pt-4">Module Specific Inputs for {moduleConfig.name}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {moduleInputFields.map(input => (
          <div key={input.id}>
            <Input
              label={`${input.label}${input.unit ? ` (${input.unit})` : ''}${input.isCurrency ? ' ($)' : ''}`}
              id={input.id}
              type={input.type}
              value={(currentModuleRoiData.inputs[input.id] ?? "").toString()}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              placeholder={input.isCurrency ? 'Enter amount' : 'Enter value'}
            />
             {input.id === 'ap_roi_numFTEs' && <p className="text-xs text-gray-500 mt-1">Full-Time Equivalents involved in AP processing.</p>}
             {input.id === 'om_roi_numFTEs' && <p className="text-xs text-gray-500 mt-1">FTEs involved in manual order entry.</p>}
          </div>
        ))}
      </div>

      {currentModuleRoiData.results && (
        <div className="mt-10 pt-6 border-t border-gray-300">
          <h3 className="text-xl font-semibold text-blue-600 mb-6">ROI Calculation Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow">
              <h4 className="text-sm font-medium text-green-700">Total Annual Gross Savings</h4>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(currentModuleRoiData.results.totalAnnualGrossSavings)}</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
              <h4 className="text-sm font-medium text-blue-700">Total Investment ({currentModuleRoiData.results.solutionLifespanYears} yrs)</h4>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(currentModuleRoiData.results.totalInvestmentOverLifespan)}</p>
            </div>
             <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg shadow">
              <h4 className="text-sm font-medium text-indigo-700">Total Net Benefit ({currentModuleRoiData.results.solutionLifespanYears} yrs)</h4>
              <p className="text-2xl font-bold text-indigo-600">{formatCurrency(currentModuleRoiData.results.totalNetBenefitOverLifespan)}</p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg shadow">
              <h4 className="text-sm font-medium text-purple-700">Overall ROI ({currentModuleRoiData.results.solutionLifespanYears} yrs)</h4>
              <p className="text-2xl font-bold text-purple-600">{isFinite(currentModuleRoiData.results.overallRoiPercentage) ? `${currentModuleRoiData.results.overallRoiPercentage.toFixed(1)}%` : 'N/A'}</p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow">
              <h4 className="text-sm font-medium text-yellow-700">Payback Period</h4>
              <p className="text-2xl font-bold text-yellow-600">{getPaybackPeriodDisplay(currentModuleRoiData.results)}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Savings Calculation Workings:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-md border">
              {currentModuleRoiData.results.savingsCalculationWorkings.map((item, index) => (
                <li key={index}>
                  <strong>{item.category}:</strong> {formatCurrency(item.result)}
                  <br />
                  <small className="text-gray-500"> (Formula: {item.formula})</small>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-3">Annual Breakdown:</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Gross Savings</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Software Cost</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Investment</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Net Cash Flow (Year)</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cumulative Net Cash Flow</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {currentModuleRoiData.results.annualBreakdown.map(item => (
                    <tr key={item.year} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap">{item.year}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(item.grossSavings)}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(item.softwareCost)}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(item.investment)}</td>
                      <td className={`px-4 py-2 whitespace-nowrap font-medium ${item.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(item.netCashFlow)}</td>
                      <td className={`px-4 py-2 whitespace-nowrap font-medium ${item.cumulativeNetCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(item.cumulativeNetCashFlow)}</td>
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
