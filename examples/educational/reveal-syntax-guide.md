# Reveal.js Markdown Syntax Guide

Complete reference for creating presentations

---

## Slide Separators

--

### Horizontal Slides
Use `---` to create new horizontal slides

```markdown
# Slide 1
Content here

---

# Slide 2  
More content
```

--

### Vertical Slides (Sub-slides)
Use `--` to create vertical slides

```markdown
# Main Topic

---

## Subtopic 1

--

### Detail A
Vertical slide content

--

### Detail B
Another vertical slide

---

## Next Main Topic
```

---

## Text Formatting

--

### Basic Formatting

```markdown
**Bold text**
*Italic text*  
~~Strikethrough~~
`Inline code`

> Blockquote text
> Multiple lines supported
```

**Result:**
**Bold text**  
*Italic text*  
~~Strikethrough~~  
`Inline code`

> Blockquote text  
> Multiple lines supported

--

### Headers

```markdown
# H1 - Slide Title
## H2 - Section Header  
### H3 - Subsection
#### H4 - Detail
##### H5 - Fine Detail
###### H6 - Smallest
```

# H1 - Slide Title
## H2 - Section Header  
### H3 - Subsection
#### H4 - Detail
##### H5 - Fine Detail
###### H6 - Smallest

---

## Lists

--

### Unordered Lists

```markdown
- Item 1
- Item 2  
  - Nested item A
  - Nested item B
- Item 3

* Alternative syntax
* Also works
  * Nested with asterisks
```

- Item 1
- Item 2  
  - Nested item A
  - Nested item B
- Item 3

--

### Ordered Lists

```markdown
1. First item
2. Second item
   1. Sub-item A
   2. Sub-item B
3. Third item

1. Numbers auto-increment
1. Even if you use 1
1. For all items
```

1. First item
2. Second item
   1. Sub-item A
   2. Sub-item B
3. Third item

--

### Task Lists

```markdown
- [x] Completed task
- [x] Another done item  
- [ ] Pending task
- [ ] Another todo
```

- [x] Completed task
- [x] Another done item  
- [ ] Pending task
- [ ] Another todo

---

## Code Examples

--

### Inline Code

```markdown
Use `git status` to check repository status.
The `Array.map()` function is very useful.
```

Use `git status` to check repository status.  
The `Array.map()` function is very useful.

--

### Code Blocks

````markdown
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

const message = greet("World");
console.log(message);
```
````

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

const message = greet("World");
console.log(message);
```

--

### Supported Languages

```python
# Python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

```bash
# Bash
#!/bin/bash
for file in *.md; do
    echo "Processing $file"
