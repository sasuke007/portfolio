const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Path to .env file
const envPath = path.resolve(__dirname, '../.env');

try {
  // Get latest git commit hash
  const gitCommitHash = execSync('git rev-parse HEAD').toString().trim();
  
  // Get current branch name
  const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  
  // Check if .env file exists
  if (fs.existsSync(envPath)) {
    // Read current .env file
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Update GIT_COMMIT_HASH in .env
    if (envContent.includes('GIT_COMMIT_HASH=')) {
      envContent = envContent.replace(
        /GIT_COMMIT_HASH=["'].*["']|GIT_COMMIT_HASH=.*/,
        `GIT_COMMIT_HASH="${gitCommitHash}"`
      );
    } else {
      // Add it if it doesn't exist
      envContent += `\nGIT_COMMIT_HASH="${gitCommitHash}"`;
    }
    
    // Update GIT_BRANCH in .env
    if (envContent.includes('GIT_BRANCH=')) {
      envContent = envContent.replace(
        /GIT_BRANCH=["'].*["']|GIT_BRANCH=.*/,
        `GIT_BRANCH="${gitBranch}"`
      );
    } else {
      // Add it if it doesn't exist
      envContent += `\nGIT_BRANCH="${gitBranch}"`;
    }
    
    // Write updated content back to .env
    fs.writeFileSync(envPath, envContent);
    
    console.log(`Updated .env with latest git info:`);
  } else {
    console.log(`.env file not found. Creating environment variables in memory only.`);
  }
  
  // Always log the values that would be used
  console.log(`GIT_COMMIT_HASH="${gitCommitHash}"`);
  console.log(`GIT_BRANCH="${gitBranch}"`);
} catch (error) {
  console.error('Warning: Could not update git info:', error.message);
  // Don't exit with error code, just continue
}