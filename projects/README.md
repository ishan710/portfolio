# Projects Folder

This folder contains individual JSON files for each project displayed in your portfolio.

## Structure

```
projects/
├── README.md                    (this file)
├── project-template.json        (template for new projects)
├── terminal-portfolio.json      (project 1)
├── command-interface.json       (project 2)
├── ascii-generator.json         (project 3)
└── monospace-ui.json           (project 4)
```

## How to Add a New Project

1. **Copy the template:**
   ```bash
   cp project-template.json your-project-name.json
   ```

2. **Edit the new file** with your project details:
   - `id`: Unique identifier (use kebab-case, e.g., "my-awesome-project")
   - `title`: Display name
   - `description`: Short one-liner description
   - `year`: Year of completion
   - `tags`: Array of technology tags
   - `details`: Full project description (supports markdown-like formatting)

3. **Update index.html** to include your project in the projects list:
   - Find the `<div class="projects-list">` section
   - Add a new project card with `data-project="your-project-id"`

4. **Update script.js** to load your project:
   - Find the `loadProjects()` function
   - Add your project ID to the `projectIds` array

## JSON Format

Each project file should follow this structure:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "description": "Short description",
  "year": "2025",
  "tags": ["Tech1", "Tech2", "Tech3"],
  "details": "Full project details with \\n for line breaks"
}
```

## Tips

- Use `\n` for line breaks in the details field
- Keep descriptions concise (1-2 sentences)
- Use 2-4 relevant tags
- The details field supports code-like formatting
- Include links to GitHub, live demos, etc. in the details

## Examples

See the existing project files for formatting examples:
- `terminal-portfolio.json` - README style
- `command-interface.json` - Documentation style
- `ascii-generator.json` - Python script style
- `monospace-ui.json` - Design system style

