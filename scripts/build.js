#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const SLIDES_DIR = path.join(__dirname, '../slides');
const BUILD_DIR = path.join(__dirname, '../build');
const TEMPLATES_DIR = path.join(__dirname, '../templates');
const NODE_MODULES = path.join(__dirname, '../node_modules');

// Check for --inline flag
const inlineMode = process.argv.includes('--inline');

class StaticBuilder {
  // No config needed - using hardcoded reveal.js defaults

  async generateHTML(presentation) {
    if (inlineMode) {
      return await this.generateInlineHTML(presentation);
    }
    
    const templatePath = path.join(TEMPLATES_DIR, 'presentation.html');
    let template = await fs.readFile(templatePath, 'utf8');

    // Replace template variables
    const replacements = {
      '{{title}}': presentation,
      '{{revealPath}}': './reveal',
      '{{markdownFile}}': `./${presentation}.md`
    };

    // Remove live reload section for static build
    template = template.replace(/\{\{#liveReload\}\}[\s\S]*?\{\{\/liveReload\}\}/g, '');

    Object.entries(replacements).forEach(([key, value]) => {
      template = template.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    });

    return template;
  }

  async generateInlineHTML(presentation) {
    console.log(`\n=== INLINE BUILD DEBUG for ${presentation} ===`);
    
    const templatePath = path.join(TEMPLATES_DIR, 'presentation-inline.html');
    let template = await fs.readFile(templatePath, 'utf8');
    
    console.log(`1. Template loaded: ${template.length} chars`);
    console.log(`   Reveal.initialize count: ${(template.match(/Reveal\.initialize/g) || []).length}`);
    
    const revealPath = path.join(NODE_MODULES, 'reveal.js');
    
    // Read all required assets  
    const [revealCSS, themeCSS, highlightCSS, revealJS, markdownJS, highlightJS, notesJS, mathJS, markdownContent] = await Promise.all([
      fs.readFile(path.join(revealPath, 'dist/reveal.css'), 'utf8'),
      fs.readFile(path.join(revealPath, 'dist/theme/white.css'), 'utf8'), 
      fs.readFile(path.join(revealPath, 'plugin/highlight/monokai.css'), 'utf8'),
      fs.readFile(path.join(revealPath, 'dist/reveal.js'), 'utf8'),
      fs.readFile(path.join(revealPath, 'plugin/markdown/markdown.js'), 'utf8'),
      fs.readFile(path.join(revealPath, 'plugin/highlight/highlight.js'), 'utf8'),
      fs.readFile(path.join(revealPath, 'plugin/notes/notes.js'), 'utf8'),
      fs.readFile(path.join(revealPath, 'plugin/math/math.js'), 'utf8'),
      fs.readFile(path.join(SLIDES_DIR, `${presentation}.md`), 'utf8')
    ]);
    
    console.log(`2. Assets loaded:`);
    console.log(`   mathJS length: ${mathJS.length} chars`);
    console.log(`   mathJS contains Reveal.initialize: ${(mathJS.match(/Reveal\.initialize/g) || []).length}`);

    // Fix theme CSS font import issue
    const fixedThemeCSS = themeCSS.replace('@import url(./fonts/source-sans-pro/source-css.css);', '/* Font removed for inline build */');

    // Clean JavaScript files to prevent template replacement conflicts
    const cleanJS = (jsCode) => {
      // For highlight.js, we need to be extra careful about }} patterns that might interfere
      let cleaned = jsCode.trim();
      
      // If this is the large highlight.js file, add extra protection
      if (jsCode.length > 500000) {
        console.log(`   Applying extra cleaning to large JS file (${jsCode.length} chars)`);
        // The issue might be related to }} patterns in the minified JS
        // Let's ensure the JS is properly terminated
        if (!cleaned.endsWith(';')) {
          cleaned += ';';
        }
      }
      
      return cleaned;
    };

    console.log(`3. Starting template replacements...`);
    
    // Process each replacement individually with detailed debugging
    const replacements = {
      '{{title}}': presentation,
      '{{markdownContent}}': markdownContent,
      '{{revealCSS}}': revealCSS,
      '{{themeCSS}}': fixedThemeCSS,
      '{{highlightCSS}}': highlightCSS,
      '{{revealJS}}': cleanJS(revealJS),
      '{{markdownJS}}': cleanJS(markdownJS),
      '{{notesJS}}': cleanJS(notesJS),
      '{{mathJS}}': cleanJS(mathJS),
      '{{highlightJS}}': cleanJS(highlightJS)
    };
    
    Object.entries(replacements).forEach(([key, value]) => {
      const beforeLength = template.length;
      const beforeRevealCount = (template.match(/Reveal\.initialize/g) || []).length;
      const beforeTemplateVars = Object.keys(replacements).filter(k => template.includes(k));
      
      // Check if the template variable exists before replacement
      if (!template.includes(key)) {
        console.log(`   ⚠️  ${key} not found in template - skipping`);
        return;
      }
      
      const occurences = (template.match(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\\\$&'), 'g')) || []).length;
      console.log(`   Processing ${key}: ${occurences} occurrence(s), value size: ${value.length} chars`);
      
      // Use replaceAll equivalent to replace ALL occurrences
      template = template.split(key).join(value);
      
      const afterLength = template.length;
      const afterRevealCount = (template.match(/Reveal\.initialize/g) || []).length;
      const afterTemplateVars = Object.keys(replacements).filter(k => template.includes(k));
      
      const lengthDiff = afterLength - beforeLength;
      const expectedDiff = (value.length - key.length) * occurences;
      
      console.log(`   ✓ ${key}: template ${beforeLength} -> ${afterLength} chars (${lengthDiff >= 0 ? '+' : ''}${lengthDiff})`);
      console.log(`     Expected size change: ${expectedDiff}, Actual: ${lengthDiff}`);
      
      if (beforeRevealCount !== afterRevealCount) {
        console.log(`     🚨 Reveal.initialize count changed: ${beforeRevealCount} -> ${afterRevealCount}`);
      }
      
      if (beforeTemplateVars.length !== afterTemplateVars.length) {
        console.log(`     Template vars before: [${beforeTemplateVars.join(', ')}]`);
        console.log(`     Template vars after: [${afterTemplateVars.join(', ')}]`);
      }
      
      if (lengthDiff !== expectedDiff) {
        console.log(`     🚨 UNEXPECTED SIZE CHANGE! Expected ${expectedDiff}, got ${lengthDiff}`);
      }
    });
    
    console.log(`4. Final result:`);
    console.log(`   Template length: ${template.length} chars`);
    console.log(`   Final Reveal.initialize count: ${(template.match(/Reveal\.initialize/g) || []).length}`);
    console.log(`=== END DEBUG ===\n`);

    return template;
  }

  async build() {
    const buildType = inlineMode ? 'single-file' : 'multi-file';
    console.log(`🏗️  Building all presentations (${buildType} mode)...`);

    // Clean and create build directory
    await fs.remove(BUILD_DIR);
    await fs.ensureDir(BUILD_DIR);

    if (!inlineMode) {
      // Copy reveal.js assets for multi-file build
      const revealSrc = path.join(NODE_MODULES, 'reveal.js');
      const revealDest = path.join(BUILD_DIR, 'reveal');
      await fs.copy(revealSrc, revealDest);
      console.log('📦 Copied reveal.js assets');
    }

    // Find all markdown presentations
    const files = await fs.readdir(SLIDES_DIR);
    const presentations = files.filter(file => file.endsWith('.md'));

    if (presentations.length === 0) {
      console.log('⚠️  No presentations found in slides/ directory');
      return;
    }

    // Build each presentation
    for (const file of presentations) {
      const name = file.replace('.md', '');
      
      if (!inlineMode) {
        // Copy markdown file for multi-file build
        await fs.copy(
          path.join(SLIDES_DIR, file),
          path.join(BUILD_DIR, file)
        );
      }

      // Generate HTML
      const html = await this.generateHTML(name);
      await fs.writeFile(path.join(BUILD_DIR, `${name}.html`), html);
      
      const sizeKB = Math.round(Buffer.byteLength(html, 'utf8') / 1024);
      console.log(`✅ Built: ${name} ${inlineMode ? `(${sizeKB}KB single file)` : ''}`);
    }

    // Create index.html with presentation list
    const indexHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Presentations</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
          h1 { color: #333; }
          ul { list-style: none; padding: 0; }
          li { margin: 10px 0; }
          a { text-decoration: none; color: #007acc; font-size: 18px; }
          a:hover { text-decoration: underline; }
          .badge { background: #007acc; color: white; padding: 2px 6px; border-radius: 3px; font-size: 12px; margin-left: 8px; }
        </style>
      </head>
      <body>
        <h1>📽️ Presentations</h1>
        <ul>
          ${presentations.map(file => {
            const name = file.replace('.md', '');
            const badge = inlineMode ? '<span class="badge">SINGLE FILE</span>' : '';
            return `<li><a href="${name}.html">${name}</a>${badge}</li>`;
          }).join('')}
        </ul>
        <p style="color: #666; margin-top: 30px;">
          Built in ${buildType} mode. ${inlineMode ? 'Each HTML file is completely self-contained.' : 'Files require the reveal/ folder to work.'}
        </p>
      </body>
      </html>
    `;
    
    await fs.writeFile(path.join(BUILD_DIR, 'index.html'), indexHtml);

    console.log(`🎉 Build complete! Generated ${presentations.length} presentations in build/`);
    console.log(inlineMode ? '📄 Single-file builds are completely portable!' : '📂 Open build/index.html to view all presentations');
  }
}

// Run the build
async function main() {
  try {
    const builder = new StaticBuilder();
    await builder.build();
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();