
import { Role, ServiceType } from '../types'; // Renamed AutomationType to ServiceType

export const APP_TITLE = "Process Automation";
export const APP_SUBTITLE = "Engagement Platform";
export const RESELLER_COMPANY_NAME = "Your Reseller Company Name";
export const FOOTER_COPYRIGHT_OWNER = "Brad Whatman";

export const ROLES: Role[] = [Role.PRESALES, Role.SALES, Role.CSM, Role.SAD]; 
export const SERVICE_TYPES: ServiceType[] = [ServiceType.FINANCE, ServiceType.BUSINESS, ServiceType.ITS]; // Renamed from AUTOMATION_TYPES and added ITS
