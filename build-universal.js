// Universal build script for BROpay - Works on both Vercel and Netlify
const fs = require('fs');
const path = require('path');

console.log('🌐 Building BROpay Universal Platform...');
console.log('✅ Compatible with: Vercel, Netlify, and any static hosting');

// Check for platform environment variables
const isVercel = process.env.VERCEL === '1';
const isNetlify = process.env.NETLIFY === 'true';
const platform = isVercel ? 'Vercel' : isNetlify ? 'Netlify' : 'Local/Other';

console.log(`🏁 Detected Platform: ${platform}`);

// Required files for BROpay
const requiredFiles = [
  'index.html',
  'css/style.css', 
  'js/app.js',
  'js/auth.js',
  'js/assistant.js',
  '_redirects',
  'package.json'
];

console.log('\n📋 File Check:');
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Platform-specific checks
if (isVercel) {
  console.log('\n🔧 Vercel Environment:');
  console.log(`✅ VERCEL: ${process.env.VERCEL}`);
  console.log(`✅ VERCEL_ENV: ${process.env.VERCEL_ENV || 'production'}`);
  console.log(`✅ VERCEL_URL: ${process.env.VERCEL_URL || 'Not set'}`);
}

if (isNetlify) {
  console.log('\n🔧 Netlify Environment:');
  console.log(`✅ NETLIFY: ${process.env.NETLIFY}`);
  console.log(`✅ CONTEXT: ${process.env.CONTEXT || 'production'}`);
  console.log(`✅ URL: ${process.env.URL || 'Not set'}`);
}

if (allFilesExist) {
  console.log('\n🎉 BROpay Universal Build Successful!');
  console.log('🚀 Ready for deployment on:');
  console.log('   • Vercel');
  console.log('   • Netlify');
  console.log('   • Any static file hosting');
  console.log('\n📚 Deployment Commands:');
  console.log('   Vercel:    npm run vercel:deploy');
  console.log('   Netlify:   npm run netlify:deploy');
  console.log('   Both:      npm run deploy');
} else {
  console.log('\n❌ Build failed: Missing required files');
  process.exit(1);
}
