
import React, { useState, useEffect, useRef } from 'react';
import { ALL_MODULES } from '../../constants/moduleConstants';
import { MODULE_INFOGRAPHICS_HTML } from '../../constants/infographicConstants';
import { ChevronDownIcon, ChevronRightIcon, InformationCircleIcon } from './Icons';

// Add all module-specific chart initializer function types here
declare global {
  interface Window {
    Chart?: any; 
    initializeOrderManagementCharts?: () => void;
    initializeAccountsPayableCharts?: () => void;
    initializeDocumentManagementCharts?: () => void;
    initializeWorkflowManagementCharts?: () => void;
    initializeProcessMappingCharts?: () => void;
    initializeSupplierManagementCharts?: () => void;
    initializeCollectionManagementCharts?: () => void;
    initializeCustomerInquiryManagementCharts?: () => void;
    initializeCashApplicationCharts?: () => void;
    initializeCreditManagementCharts?: () => void;
    initializeClaimsDeductionsCharts?: () => void;
    initializeExpenseManagementCharts?: () => void;
    initializeProcurementCharts?: () => void;
    initializeInvoiceDeliveryCharts?: () => void;
    // ITS Modules
    initializeManagedITSupportCharts?: () => void; 
    initializeCybersecurityServicesCharts?: () => void; 
    initializeCloudSolutionsCharts?: () => void;
    initializeNetworkServicesCharts?: () => void;
    initializeModernWorkplaceITSCharts?: () => void;
    initializeITConsultingCharts?: () => void;
    // Generic Fallback (if used dynamically)
    [key: `initialize${string}Charts`]: (() => void) | undefined;
  }
}

interface ModuleInfographicProps {
  moduleId: string | null;
}

export const ModuleInfographic: React.FC<ModuleInfographicProps> = ({ moduleId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const module = moduleId ? ALL_MODULES.find(m => m.id === moduleId) : null;
  const infographicContent = moduleId ? MODULE_INFOGRAPHICS_HTML[moduleId] : null;
  const contentRef = useRef<HTMLDivElement>(null);
  const scriptsExecutedRef = useRef(false);
  const chartJsLibRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const executeSpecificChartsInitializer = (attempt = 1) => {
        if (!moduleId) return;

        if (typeof window.Chart === 'undefined') {
            if (attempt < 5) { 
                console.warn(`ModuleInfographic: Chart.js not ready for ${moduleId}. Retrying (Attempt ${attempt}).`);
                setTimeout(() => executeSpecificChartsInitializer(attempt + 1), 300 * attempt);
            } else {
                console.error(`ModuleInfographic: Chart.js failed to initialise after ${attempt} attempts for ${moduleId}. Charts may not render.`);
            }
            return;
        }
        console.log(`ModuleInfographic: Chart.js is ready for ${moduleId}. Attempting to initialise charts.`);

        const pascalCaseModuleId = moduleId.charAt(0).toUpperCase() + moduleId.slice(1).replace(/[^a-zA-Z0-9]/g, '');
        const initializerFunctionName = `initialize${pascalCaseModuleId}Charts`;
        
        const initializerFunction = window[initializerFunctionName];

        if (typeof initializerFunction === 'function') {
            try {
                initializerFunction();
                console.log(`ModuleInfographic: Successfully called ${initializerFunctionName} for ${moduleId}.`);
            } catch (e) {
                console.error(`ModuleInfographic: Error executing ${initializerFunctionName} for ${moduleId}:`, e);
            }
        } else {
            console.warn(`ModuleInfographic: Chart initialiser function '${initializerFunctionName}' NOT FOUND on window object for module ID: ${moduleId}. This could be due to a script error in the infographic HTML or a naming mismatch.`);
        }
        scriptsExecutedRef.current = true;
    };
    
    if (isExpanded && infographicContent && contentRef.current && !scriptsExecutedRef.current) {
      console.log(`ModuleInfographic: Expanding and attempting to initialise scripts for ${moduleId}`);
      
      if (typeof window.Chart === 'undefined') {
        if (!chartJsLibRef.current) {
            console.log('ModuleInfographic: Chart.js not found. Loading Chart.js dynamically...');
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
            script.async = true;
            script.onload = () => {
                console.log('ModuleInfographic: Chart.js loaded successfully.');
                if(chartJsLibRef.current) chartJsLibRef.current.dataset.loaded = "true";
                executeSpecificChartsInitializer();
            };
            script.onerror = () => {
                console.error('ModuleInfographic: Failed to load Chart.js.');
            };
            document.body.appendChild(script);
            chartJsLibRef.current = script;
        } else if (chartJsLibRef.current.dataset.loaded === "true") {
             console.log('ModuleInfographic: Chart.js script tag exists and was loaded. Initializing module charts.');
            executeSpecificChartsInitializer();
        } else {
             console.log('ModuleInfographic: Chart.js script tag exists but still loading. Waiting for onload.');
        }
      } else {
        console.log('ModuleInfographic: Chart.js already available globally. Initializing module charts.');
        executeSpecificChartsInitializer();
      }
    } else if (!isExpanded) {
        scriptsExecutedRef.current = false; 
    }

    return () => {
      // Basic cleanup, more robust script management might be needed for multiple instances
      // if (chartJsLibRef.current && chartJsLibRef.current.parentNode === document.body && !window.Chart) {
      //    console.log("ModuleInfographic: Cleanup - Chart.js script potentially removed if not globally loaded.");
      // }
    };

  }, [isExpanded, infographicContent, moduleId]);

  if (!moduleId) {
    return null; 
  }
  
  return (
    <div className="mt-6 mb-6 pt-4 border-t border-gray-200 print-hidden">
      <button
        onClick={() => {
          if (!isExpanded) { 
            scriptsExecutedRef.current = false;
          }
          setIsExpanded(!isExpanded);
        }}
        className="flex items-center justify-between w-full text-left text-gray-700 hover:text-[#01916D] focus:outline-none py-2"
        aria-expanded={isExpanded}
        aria-controls={`infographic-${moduleId}-content`}
      >
        <span className="text-md font-semibold flex items-center">
          <InformationCircleIcon className="w-5 h-5 mr-2 text-[#01916D]" />
          Module Insights: {module?.name || 'Details'}
        </span>
        {isExpanded ? <ChevronDownIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
      </button>
      {isExpanded && infographicContent && (
        <div 
          id={`infographic-${moduleId}-content`}
          ref={contentRef}
          className="mt-2 p-2 md:p-4 border border-gray-200 rounded-md bg-white shadow-sm infographic-body-wrapper print:shadow-none print:border-none overflow-hidden"
          dangerouslySetInnerHTML={{ __html: infographicContent }}
        />
      )}
       {isExpanded && !infographicContent && (
        <div className="mt-2 p-4 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-500">
            No specific visual insights available for the "{module?.name}" module at this time.
        </div>
      )}
    </div>
  );
};
