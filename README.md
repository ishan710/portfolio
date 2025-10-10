# ASCII Terminal Portfolio Website

A stunning retro ASCII/terminal-style portfolio website with modern animations and interactions.

## 🚀 Features

### Visual Design
- **Retro Terminal Aesthetic**: Black background with neon green/cyan ASCII elements
- **ASCII Art**: Custom ASCII logo and decorative elements throughout
- **Animated Effects**:
  - Flickering ASCII text
  - Static noise overlay for authenticity
  - Glitch effects on text
  - Floating ASCII particles background
  - Smooth hover animations

### Sections
1. **Hero Section**: Large ASCII logo with terminal typing animation
2. **About Section**: Code-style presentation with animated ASCII figure
3. **Services Section**: 4 service cards with ASCII icons and hover effects
4. **Contact Section**: Terminal-style contact form with real-time feedback
5. **Responsive Navigation**: Fixed header with smooth scroll links

### Interactions
- Terminal-style typing animation
- Smooth scroll navigation
- Scroll-triggered section reveals
- Interactive floating symbols that respond to mouse movement
- Service card hover effects
- Form submission with terminal feedback
- **Easter Egg**: Konami Code (↑↑↓↓←→←→BA) for a surprise!

## 📁 File Structure

```
portfolio-website/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # JavaScript for interactivity
└── README.md       # This file
```

## 🎨 Customization Guide

### 1. Personal Information

**In `index.html`**, update the following:

**Header Logo** (line 24):
```html
<span class="glitch" data-text="[YOUR_NAME]">[YOUR_NAME]</span>
```

**About Section** (lines 91-108):
- Change the name, role, passion, and skills in the code block
- Update the about text paragraphs

**Contact Information** (lines 329-351):
- Update email, GitHub, LinkedIn, and Twitter links

### 2. Services/Projects

**In `index.html`** (lines 168-274), modify the service cards:
- Change service titles
- Update descriptions
- Modify technology tags
- Customize ASCII icons

### 3. Color Scheme

**In `styles.css`** (lines 13-20), adjust CSS variables:
```css
--color-bg: #0a0a0a;          /* Background color */
--color-primary: #00ff00;      /* Main accent (green) */
--color-secondary: #00ffff;    /* Secondary accent (cyan) */
--color-text: #c0c0c0;         /* Body text */
--color-text-bright: #ffffff;  /* Headings */
--color-accent: #ff00ff;       /* Magenta accent */
--color-highlight: #ffff00;    /* Yellow highlights */
```

### 4. ASCII Art

You can create custom ASCII art for:
- **Hero Logo** (lines 43-57 in HTML)
- **About Figure** (lines 131-140)
- **Service Icons** (throughout services section)

Use online ASCII art generators or create your own!

### 5. Typing Animation Text

**In `script.js`** (lines 65-70), change the typing messages:
```javascript
const texts = [
    'Your custom message 1...',
    'Your custom message 2...',
    'Your custom message 3...',
];
```

## 🛠 Setup & Usage

### Local Development

1. **Simply open `index.html` in a web browser**
   - Double-click the file, or
   - Right-click → Open with → Your browser

2. **Or use a local server** (recommended for testing):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js with npx
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```
   
   Then visit `http://localhost:8000`

### Deployment

Deploy to any static hosting service:

**GitHub Pages:**
1. Create a repository
2. Push these files
3. Enable GitHub Pages in settings

**Netlify/Vercel:**
1. Drag and drop the folder
2. Instant deployment!

**Traditional Hosting:**
- Upload all files via FTP
- Ensure `index.html` is in the root directory

## 🎯 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- Desktop: 1200px+
- Tablet: 768px - 968px
- Mobile: < 768px

## 🎮 Easter Eggs

1. **Konami Code**: Type ↑↑↓↓←→←→BA to activate a special effect
2. **Console Messages**: Open browser console for hidden messages
3. **Mouse Interactions**: Move your mouse near floating symbols

## 🔧 Advanced Customization

### Add New Sections

Copy an existing section structure and modify:

```html
<section id="new-section" class="section">
    <div class="container">
        <h2 class="section-title">
            <span class="title-bracket">///</span> SECTION_NAME.ext
        </h2>
        <!-- Your content here -->
    </div>
</section>
```

Don't forget to add navigation link!

### Modify Animations

**ASCII Particle Speed** (script.js, line 23):
```javascript
this.speed = Math.random() * 0.5 + 0.2; // Adjust multipliers
```

**Typing Speed** (script.js, line 80):
```javascript
typeSpeed = 100; // Milliseconds per character
```

**Glitch Intensity** (styles.css, lines 181-183):
```css
left: 2px;  /* Increase for more offset */
text-shadow: -2px 0 var(--color-secondary); /* Adjust blur */
```

### Form Integration

The contact form currently simulates submission. To connect to a real backend:

**In `script.js`** (line 193), uncomment and modify:
```javascript
fetch('/api/contact', {
    method: 'POST',
    body: formData
})
```

**Or use services like:**
- Formspree: https://formspree.io
- Netlify Forms: Built-in with Netlify
- EmailJS: https://www.emailjs.com

## 💡 Performance Tips

1. **Optimize Canvas Particles**: Reduce `particleCount` (script.js, line 48) on mobile
2. **Disable Heavy Animations**: Use `prefers-reduced-motion` media query
3. **Lazy Load Images**: If you add images, use lazy loading
4. **Minify Files**: Use tools like UglifyJS and CSSNano for production

## 🎨 ASCII Character Reference

Common ASCII characters used:
```
Box Drawing: ╔ ╗ ╚ ╝ ═ ║ ╠ ╣ ╦ ╩ ╬
Triangles: ▲ ▼ ◢ ◣ ◤ ◥
Blocks: ■ □ ▓ ▒ ░
Circles: ● ○ ◉ ◎
Lines: ─ │ ╱ ╲ ┼
Arrows: ← → ↑ ↓ ↔ ↕
Symbols: ★ ☆ ✦ ⚡ ⚙ ▸
```

## 📝 License

Feel free to use this template for your personal or commercial projects!

## 🤝 Support

If you encounter issues:
1. Check browser console for errors
2. Ensure all files are in the same directory
3. Test in a different browser
4. Clear browser cache

## 🎉 Credits

Inspired by retro terminal aesthetics and the "Imagine Enosta" Dribbble design.

---

**Built with ❤️ using HTML, CSS, and vanilla JavaScript**

*No frameworks, no dependencies, just pure code!*

