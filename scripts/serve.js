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
    
    // Serve custom CSS
    this.app.use('/templates', express.static(TEMPLATES_DIR));

    // Main presentation route
    this.app.get('/', (req, res) => this.servePresentationList(res));
    this.app.get('/:presentation', (req, res) => this.servePresentation(req, res));
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
      const files = await fs.readdir(SLIDES_DIR);
      const presentations = files
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));

      const html = `
        <!DOCTYPE html>
        <html>
        <head><title>Presentations</title></head>
        <body>
          <h1>Available Presentations</h1>
          <ul>
            ${presentations.map(name => 
              `<li><a href="/${name}">${name}</a></li>`
            ).join('')}
          </ul>
        </body>
        </html>
      `;
      
      res.send(html);
    } catch (error) {
      res.status(500).send('Error reading presentations directory');
    }
  }

  async servePresentation(req, res) {
    const { presentation } = req.params;
    const markdownPath = path.join(SLIDES_DIR, `${presentation}.md`);

    try {
      if (!await fs.pathExists(markdownPath)) {
        return res.status(404).send('Presentation not found');
      }

      const html = await this.generateHTML(presentation);
      
      res.send(html);
    } catch (error) {
      console.error('Error serving presentation:', error);
      res.status(500).send('Error loading presentation');
    }
  }

  // No config needed - using hardcoded reveal.js defaults

  async generateHTML(presentation) {
    const templatePath = path.join(TEMPLATES_DIR, 'presentation.html');
    let template = await fs.readFile(templatePath, 'utf8');

    // Simple template replacement
    const replacements = {
      '{{title}}': presentation,
      '{{revealPath}}': '/reveal',
      '{{markdownFile}}': `/slides/${presentation}.md`,
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