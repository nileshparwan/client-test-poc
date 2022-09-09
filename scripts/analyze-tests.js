const { execSync } = require('child_process');
const fs = require('fs');
const fetch = (...args) => { 
  import('node-fetch')
  .then(
    ({default: fetch}) => fetch(...args)
  );
}

console.log("Test Analysis Running");

const getTestNumbers = () => {
  let rawdata = fs.readFileSync('./analysis-results.json');
  let analysisResults = JSON.parse(rawdata);
  const { numFailedTests, numPassedTests, numTotalTests } = analysisResults;
  return ({ numTotalTests, numPassedTests, numFailedTests });
}

const getGithubUserName = () => {
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
  console.log("user", user);
  console.log("numTotalTests", numTotalTests);
  console.log("numPassedTests", numPassedTests);
  console.log("numFailedTests", numFailedTests);
  fetch(`https://api.github.com/users/${user}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
}

try {
  execSync("npm run test-json");
} catch (error) {
  console.error("Test Suite Failed", error);
} finally {
  const testNumbers = getTestNumbers();
  const user = getGithubUserName();
  if (testNumbers && user) {
    publishTestNumbers(testNumbers, user);
  }
}

console.log("Test Analysis Run Ended");