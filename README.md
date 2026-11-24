# maxencelatrouite.github.io

Personal website of Maxence Latrouite. Plain HTML, CSS and JavaScript, served by GitHub Pages.

## Files

- `index.html`: page structure and fixed text (about, background, contact)
- `projects.js`: **the projects and the CV link**, the only file to edit to add a project
- `main.js`: renders the project list, filters and expandable rows
- `style.css`: styles
- `img/projects/`: project images
- `pdf/`: project reports (student ID numbers and emails removed)

## Add a project

Open `projects.js`, copy the template at the top, paste it into the `PROJECTS` list where it should appear, fill it in and commit. Tag personal projects with `"personal"` and the Personal filter appears on its own.

## Add the CV

Put the PDF in `pdf/` and set `cv: "pdf/your-file.pdf"` at the top of `projects.js`. The CV links stay hidden while it is empty.

## Preview locally

```
python3 -m http.server
```

Then open http://localhost:8000.
