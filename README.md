# Presentations

Simple reveal.js presentation system using markdown with **native reveal.js** and built-in markdown support.

## Quick Start

```bash
# Install dependencies
make setup

# Create a new presentation
make new NAME=my-talk

# Start development server
make serve

# Build to static HTML (multi-file)
make build

# Build single-file presentations (portable)
make build-inline

# Export to PDF
make export NAME=my-talk
```

## Commands

| Command                   | Description                                  |
| ------------------------- | -------------------------------------------- |
| `make setup`              | Install dependencies                         |
| `make new NAME=<name>`    | Create new presentation                      |
| `make serve`              | Start dev server at http://localhost:8000    |
| `make build`              | Build all presentations to HTML (multi-file) |
| `make build-inline`       | Build single-file presentations (portable)   |
| `make export NAME=<name>` | Export presentation to PDF                   |
| `make clean`              | Clean build directory                        |

## Project Structure

```
presentations/
├── slides/           # Your markdown presentations
├── build/           # Generated HTML and PDFs
├── templates/       # Custom CSS
├── examples/        # Reference examples
├── scripts/         # Build tools
└── Makefile        # Commands
```

## Creating Presentations

1. **Simple presentation:**
   ```bash
   make new NAME=my-presentation
   ```

2. **Nested structure:**
   ```bash
   make new NAME=tech/javascript-intro
   make new NAME=business/quarterly-review
   ```

## Markdown Syntax

- Use `---` to separate horizontal slides (main topics)
- Use `--` to create vertical slides (sub-topics)
- Use `Note:` for speaker notes
- Use fragment animations: `<!-- .element: class="fragment" -->`

**Navigation:**
- **Left/Right arrows:** Horizontal navigation
- **Up/Down arrows:** Vertical navigation
- **ESC:** Overview mode to see slide structure

## Build Modes

### Multi-file Build (Default)
```bash
make build
```
- Creates separate HTML + reveal/ folder
- Smaller HTML files (~2KB)
- Requires reveal/ folder to work
- Best for web hosting

### Single-file Build (Portable)
```bash
make build-inline
```
- Creates completely self-contained HTML files (~1.3MB)
- All CSS, JavaScript, and markdown embedded
- Perfect for sharing via email/USB/offline use
- No external dependencies required

## Themes

**Native reveal.js themes** - Edit `templates/presentation.html` to change themes:

```html
<link rel="stylesheet" href="{{revealPath}}/dist/theme/white.css">
```

**Available themes:** `white`, `black`, `league`, `beige`, `sky`, `night`, `serif`, `simple`, `solarized`, `blood`, `moon`

**Benefits:**
- Pure reveal.js native configuration
- No external config files needed
- Professional appearance out-of-the-box
- Direct reveal.js integration

## Architecture

This system uses **native reveal.js** with built-in markdown support:

- ✅ **No reveal-md dependency** - Pure reveal.js implementation
- ✅ **Built-in markdown plugin** - Uses reveal.js native markdown parsing
- ✅ **Clean scripts** - Simple, readable build tools
- ✅ **Single-file builds** - Completely portable presentations
- ✅ **Live reload** - WebSocket-based development server

## Examples

Check the `examples/` directory for reference presentations showing different features and syntax.
