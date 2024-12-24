// Define blacklists for various programming languages
const validatePython: string[] = [
  "import os",
  "import subprocess",
  "from os import",
  "from subprocess import",
];

const validateCpp: string[] = ["popen", "fork", "system(", "unistd.h"];

const validateC: string[] = ["fork", "system("];

const validateJava: string[] = [
  "Process",
  "getRuntime()",
  "exec(",
  "ProcessBuilder",
  "start()",
];

/**
 * Validates the provided code by checking for blacklisted keywords.
 * @param code - The source code to validate.
 * @param blacklist - An array of blacklisted keywords specific to a programming language.
 * @returns True if the code passes validation, false if it contains blacklisted content.
 */
const validate = (code: string, blacklist: string[]): boolean => {
  const containsMaliciousContent = blacklist.some((keyword) => {
    if (code.includes(keyword)) {
      console.log("This code contains malicious content");
      return true;
    }
    return false;
  });

  return !containsMaliciousContent;
};


// Export the validate function and blacklists
export {
  validate,
  validatePython,
  validateCpp,
  validateC,
  validateJava,
};
