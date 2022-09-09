const { execSync } = require('child_process');
const fs = require('fs');

console.log("Test Analysis Running");

const getTestNumbers = () => {
  let rawdata = fs.readFileSync('./analysis-results.json');
  let analysisResults = JSON.parse(rawdata);
  const { numFailedTests, numPassedTests, numTotalTests } = analysisResults;
  return ({ numTotalTests, numPassedTests, numFailedTests });
}

const getGithubuserName = () => {
  let rawdata = fs.readFileSync('./user-info.json');
  let userInfo = JSON.parse(rawdata);
  const { user } = userInfo;
  if (user) {
    return user;
  }
  return;
}

const publishTestNumbers = ({
  numTotalTests,
  numPassedTests,
  numFailedTests
}, user) => {
  // todo
}

try {
  execSync("npm run test-json");
} catch (error) {
  console.error("Test Suite Failed", error);
} finally {
  const testNumbers = getTestNumbers();
  const user = getGithubuserName();
  publishTestNumbers(testNumbers, user);
}

console.log("Test Analysis Run Ended");