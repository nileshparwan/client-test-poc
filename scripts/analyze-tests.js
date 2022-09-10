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

const verifyIfUserExist = (user) => {
  const gitUserData = fetch(`https://api-test-poc-1.herokuapp.com/devs/${user}`).json();
  if (gitUserData.length === 0) {
    return false;
  }
  return true;
}
const createNewUser = (data) => {
  fetch('https://api-test-poc-1.herokuapp.com/devs/', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  });
  console.log("Data Created");
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
  try {
    const pushData = {
      user,
      name,
      html_url,
      avatar_url,
      numTotalTests,
      numPassedTests,
      numFailedTests
    }
    console.log("pushData", pushData);
    // todo
  } catch (_) {
    return;
  }
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