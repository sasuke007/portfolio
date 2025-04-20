const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Path to .env file
const envPath = path.resolve(__dirname, '../.env');

try {
  // Read current .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Get latest git commit hash
  const gitCommitHash = execSync('git rev-parse HEAD').toString().trim();
  
  // Get current branch name
  const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  
  // Update GIT_COMMIT_HASH in .env
  envContent = envContent.replace(
    /GIT_COMMIT_HASH=["'].*["']/,
    `GIT_COMMIT_HASH="${gitCommitHash}"`
  );
  
  // Update GIT_BRANCH in .env
  envContent = envContent.replace(
    /GIT_BRANCH=["'].*["']/,
    `GIT_BRANCH="${gitBranch}"`
  );
  
  // Write updated content back to .env
  fs.writeFileSync(envPath, envContent);
  
  console.log(`Updated .env with latest git info:`);
  console.log(`GIT_COMMIT_HASH="${gitCommitHash}"`);
  console.log(`GIT_BRANCH="${gitBranch}"`);
} catch (error) {
  console.error('Error updating git info in .env:', error);
  process.exit(1);
}