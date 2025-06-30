

import { Module, ServiceType } from '../types'; // Renamed AutomationType to ServiceType

export const FINANCE_MODULES: Module[] = [
  { id: "accountsPayable", name: "Accounts Payable", technologyPartner: "Esker" },
  { id: "orderManagement", name: "Order Management", technologyPartner: "Esker" },
  { id: "customerInquiryManagement", name: "Customer Inquiry Management", technologyPartner: "Esker" },
  { id: "cashApplication", name: "Cash Application", technologyPartner: "Esker" },
  { id: "collectionManagement", name: "Collection Management", technologyPartner: "Esker" },
  { id: "creditManagement", name: "Credit Management", technologyPartner: "Esker" },
  { id: "claimsDeductions", name: "Claims & Deductions", technologyPartner: "Esker" },
  { id: "expenseManagement", name: "Expense Management", technologyPartner: "Esker" },
  { id: "procurement", name: "Procurement", technologyPartner: "Esker" },
  { id: "invoiceDelivery", name: "Invoice Delivery", technologyPartner: "Esker" },
  { id: "supplierManagement", name: "Supplier Management", technologyPartner: "Esker" },
];

export const BUSINESS_MODULES: Module[] = [
  { id: "documentManagement", name: "Document Management", technologyPartner: "M-Files" },
  { id: "workflowManagement", name: "Workflow Management", technologyPartner: "Nintex" },
  { id: "processMapping", name: "Process Mapping", technologyPartner: "Nintex" },
];

export const ITS_MODULES: Module[] = [
  { id: "managedITSupport", name: "Managed IT Support", technologyPartner: "Fujifilm Business Innovation" },
  { id: "cybersecurityServices", name: "Cybersecurity Services", technologyPartner: "Fujifilm Business Innovation" },
  { id: "cloudSolutions", name: "Cloud Solutions", technologyPartner: "Fujifilm Business Innovation" },
  { id: "networkServices", name: "Network Services", technologyPartner: "Fujifilm Business Innovation" },
  { id: "modernWorkplaceITS", name: "Modern Workplace ITS", technologyPartner: "Fujifilm Business Innovation" },
  { id: "itConsulting", name: "IT Consulting", technologyPartner: "Fujifilm Business Innovation" },
];

export const MODULES_BY_SERVICE_TYPE: Record<ServiceType, Module[]> = { // Renamed from MODULES_BY_AUTOMATION_TYPE
  [ServiceType.FINANCE]: FINANCE_MODULES,
  [ServiceType.BUSINESS]: BUSINESS_MODULES,
  [ServiceType.ITS]: ITS_MODULES,
};

export const ALL_MODULES: Module[] = [...FINANCE_MODULES, ...BUSINESS_MODULES, ...ITS_MODULES];
export const ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB: Module[] = ALL_MODULES;