done
```

```css
/* CSS */
.highlight {
    background-color: #ffeb3b;
    padding: 10px;
    border-radius: 4px;
}
```

---

## Links and Images

--

### Links

```markdown
[OpenAI](https://openai.com)
[Relative link](../other-presentation.md)
[Link with title](https://github.com "GitHub Homepage")

Auto-links: https://www.google.com
Email: contact@example.com
```

[OpenAI](https://openai.com)  
[Relative link](../other-presentation.md)  
[Link with title](https://github.com "GitHub Homepage")

Auto-links: https://www.google.com  
Email: contact@example.com

--

### Images

```markdown
![Alt text](https://via.placeholder.com/400x200)
![Local image](./images/diagram.png)
![Image with title](image.jpg "Hover title")
```

![Sample Image](https://via.placeholder.com/400x200/4CAF50/white?text=Sample+Image)

--

### Image with Links

```markdown
[![Image](image.jpg)](https://example.com)
```

[![Clickable Image](https://via.placeholder.com/200x100/2196F3/white?text=Click+Me)](https://example.com)

---

## Tables

--

### Basic Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data A   | Data B   |
| Row 2    | Data C   | Data D   |
```

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data A   | Data B   |
| Row 2    | Data C   | Data D   |

--

### Table Alignment

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |
```

| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |

--

### Complex Tables

```markdown
| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Users   | 5     | 50  | Unlimited  |
| Storage | 1GB   | 10GB| 1TB        |
| Support | Email | Chat| Phone      |
| Price   | Free  | $9  | $99        |
```

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Users   | 5     | 50  | Unlimited  |
| Storage | 1GB   | 10GB| 1TB        |
| Support | Email | Chat| Phone      |
| Price   | Free  | $9  | $99        |

---

## Mathematical Expressions

--

### Inline Math

```markdown
The equation $E = mc^2$ is famous.
Use $\sum_{i=1}^{n} x_i$ for summation.
```

The equation $E = mc^2$ is famous.  
Use $\sum_{i=1}^{n} x_i$ for summation.

--

### Block Math

```markdown
$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

$$
\begin{align}
f(x) &= x^2 + 2x + 1 \\
     &= (x + 1)^2
\end{align}
$$
```

$$\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

---

## Special Features

--

### Speaker Notes

Add notes that only you can see during presentation:

```markdown
# Slide Title

Slide content that audience sees.

Note:
These are speaker notes. Press 'S' during presentation to view.
You can write multiple lines of notes here.
```

**Press 'S' during presentation to view speaker notes**

--

### Fragments (Animations)

```markdown
- First point <!-- .element: class="fragment" -->
- Second point <!-- .element: class="fragment" -->
- Third point <!-- .element: class="fragment" -->
```

- First point <!-- .element: class="fragment" -->
- Second point <!-- .element: class="fragment" -->
- Third point <!-- .element: class="fragment" -->

--

### Background Colors

```markdown
<!-- .slide: data-background="#ff6b6b" -->

# Slide with Red Background

Content with custom background
```

--

### Background Images

```markdown
<!-- .slide: data-background="image.jpg" -->

# Slide with Background Image

Text over background image
```

---

## Emojis and Icons

--

### Emojis

```markdown
🚀 Rocket for launches
💡 Lightbulb for ideas  
🎯 Target for goals
📊 Chart for data
🔒 Lock for security
⚡ Lightning for speed
✅ Checkmark for completion
❌ X for errors
```

🚀 Rocket for launches  
💡 Lightbulb for ideas  
🎯 Target for goals  
📊 Chart for data  
🔒 Lock for security  
⚡ Lightning for speed  
✅ Checkmark for completion  
❌ X for errors

--

### Icon Fonts

If you include Font Awesome or similar:

```html
<i class="fas fa-rocket"></i> Launch
<i class="fas fa-code"></i> Development  
<i class="fas fa-chart-bar"></i> Analytics
```

---

## Layout and Styling

--

### HTML in Markdown

```markdown
<div style="display: flex; justify-content: space-between;">
<div style="width: 48%;">

### Left Column
- Point 1
- Point 2

</div>
<div style="width: 48%;">

### Right Column  
- Point A
- Point B

</div>
</div>
```

--

### CSS Classes

```markdown
# Title {.custom-title}

Content with custom styling <!-- .element: class="highlight" -->

<div class="two-columns">
Left content | Right content
</div>
```

---

## Best Practices

--

### Slide Design

✅ **Do:**
- Keep slides simple and focused
- Use consistent formatting
- Limit text per slide
- Use high contrast colors
- Include speaker notes

❌ **Don't:**
- Overcrowd slides with text
- Use too many animations
- Mix too many fonts/styles
- Put everything on one slide

--

### Content Structure

```markdown
# Clear, descriptive titles

## Use hierarchy properly

- Bullet points for lists
- **Bold** for emphasis
- `Code` for technical terms

> Quotes for important statements
```

--

### Navigation Tips

- Use `---` for main topics
- Use `--` for supporting details
- Group related content vertically
- Keep horizontal flow logical
- Test navigation flow

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Space/Arrow** | Navigate slides |
| **S** | Speaker notes view |
| **F** | Fullscreen mode |
| **ESC** | Slide overview |
| **B** | Blackout screen |
| **?** | Help menu |

---

## Example Templates

--

### Simple Presentation

```markdown
# My Presentation

Brief introduction

---

## Topic 1

Key points here

---

## Topic 2  

More content

---

## Questions?

Thank you!
```

--

### Technical Presentation

```markdown
# Technical Deep Dive

Overview of the system

---

## Architecture

```javascript
const system = {
    frontend: 'React',
    backend: 'Node.js',
    database: 'PostgreSQL'
};
```

---

## Implementation

Step-by-step walkthrough

---

## Demo

Live coding session
```

---

## Resources

- 📖 [Reveal.js Documentation](https://revealjs.com/)
- 📝 [Markdown Guide](https://www.markdownguide.org/)
- 🎨 [Presentation Design Tips](https://www.canva.com/learn/presentation-design/)
- 🎯 [Public Speaking Tips](https://www.toastmasters.org/)

---

## Practice Exercise

Create a 3-slide presentation with:

1. **Title slide** with your name
2. **Content slide** with code example  
3. **Thank you slide** with contact info

Use different formatting techniques!

---

## Questions?

**Happy presenting!** 🎉

Note:
Remember that good presentations focus on the audience, not the presenter. Keep slides simple, practice your delivery, and engage with your audience.