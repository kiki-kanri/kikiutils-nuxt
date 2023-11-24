export const randomAlphabeticString = (length: number = 8) => Array.from({ length }, () => String.fromCharCode((Math.random() > 0.5 ? 97 : 65) + Math.floor(Math.random() * 26))).join('');
export const randomLowerCaseAlphabeticString = (length: number = 8) => Array.from({ length }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
