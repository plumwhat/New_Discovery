
/**
 * Escapes HTML special characters in a string to prevent XSS.
 * @param unsafe - The potentially unsafe string.
 * @returns The escaped string.
 */
export const escapeHtml = (unsafe: string): string => {
    if (typeof unsafe !== 'string') return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
};

/**
 * Converts newline characters (\n, \r\n, etc.) in a string to HTML <br /> tags.
 * Handles existing <br> tags to avoid duplication.
 * @param str - The input string.
 * @returns The string with newlines converted to <br /> tags.
 */
export const nl2br = (str: string): string => {
    if (typeof str !== 'string') return '';
    const tempToken = '___TEMP_BR_TOKEN___';
    str = str.replace(/<br\s*\/?>/gi, tempToken);
    str = str.replace(/\r\n|\n\r|\r|\n/g, '<br />'); // Ensure all newline types are caught
    str = str.replace(new RegExp(tempToken, 'g'), '<br />');
    return str;
};

/**
 * Strips HTML tags from a string.
 * Converts <p>, <br>, and <li> tags to newlines/list markers for basic text structure.
 * Converts <h1>-<h6> to Markdown-like bold text.
 * @param html - The HTML string to strip.
 * @returns The plain text string with basic structure preserved.
 */
export const stripHtml = (html: string): string => {
    if (typeof html !== 'string') return '';
    // First, convert <p> and <br> to newlines for basic structure in text.
    let text = html.replace(/<p.*?>/gi, '\n').replace(/<\/p>/gi, '\n');
    text = text.replace(/<br\s*\/?>/gi, '\n');
    // Replace <li> with a newline and a dash for list items.
    text = text.replace(/<li>/gi, '\n- ').replace(/<\/li>/gi, '');
    // Replace <h4> with **text** for emphasis, then strip other tags.
    text = text.replace(/<h[1-6].*?>(.*?)<\/h[1-6]>/gi, '\n\n**$1**\n');
    // Strip all other HTML tags.
    text = text.replace(/<[^>]+>/g, '');
    // Clean up: remove leading/trailing whitespace, multiple newlines.
    text = text.replace(/&nbsp;/gi, ' ');
    text = text.replace(/\n\s*\n/g, '\n\n'); // Reduce multiple newlines to two
    return text.trim();
};

/**
 * Generates a standard RFC4122 version 4 compliant UUID.
 * This is a cross-browser compatible way to generate unique identifiers.
 * @returns A new UUID string.
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
