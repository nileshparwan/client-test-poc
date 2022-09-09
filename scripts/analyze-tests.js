const { execSync } = require('child_process');

console.log("Test Analysis Running");

try {
  execSync("npm run test");
} catch (error) {
  console.error(error);
}