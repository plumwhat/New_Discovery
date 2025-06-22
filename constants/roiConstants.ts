
import { RoiInput } from '../types';

export const ROI_INPUT_TEMPLATES: Record<string, RoiInput[]> = {
  accountsPayable: [
    { id: "ap_roi_numInvoicesPerMonth", label: "Number of invoices per month", type: "number", value: "" },
    { id: "ap_roi_avgManualProcessingTimePerInvoiceMins", label: "Avg. Manual Processing Time per Invoice", type: "number", value: "", unit: "mins" },
    { id: "ap_roi_currentInvoiceErrorRatePercentage", label: "Current Invoice Error Rate", type: "number", value: "", unit: "%" },
    { id: "ap_roi_avgTimeToResolveExceptionMins", label: "Avg. Time to Resolve Exception", type: "number", value: "", unit: "mins" },
    { id: "ap_roi_annualValueMissedEarlyPaymentDiscounts", label: "Annual Value Missed Early Payment Discounts", type: "number", value: "", isCurrency: true },
    { id: "ap_roi_annualCostPhysicalInvoiceStorage", label: "Annual Cost Physical Invoice Storage", type: "number", value: "", isCurrency: true },
    { id: "ap_roi_numFTEs", label: "Number of FTEs in AP", type: "number", value: "" },
  ],
  orderManagement: [
    { id: "om_roi_numSalesOrdersPerMonth", label: "Number of Sales Orders per Month", type: "number", value: "" },
    { id: "om_roi_avgManualOrderEntryTimeMins", label: "Avg. Manual Order Entry Time", type: "number", value: "", unit: "mins" },
    { id: "om_roi_currentOrderErrorRatePercentage", label: "Current Order Error Rate", type: "number", value: "", unit: "%" },
    { id: "om_roi_avgCostToReworkOrderError", label: "Avg. Cost to Rework Order Error", type: "number", value: "", isCurrency: true },
    { id: "om_roi_numFTEs", label: "Number of FTEs in Order Entry", type: "number", value: "" },
  ],
  managedITSupport: [
    { id: "ms_roi_numUsers", label: "Number of End-Users Supported", type: "number", value: "" },
    { id: "ms_roi_currentITStaffCount", label: "Current IT Support Staff FTEs (for support tasks)", type: "number", value: "" },
    { id: "ms_roi_avgDowntimeHoursPerMonth", label: "Avg. IT System Downtime Hours/Month (user-impacting)", type: "number", value: "", unit: "hrs/month" },
    { id: "ms_roi_costPerHourOfDowntime", label: "Estimated Cost per Hour of IT Downtime", type: "number", value: "", isCurrency: true },
    { id: "ms_roi_userProductivityLossPercentage", label: "Est. User Productivity Loss due to IT Issues", type: "number", value: "", unit: "%" },
  ],
  cybersecurityServices: [
    { id: "cs_roi_numEmployees", label: "Number of Employees (for breach cost context)", type: "number", value: "" },
    { id: "cs_roi_estimatedAnnualBreachCost", label: "Estimated Annual Cost of a Data Breach (current risk)", type: "number", value: "", isCurrency: true },
    { id: "cs_roi_currentAnnualSecuritySpend", label: "Current Annual Spend on Security Tools/Services", type: "number", value: "", isCurrency: true },
    { id: "cs_roi_complianceFineRiskValue", label: "Potential Annual Compliance Fine Risk (current risk)", type: "number", value: "", isCurrency: true },
    { id: "cs_roi_securityFTEs", label: "Number of FTEs dedicated to Security Operations", type: "number", value: "" },
  ],
  customerInquiryManagement: [
    { id: "cim_roi_numInquiriesPerMonth", label: "Number of Customer Inquiries per Month", type: "number", value: "" },
    { id: "cim_roi_avgHandleTimePerInquiryMins", label: "Avg. Handle Time per Inquiry", type: "number", value: "", unit: "mins" },
    { id: "cim_roi_repeatInquiryRatePercentage", label: "Repeat Inquiry Rate", type: "number", value: "", unit: "%" },
    { id: "cim_roi_costToResolveRepeatInquiry", label: "Cost to Resolve a Repeat Inquiry", type: "number", value: "", isCurrency: true },
  ],
  cashApplication: [
    { id: "ca_roi_numRemittancesPerMonth", label: "Number of Remittances per Month", type: "number", value: "" },
    { id: "ca_roi_avgManualMatchRatePercentage", label: "Avg. Manual Match Rate", type: "number", value: "", unit: "%" },
    { id: "ca_roi_timePerUnmatchedRemittanceMins", label: "Time per Unmatched Remittance", type: "number", value: "", unit: "mins" },
    { id: "ca_roi_annualBankFeesForManualProcessing", label: "Annual Bank Fees (Manual Processing)", type: "number", value: "", isCurrency: true },
  ],
  collectionManagement: [
    { id: "col_roi_numOverdueInvoicesManagedMonthly", label: "Overdue Invoices Managed Monthly", type: "number", value: "" },
    { id: "col_roi_avgCollectorTimePerInvoiceMins", label: "Avg. Collector Time per Invoice", type: "number", value: "", unit: "mins" },
    { id: "col_roi_badDebtPercentageOfRevenue", label: "Bad Debt as % of Revenue", type: "number", value: "", unit: "%" },
    { id: "col_roi_totalAnnualRevenue", label: "Total Annual Revenue", type: "number", value: "", isCurrency: true },
  ],
  creditManagement: [
    { id: "crm_roi_numCreditAppsPerMonth", label: "New Credit Applications per Month", type: "number", value: "" },
    { id: "crm_roi_avgTimeToProcessCreditAppManualHrs", label: "Avg. Time to Process Credit App Manually", type: "number", value: "", unit: "hrs" },
    { id: "crm_roi_annualSalesLostDueToSlowCredit", label: "Annual Sales Lost (Slow Credit)", type: "number", value: "", isCurrency: true },
    { id: "crm_roi_costPerManualCreditReview", label: "Cost per Manual Credit Review", type: "number", value: "", isCurrency: true },
  ],
  claimsDeductions: [
    { id: "cd_roi_numClaimsDeductionsMonthly", label: "Claims/Deductions Monthly", type: "number", value: "" },
    { id: "cd_roi_avgTimePerClaimManualMins", label: "Avg. Time per Claim Manually", type: "number", value: "", unit: "mins" },
    { id: "cd_roi_percentageInvalidDeductionsUnrecovered", label: "% Invalid Deductions Unrecovered", type: "number", value: "", unit: "%" },
    { id: "cd_roi_avgValueInvalidDeduction", label: "Avg. Value of Invalid Deduction", type: "number", value: "", isCurrency: true },
  ],
  expenseManagement: [
    { id: "em_roi_numExpenseReportsMonthly", label: "Expense Reports Monthly", type: "number", value: "" },
    { id: "em_roi_avgTimeProcessReportManualMins", label: "Avg. Time to Process Report Manually", type: "number", value: "", unit: "mins" },
    { id: "em_roi_outOfPolicySpendPercentage", label: "Out-of-Policy Spend", type: "number", value: "", unit: "%" },
    { id: "em_roi_totalAnnualTAndESpend", label: "Total Annual T&E Spend", type: "number", value: "", isCurrency: true },
  ],
  procurement: [
    { id: "proc_roi_numPurchaseOrdersMonthly", label: "Purchase Orders Monthly", type: "number", value: "" },
    { id: "proc_roi_avgManualPOTimeMins", label: "Avg. Manual PO Time", type: "number", value: "", unit: "mins" },
    { id: "proc_roi_maverickSpendPercentage", label: "Maverick Spend", type: "number", value: "", unit: "%" },
    { id: "proc_roi_totalAnnualIndirectSpend", label: "Total Annual Indirect Spend", type: "number", value: "", isCurrency: true },
  ],
  invoiceDelivery: [
    { id: "id_roi_numInvoicesSentMonthly", label: "Invoices Sent Monthly", type: "number", value: "" },
    { id: "id_roi_percentagePaperInvoices", label: "Percentage of Paper Invoices", type: "number", value: "", unit: "%" },
    { id: "id_roi_costPerPaperInvoice", label: "Cost per Paper Invoice", type: "number", value: "", isCurrency: true },
    { id: "id_roi_timeSavedPerInvoiceElectronicMins", label: "Time Saved per Invoice (Electronic)", type: "number", value: "", unit: "mins" },
  ],
  supplierManagement: [
    { id: "sm_roi_numSuppliersOnboardedAnnually", label: "Suppliers Onboarded Annually", type: "number", value: "" },
    { id: "sm_roi_avgTimeOnboardSupplierManualHrs", label: "Avg. Time to Onboard Supplier Manually", type: "number", value: "", unit: "hrs" },
    { id: "sm_roi_costOfSupplierDataErrorsAnnual", label: "Annual Cost of Supplier Data Errors", type: "number", value: "", isCurrency: true },
    { id: "sm_roi_compliancePenaltyRiskCostAnnual", label: "Annual Compliance Penalty Risk Cost", type: "number", value: "", isCurrency: true },
  ],
  documentManagement: [
    { id: "dm_roi_numEmployeesUsingSystem", label: "Number of Employees Using System", type: "number", value: "" },
    { id: "dm_roi_avgTimeSearchingDocsPerUserHrsWeek", label: "Avg. Time Searching Docs per User", type: "number", value: "", unit: "hrs/week" },
    { id: "dm_roi_annualPhysicalStorageCost", label: "Annual Physical Storage Cost", type: "number", value: "", isCurrency: true },
    { id: "dm_roi_costOfNonComplianceAnnual", label: "Annual Cost of Non-Compliance (DM)", type: "number", value: "", isCurrency: true },
  ],
  workflowManagement: [
    { id: "wm_roi_numKeyWorkflowsTargeted", label: "Number of Key Workflows Targeted", type: "number", value: "" },
    { id: "wm_roi_avgInstancesPerWorkflowMonthly", label: "Avg. Instances per Workflow Monthly", type: "number", value: "" },
    { id: "wm_roi_avgManualTimeSavedPerInstanceHrs", label: "Avg. Manual Time Saved per Instance", type: "number", value: "", unit: "hrs" },
    { id: "wm_roi_currentErrorRateInManualWorkflowsPercentage", label: "Current Error Rate in Manual Workflows", type: "number", value: "", unit: "%" },
  ],
  processMapping: [
    { id: "pm_roi_numKeyProcessesToMap", label: "Number of Key Processes to Map", type: "number", value: "" },
    { id: "pm_roi_avgTimeToMapProcessManuallyHrs", label: "Avg. Time to Map Process Manually", type: "number", value: "", unit: "hrs" },
    { id: "pm_roi_annualCostProcessRelatedInefficiencies", label: "Annual Cost of Process Inefficiencies", type: "number", value: "", isCurrency: true },
    { id: "pm_roi_timeReductionForAuditsHrsPerYear", label: "Time Reduction for Audits", type: "number", value: "", unit: "hrs/year" },
  ],
  default: [
    { id: "def_roi_manualTaskTimeHrsWeekPTE", label: "Time Spent on Manual Task (hours/week per FTE)", type: "number", value: "" },
    { id: "def_roi_numEmployeesPerformingTask", label: "Number of FTEs Performing Task", type: "number", value: "" },
    { id: "def_roi_errorRateManualTaskPercentage", label: "Error rate in current manual task (%)", type: "number", value: "" },
    { id: "def_roi_avgTimeToCorrectErrorHrs", label: "Average time to correct an error (hours)", type: "number", value: "" },
  ]
};

export const HOURLY_RATE_DIVISOR = 2080;
export const AUTOMATION_TIME_SAVING_PERCENTAGE = 0.75; // Default saving percentage
export const AUTOMATION_ERROR_REDUCTION_PERCENTAGE = 0.80; // Default error reduction
