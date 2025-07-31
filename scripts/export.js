#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer');

const presentationName = process.argv[2];

if (!presentationName) {
    console.error('Usage: node export.js <presentation-name>');
    process.exit(1);
}

async function exportToPdf() {
    const slidesDir = path.join(__dirname, '..', 'slides');
    const buildDir = path.join(__dirname, '..', 'build');
    
    // Check if markdown file exists
    const mdFile = path.join(slidesDir, presentationName + '.md');
    if (!fs.existsSync(mdFile)) {
        console.error(`Presentation "${presentationName}.md" not found in slides/`);
        process.exit(1);
    }
    
    console.log('Exporting ' + presentationName + ' to PDF...');
    
    try {
        // First build the presentation
        const { execSync } = require('child_process');
        execSync('npx reveal-md "' + mdFile + '" --static "' + buildDir + '"', { stdio: 'pipe' });
        
        // Then export to PDF
        const htmlFile = path.join(buildDir, presentationName + '.html');
        const pdfFile = path.join(buildDir, presentationName + '.pdf');
        
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        await page.goto('file://' + htmlFile, { waitUntil: 'networkidle0' });
        await page.pdf({
            path: pdfFile,
            format: 'A4',
            landscape: true,
            printBackground: true
        });
        
        await browser.close();
        console.log('✅ PDF exported: ' + pdfFile);
        
    } catch (error) {
        console.error('❌ Export failed:', error.message);
        process.exit(1);
    }
}

exportToPdf();