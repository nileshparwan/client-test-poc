const { execSync } = require('child_process');
const fs = require('fs');

console.log("Test Analysis Running");

const getTestNumbers = () => {
  let rawdata = fs.readFileSync('./analysis-results.json');
  let analysisResults = JSON.parse(rawdata);
  const { numFailedTests, numPassedTests, numTotalTests } = analysisResults;
  return ({ numTotalTests, numPassedTests, numFailedTests });
}

const publishTestNumbers = ({
  numTotalTests,
  numPassedTests,
  numFailedTests
}) => {
  // todo
}

try {
  execSync("npm run test-json");
} catch (error) {
  console.error("Test Suite Failed", error);
} finally {
  const testNumbers = getTestNumbers();
  publishTestNumbers(testNumbers);
}

console.log("Test Analysis Run Ended");