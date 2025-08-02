.PHONY: setup serve build clean new export preview test-theme help

# Default target
help:
	@echo "Available commands:"
	@echo "  make setup                      - Install dependencies"
	@echo "  make new NAME=<name>            - Create new presentation"
	@echo "  make serve                      - Start development server (all presentations)"
	@echo "  make preview NAME=<name>        - Preview specific presentation"
	@echo "  make build                      - Build all presentations to HTML"
	@echo "  make build-inline               - Build single-file presentations (portable)"
	@echo "  make export NAME=<name>         - Export presentation to PDF"
	@echo "  make test-theme NAME=<name> THEME=<theme> - Test different themes"
	@echo "  make clean                      - Clean build directory"
	@echo ""
	@echo "Examples:"
	@echo "  make new NAME=my-presentation"
	@echo "  make preview NAME=demo"
	@echo "  make build-inline               # Creates portable single-file presentations"
	@echo "  make test-theme NAME=demo THEME=moon"
	@echo "  make export NAME=demo"

# Install dependencies
setup:
	@echo "Installing dependencies..."
	yarn install
	@echo "Setup complete!"

# Create new presentation
new:
	@if [ -z "$(NAME)" ]; then \
		echo "Usage: make new NAME=presentation-name"; \
		exit 1; \
	fi
	@echo "Creating new presentation: $(NAME)"
	node scripts/init.js $(NAME)

# Start development server
serve:
	@echo "Starting development server on http://localhost:8000"
	@echo "Visit http://localhost:8000 to see all presentations"
	npm run serve

# Build all presentations
build:
	@echo "Building all presentations..."
	npm run build

# Build single-file presentations (portable)
build-inline:
	@echo "Building single-file presentations..."
	npm run build:inline

# Export presentation to PDF
export:
	@if [ -z "$(NAME)" ]; then \
		echo "Usage: make export NAME=presentation-name"; \
		exit 1; \
	fi
	@echo "Exporting $(NAME) to PDF..."
	node scripts/export.js $(NAME)

# Preview specific presentation
preview:
	@if [ -z "$(NAME)" ]; then \
		echo "Usage: make preview NAME=presentation-name"; \
		exit 1; \
	fi
	@echo "Previewing $(NAME) on http://localhost:8000"
	@echo "Visit http://localhost:8000/$(NAME) after starting the server"
	npm run serve

# Test different themes
test-theme:
	@if [ -z "$(NAME)" ] || [ -z "$(THEME)" ]; then \
		echo "Usage: make test-theme NAME=presentation-name THEME=theme-name"; \
		echo "Available themes: black, white, league, beige, sky, night, serif, simple, solarized, blood, moon"; \
		echo "Note: Edit templates/presentation.html to change the theme, then restart the server"; \
		exit 1; \
	fi
	@echo "To test $(NAME) with $(THEME) theme:"
	@echo "1. Edit templates/presentation.html and change the theme CSS link"
	@echo "2. Run 'make serve' and visit http://localhost:8000/$(NAME)"

# Clean build directory
clean:
	@echo "Cleaning build directory..."
	rm -rf build/*
	@echo "Build directory cleaned!"