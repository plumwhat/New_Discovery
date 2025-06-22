
/**
 * Formats a numerical value as a currency string (e.g., $1,234).
 * Handles undefined, null, or NaN values by returning a default string or $0 for zero.
 *
 * @param value - The numerical value to format.
 * @param defaultValue - The string to return if the value is undefined, null, or NaN (and not 0). Defaults to 'N/A'.
 * @returns The formatted currency string.
 */
export const formatCurrency = (value: number | undefined | null, defaultValue: string = 'N/A'): string => {
    if (value === undefined || value === null || isNaN(value)) {
        // For ROI display, we might prefer to show $0 or an empty string for invalid/zero inputs rather than N/A.
        // However, for a generic utility, 'N/A' or allowing defaultValue is fine.
        // Let's adjust for typical display expectations in ROI (e.g. $0 for 0).
        if (value === 0) return '$0';
        if (value === undefined || value === null || isNaN(value)) return defaultValue;
    }
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

/**
 * Generates a display string for the payback period based on calculated months and other ROI factors.
 * Handles cases like instant payback, no payback within lifespan, or N/A.
 *
 * @param paybackPeriodMonths - The calculated payback period in months. Can be Infinity or NaN.
 * @param solutionLifespanYears - The lifespan of the solution in years.
 * @param totalNetBenefitOverLifespan - The total net benefit over the solution's lifespan.
 * @param totalInvestmentOverLifespan - The total investment over the solution's lifespan.
 * @param totalAnnualGrossSavings - The total annual gross savings.
 * @returns A user-friendly string representing the payback period.
 */
export const getPaybackPeriodDisplay = (paybackPeriodMonths: number, solutionLifespanYears: number, totalNetBenefitOverLifespan: number, totalInvestmentOverLifespan: number, totalAnnualGrossSavings: number): string => {
    if (isFinite(paybackPeriodMonths)) {
        if (paybackPeriodMonths < 0) return 'Instant'; // Or handle negative payback as per business logic, usually implies error or instant.
        return `${paybackPeriodMonths.toFixed(1)} Months`;
    } else if (totalNetBenefitOverLifespan <= 0 && totalInvestmentOverLifespan > 0) {
        return 'N/A (No Payback)';
    } else if (totalInvestmentOverLifespan === 0 && totalAnnualGrossSavings > 0) {
        return 'Instant';
    } else if (totalInvestmentOverLifespan === 0 && totalAnnualGrossSavings === 0) {
        return 'N/A';
    } else { // This implies paybackPeriodMonths is Infinity and not covered by above specific N/A or Instant cases
        return `> ${solutionLifespanYears * 12} Months`;
    }
};