

import React, { useState, useEffect, useRef } from 'react';
import { ALL_MODULES, MODULE_INFOGRAPHICS_HTML } from '../../constants';
import { ChevronDownIcon, ChevronRightIcon } from './Icons';

declare global {
  interface Window {
    Chart?: any; 
    initializeOrderManagementCharts?: () => void; // For OM Infographic
    initializeAPCharts?: () => void; // For AP Infographic
    // Add other potential global init functions here if needed
  }
}
declare var Chart: any;


interface ModuleInfographicProps {
  moduleId: string | null;
}

const ModuleInfographic: React.FC<ModuleInfographicProps> = ({ moduleId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const infographicContent = moduleId ? MODULE_INFOGRAPHICS_HTML[moduleId] : null;
  const contentRef = useRef<HTMLDivElement>(null);
  const scriptsExecutedRef = useRef(false); // To prevent re-executing scripts on every render if expanded

  useEffect(() => {
    if (isExpanded && infographicContent && contentRef.current && !scriptsExecutedRef.current) {
      const container = contentRef.current;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = infographicContent; // Parse the HTML string

      const scriptsToExecute: HTMLScriptElement[] = [];
      const chartJsScriptTags = Array.from(tempDiv.getElementsByTagName('script')).filter(
        (script) => script.src.includes('chart.js')
      );
      const inlineScriptTags = Array.from(tempDiv.getElementsByTagName('script')).filter(
        (script) => !script.src && script.textContent // Inline scripts
      );
      
      let chartJsLoaded = !!window.Chart;

      const executeInlineScripts = () => {
        inlineScriptTags.forEach((scriptTag) => {
          const scriptContent = scriptTag.textContent || "";
          try {
            if (scriptContent.includes("initializeOrderManagementCharts")) {
                 window.initializeOrderManagementCharts?.();
            } else if (scriptContent.includes("initializeAPCharts")) {
                 window.initializeAPCharts?.();
            } else { // Fallback for other inline scripts that might not follow the pattern
                // This is a basic way to re-execute; might need refinement for complex scripts
                const newScript = document.createElement('script');
                newScript.textContent = scriptContent;
                document.body.appendChild(newScript).remove();
            }

          } catch (e) {
            console.error("Error executing inline script from infographic:", scriptContent, e);
          }
        });
        scriptsExecutedRef.current = true; // Mark as executed for this content load
      };

      if (!chartJsLoaded && chartJsScriptTags.length > 0) {
        const chartJsUrl = chartJsScriptTags[0].src;
        let existingChartScript = document.querySelector(`script[src="${chartJsUrl}"]`);
        
        if (!existingChartScript) {
            const chartLibScript = document.createElement('script');
            chartLibScript.src = chartJsUrl;
            chartLibScript.async = true;
            chartLibScript.onload = () => {
              console.log("Chart.js loaded dynamically for infographic.");
              window.Chart = Chart; 
              executeInlineScripts();
            };
            chartLibScript.onerror = () => {
                console.error("Failed to load Chart.js dynamically for infographic.");
            };
            document.head.appendChild(chartLibScript);
        } else if (window.Chart) { 
             executeInlineScripts();
        } else { 
            const handleLoad = () => {
                console.log("Chart.js (already in DOM) finished loading for infographic.");
                executeInlineScripts();
            };
            existingChartScript.addEventListener('load', handleLoad);
            existingChartScript.addEventListener('error', () => console.error("Error for existing Chart.js script."));
        }

      } else if (chartJsLoaded) {
        executeInlineScripts();
      } else {
        console.warn('Chart.js library script not found in infographic HTML and not globally available. Charts may not render.');
        executeInlineScripts(); 
      }
    }

    if (!isExpanded || !infographicContent) {
        scriptsExecutedRef.current = false;
    }

  }, [isExpanded, infographicContent]);

  if (!infographicContent) {
    return (
        <div className="my-4 p-4 border border-gray-200 rounded-lg bg-gray-50 print:hidden">
            <p className="text-sm text-gray-500">
                Visual infographic for this module is not available or a module is not selected.
            </p>
        </div>
    );
  }

  return (
    <div className="my-6 print:hidden"> 
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-expanded={isExpanded}
        aria-controls={`infographic-content-${moduleId}`}
      >
        <span className="text-lg font-semibold text-gray-700">
          {isExpanded ? 'Hide' : 'Show'} Module Insights & Benefits Infographic for {ALL_MODULES.find(m=>m.id === moduleId)?.name || 'Selected Module'}
        </span>
        {isExpanded ? <ChevronDownIcon className="w-6 h-6 text-gray-600" /> : <ChevronRightIcon className="w-6 h-6 text-gray-600" />}
      </button>
      {isExpanded && (
        <div
          id={`infographic-content-${moduleId}`}
          className="mt-2 p-0 border border-gray-300 rounded-md overflow-hidden"
        >
          <div className="infographic-wrapper bg-white" ref={contentRef}> 
            <div dangerouslySetInnerHTML={{ __html: infographicContent }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleInfographic;
