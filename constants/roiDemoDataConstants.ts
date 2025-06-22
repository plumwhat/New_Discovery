
import { RoiModuleState } from '../types';

type DemoRoiInputData = Pick<RoiModuleState, 'annualSalary' | 'annualSoftwareCost' | 'upfrontProfServicesCost' | 'solutionLifespanYears' | 'inputs'>;

export const ROI_DEMO_DATA: Record<string, DemoRoiInputData> = {
  accountsPayable: {
    annualSalary: 65000,
    annualSoftwareCost: 15000,
    upfrontProfServicesCost: 7500,
    solutionLifespanYears: 3,
    inputs: {
      ap_roi_numInvoicesPerMonth: 5000,
      ap_roi_avgManualProcessingTimePerInvoiceMins: 8,
      ap_roi_currentInvoiceErrorRatePercentage: 5,
      ap_roi_avgTimeToResolveExceptionMins: 30,
      ap_roi_annualValueMissedEarlyPaymentDiscounts: 10000,
      ap_roi_annualCostPhysicalInvoiceStorage: 2000,
      ap_roi_numFTEs: 5,
    },
  },
  orderManagement: {
    annualSalary: 60000,
    annualSoftwareCost: 12000,
    upfrontProfServicesCost: 6000,
    solutionLifespanYears: 3,
    inputs: {
      om_roi_numSalesOrdersPerMonth: 3000,
      om_roi_avgManualOrderEntryTimeMins: 10,
      om_roi_currentOrderErrorRatePercentage: 7,
      om_roi_avgCostToReworkOrderError: 25,
      om_roi_numFTEs: 4,
    },
  },
  managedITSupport: {
    annualSalary: 70000, // Avg salary of IT support staff or blended user salary
    annualSoftwareCost: 20000, // Cost of managed service or enabling tools
    upfrontProfServicesCost: 10000, // Setup/migration/consulting
    solutionLifespanYears: 3,
    inputs: {
      ms_roi_numUsers: 200,
      ms_roi_currentITStaffCount: 3, // FTEs currently handling support
      ms_roi_avgDowntimeHoursPerMonth: 10,
      ms_roi_costPerHourOfDowntime: 1000,
      ms_roi_userProductivityLossPercentage: 5,
    },
  },
  cybersecurityServices: {
    annualSalary: 80000, // Blended salary for relevant employees
    annualSoftwareCost: 30000, // Cost of security services/tools
    upfrontProfServicesCost: 15000, // Implementation, assessment costs
    solutionLifespanYears: 3,
    inputs: {
      cs_roi_numEmployees: 200,
      cs_roi_estimatedAnnualBreachCost: 500000,
      cs_roi_currentAnnualSecuritySpend: 50000,
      cs_roi_complianceFineRiskValue: 100000,
      cs_roi_securityFTEs: 2, // Current security FTEs
    },
  },
  // ... other existing demo data ...
  customerInquiryManagement: {
    annualSalary: 55000,
    annualSoftwareCost: 8000,
    upfrontProfServicesCost: 4000,
    solutionLifespanYears: 3,
    inputs: {
      cim_roi_numInquiriesPerMonth: 2000,
      cim_roi_avgHandleTimePerInquiryMins: 12,
      cim_roi_repeatInquiryRatePercentage: 15,
      cim_roi_costToResolveRepeatInquiry: 10,
    },
  },
  cashApplication: {
    annualSalary: 62000,
    annualSoftwareCost: 9000,
    upfrontProfServicesCost: 4500,
    solutionLifespanYears: 3,
    inputs: {
      ca_roi_numRemittancesPerMonth: 1500,
      ca_roi_avgManualMatchRatePercentage: 60, 
      ca_roi_timePerUnmatchedRemittanceMins: 15,
      ca_roi_annualBankFeesForManualProcessing: 5000,
    },
  },
  collectionManagement: {
    annualSalary: 68000,
    annualSoftwareCost: 10000,
    upfrontProfServicesCost: 5000,
    solutionLifespanYears: 3,
    inputs: {
      col_roi_numOverdueInvoicesManagedMonthly: 500,
      col_roi_avgCollectorTimePerInvoiceMins: 20,
      col_roi_badDebtPercentageOfRevenue: 1.5,
      col_roi_totalAnnualRevenue: 10000000,
    },
  },
  creditManagement: {
    annualSalary: 70000,
    annualSoftwareCost: 7000,
    upfrontProfServicesCost: 3500,
    solutionLifespanYears: 3,
    inputs: {
      crm_roi_numCreditAppsPerMonth: 100,
      crm_roi_avgTimeToProcessCreditAppManualHrs: 2,
      crm_roi_annualSalesLostDueToSlowCredit: 50000,
      crm_roi_costPerManualCreditReview: 15,
    },
  },
  claimsDeductions: {
    annualSalary: 63000,
    annualSoftwareCost: 8500,
    upfrontProfServicesCost: 4250,
    solutionLifespanYears: 3,
    inputs: {
      cd_roi_numClaimsDeductionsMonthly: 200,
      cd_roi_avgTimePerClaimManualMins: 45,
      cd_roi_percentageInvalidDeductionsUnrecovered: 20,
      cd_roi_avgValueInvalidDeduction: 150,
    },
  },
  expenseManagement: {
    annualSalary: 75000, 
    annualSoftwareCost: 6000,
    upfrontProfServicesCost: 3000,
    solutionLifespanYears: 3,
    inputs: {
      em_roi_numExpenseReportsMonthly: 300,
      em_roi_avgTimeProcessReportManualMins: 25,
      em_roi_outOfPolicySpendPercentage: 5,
      em_roi_totalAnnualTAndESpend: 500000,
    },
  },
  procurement: {
    annualSalary: 72000,
    annualSoftwareCost: 18000,
    upfrontProfServicesCost: 9000,
    solutionLifespanYears: 3,
    inputs: {
      proc_roi_numPurchaseOrdersMonthly: 400,
      proc_roi_avgManualPOTimeMins: 30,
      proc_roi_maverickSpendPercentage: 10,
      proc_roi_totalAnnualIndirectSpend: 2000000,
    },
  },
  invoiceDelivery: {
    annualSalary: 58000,
    annualSoftwareCost: 5000,
    upfrontProfServicesCost: 2500,
    solutionLifespanYears: 3,
    inputs: {
      id_roi_numInvoicesSentMonthly: 2500,
      id_roi_percentagePaperInvoices: 60,
      id_roi_costPerPaperInvoice: 1.50,
      id_roi_timeSavedPerInvoiceElectronicMins: 3,
    },
  },
  supplierManagement: {
    annualSalary: 67000,
    annualSoftwareCost: 7500,
    upfrontProfServicesCost: 3750,
    solutionLifespanYears: 3,
    inputs: {
      sm_roi_numSuppliersOnboardedAnnually: 50,
      sm_roi_avgTimeOnboardSupplierManualHrs: 5,
      sm_roi_costOfSupplierDataErrorsAnnual: 15000,
      sm_roi_compliancePenaltyRiskCostAnnual: 8000,
    },
  },
  documentManagement: {
    annualSalary: 60000,
    annualSoftwareCost: 10000,
    upfrontProfServicesCost: 5000,
    solutionLifespanYears: 3,
    inputs: {
      dm_roi_numEmployeesUsingSystem: 100,
      dm_roi_avgTimeSearchingDocsPerUserHrsWeek: 3,
      dm_roi_annualPhysicalStorageCost: 1000,
      dm_roi_costOfNonComplianceAnnual: 20000,
    },
  },
  workflowManagement: {
    annualSalary: 70000,
    annualSoftwareCost: 12000,
    upfrontProfServicesCost: 6000,
    solutionLifespanYears: 3,
    inputs: {
      wm_roi_numKeyWorkflowsTargeted: 5,
      wm_roi_avgInstancesPerWorkflowMonthly: 100,
      wm_roi_avgManualTimeSavedPerInstanceHrs: 1.5,
      wm_roi_currentErrorRateInManualWorkflowsPercentage: 8,
    },
  },
  processMapping: {
    annualSalary: 75000,
    annualSoftwareCost: 5000,
    upfrontProfServicesCost: 2500,
    solutionLifespanYears: 3,
    inputs: {
      pm_roi_numKeyProcessesToMap: 10,
      pm_roi_avgTimeToMapProcessManuallyHrs: 20,
      pm_roi_annualCostProcessRelatedInefficiencies: 75000,
      pm_roi_timeReductionForAuditsHrsPerYear: 40,
    },
  },
  default: {
    annualSalary: 60000,
    annualSoftwareCost: 7000,
    upfrontProfServicesCost: 3500,
    solutionLifespanYears: 3,
    inputs: {
      def_roi_manualTaskTimeHrsWeekPTE: 5,
      def_roi_numEmployeesPerformingTask: 10,
      def_roi_errorRateManualTaskPercentage: 10,
      def_roi_avgTimeToCorrectErrorHrs: 0.5,
    },
  }
};
