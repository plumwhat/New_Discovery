

import { RoiModuleState, RoiResults } from '../types';
import { getRoiCalculationConstants } from './configService'; // Changed import
import { AppState } from '../types'; // For def_roi_avgTimeToCorrectErrorHrs fallback

/**
 * Safely retrieves a numerical value from the ROI inputs object.
 * @param inputs - The ROI inputs object.
 * @param key - The key of the input to retrieve.
 * @returns The numerical value, or 0 if not found or not a number.
 */
const getInputValue = (inputs: RoiModuleState['inputs'], key: string): number => {
    const val = inputs[key];
    return typeof val === 'string' ? parseFloat(val.replace(/,/g, '')) || 0 : val || 0;
};

/**
 * Performs the ROI calculation for a given module.
 * @param currentModuleRoiData - The ROI data for the current module, including inputs, annual salary, software cost, etc.
 * @param selectedModuleId - The ID of the currently selected module, used to determine module-specific calculations.
 * @param appStateForFallback - Optional: Minimal AppState for accessing default ROI inputs if needed for generic calculations.
 * @returns An RoiResults object containing calculated savings, ROI percentage, payback period, and detailed breakdowns.
 */
export const performRoiCalculation = (
  currentModuleRoiData: RoiModuleState,
  selectedModuleId: string,
  appStateForFallback?: AppState // Pass minimal appState if needed for fallbacks like default ROI inputs
): RoiResults => {
    const { annualSalary, inputs, annualSoftwareCost, upfrontProfServicesCost, solutionLifespanYears } = currentModuleRoiData;
    
    const { 
      hourlyRateDivisor, 
      automationTimeSavingPercentage: globalTimeSaving, 
      automationErrorReductionPercentage: globalErrorReduction 
    } = getRoiCalculationConstants(); // Get constants from config service

    const hourlyRate = annualSalary > 0 && hourlyRateDivisor > 0 ? annualSalary / hourlyRateDivisor : 0;
    let totalAnnualGrossSavings = 0;
    const savingsCalculationWorkings: RoiResults['savingsCalculationWorkings'] = [];

    // Default values from constants if needed, or from a common config.
    // Example fallback for a generic input if appStateForFallback is provided
    const defaultRoiInputs = appStateForFallback?.roiCalculator?.default?.inputs || {};


    if (selectedModuleId === 'accountsPayable') {
        const timeSavingOverride = getInputValue(inputs, 'ap_roi_overrideTimeSavingPercentage');
        const errorReductionOverride = getInputValue(inputs, 'ap_roi_overrideErrorReductionPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        const automationErrorReductionPercentage = errorReductionOverride > 0 ? errorReductionOverride / 100 : globalErrorReduction;

        const numInvoicesPerMonth = getInputValue(inputs, 'ap_roi_numInvoicesPerMonth');
        const avgManualProcessingTimePerInvoiceMins = getInputValue(inputs, 'ap_roi_avgManualProcessingTimePerInvoiceMins');
        const currentInvoiceErrorRatePercentage = getInputValue(inputs, 'ap_roi_currentInvoiceErrorRatePercentage') / 100;
        const avgTimeToResolveExceptionMins = getInputValue(inputs, 'ap_roi_avgTimeToResolveExceptionMins');
        const annualValueMissedEarlyPaymentDiscounts = getInputValue(inputs, 'ap_roi_annualValueMissedEarlyPaymentDiscounts');
        const annualCostPhysicalInvoiceStorage = getInputValue(inputs, 'ap_roi_annualCostPhysicalInvoiceStorage');

        if (numInvoicesPerMonth > 0 && avgManualProcessingTimePerInvoiceMins > 0 && hourlyRate > 0) {
            const timeSavedPerInvoiceMins = avgManualProcessingTimePerInvoiceMins * automationTimeSavingPercentage;
            const annualTimeSavingHours = (numInvoicesPerMonth * timeSavedPerInvoiceMins / 60) * 12;
            const laborSavingsProcessing = annualTimeSavingHours * hourlyRate;
            totalAnnualGrossSavings += laborSavingsProcessing;
            savingsCalculationWorkings.push({
                category: "Labour Savings (Invoice Processing Time Reduction)",
                formula: `(${numInvoicesPerMonth} invoices/mo * ${avgManualProcessingTimePerInvoiceMins} mins/invoice * ${automationTimeSavingPercentage*100}% saved / 60 mins/hr * 12 mo) * $${hourlyRate.toFixed(2)}/hr`,
                result: laborSavingsProcessing,
                inputsUsed: { numInvoicesPerMonth, avgManualProcessingTimePerInvoiceMins, hourlyRate, automationTimeSavingPercentage }
            });
        }
        if (numInvoicesPerMonth > 0 && currentInvoiceErrorRatePercentage > 0 && avgTimeToResolveExceptionMins > 0 && hourlyRate > 0) {
            const errorsPerMonth = numInvoicesPerMonth * currentInvoiceErrorRatePercentage;
            const timeSpentResolvingErrorsMinsPerMonth = errorsPerMonth * avgTimeToResolveExceptionMins;
            const timeSavedResolvingErrorsMinsPerMonth = (timeSpentResolvingErrorsMinsPerMonth * automationErrorReductionPercentage);
            const errorReductionSavings = (timeSavedResolvingErrorsMinsPerMonth / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += errorReductionSavings;
            savingsCalculationWorkings.push({
                category: "Savings (Error Reduction & Resolution Time)",
                formula: `((${numInvoicesPerMonth} invoices/mo * ${currentInvoiceErrorRatePercentage*100}% error rate * ${avgTimeToResolveExceptionMins} mins/error * ${automationErrorReductionPercentage*100}% reduction) / 60 mins/hr * 12 mo) * $${hourlyRate.toFixed(2)}/hr`,
                result: errorReductionSavings,
                inputsUsed: { numInvoicesPerMonth, currentInvoiceErrorRatePercentage, avgTimeToResolveExceptionMins, hourlyRate, automationErrorReductionPercentage }
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
    } else if (selectedModuleId === 'managedITSupport') {
        const numUsers = getInputValue(inputs, 'ms_roi_numUsers');
        const currentITStaffCount = getInputValue(inputs, 'ms_roi_currentITStaffCount');
        const avgDowntimeHoursPerMonth = getInputValue(inputs, 'ms_roi_avgDowntimeHoursPerMonth');
        const costPerHourOfDowntime = getInputValue(inputs, 'ms_roi_costPerHourOfDowntime');
        const userProductivityLossPercentage = getInputValue(inputs, 'ms_roi_userProductivityLossPercentage') / 100;
        
        const productivityGainPercentage = getInputValue(inputs, 'ms_roi_productivityGainPercentage') / 100;
        const downtimeReductionPercentage = getInputValue(inputs, 'ms_roi_downtimeReductionPercentage') / 100;
        const staffEfficiencyReallocationPercentage = getInputValue(inputs, 'ms_roi_staffEfficiencyReallocationPercentage') / 100;

        // 1. User Productivity Gain
        if (numUsers > 0 && userProductivityLossPercentage > 0 && annualSalary > 0 && productivityGainPercentage > 0) {
            const annualProductivityLossValue = numUsers * userProductivityLossPercentage * annualSalary;
            const productivityGain = annualProductivityLossValue * productivityGainPercentage;
            totalAnnualGrossSavings += productivityGain;
            savingsCalculationWorkings.push({
                category: "User Productivity Gain (Reduced IT Issues)",
                formula: `(${numUsers} users * ${userProductivityLossPercentage*100}% prod. loss * $${annualSalary.toFixed(0)} avg salary) * ${productivityGainPercentage*100}% recovery`,
                result: productivityGain,
                inputsUsed: { numUsers, userProductivityLossPercentage, annualSalary, productivityGainPercentage }
            });
        }

        // 2. Downtime Reduction
        if (avgDowntimeHoursPerMonth > 0 && costPerHourOfDowntime > 0 && downtimeReductionPercentage > 0) {
            const downtimeReduction = avgDowntimeHoursPerMonth * costPerHourOfDowntime * downtimeReductionPercentage * 12;
            totalAnnualGrossSavings += downtimeReduction;
            savingsCalculationWorkings.push({
                category: "Downtime Cost Reduction",
                formula: `(${avgDowntimeHoursPerMonth} hrs/mo downtime * $${costPerHourOfDowntime.toFixed(0)}/hr * ${downtimeReductionPercentage*100}% reduction) * 12 mo`,
                result: downtimeReduction,
                inputsUsed: { avgDowntimeHoursPerMonth, costPerHourOfDowntime, downtimeReductionPercentage }
            });
        }

        // 3. IT Staff Efficiency / Reallocation
        if (currentITStaffCount > 0 && hourlyRate > 0 && staffEfficiencyReallocationPercentage > 0) {
            const staffEfficiencySavings = currentITStaffCount * staffEfficiencyReallocationPercentage * annualSalary; 
            totalAnnualGrossSavings += staffEfficiencySavings;
            savingsCalculationWorkings.push({
                category: "IT Staff Efficiency/Reallocation",
                formula: `(${currentITStaffCount} IT FTEs * ${staffEfficiencyReallocationPercentage*100}% efficiency gain * $${annualSalary.toFixed(0)} avg salary)`,
                result: staffEfficiencySavings,
                inputsUsed: { currentITStaffCount, annualSalary, staffEfficiencyReallocationPercentage }
            });
        }

    } else if (selectedModuleId === 'cybersecurityServices') {
        const estimatedAnnualBreachCost = getInputValue(inputs, 'cs_roi_estimatedAnnualBreachCost');
        const currentAnnualSecuritySpend = getInputValue(inputs, 'cs_roi_currentAnnualSecuritySpend');
        const complianceFineRiskValue = getInputValue(inputs, 'cs_roi_complianceFineRiskValue');
        
        const breachRiskReductionPercentage = getInputValue(inputs, 'cs_roi_breachRiskReductionPercentage') / 100;
        const toolConsolidationSavingsPercentage = getInputValue(inputs, 'cs_roi_toolConsolidationSavingsPercentage') / 100;
        const fineRiskReductionPercentage = getInputValue(inputs, 'cs_roi_fineRiskReductionPercentage') / 100;

        // 1. Reduced Breach Cost/Likelihood
        if (estimatedAnnualBreachCost > 0 && breachRiskReductionPercentage > 0) {
            const breachCostReduction = estimatedAnnualBreachCost * breachRiskReductionPercentage;
            totalAnnualGrossSavings += breachCostReduction;
            savingsCalculationWorkings.push({
                category: "Reduced Data Breach Cost/Likelihood",
                formula: `$${estimatedAnnualBreachCost.toFixed(0)} current risk * ${breachRiskReductionPercentage*100}% reduction`,
                result: breachCostReduction,
                inputsUsed: { estimatedAnnualBreachCost, breachRiskReductionPercentage }
            });
        }

        // 2. Security Tool Consolidation / Optimisation
        if (currentAnnualSecuritySpend > 0 && toolConsolidationSavingsPercentage > 0) {
            const toolConsolidationSavings = currentAnnualSecuritySpend * toolConsolidationSavingsPercentage;
            totalAnnualGrossSavings += toolConsolidationSavings;
            savingsCalculationWorkings.push({
                category: "Security Tool Consolidation/Optimisation",
                formula: `$${currentAnnualSecuritySpend.toFixed(0)} current spend * ${toolConsolidationSavingsPercentage*100}% optimisation`,
                result: toolConsolidationSavings,
                inputsUsed: { currentAnnualSecuritySpend, toolConsolidationSavingsPercentage }
            });
        }
        
        // 3. Reduced Compliance Fine Risk
        if (complianceFineRiskValue > 0 && fineRiskReductionPercentage > 0) {
            const fineRiskReduction = complianceFineRiskValue * fineRiskReductionPercentage;
            totalAnnualGrossSavings += fineRiskReduction;
            savingsCalculationWorkings.push({
                category: "Reduced Compliance Fine Risk",
                formula: `$${complianceFineRiskValue.toFixed(0)} current risk * ${fineRiskReductionPercentage*100}% reduction`,
                result: fineRiskReduction,
                inputsUsed: { complianceFineRiskValue, fineRiskReductionPercentage }
            });
        }
    } else if (selectedModuleId === 'orderManagement') {
        const timeSavingOverride = getInputValue(inputs, 'om_roi_overrideTimeSavingPercentage');
        const errorReductionOverride = getInputValue(inputs, 'om_roi_overrideErrorReductionPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        const automationErrorReductionPercentage = errorReductionOverride > 0 ? errorReductionOverride / 100 : globalErrorReduction;

        const numSalesOrdersPerMonth = getInputValue(inputs, 'om_roi_numSalesOrdersPerMonth');
        const avgManualOrderEntryTimeMins = getInputValue(inputs, 'om_roi_avgManualOrderEntryTimeMins');
        const currentOrderErrorRatePercentage = getInputValue(inputs, 'om_roi_currentOrderErrorRatePercentage') / 100;
        const avgCostToReworkOrderError = getInputValue(inputs, 'om_roi_avgCostToReworkOrderError');

        if (numSalesOrdersPerMonth > 0 && avgManualOrderEntryTimeMins > 0 && hourlyRate > 0) {
            const timeSavedPerOrderMins = avgManualOrderEntryTimeMins * automationTimeSavingPercentage;
            const annualTimeSavingHours = (numSalesOrdersPerMonth * timeSavedPerOrderMins / 60) * 12;
            const laborSavingsOrderEntry = annualTimeSavingHours * hourlyRate;
            totalAnnualGrossSavings += laborSavingsOrderEntry;
            savingsCalculationWorkings.push({
                category: "Labour Savings (Order Entry Time Reduction)",
                formula: `(${numSalesOrdersPerMonth} orders/mo * ${avgManualOrderEntryTimeMins} mins/order * ${automationTimeSavingPercentage*100}% saved / 60 mins/hr * 12 mo) * $${hourlyRate.toFixed(2)}/hr`,
                result: laborSavingsOrderEntry,
                inputsUsed: { numSalesOrdersPerMonth, avgManualOrderEntryTimeMins, hourlyRate, automationTimeSavingPercentage }
            });
        }
        if (numSalesOrdersPerMonth > 0 && currentOrderErrorRatePercentage > 0 && avgCostToReworkOrderError > 0) {
            const errorsPerMonth = numSalesOrdersPerMonth * currentOrderErrorRatePercentage;
            const errorsReducedPerMonth = errorsPerMonth * automationErrorReductionPercentage;
            const annualErrorCostSavings = errorsReducedPerMonth * avgCostToReworkOrderError * 12;
            totalAnnualGrossSavings += annualErrorCostSavings;
            savingsCalculationWorkings.push({
                category: "Savings (Reduced Order Rework Costs)",
                formula: `(${numSalesOrdersPerMonth} orders/mo * ${currentOrderErrorRatePercentage*100}% error rate * ${automationErrorReductionPercentage*100}% reduction * $${avgCostToReworkOrderError}/error * 12 mo)`,
                result: annualErrorCostSavings,
                inputsUsed: { numSalesOrdersPerMonth, currentOrderErrorRatePercentage, avgCostToReworkOrderError, automationErrorReductionPercentage }
            });
        }
    } else if (selectedModuleId === 'customerInquiryManagement') {
        const timeSavingOverride = getInputValue(inputs, 'cim_roi_overrideTimeSavingPercentage');
        const errorReductionOverride = getInputValue(inputs, 'cim_roi_overrideErrorReductionPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        const automationErrorReductionPercentage = errorReductionOverride > 0 ? errorReductionOverride / 100 : globalErrorReduction;

        const numInquiriesPerMonth = getInputValue(inputs, 'cim_roi_numInquiriesPerMonth');
        const avgHandleTimePerInquiryMins = getInputValue(inputs, 'cim_roi_avgHandleTimePerInquiryMins');
        const repeatInquiryRatePercentage = getInputValue(inputs, 'cim_roi_repeatInquiryRatePercentage') / 100;
        const costToResolveRepeatInquiry = getInputValue(inputs, 'cim_roi_costToResolveRepeatInquiry');

        if (numInquiriesPerMonth > 0 && avgHandleTimePerInquiryMins > 0 && hourlyRate > 0) {
            const timeSavedPerInquiryMins = avgHandleTimePerInquiryMins * automationTimeSavingPercentage;
            const annualTimeSavingHours = (numInquiriesPerMonth * timeSavedPerInquiryMins / 60) * 12;
            const laborSavingsHandling = annualTimeSavingHours * hourlyRate;
            totalAnnualGrossSavings += laborSavingsHandling;
            savingsCalculationWorkings.push({ category: "Labour Savings (Inquiry Handling Time)", result: laborSavingsHandling, formula: `(${numInquiriesPerMonth} inquires/mo * ${avgHandleTimePerInquiryMins} mins * ${automationTimeSavingPercentage*100}% saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numInquiriesPerMonth, avgHandleTimePerInquiryMins, automationTimeSavingPercentage, hourlyRate}});
        }
        if (numInquiriesPerMonth > 0 && repeatInquiryRatePercentage > 0 && costToResolveRepeatInquiry > 0) {
            const numRepeatInquiriesPerMonth = numInquiriesPerMonth * repeatInquiryRatePercentage;
            const numReducedRepeatInquiriesPerMonth = numRepeatInquiriesPerMonth * automationErrorReductionPercentage;
            const annualSavingsFromRepeats = numReducedRepeatInquiriesPerMonth * costToResolveRepeatInquiry * 12;
            totalAnnualGrossSavings += annualSavingsFromRepeats;
            savingsCalculationWorkings.push({ category: "Savings (Reduced Repeat Inquiries)", result: annualSavingsFromRepeats, formula: `(${numInquiriesPerMonth} inquiries/mo * ${repeatInquiryRatePercentage*100}% repeat rate * ${automationErrorReductionPercentage*100}% reduction) * $${costToResolveRepeatInquiry}/repeat * 12`, inputsUsed: {numInquiriesPerMonth, repeatInquiryRatePercentage, automationErrorReductionPercentage, costToResolveRepeatInquiry}});
        }
    } else if (selectedModuleId === 'cashApplication') {
        const timeSavingOverride = getInputValue(inputs, 'ca_roi_overrideTimeSavingPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        
        const numRemittancesPerMonth = getInputValue(inputs, 'ca_roi_numRemittancesPerMonth');
        const avgManualMatchRatePercentage = getInputValue(inputs, 'ca_roi_avgManualMatchRatePercentage') / 100;
        const timePerUnmatchedRemittanceMins = getInputValue(inputs, 'ca_roi_timePerUnmatchedRemittanceMins');
        const annualBankFeesForManualProcessing = getInputValue(inputs, 'ca_roi_annualBankFeesForManualProcessing');
        const bankFeeReductionPercentage = getInputValue(inputs, 'ca_roi_bankFeeReductionPercentage') / 100;

        if (numRemittancesPerMonth > 0 && timePerUnmatchedRemittanceMins > 0 && hourlyRate > 0) {
            const numUnmatchedRemittancesPerMonth = numRemittancesPerMonth * (1 - avgManualMatchRatePercentage);
            const timeSavedOnUnmatchedMins = numUnmatchedRemittancesPerMonth * timePerUnmatchedRemittanceMins * automationTimeSavingPercentage; 
            const annualLaborSavings = (timeSavedOnUnmatchedMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labour Savings (Resolving Unmatched Remittances)", result: annualLaborSavings, formula: `(${numRemittancesPerMonth} rem/mo * (1-${avgManualMatchRatePercentage*100}%) * ${timePerUnmatchedRemittanceMins} mins * ${automationTimeSavingPercentage*100}% saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numRemittancesPerMonth, avgManualMatchRatePercentage, timePerUnmatchedRemittanceMins, automationTimeSavingPercentage, hourlyRate}});
        }
        if (annualBankFeesForManualProcessing > 0 && bankFeeReductionPercentage > 0) { 
             const feeSavings = annualBankFeesForManualProcessing * bankFeeReductionPercentage; 
             totalAnnualGrossSavings += feeSavings;
             savingsCalculationWorkings.push({ category: "Reduced Bank Fees", result: feeSavings, formula: `$${annualBankFeesForManualProcessing} * ${bankFeeReductionPercentage*100}% reduction`, inputsUsed: {annualBankFeesForManualProcessing, bankFeeReductionPercentage}});
        }
    } else if (selectedModuleId === 'collectionManagement') {
        const timeSavingOverride = getInputValue(inputs, 'col_roi_overrideTimeSavingPercentage');
        const errorReductionOverride = getInputValue(inputs, 'col_roi_overrideErrorReductionPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        const automationErrorReductionPercentage = errorReductionOverride > 0 ? errorReductionOverride / 100 : globalErrorReduction;

        const numOverdueInvoicesManagedMonthly = getInputValue(inputs, 'col_roi_numOverdueInvoicesManagedMonthly');
        const avgCollectorTimePerInvoiceMins = getInputValue(inputs, 'col_roi_avgCollectorTimePerInvoiceMins');
        const badDebtPercentageOfRevenue = getInputValue(inputs, 'col_roi_badDebtPercentageOfRevenue') / 100;
        const totalAnnualRevenue = getInputValue(inputs, 'col_roi_totalAnnualRevenue');

        if (numOverdueInvoicesManagedMonthly > 0 && avgCollectorTimePerInvoiceMins > 0 && hourlyRate > 0) {
            const timeSavedPerInvoiceMins = avgCollectorTimePerInvoiceMins * automationTimeSavingPercentage;
            const annualLaborSavings = (numOverdueInvoicesManagedMonthly * timeSavedPerInvoiceMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labour Savings (Collector Efficiency)", result: annualLaborSavings, formula: `(${numOverdueInvoicesManagedMonthly} invoices/mo * ${avgCollectorTimePerInvoiceMins} mins * ${automationTimeSavingPercentage*100}% / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numOverdueInvoicesManagedMonthly, avgCollectorTimePerInvoiceMins, automationTimeSavingPercentage, hourlyRate}});
        }
        if (totalAnnualRevenue > 0 && badDebtPercentageOfRevenue > 0) {
            const currentBadDebtAmount = totalAnnualRevenue * badDebtPercentageOfRevenue;
            const badDebtReduction = currentBadDebtAmount * automationErrorReductionPercentage; 
            totalAnnualGrossSavings += badDebtReduction;
            savingsCalculationWorkings.push({ category: "Reduced Bad Debt", result: badDebtReduction, formula: `($${totalAnnualRevenue} revenue * ${badDebtPercentageOfRevenue*100}% bad debt) * ${automationErrorReductionPercentage*100}% reduction`, inputsUsed: {totalAnnualRevenue, badDebtPercentageOfRevenue, automationErrorReductionPercentage}});
        }
    } else if (selectedModuleId === 'creditManagement') {
        const timeSavingOverride = getInputValue(inputs, 'crm_roi_overrideTimeSavingPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        
        const numCreditAppsPerMonth = getInputValue(inputs, 'crm_roi_numCreditAppsPerMonth');
        const avgTimeToProcessCreditAppManualHrs = getInputValue(inputs, 'crm_roi_avgTimeToProcessCreditAppManualHrs');
        const annualSalesLostDueToSlowCredit = getInputValue(inputs, 'crm_roi_annualSalesLostDueToSlowCredit');
        const costPerManualCreditReview = getInputValue(inputs, 'crm_roi_costPerManualCreditReview');
        const recoveredSalesPercentage = getInputValue(inputs, 'crm_roi_recoveredSalesPercentage') / 100;

        if (numCreditAppsPerMonth > 0 && avgTimeToProcessCreditAppManualHrs > 0 && hourlyRate > 0) {
            const timeSavedPerAppHrs = avgTimeToProcessCreditAppManualHrs * automationTimeSavingPercentage;
            const annualLaborSavings = numCreditAppsPerMonth * timeSavedPerAppHrs * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labour Savings (Credit App Processing)", result: annualLaborSavings, formula: `(${numCreditAppsPerMonth} apps/mo * ${avgTimeToProcessCreditAppManualHrs} hrs * ${automationTimeSavingPercentage*100}%) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numCreditAppsPerMonth, avgTimeToProcessCreditAppManualHrs, automationTimeSavingPercentage, hourlyRate}});
        }
         if (numCreditAppsPerMonth > 0 && costPerManualCreditReview > 0) {
            const savedReviewCosts = numCreditAppsPerMonth * costPerManualCreditReview * automationTimeSavingPercentage * 12; 
            totalAnnualGrossSavings += savedReviewCosts;
            savingsCalculationWorkings.push({ category: "Reduced Cost per Credit Review", result: savedReviewCosts, formula: `(${numCreditAppsPerMonth} apps/mo * $${costPerManualCreditReview} * ${automationTimeSavingPercentage*100}% saved) * 12`, inputsUsed: {numCreditAppsPerMonth, costPerManualCreditReview, automationTimeSavingPercentage}});
        }
        if (annualSalesLostDueToSlowCredit > 0 && recoveredSalesPercentage > 0) { 
            const recoveredSales = annualSalesLostDueToSlowCredit * recoveredSalesPercentage; 
            totalAnnualGrossSavings += recoveredSales;
            savingsCalculationWorkings.push({ category: "Recovered Sales (Faster Credit Decisions)", result: recoveredSales, formula: `$${annualSalesLostDueToSlowCredit} * ${recoveredSalesPercentage*100}% recovery`, inputsUsed: {annualSalesLostDueToSlowCredit, recoveredSalesPercentage}});
        }
    } else if (selectedModuleId === 'claimsDeductions') {
        const timeSavingOverride = getInputValue(inputs, 'cd_roi_overrideTimeSavingPercentage');
        const errorReductionOverride = getInputValue(inputs, 'cd_roi_overrideErrorReductionPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        const automationErrorReductionPercentage = errorReductionOverride > 0 ? errorReductionOverride / 100 : globalErrorReduction;
        
        const numClaimsDeductionsMonthly = getInputValue(inputs, 'cd_roi_numClaimsDeductionsMonthly');
        const avgTimePerClaimManualMins = getInputValue(inputs, 'cd_roi_avgTimePerClaimManualMins');
        const percentageInvalidDeductionsUnrecovered = getInputValue(inputs, 'cd_roi_percentageInvalidDeductionsUnrecovered') / 100;
        const avgValueInvalidDeduction = getInputValue(inputs, 'cd_roi_avgValueInvalidDeduction');

        if (numClaimsDeductionsMonthly > 0 && avgTimePerClaimManualMins > 0 && hourlyRate > 0) {
            const timeSavedPerClaimMins = avgTimePerClaimManualMins * automationTimeSavingPercentage;
            const annualLaborSavings = (numClaimsDeductionsMonthly * timeSavedPerClaimMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labour Savings (Claim/Deduction Processing)", result: annualLaborSavings, formula: `(${numClaimsDeductionsMonthly} claims/mo * ${avgTimePerClaimManualMins} mins * ${automationTimeSavingPercentage*100}% saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numClaimsDeductionsMonthly, avgTimePerClaimManualMins, automationTimeSavingPercentage, hourlyRate}});
        }
        if (numClaimsDeductionsMonthly > 0 && percentageInvalidDeductionsUnrecovered > 0 && avgValueInvalidDeduction > 0) {
             const annualValueRecovered = numClaimsDeductionsMonthly * avgValueInvalidDeduction * percentageInvalidDeductionsUnrecovered * automationErrorReductionPercentage * 12; 
             totalAnnualGrossSavings += annualValueRecovered;
             savingsCalculationWorkings.push({ category: "Increased Recovery of Invalid Deductions", result: annualValueRecovered, formula: `(${numClaimsDeductionsMonthly}/mo * $${avgValueInvalidDeduction} * ${percentageInvalidDeductionsUnrecovered*100}% unrecovered * ${automationErrorReductionPercentage*100}% improved recovery) * 12`, inputsUsed: {numClaimsDeductionsMonthly, avgValueInvalidDeduction, percentageInvalidDeductionsUnrecovered, automationErrorReductionPercentage}});
        }
    } else if (selectedModuleId === 'expenseManagement') {
        const timeSavingOverride = getInputValue(inputs, 'em_roi_overrideTimeSavingPercentage');
        const errorReductionOverride = getInputValue(inputs, 'em_roi_overrideErrorReductionPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        const automationErrorReductionPercentage = errorReductionOverride > 0 ? errorReductionOverride / 100 : globalErrorReduction;

        const numExpenseReportsMonthly = getInputValue(inputs, 'em_roi_numExpenseReportsMonthly');
        const avgTimeProcessReportManualMins = getInputValue(inputs, 'em_roi_avgTimeProcessReportManualMins');
        const outOfPolicySpendPercentage = getInputValue(inputs, 'em_roi_outOfPolicySpendPercentage') / 100;
        const totalAnnualTAndESpend = getInputValue(inputs, 'em_roi_totalAnnualTAndESpend');

        if (numExpenseReportsMonthly > 0 && avgTimeProcessReportManualMins > 0 && hourlyRate > 0) {
            const timeSavedPerReportMins = avgTimeProcessReportManualMins * automationTimeSavingPercentage;
            const annualLaborSavings = (numExpenseReportsMonthly * timeSavedPerReportMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labour Savings (Expense Report Processing)", result: annualLaborSavings, formula: `(${numExpenseReportsMonthly} reports/mo * ${avgTimeProcessReportManualMins} mins * ${automationTimeSavingPercentage*100}% saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numExpenseReportsMonthly, avgTimeProcessReportManualMins, automationTimeSavingPercentage, hourlyRate}});
        }
        if (totalAnnualTAndESpend > 0 && outOfPolicySpendPercentage > 0) {
            const currentOutOfPolicyAmount = totalAnnualTAndESpend * outOfPolicySpendPercentage;
            const reductionInOutPolicy = currentOutOfPolicyAmount * automationErrorReductionPercentage; 
            totalAnnualGrossSavings += reductionInOutPolicy;
            savingsCalculationWorkings.push({ category: "Reduced Out-of-Policy Spend", result: reductionInOutPolicy, formula: `($${totalAnnualTAndESpend} T&E spend * ${outOfPolicySpendPercentage*100}% out-of-policy) * ${automationErrorReductionPercentage*100}% reduction`, inputsUsed: {totalAnnualTAndESpend, outOfPolicySpendPercentage, automationErrorReductionPercentage}});
        }
    } else if (selectedModuleId === 'procurement') {
        const timeSavingOverride = getInputValue(inputs, 'proc_roi_overrideTimeSavingPercentage');
        const errorReductionOverride = getInputValue(inputs, 'proc_roi_overrideErrorReductionPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        const automationErrorReductionPercentage = errorReductionOverride > 0 ? errorReductionOverride / 100 : globalErrorReduction;

        const numPurchaseOrdersMonthly = getInputValue(inputs, 'proc_roi_numPurchaseOrdersMonthly');
        const avgManualPOTimeMins = getInputValue(inputs, 'proc_roi_avgManualPOTimeMins');
        const maverickSpendPercentage = getInputValue(inputs, 'proc_roi_maverickSpendPercentage') / 100;
        const totalAnnualIndirectSpend = getInputValue(inputs, 'proc_roi_totalAnnualIndirectSpend');
        const maverickSpendPremiumPercentage = getInputValue(inputs, 'proc_roi_maverickSpendPremiumPercentage') / 100;

        if (numPurchaseOrdersMonthly > 0 && avgManualPOTimeMins > 0 && hourlyRate > 0) {
            const timeSavedPerPOMins = avgManualPOTimeMins * automationTimeSavingPercentage;
            const annualLaborSavings = (numPurchaseOrdersMonthly * timeSavedPerPOMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labour Savings (PO Processing)", result: annualLaborSavings, formula: `(${numPurchaseOrdersMonthly} POs/mo * ${avgManualPOTimeMins} mins * ${automationTimeSavingPercentage*100}% saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numPurchaseOrdersMonthly, avgManualPOTimeMins, automationTimeSavingPercentage, hourlyRate}});
        }
        if (totalAnnualIndirectSpend > 0 && maverickSpendPercentage > 0 && maverickSpendPremiumPercentage > 0) {
            const currentMaverickSpendAmount = totalAnnualIndirectSpend * maverickSpendPercentage;
            const savingsFromReducedMaverickSpend = currentMaverickSpendAmount * maverickSpendPremiumPercentage * automationErrorReductionPercentage; 
            totalAnnualGrossSavings += savingsFromReducedMaverickSpend;
            savingsCalculationWorkings.push({ category: "Savings from Reduced Maverick Spend", result: savingsFromReducedMaverickSpend, formula: `($${totalAnnualIndirectSpend} indirect spend * ${maverickSpendPercentage*100}% maverick) * ${maverickSpendPremiumPercentage*100}% premium * ${automationErrorReductionPercentage*100}% reduction`, inputsUsed: {totalAnnualIndirectSpend, maverickSpendPercentage, automationErrorReductionPercentage, maverickSpendPremiumPercentage}});
        }
    } else if (selectedModuleId === 'invoiceDelivery') {
        const timeSavingOverride = getInputValue(inputs, 'id_roi_overrideTimeSavingPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;

        const numInvoicesSentMonthly = getInputValue(inputs, 'id_roi_numInvoicesSentMonthly');
        const percentagePaperInvoices = getInputValue(inputs, 'id_roi_percentagePaperInvoices') / 100;
        const costPerPaperInvoice = getInputValue(inputs, 'id_roi_costPerPaperInvoice');
        const timeSavedPerInvoiceElectronicMins = getInputValue(inputs, 'id_roi_timeSavedPerInvoiceElectronicMins');
        const paperToElectronicConversionPercentage = getInputValue(inputs, 'id_roi_paperToElectronicConversionPercentage') / 100;

        if (numInvoicesSentMonthly > 0 && percentagePaperInvoices > 0 && costPerPaperInvoice > 0) {
            const numPaperInvoicesMonthly = numInvoicesSentMonthly * percentagePaperInvoices;
            const annualPaperCostSavings = numPaperInvoicesMonthly * paperToElectronicConversionPercentage * costPerPaperInvoice * 12;
            totalAnnualGrossSavings += annualPaperCostSavings;
            savingsCalculationWorkings.push({ category: "Reduced Paper Invoice Costs", result: annualPaperCostSavings, formula: `(${numInvoicesSentMonthly} invoices/mo * ${percentagePaperInvoices*100}% paper * ${paperToElectronicConversionPercentage*100}% reduction) * $${costPerPaperInvoice}/invoice * 12`, inputsUsed: {numInvoicesSentMonthly, percentagePaperInvoices, costPerPaperInvoice, paperToElectronicConversionPercentage}});
        }
        if (numInvoicesSentMonthly > 0 && timeSavedPerInvoiceElectronicMins > 0 && hourlyRate > 0) {
            const numElectronicTransition = numInvoicesSentMonthly * percentagePaperInvoices * paperToElectronicConversionPercentage; 
            const annualLaborSavings = (numElectronicTransition * timeSavedPerInvoiceElectronicMins / 60) * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labour Savings (Admin for Electronic Delivery)", result: annualLaborSavings, formula: `(${numInvoicesSentMonthly} inv/mo * ${percentagePaperInvoices*100}% paper * ${paperToElectronicConversionPercentage*100}% electronic conv. * ${timeSavedPerInvoiceElectronicMins} mins saved / 60) * 12 * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numInvoicesSentMonthly, percentagePaperInvoices, paperToElectronicConversionPercentage, timeSavedPerInvoiceElectronicMins, hourlyRate}});
        }
    } else if (selectedModuleId === 'supplierManagement') {
        const timeSavingOverride = getInputValue(inputs, 'sm_roi_overrideTimeSavingPercentage');
        const errorReductionOverride = getInputValue(inputs, 'sm_roi_overrideErrorReductionPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        const automationErrorReductionPercentage = errorReductionOverride > 0 ? errorReductionOverride / 100 : globalErrorReduction;

        const numSuppliersOnboardedAnnually = getInputValue(inputs, 'sm_roi_numSuppliersOnboardedAnnually');
        const avgTimeOnboardSupplierManualHrs = getInputValue(inputs, 'sm_roi_avgTimeOnboardSupplierManualHrs');
        const costOfSupplierDataErrorsAnnual = getInputValue(inputs, 'sm_roi_costOfSupplierDataErrorsAnnual');
        const compliancePenaltyRiskCostAnnual = getInputValue(inputs, 'sm_roi_compliancePenaltyRiskCostAnnual');
        const complianceRiskReductionPercentage = getInputValue(inputs, 'sm_roi_complianceRiskReductionPercentage') / 100;

        if (numSuppliersOnboardedAnnually > 0 && avgTimeOnboardSupplierManualHrs > 0 && hourlyRate > 0) {
            const timeSavedPerSupplierHrs = avgTimeOnboardSupplierManualHrs * automationTimeSavingPercentage;
            const annualLaborSavings = numSuppliersOnboardedAnnually * timeSavedPerSupplierHrs * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labour Savings (Supplier Onboarding)", result: annualLaborSavings, formula: `${numSuppliersOnboardedAnnually} suppliers/yr * ${avgTimeOnboardSupplierManualHrs} hrs * ${automationTimeSavingPercentage*100}% saved * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numSuppliersOnboardedAnnually, avgTimeOnboardSupplierManualHrs, automationTimeSavingPercentage, hourlyRate}});
        }
        if (costOfSupplierDataErrorsAnnual > 0) {
            const errorCostReduction = costOfSupplierDataErrorsAnnual * automationErrorReductionPercentage;
            totalAnnualGrossSavings += errorCostReduction;
            savingsCalculationWorkings.push({ category: "Reduced Costs from Supplier Data Errors", result: errorCostReduction, formula: `$${costOfSupplierDataErrorsAnnual} * ${automationErrorReductionPercentage*100}% reduction`, inputsUsed: {costOfSupplierDataErrorsAnnual, automationErrorReductionPercentage}});
        }
        if (compliancePenaltyRiskCostAnnual > 0 && complianceRiskReductionPercentage > 0) {
            const riskCostReduction = compliancePenaltyRiskCostAnnual * complianceRiskReductionPercentage; 
            totalAnnualGrossSavings += riskCostReduction;
            savingsCalculationWorkings.push({ category: "Reduced Compliance Risk Costs (SM)", result: riskCostReduction, formula: `$${compliancePenaltyRiskCostAnnual} * ${complianceRiskReductionPercentage*100}% reduction`, inputsUsed: {compliancePenaltyRiskCostAnnual, complianceRiskReductionPercentage}});
        }
    } else if (selectedModuleId === 'documentManagement') {
        const timeSavingOverride = getInputValue(inputs, 'dm_roi_overrideTimeSavingPercentage');
        const errorReductionOverride = getInputValue(inputs, 'dm_roi_overrideErrorReductionPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        const automationErrorReductionPercentage = errorReductionOverride > 0 ? errorReductionOverride / 100 : globalErrorReduction;

        const numEmployeesUsingSystem = getInputValue(inputs, 'dm_roi_numEmployeesUsingSystem');
        const avgTimeSearchingDocsPerUserHrsWeek = getInputValue(inputs, 'dm_roi_avgTimeSearchingDocsPerUserHrsWeek');
        const annualPhysicalStorageCost = getInputValue(inputs, 'dm_roi_annualPhysicalStorageCost');
        const costOfNonComplianceAnnual = getInputValue(inputs, 'dm_roi_costOfNonComplianceAnnual');
        const physicalStorageReductionPercentage = getInputValue(inputs, 'dm_roi_physicalStorageReductionPercentage') / 100;

        if (numEmployeesUsingSystem > 0 && avgTimeSearchingDocsPerUserHrsWeek > 0 && hourlyRate > 0) {
            const timeSavedPerUserHrsWeek = avgTimeSearchingDocsPerUserHrsWeek * automationTimeSavingPercentage;
            const annualLaborSavings = numEmployeesUsingSystem * timeSavedPerUserHrsWeek * 52 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labour Savings (Document Search Time)", result: annualLaborSavings, formula: `${numEmployeesUsingSystem} users * ${avgTimeSearchingDocsPerUserHrsWeek} hrs/wk * ${automationTimeSavingPercentage*100}% saved * 52 wks * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numEmployeesUsingSystem, avgTimeSearchingDocsPerUserHrsWeek, automationTimeSavingPercentage, hourlyRate}});
        }
        if (annualPhysicalStorageCost > 0 && physicalStorageReductionPercentage > 0) { 
             const storageCostSavings = annualPhysicalStorageCost * physicalStorageReductionPercentage; 
             totalAnnualGrossSavings += storageCostSavings;
             savingsCalculationWorkings.push({ category: "Reduced Physical Storage Costs", result: storageCostSavings, formula: `$${annualPhysicalStorageCost} * ${physicalStorageReductionPercentage*100}% reduction`, inputsUsed: {annualPhysicalStorageCost, physicalStorageReductionPercentage}});
        }
        if (costOfNonComplianceAnnual > 0) {
            const complianceSavings = costOfNonComplianceAnnual * automationErrorReductionPercentage; 
            totalAnnualGrossSavings += complianceSavings;
            savingsCalculationWorkings.push({ category: "Reduced Non-Compliance Costs (DM)", result: complianceSavings, formula: `$${costOfNonComplianceAnnual} * ${automationErrorReductionPercentage*100}% reduction`, inputsUsed: {costOfNonComplianceAnnual, automationErrorReductionPercentage}});
        }
    } else if (selectedModuleId === 'workflowManagement') {
        const timeSavingOverride = getInputValue(inputs, 'wm_roi_overrideTimeSavingPercentage');
        const errorReductionOverride = getInputValue(inputs, 'wm_roi_overrideErrorReductionPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        const automationErrorReductionPercentage = errorReductionOverride > 0 ? errorReductionOverride / 100 : globalErrorReduction;
        
        const numKeyWorkflowsTargeted = getInputValue(inputs, 'wm_roi_numKeyWorkflowsTargeted');
        const avgInstancesPerWorkflowMonthly = getInputValue(inputs, 'wm_roi_avgInstancesPerWorkflowMonthly');
        const avgManualTimeSavedPerInstanceHrs = getInputValue(inputs, 'wm_roi_avgManualTimeSavedPerInstanceHrs');
        const currentErrorRateInManualWorkflowsPercentage = getInputValue(inputs, 'wm_roi_currentErrorRateInManualWorkflowsPercentage') / 100;
        const avgTaskDurationForErrorCalcMins = getInputValue(inputs, 'wm_roi_avgTaskDurationForErrorCalcMins');

        if (numKeyWorkflowsTargeted > 0 && avgInstancesPerWorkflowMonthly > 0 && avgManualTimeSavedPerInstanceHrs > 0 && hourlyRate > 0) {
            const annualLaborSavings = numKeyWorkflowsTargeted * avgInstancesPerWorkflowMonthly * avgManualTimeSavedPerInstanceHrs * 12 * hourlyRate;
            totalAnnualGrossSavings += annualLaborSavings;
            savingsCalculationWorkings.push({ category: "Labour Savings (Workflow Automation)", result: annualLaborSavings, formula: `${numKeyWorkflowsTargeted} workflows * ${avgInstancesPerWorkflowMonthly} inst/mo * ${avgManualTimeSavedPerInstanceHrs} hrs saved/inst * 12 mo * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numKeyWorkflowsTargeted, avgInstancesPerWorkflowMonthly, avgManualTimeSavedPerInstanceHrs, hourlyRate}});
        }
        if (numKeyWorkflowsTargeted > 0 && avgInstancesPerWorkflowMonthly > 0 && currentErrorRateInManualWorkflowsPercentage > 0 && avgTaskDurationForErrorCalcMins > 0 && hourlyRate > 0) {
            const totalInstancesMonthly = numKeyWorkflowsTargeted * avgInstancesPerWorkflowMonthly;
            const errorsMonthly = totalInstancesMonthly * currentErrorRateInManualWorkflowsPercentage;
            const timeLostToErrorsMonthlyHrs = errorsMonthly * (avgTaskDurationForErrorCalcMins / 60);
            const timeSavedFromErrorReductionMonthlyHrs = timeLostToErrorsMonthlyHrs * automationErrorReductionPercentage;
            const annualErrorSavings = timeSavedFromErrorReductionMonthlyHrs * 12 * hourlyRate;
            totalAnnualGrossSavings += annualErrorSavings;
            savingsCalculationWorkings.push({ category: "Savings (Reduced Workflow Errors & Rework)", result: annualErrorSavings, formula: `(${numKeyWorkflowsTargeted} workflows * ${avgInstancesPerWorkflowMonthly} inst/mo * ${currentErrorRateInManualWorkflowsPercentage*100}% error rate * ${avgTaskDurationForErrorCalcMins / 60} hrs/rework * ${automationErrorReductionPercentage*100}% reduction) * 12 mo * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {numKeyWorkflowsTargeted, avgInstancesPerWorkflowMonthly, currentErrorRateInManualWorkflowsPercentage, avgTaskDurationForErrorCalcMins, automationErrorReductionPercentage, hourlyRate}});
        }
    } else if (selectedModuleId === 'processMapping') {
        const timeSavingOverride = getInputValue(inputs, 'pm_roi_overrideTimeSavingPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        
        const numKeyProcessesToMap = getInputValue(inputs, 'pm_roi_numKeyProcessesToMap');
        const avgTimeToMapProcessManuallyHrs = getInputValue(inputs, 'pm_roi_avgTimeToMapProcessManuallyHrs');
        const annualCostProcessRelatedInefficiencies = getInputValue(inputs, 'pm_roi_annualCostProcessRelatedInefficiencies');
        const timeReductionForAuditsHrsPerYear = getInputValue(inputs, 'pm_roi_timeReductionForAuditsHrsPerYear');
        const timeSavedMappingPercentage = getInputValue(inputs, 'pm_roi_timeSavedMappingPercentage') / 100;
        const inefficiencyReductionPercentage = getInputValue(inputs, 'pm_roi_inefficiencyReductionPercentage') / 100;

        if (numKeyProcessesToMap > 0 && avgTimeToMapProcessManuallyHrs > 0 && hourlyRate > 0) {
            const timeSavedMapping = numKeyProcessesToMap * avgTimeToMapProcessManuallyHrs * timeSavedMappingPercentage * hourlyRate;
            totalAnnualGrossSavings += (timeSavedMapping / solutionLifespanYears); 
             savingsCalculationWorkings.push({ category: "Efficiency (Process Mapping Time)", result: (timeSavedMapping / solutionLifespanYears), formula: `(${numKeyProcessesToMap} processes * ${avgTimeToMapProcessManuallyHrs} hrs * ${timeSavedMappingPercentage*100}% saved * $${hourlyRate.toFixed(2)}/hr) / ${solutionLifespanYears} yrs`, inputsUsed: {numKeyProcessesToMap, avgTimeToMapProcessManuallyHrs, timeSavedMappingPercentage, hourlyRate, solutionLifespanYears}});
        }
        if (annualCostProcessRelatedInefficiencies > 0) {
            const inefficiencyReduction = annualCostProcessRelatedInefficiencies * inefficiencyReductionPercentage; 
            totalAnnualGrossSavings += inefficiencyReduction;
            savingsCalculationWorkings.push({ category: "Reduced Process Inefficiency Costs", result: inefficiencyReduction, formula: `$${annualCostProcessRelatedInefficiencies} * ${inefficiencyReductionPercentage*100}% reduction`, inputsUsed: {annualCostProcessRelatedInefficiencies, inefficiencyReductionPercentage}});
        }
        if (timeReductionForAuditsHrsPerYear > 0 && hourlyRate > 0) {
            const auditTimeSavingsCost = timeReductionForAuditsHrsPerYear * hourlyRate;
            totalAnnualGrossSavings += auditTimeSavingsCost;
            savingsCalculationWorkings.push({ category: "Savings (Audit Preparation Time)", result: auditTimeSavingsCost, formula: `${timeReductionForAuditsHrsPerYear} hrs/yr * $${hourlyRate.toFixed(2)}/hr`, inputsUsed: {timeReductionForAuditsHrsPerYear, hourlyRate}});
        }
    } else { // Default/Generic calculation
        const timeSavingOverride = getInputValue(inputs, 'def_roi_overrideTimeSavingPercentage');
        const errorReductionOverride = getInputValue(inputs, 'def_roi_overrideErrorReductionPercentage');
        const automationTimeSavingPercentage = timeSavingOverride > 0 ? timeSavingOverride / 100 : globalTimeSaving;
        const automationErrorReductionPercentage = errorReductionOverride > 0 ? errorReductionOverride / 100 : globalErrorReduction;

        const manualTaskTimeHrsWeekPTE = getInputValue(inputs, 'def_roi_manualTaskTimeHrsWeekPTE');
        const numEmployeesPerformingTask = getInputValue(inputs, 'def_roi_numEmployeesPerformingTask');
        const errorRateManualTaskPercentage = getInputValue(inputs, 'def_roi_errorRateManualTaskPercentage') / 100;
        const avgTimeToCorrectErrorHrs = getInputValue(inputs, 'def_roi_avgTimeToCorrectErrorHrs');
        const avgTaskDurationForErrorCalcMins = getInputValue(inputs, 'def_roi_avgTaskDurationForErrorCalcMins');

        if (manualTaskTimeHrsWeekPTE > 0 && numEmployeesPerformingTask > 0 && hourlyRate > 0) {
            const totalManualHoursPerWeek = manualTaskTimeHrsWeekPTE * numEmployeesPerformingTask;
            const timeSavedPerWeek = totalManualHoursPerWeek * automationTimeSavingPercentage;
            const genericAnnualLaborSavings = timeSavedPerWeek * 52 * hourlyRate;
            totalAnnualGrossSavings += genericAnnualLaborSavings;
            savingsCalculationWorkings.push({
                category: "Generic Labour Time Savings",
                formula: `(${manualTaskTimeHrsWeekPTE.toFixed(1)} hrs/wk/FTE * ${numEmployeesPerformingTask} FTEs * ${automationTimeSavingPercentage*100}% saved * 52 wks) * $${hourlyRate.toFixed(2)}/hr`,
                result: genericAnnualLaborSavings,
                inputsUsed: { manualTaskTimeHrsWeekPTE, numEmployeesPerformingTask, hourlyRate, automationTimeSavingPercentage }
            });
        }
        if (manualTaskTimeHrsWeekPTE > 0 && numEmployeesPerformingTask > 0 && errorRateManualTaskPercentage > 0 && avgTimeToCorrectErrorHrs > 0 && hourlyRate > 0 && avgTaskDurationForErrorCalcMins > 0) {
            const totalWorkHoursPerYear = manualTaskTimeHrsWeekPTE * numEmployeesPerformingTask * 52;
            const estimatedTasksPerYear = totalWorkHoursPerYear / (avgTaskDurationForErrorCalcMins / 60);

            const numErrorsPerYear = estimatedTasksPerYear * errorRateManualTaskPercentage;
            const timeLostToErrorsPerYearHrs = numErrorsPerYear * avgTimeToCorrectErrorHrs;
            const timeSavedFromErrorReductionHrs = timeLostToErrorsPerYearHrs * automationErrorReductionPercentage;
            const genericErrorReductionSavings = timeSavedFromErrorReductionHrs * hourlyRate;

            totalAnnualGrossSavings += genericErrorReductionSavings;
            savingsCalculationWorkings.push({
                category: "Generic Savings (Error Reduction & Rework)",
                formula: `(Est. Tasks: ${estimatedTasksPerYear.toFixed(0)}/yr * ${errorRateManualTaskPercentage*100}% error rate * ${avgTimeToCorrectErrorHrs} hrs/rework * ${automationErrorReductionPercentage*100}% reduction) * $${hourlyRate.toFixed(2)}/hr`,
                result: genericErrorReductionSavings,
                inputsUsed: { manualTaskTimeHrsWeekPTE, numEmployeesPerformingTask, errorRateManualTaskPercentage, avgTimeToCorrectErrorHrs, automationErrorReductionPercentage, hourlyRate, avgTaskDurationForErrorCalcMins, estimatedTasksPerYear }
            });
        }
    }

    const totalInvestmentOverLifespan = upfrontProfServicesCost + (annualSoftwareCost * solutionLifespanYears);
    const totalSavingsOverLifespan = totalAnnualGrossSavings * solutionLifespanYears;
    const totalNetBenefitOverLifespan = totalSavingsOverLifespan - totalInvestmentOverLifespan;
    const overallRoiPercentage = totalInvestmentOverLifespan > 0 ? (totalNetBenefitOverLifespan / totalInvestmentOverLifespan) * 100 : (totalNetBenefitOverLifespan > 0 ? Infinity : 0);
    const monthlyCostOfDelay = totalAnnualGrossSavings > 0 ? totalAnnualGrossSavings / 12 : 0;

    const annualBreakdown: RoiResults['annualBreakdown'] = [];
    let cumulativeNetCashFlow = 0;

    let paybackPeriodMonths: number;
    const netAnnualSavings = totalAnnualGrossSavings - annualSoftwareCost;

    if (upfrontProfServicesCost <= 0 && netAnnualSavings > 0) {
        paybackPeriodMonths = 0; // Instant payback
    } else if (netAnnualSavings <= 0) {
        paybackPeriodMonths = Infinity; // No payback if savings don't cover recurring costs
    } else {
        paybackPeriodMonths = (upfrontProfServicesCost / netAnnualSavings) * 12;
    }

    for (let i = 1; i <= solutionLifespanYears; i++) {
        const investmentThisYear = (i === 1) ? upfrontProfServicesCost : 0;
        const netCashFlowYear = totalAnnualGrossSavings - annualSoftwareCost - investmentThisYear;
        cumulativeNetCashFlow += netCashFlowYear;
        annualBreakdown.push({ year: i, grossSavings: totalAnnualGrossSavings, softwareCost: annualSoftwareCost, investment: investmentThisYear, netCashFlow: netCashFlowYear, cumulativeNetCashFlow });
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
      monthlyCostOfDelay,
      savingsCalculationWorkings,
      annualBreakdown,
    };
    return results;
};
