#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('Building all presentations...');

try {
    execSync('npx reveal-md slides/ --static build/', { 
        stdio: 'inherit'
    });
    console.log('✅ Build complete! Check the build/ directory.');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}