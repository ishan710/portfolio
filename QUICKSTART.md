# Quick Start Guide

## Running the Website

Since the website now loads project data from JSON files, you need to run it through a local web server (not just open index.html directly).

### Option 1: Python (Recommended)

If you have Python installed:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Option 2: Node.js

If you have Node.js installed:

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run server
http-server -p 8000
```

Then open: `http://localhost:8000`

### Option 3: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### Option 4: PHP

If you have PHP installed:

```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

## Adding New Projects

1. Copy `projects/project-template.json` to `projects/your-project.json`
2. Edit the new file with your project information
3. Add the project card to `index.html` in the projects section
4. Add the project ID to `script.js` in the `loadProjects()` function

See `projects/README.md` for detailed instructions.

## Project Structure

```
portfolio-website/
├── index.html              # Main HTML file
├── styles.css              # All styles
├── script.js               # All JavaScript
├── projects/               # Project data folder
│   ├── README.md          # Instructions for adding projects
│   ├── project-template.json
│   ├── terminal-portfolio.json
│   ├── command-interface.json
│   ├── ascii-generator.json
│   └── monospace-ui.json
├── QUICKSTART.md          # This file
└── README.md              # Project documentation
```

## Features

- ✅ Terminal-style interface
- ✅ Tab system (click projects to open in tabs)
- ✅ Smooth animations
- ✅ Fully responsive
- ✅ Easy project management via JSON files
- ✅ No build process required

## Customization

- **Personal Info**: Edit `index.html` (name, email, social links)
- **Projects**: Edit/add JSON files in `/projects` folder
- **Colors**: Edit CSS variables in `styles.css` (lines 13-20)
- **Content**: Edit sections in `index.html`

Enjoy your terminal portfolio! 🚀

