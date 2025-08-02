# Presentation Syntax Guide

Essential markdown patterns for beautiful presentations

---

## 🚀 Quick Start

```markdown
# Title Slide
Content here

---

## Main Topic
Key points

--

### Subtopic  
Details (↑↓ navigation)

---

## Next Topic
```

**Navigation:** `←→` main topics, `↑↓` subtopics, `ESC` overview

---

## 📝 Basic Formatting

```markdown
# Slide Title
## Section Header

**Bold** *italic* `code`

- Bullet points
- Another point
  - Nested

1. Numbered list
2. Second item
```

---

## 💻 Code

**Inline:** `git status` or `Array.map()`

**Blocks:**
````markdown
```javascript
function hello(name) {
    return `Hello, ${name}!`;
}
```
````

**Languages:** `javascript`, `python`, `bash`, `css`, `html`, `json`

---

## 🔗 Links & Images

```markdown
[Link text](https://example.com)
![Image](./path/image.png)
```

---

## 📊 Tables

```markdown
| Feature | Basic | Pro |
|---------|-------|-----|
| Users   | 5     | 50  |
| Price   | Free  | $9  |
```

---

## 🎭 Advanced

**Speaker Notes:**
```markdown
# Slide Title
Public content

Note:
Private notes (press 'S' to view)
```

**Animations:**
```markdown
- Point 1 <!-- .element: class="fragment" -->
- Point 2 <!-- .element: class="fragment" -->
```

**Backgrounds:**
```markdown
<!-- .slide: data-background="#ff6b6b" -->
# Colored Background
```

---

## ⌨️ Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Next slide |
| `←→↑↓` | Navigate |
| `ESC` | Overview |
| `S` | Speaker notes |
| `F` | Fullscreen |

---

## 📋 Template

```markdown
# My Presentation
Brief intro

---

## Topic 1
- Key point
- Another point

---

## Topic 2
More content

---

## Questions?
Thank you!
```

---

## ✅ Best Practices

- One idea per slide
- 6-8 words per line
- Use **bold** for emphasis
- Keep it simple
- Practice navigation

---

## 🏁 Start Creating

```bash
make new NAME=my-talk
make serve
# Edit your .md file
# Navigate to http://localhost:8000
```

**Happy presenting!** 🎉