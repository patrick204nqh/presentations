#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer');
const express = require('express');

const presentationName = process.argv[2];

if (!presentationName) {
    console.error('Usage: node export.js <presentation-name>');
    process.exit(1);
}

class PDFExporter {
    constructor() {
        this.server = null;
        this.tempPort = 8001;
    }
    // No config needed - using hardcoded reveal.js defaults

    async generateHTML(presentation) {
        const templatePath = path.join(__dirname, '../templates/presentation.html');
        let template = await fs.readFile(templatePath, 'utf8');

        const replacements = {
            '{{title}}': presentation,
            '{{revealPath}}': '/reveal',
            '{{markdownFile}}': `/slides/${presentation}.md`
        };

        // Remove live reload section
        template = template.replace(/\{\{#liveReload\}\}[\s\S]*?\{\{\/liveReload\}\}/g, '');

        Object.entries(replacements).forEach(([key, value]) => {
            template = template.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
        });

        return template;
    }

    async startTempServer() {
        const app = express();
        const NODE_MODULES = path.join(__dirname, '../node_modules');
        const SLIDES_DIR = path.join(__dirname, '../slides');

        // Serve reveal.js assets
        app.use('/reveal', express.static(path.join(NODE_MODULES, 'reveal.js')));
        
        // Serve slides
        app.use('/slides', express.static(SLIDES_DIR));

        // Serve the presentation
        app.get('/', async (req, res) => {
            const html = await this.generateHTML(presentationName);
            res.send(html);
        });

        return new Promise((resolve) => {
            this.server = app.listen(this.tempPort, () => {
                resolve(`http://localhost:${this.tempPort}`);
            });
        });
    }

    async stopTempServer() {
        if (this.server) {
            this.server.close();
        }
    }

    async exportToPDF() {
        const slidesDir = path.join(__dirname, '../slides');
        const buildDir = path.join(__dirname, '../build');
        
        // Check if markdown file exists
        const mdFile = path.join(slidesDir, `${presentationName}.md`);
        if (!await fs.pathExists(mdFile)) {
            console.error(`❌ Presentation "${presentationName}.md" not found in slides/`);
            process.exit(1);
        }

        console.log(`📄 Exporting ${presentationName} to PDF...`);

        try {
            // Ensure build directory exists
            await fs.ensureDir(buildDir);

            // Start temporary server
            const serverUrl = await this.startTempServer();
            console.log(`🌐 Started temporary server at ${serverUrl}`);

            // Launch browser and generate PDF
            const browser = await puppeteer.launch({ 
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            
            const page = await browser.newPage();
            
            // Set viewport to match presentation dimensions
            await page.setViewport({
                width: 1024,
                height: 768
            });

            await page.goto(serverUrl, { 
                waitUntil: 'networkidle0',
                timeout: 30000
            });

            // Wait for reveal.js to initialize
            await page.waitForSelector('.reveal .slides', { timeout: 10000 });

            const pdfPath = path.join(buildDir, `${presentationName}.pdf`);
            
            await page.pdf({
                path: pdfPath,
                width: '1024px',
                height: '768px',
                printBackground: true,
                preferCSSPageSize: true
            });

            await browser.close();
            await this.stopTempServer();

            console.log(`✅ PDF exported successfully: ${pdfPath}`);
            
        } catch (error) {
            await this.stopTempServer();
            console.error('❌ Export failed:', error.message);
            process.exit(1);
        }
    }
}

// Run the export
async function main() {
    const exporter = new PDFExporter();
    await exporter.exportToPDF();
}

main();