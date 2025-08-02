# Presentation Design Guide

Professional layouts, themes, and branding for presentations

---

## 🎨 Quick Design Tips

**Essential principles:**
- Consistent visual hierarchy
- Plenty of white space
- Brand colors throughout
- Readable typography
- Balanced layouts

---

## 📐 Layout Systems

--

### Two-Column Layout

```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
<div>

## Left Content
- Point one
- Point two
- Point three

</div>
<div>

## Right Content
- Related info
- Supporting data
- Visual elements

</div>
</div>
```

--

### Three-Column Grid

```html
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px;">
<div>

### Feature A
Description here

</div>
<div>

### Feature B  
More details

</div>
<div>

### Feature C
Final column

</div>
</div>
```

--

### Content + Image Layout

```html
<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 40px; align-items: center;">
<div>

## Key Message
- Important point
- Supporting detail
- Call to action

</div>
<div>

![Visual](./images/chart.png)

</div>
</div>
```

---

## 🎭 Theme Customization

--

### Custom Colors

Edit `templates/presentation.html`:

```html
<style>
:root {
  --primary-color: #2c3e50;
  --accent-color: #3498db;
  --text-color: #333;
  --bg-color: #ffffff;
}

.reveal .slides section {
  background: var(--bg-color);
  color: var(--text-color);
}

.reveal h1, .reveal h2, .reveal h3 {
  color: var(--primary-color);
}

.reveal strong {
  color: var(--accent-color);
}
</style>
```

--

### Built-in Themes

Available reveal.js themes:

| Theme | Best For |
|-------|----------|
| `white` | Clean, professional |
| `black` | Dark mode, tech talks |
| `league` | Bold, modern |
| `sky` | Light, friendly |
| `night` | Dark, elegant |
| `serif` | Academic, formal |
| `simple` | Minimal, focused |

**Change theme in template:**
```html
<link rel="stylesheet" href="{{revealPath}}/dist/theme/night.css">
```

--

### Custom CSS Classes

Add to `templates/styles/custom.css`:

```css
.highlight {
  background: #ffeb3b;
  padding: 10px 20px;
  border-radius: 8px;
  border-left: 4px solid #ff9800;
}

.center-text {
  text-align: center;
}

.large-text {
  font-size: 1.5em;
  font-weight: bold;
}

.brand-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
}
```

**Use in slides:**
```markdown
Important message <!-- .element: class="highlight" -->

<div class="brand-box">
Your branded content here
</div>
```

---

## 🏢 Branding Elements

--

### Logo Integration

```html
<!-- Top-right logo -->
<div style="position: absolute; top: 20px; right: 20px; z-index: 100;">
  <img src="./images/logo.png" style="height: 40px;">
</div>

# Slide Title
Content with branded header
```

--

### Brand Color Palette

```markdown
<!-- .slide: data-background="#1e3a8a" -->

<div style="color: white; text-align: center;">

# Company Presentation
## Q4 Results

<div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-top: 40px;">
Key metrics and achievements
</div>

</div>
```

--

### Consistent Headers

```html
<div style="border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-bottom: 30px;">

# Section Title

</div>

Content follows with consistent spacing
```

---

## 📊 Professional Layouts

--

### Dashboard Style

```html
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
**$2.4M**  
Revenue
</div>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
**15%**  
Growth
</div>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
**50K**  
Users
</div>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
**85%**  
Retention
</div>

</div>
```

--

### Before/After Comparison

```html
<div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 30px; align-items: center;">

<div style="text-align: center;">

### Before
- Old process
- Manual work
- Slow results

</div>

<div style="font-size: 3em; color: #3498db;">
→
</div>

<div style="text-align: center;">

### After
- Automated
- Efficient
- Fast results

</div>

</div>
```

--

### Feature Showcase

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">

<div style="text-align: center; padding: 20px;">
<div style="font-size: 3em; color: #3498db;">🚀</div>

**Fast**  
Lightning quick performance
</div>

<div style="text-align: center; padding: 20px;">
<div style="font-size: 3em; color: #2ecc71;">🔒</div>

**Secure**  
Enterprise-grade security
</div>

<div style="text-align: center; padding: 20px;">
<div style="font-size: 3em; color: #e74c3c;">⚡</div>

**Powerful**  
Advanced capabilities
</div>

</div>
```

---

## 🎯 Brand Guidelines

--

### Typography Hierarchy

```css
/* Custom font sizes */
h1 { font-size: 2.5em; font-weight: 700; }
h2 { font-size: 2em; font-weight: 600; }
h3 { font-size: 1.5em; font-weight: 500; }

/* Brand fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.reveal {
  font-family: 'Inter', sans-serif;
}
```

--

### Color Consistency

```css
/* Define brand colors */
:root {
  --brand-primary: #2563eb;
  --brand-secondary: #7c3aed;
  --brand-accent: #06b6d4;
  --brand-success: #10b981;
  --brand-warning: #f59e0b;
  --brand-danger: #ef4444;
}

/* Use throughout presentation */
.highlight { color: var(--brand-primary); }
.success { color: var(--brand-success); }
.warning { color: var(--brand-warning); }
```

--

### Spacing Standards

```css
/* Consistent spacing */
.section-spacing { margin-bottom: 40px; }
.item-spacing { margin-bottom: 20px; }
.tight-spacing { margin-bottom: 10px; }

/* Grid gaps */
.grid-large { gap: 40px; }
.grid-medium { gap: 30px; }
.grid-small { gap: 20px; }
```

---

## 📱 Responsive Design

```html
<style>
@media (max-width: 768px) {
  .grid-responsive {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
  }
  
  .hide-mobile {
    display: none !important;
  }
}
</style>

<div class="grid-responsive" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
<!-- Content adapts to screen size -->
</div>
```

---

## 🛠️ Quick Setup

**1. Custom theme file:**
```bash
# Create custom.css
touch templates/styles/custom.css
```

**2. Brand colors:**
```css
:root {
  --brand-primary: #your-color;
  --brand-secondary: #your-color;
}
```

**3. Logo placement:**
```html
<img src="./images/logo.png" style="position: absolute; top: 20px; right: 20px; height: 40px;">
```

**4. Apply to slides:**
```markdown
Content <!-- .element: class="your-class" -->
```

---

## ✅ Design Checklist

- [ ] Consistent brand colors
- [ ] Readable typography 
- [ ] Balanced layouts
- [ ] Proper spacing
- [ ] Logo placement
- [ ] Theme alignment
- [ ] Mobile-friendly
- [ ] High contrast

---

## 🎨 Ready to Design

```bash
# Start with custom styles
make serve
# Edit templates/styles/custom.css
# Apply classes in your slides
# Test on different screens
```

**Create stunning presentations!** ✨