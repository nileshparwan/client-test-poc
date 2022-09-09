const { execSync } = require('child_process');
const fs = require('fs');
const fetch = require('sync-fetch');

console.log("Test Analysis Running");

const getTestNumbers = () => {
  try {
    let rawdata = fs.readFileSync('./analysis-results.json');
    let analysisResults = JSON.parse(rawdata);
    const { numFailedTests, numPassedTests, numTotalTests } = analysisResults;
    return ({ numTotalTests, numPassedTests, numFailedTests });
  } catch (_) {
    return;
  }
}

const getGithubUserNameFromPipeline = () => {
  try {
    let rawdata = fs.readFileSync('./user-info.json');
    let userInfo = JSON.parse(rawdata);
    const { user } = userInfo;
    return user;
  } catch (_) {
    return;
  }
}

const getGithubData = (user) => {
  try {
    const gitHubdata = fetch(`https://api.github.com/users/${user}`).json();
    const { avatar_url, name, html_url } = gitHubdata;
    return ({
      avatar_url,
      name,
      html_url
    });
  } catch (_) {
    return;
  }
}

const publishTestNumbers = ({
  numTotalTests,
  numPassedTests,
  numFailedTests
}, {
  avatar_url,
  name,
  html_url
}, 
user) => {
  console.log("user", user);
  console.log("name", name);
  console.log("html_url", html_url);
  console.log("avatar_url", avatar_url);
  console.log("numTotalTests", numTotalTests);
  console.log("numPassedTests", numPassedTests);
  console.log("numFailedTests", numFailedTests);
}

try {
  execSync("npm run test-json");
} catch (error) {
  console.error("Test Suite Failed", error);
} finally {
  const testNumbers = getTestNumbers();
  const user = getGithubUserNameFromPipeline();
  if (user && testNumbers) {
    const userData =  getGithubData(user);
    if (userData) publishTestNumbers(testNumbers, userData, user);
  }
}

console.log("Test Analysis Run Ended");