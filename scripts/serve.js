#!/usr/bin/env node

const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const WebSocket = require('ws');
const { createServer } = require('http');

const PORT = process.env.PORT || 8000;
const SLIDES_DIR = path.join(__dirname, '../slides');
const TEMPLATES_DIR = path.join(__dirname, '../templates');
const PUBLIC_DIR = path.join(__dirname, '../public');
const NODE_MODULES = path.join(__dirname, '../node_modules');

class PresentationServer {
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.wss = new WebSocket.Server({ server: this.server });
    this.clients = new Set();
    
    this.setupRoutes();
    this.setupWebSocket();
    this.setupFileWatcher();
  }

  setupRoutes() {
    // Serve reveal.js assets
    this.app.use('/reveal', express.static(path.join(NODE_MODULES, 'reveal.js')));
    
    // Serve slides directory
    this.app.use('/slides', express.static(SLIDES_DIR));
    
    // Serve public assets (images, etc.)
    this.app.use('/public', express.static(PUBLIC_DIR));
    
    // Serve custom CSS
    this.app.use('/templates', express.static(TEMPLATES_DIR));

    // Main presentation route
    this.app.get('/', (req, res) => this.servePresentationList(res));
    this.app.get('/*', (req, res) => this.servePresentation(req, res));
  }

  setupWebSocket() {
    this.wss.on('connection', (ws) => {
      this.clients.add(ws);
      ws.on('close', () => this.clients.delete(ws));
    });
  }

  setupFileWatcher() {
    const watcher = chokidar.watch([SLIDES_DIR, TEMPLATES_DIR], {
      ignoreInitial: true
    });

    watcher.on('change', () => this.reloadClients());
  }

  reloadClients() {
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('reload');
      }
    });
  }

  async servePresentationList(res) {
    try {
      const presentations = await this.findAllPresentations(SLIDES_DIR);

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Presentations</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; }
            ul { list-style: none; padding: 0; }
            li { margin: 10px 0; }
            a { text-decoration: none; color: #007acc; padding: 8px 12px; display: inline-block; border-radius: 4px; }
            a:hover { background: #f0f8ff; }
            .folder { color: #666; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <h1>📊 Available Presentations</h1>
          <ul>
            ${presentations.map(({ name, path: relPath }) => {
              const folder = path.dirname(relPath) !== '.' ? `<span class="folder">${path.dirname(relPath)}/</span>` : '';
              return `<li>${folder}<a href="/${relPath.replace('.md', '')}">${name}</a></li>`;
            }).join('')}
          </ul>
        </body>
        </html>
      `;
      
      res.send(html);
    } catch (error) {
      res.status(500).send('Error reading presentations directory');
    }
  }

  async findAllPresentations(dir, basePath = '') {
    const presentations = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        const subPresentations = await this.findAllPresentations(fullPath, relativePath);
        presentations.push(...subPresentations);
      } else if (entry.name.endsWith('.md')) {
        presentations.push({
          name: entry.name.replace('.md', ''),
          path: relativePath
        });
      }
    }

    return presentations;
  }

  async servePresentation(req, res) {
    const presentationPath = req.path.substring(1); // Remove leading /
    const markdownPath = path.join(SLIDES_DIR, `${presentationPath}.md`);

    try {
      if (!await fs.pathExists(markdownPath)) {
        return res.status(404).send(`Presentation not found: ${presentationPath}`);
      }

      const html = await this.generateHTML(presentationPath);
      
      res.send(html);
    } catch (error) {
      console.error('Error serving presentation:', error);
      res.status(500).send('Error loading presentation');
    }
  }

  // No config needed - using hardcoded reveal.js defaults

  async generateHTML(presentationPath) {
    const templatePath = path.join(TEMPLATES_DIR, 'presentation.html');
    let template = await fs.readFile(templatePath, 'utf8');

    const title = path.basename(presentationPath);
    
    // Simple template replacement
    const replacements = {
      '{{title}}': title,
      '{{revealPath}}': '/reveal',
      '{{markdownFile}}': `/slides/${presentationPath}.md`,
      '{{#liveReload}}': '',
      '{{port}}': PORT,
      '{{/liveReload}}': ''
    };

    Object.entries(replacements).forEach(([key, value]) => {
      template = template.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    });

    return template;
  }

  start() {
    this.server.listen(PORT, () => {
      console.log(`🚀 Presentation server running at http://localhost:${PORT}`);
      console.log(`📁 Serving presentations from: ${SLIDES_DIR}`);
      console.log(`🔄 Live reload enabled`);
    });
  }
}

// Start the server
const server = new PresentationServer();
server.start();