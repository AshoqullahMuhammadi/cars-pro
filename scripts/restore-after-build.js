const fs = require('fs');
const path = require('path');

// This script restores API routes and admin pages after static build

const tempDir = path.join(process.cwd(), '.temp-exclude');
const apiDir = path.join(process.cwd(), 'src', 'app', 'api');
const adminDir = path.join(process.cwd(), 'src', 'app', 'admin');
const signinDir = path.join(process.cwd(), 'src', 'app', 'signin');
const middlewareFile = path.join(process.cwd(), 'src', 'middleware.ts');

// Restore API routes
const tempApiDir = path.join(tempDir, 'api');
if (fs.existsSync(tempApiDir)) {
  if (fs.existsSync(apiDir)) {
    fs.rmSync(apiDir, { recursive: true, force: true });
  }
  fs.renameSync(tempApiDir, apiDir);
  console.log('✅ Restored API routes');
}

// Restore admin pages
const tempAdminDir = path.join(tempDir, 'admin');
if (fs.existsSync(tempAdminDir)) {
  if (fs.existsSync(adminDir)) {
    fs.rmSync(adminDir, { recursive: true, force: true });
  }
  fs.renameSync(tempAdminDir, adminDir);
  console.log('✅ Restored admin pages');
}

// Restore signin page
const tempSigninDir = path.join(tempDir, 'signin');
if (fs.existsSync(tempSigninDir)) {
  if (fs.existsSync(signinDir)) {
    fs.rmSync(signinDir, { recursive: true, force: true });
  }
  fs.renameSync(tempSigninDir, signinDir);
  console.log('✅ Restored signin page');
}

// Restore middleware
const tempMiddleware = path.join(tempDir, 'middleware.ts');
if (fs.existsSync(tempMiddleware)) {
  fs.renameSync(tempMiddleware, middlewareFile);
  console.log('✅ Restored middleware');
}

// Clean up temp directory
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log('✅ Cleaned up temp directory');
}

console.log('✅ Restoration complete');

