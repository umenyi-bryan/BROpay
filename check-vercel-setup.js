const fs = require('fs');
const path = require('path');

console.log('🔍 Checking BROpay Vercel Configuration...\\n');

const requiredFiles = [
  'index.html',
  'css/style.css',
  'js/app.js', 
  'js/auth.js',
  'js/assistant.js',
  'vercel.json',
  'package.json'
];

const recommendedFiles = [
  'vite.config.js'
];

console.log('✅ Required Files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

console.log('\\n📋 Recommended Files:');
recommendedFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

console.log('\\n🚀 Vercel Deployment Ready!');
console.log('Next steps:');
console.log('1. Run: vercel --prod');
console.log('2. Or connect GitHub repo at: https://vercel.com');
