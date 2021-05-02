/**
 *  santize the passed string with the passed regex key
 *
 * @param {TRegularExpressionKeys} regex  choose from regular expression keys
 * @param {string} value to be sanitized
 * @returns {string} sanitized string
 */
export const sanitize = (regex: TRegularExpressionKeys, value: string): string => {
    const regularExpression = regularExpressions[regex];
    return value.replaceAll(regularExpression, '');
};

const infertTypesFromObject = <T extends { [key: string]: RegExp }>(arg: T): T => arg; // Infering types from Route object with autocomplete support.
export type TRegularExpressionKeys = keyof typeof regularExpressions;
/**
 * collction regular expressions
 */
export const regularExpressions = infertTypesFromObject({
    onlyAllowAlphaNumeric: /[^a-zA-Z0-9\s]/g,
    removeAllSpaces: /[\s]/g,
    onlyAllowAlphabets: /[^a-zA-Z\s]/g,
});
