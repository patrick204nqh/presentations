# Presentations

Simple reveal.js presentation system using markdown.

## Quick Start

```bash
# Install dependencies
make setup

# Create a new presentation
make new NAME=my-talk

# Start development server
make serve

# Build to static HTML
make build

# Export to PDF
make export NAME=my-talk
```

## Commands

| Command                   | Description                               |
| ------------------------- | ----------------------------------------- |
| `make setup`              | Install dependencies                      |
| `make new NAME=<name>`    | Create new presentation                   |
| `make serve`              | Start dev server at http://localhost:8000 |
| `make build`              | Build all presentations to HTML           |
| `make export NAME=<name>` | Export presentation to PDF                |
| `make clean`              | Clean build directory                     |

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

## Themes

**Pure theme approach** - No custom CSS needed! Uses built-in reveal.js themes:

```bash
# Test different themes instantly
make test-theme NAME=my-presentation THEME=solarized
make test-theme NAME=my-presentation THEME=night
make test-theme NAME=my-presentation THEME=league
```

**Available themes:** `white`, `black`, `league`, `beige`, `sky`, `night`, `serif`, `simple`, `solarized`, `blood`, `moon`

**Benefits:**
- No CSS conflicts
- Consistent styling across themes
- Easy theme switching
- Professional appearance out-of-the-box

## Examples

Check the `examples/` directory for reference presentations showing different features and syntax.
