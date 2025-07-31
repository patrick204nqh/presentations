#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const presentationName = process.argv[2];

if (!presentationName) {
    console.error('Usage: node init.js <presentation-name>');
    process.exit(1);
}

const slidesDir = path.join(__dirname, '..', 'slides');

// Handle nested paths
let presentationPath;
if (presentationName.includes('/')) {
    // Create nested directory structure
    const fullPath = path.join(slidesDir, presentationName + '.md');
    const dir = path.dirname(fullPath);
    fs.ensureDirSync(dir);
    presentationPath = fullPath;
} else {
    presentationPath = path.join(slidesDir, presentationName + '.md');
}

// Check if presentation already exists
if (fs.existsSync(presentationPath)) {
    console.error(`Presentation "${presentationName}" already exists!`);
    process.exit(1);
}

// Create presentation template
const template = `# ${presentationName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

---

## Slide 2

Your content here...

--

### Vertical Slide

Use \`--\` for vertical slides

---

## Slide 3

- Bullet point 1
- Bullet point 2
- Bullet point 3

---

## Code Example

\`\`\`javascript
function hello() {
    console.log("Hello World!");
}
\`\`\`

---

## Thank You!

Questions?

Note:
Speaker notes go here. Press 'S' to see them during presentation.
`;

try {
    fs.writeFileSync(presentationPath, template);
    console.log(`✅ Created new presentation: ${presentationPath}`);
    console.log(`\nTo start working:`);
    console.log(`  make serve`);
    console.log(`\nTo build:`);
    console.log(`  make build`);
} catch (error) {
    console.error('Error creating presentation:', error.message);
    process.exit(1);
}