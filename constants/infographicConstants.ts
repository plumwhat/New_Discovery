
import { MODULE_INFOGRAPHICS_HTML_BASE, getDefaultPlaceholderInfographicHtml } from '../services/infographicsContent';
import { ALL_MODULES } from './moduleConstants';

// Construct the final MODULE_INFOGRAPHICS_HTML here
export const MODULE_INFOGRAPHICS_HTML: Record<string, string> = { ...MODULE_INFOGRAPHICS_HTML_BASE };
ALL_MODULES.forEach(module => {
    if (!MODULE_INFOGRAPHICS_HTML[module.id]) {
        MODULE_INFOGRAPHICS_HTML[module.id] = getDefaultPlaceholderInfographicHtml(module.name, module.technologyPartner || "Leading Technology");
    }
});
