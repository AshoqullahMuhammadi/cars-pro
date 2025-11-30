const fs = require('fs');
const path = require('path');

// Copy cars.json to public folder for static export
const sourcePath = path.join(process.cwd(), 'data', 'cars.json');
const destPath = path.join(process.cwd(), 'public', 'cars.json');

try {
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log('✅ Copied cars.json to public folder');
  } else {
    console.log('⚠️  cars.json not found, creating empty file');
    fs.writeFileSync(destPath, JSON.stringify([], null, 2));
  }
} catch (error) {
  console.error('Error copying cars.json:', error);
  process.exit(1);
}

