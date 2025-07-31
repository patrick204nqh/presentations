.PHONY: setup serve build clean new export preview test-theme help

# Default target
help:
	@echo "Available commands:"
	@echo "  make setup                      - Install dependencies"
	@echo "  make new NAME=<name>            - Create new presentation"
	@echo "  make serve                      - Start development server (all presentations)"
	@echo "  make preview NAME=<name>        - Preview specific presentation"
	@echo "  make build                      - Build all presentations to HTML"
	@echo "  make export NAME=<name>         - Export presentation to PDF"
	@echo "  make test-theme NAME=<name> THEME=<theme> - Test different themes"
	@echo "  make clean                      - Clean build directory"
	@echo ""
	@echo "Examples:"
	@echo "  make new NAME=my-presentation"
	@echo "  make preview NAME=demo"
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
	@echo "Using pure theme without custom CSS"
	npx reveal-md slides/ --watch --port 8000

# Build all presentations
build:
	@echo "Building all presentations..."
	npx reveal-md slides/ --static build/

# Export presentation to PDF
export:
	@if [ -z "$(NAME)" ]; then \
		echo "Usage: make export NAME=presentation-name"; \
		exit 1; \
	fi
	@echo "Exporting $(NAME) to PDF..."
	npx reveal-md slides/$(NAME).md --print build/$(NAME).pdf --print-size 1024x768

# Preview specific presentation
preview:
	@if [ -z "$(NAME)" ]; then \
		echo "Usage: make preview NAME=presentation-name"; \
		exit 1; \
	fi
	@echo "Previewing $(NAME) on http://localhost:8000"
	npx reveal-md slides/$(NAME).md --watch --port 8000

# Test different themes
test-theme:
	@if [ -z "$(NAME)" ] || [ -z "$(THEME)" ]; then \
		echo "Usage: make test-theme NAME=presentation-name THEME=theme-name"; \
		echo "Available themes: black, white, league, beige, sky, night, serif, simple, solarized, blood, moon"; \
		exit 1; \
	fi
	@echo "Testing $(NAME) with $(THEME) theme..."
	npx reveal-md slides/$(NAME).md --theme $(THEME) --watch --port 8000

# Clean build directory
clean:
	@echo "Cleaning build directory..."
	rm -rf build/*
	@echo "Build directory cleaned!"