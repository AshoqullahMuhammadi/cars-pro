const fs = require('fs');
const path = require('path');

// This script prepares the project for static export by temporarily moving
// API routes and admin pages that can't be statically exported

const apiDir = path.join(process.cwd(), 'src', 'app', 'api');
const adminDir = path.join(process.cwd(), 'src', 'app', 'admin');
const signinDir = path.join(process.cwd(), 'src', 'app', 'signin');
const tempDir = path.join(process.cwd(), '.temp-exclude');

// Create temp directory
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Move API routes
if (fs.existsSync(apiDir)) {
  const tempApiDir = path.join(tempDir, 'api');
  if (fs.existsSync(tempApiDir)) {
    fs.rmSync(tempApiDir, { recursive: true, force: true });
  }
  fs.renameSync(apiDir, tempApiDir);
  console.log('✅ Moved API routes to temp directory');
}

// Move admin pages
if (fs.existsSync(adminDir)) {
  const tempAdminDir = path.join(tempDir, 'admin');
  if (fs.existsSync(tempAdminDir)) {
    fs.rmSync(tempAdminDir, { recursive: true, force: true });
  }
  fs.renameSync(adminDir, tempAdminDir);
  console.log('✅ Moved admin pages to temp directory');
}

// Move signin page
if (fs.existsSync(signinDir)) {
  const tempSigninDir = path.join(tempDir, 'signin');
  if (fs.existsSync(tempSigninDir)) {
    fs.rmSync(tempSigninDir, { recursive: true, force: true });
  }
  fs.renameSync(signinDir, tempSigninDir);
  console.log('✅ Moved signin page to temp directory');
}

// Move middleware
const middlewareFile = path.join(process.cwd(), 'src', 'middleware.ts');
if (fs.existsSync(middlewareFile)) {
  const tempMiddleware = path.join(tempDir, 'middleware.ts');
  fs.renameSync(middlewareFile, tempMiddleware);
  console.log('✅ Moved middleware to temp directory');
}

console.log('✅ Static build preparation complete');

