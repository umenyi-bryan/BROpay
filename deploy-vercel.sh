#!/bin/bash

echo "🚀 Deploying BROpay to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if we're logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel..."
    vercel login
fi

echo "🏗️  Building project..."
npm run build

echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ BROpay successfully deployed to Vercel!"
echo "📢 Your app will be live at: https://bropay.vercel.app"
