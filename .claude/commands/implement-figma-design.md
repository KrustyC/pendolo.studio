# Implement Figma design

Implement a Figma design into the current codebase. The argument is either a full Figma URL or a bare node ID (e.g. `341-18`). Sometimes it is like "Implement this design from Figma.
@https://www.figma.com/design/cVEVQjiBxuDNbSO7VGwebG/Pendolo_02?node-id=341-18&m=dev"

## Steps

### 1. Load the Figma MCP tools
Call ToolSearch with `query: "select:mcp__figma-desktop__get_design_context,mcp__figma-desktop__get_screenshot"` to load their schemas before using them.

### 2. Extract the node ID
If the argument is a URL like `https://www.figma.com/design/:fileKey/:fileName?node-id=341-18`, extract `341-18` as the nodeId. If it is already a bare ID, use it directly.

### 3. Fetch design context and screenshot in parallel
Call both tools at the same time:
- `mcp__figma-desktop__get_design_context` with the nodeId, `clientFrameworks` and `clientLanguages` inferred from the project (e.g. `react`, `typescript,css`), `artifactType: "WEB_PAGE_OR_APP_SCREEN"`, `taskType: "CREATE_ARTIFACT"`
- `mcp__figma-desktop__get_screenshot` with the same nodeId

Use the screenshot to understand the full visual intent. Use the generated code as a reference for colors, spacing, layout structure, and text content — not as code to copy directly.

### 4. Understand the target codebase
Before writing any code, read the files that define the project's conventions:
- `package.json` — framework, key dependencies
- `tailwind.config.*` — design tokens, font families, color aliases
- The main CSS file (e.g. `src/index.css`) — custom utilities, CSS variables, font imports
- One or two existing page components — to understand component patterns, layout primitives, and naming conventions
- Any global layout file (e.g. `App.tsx`) — to know what wrappers, navbars, or footers are applied globally so you don't duplicate them

### 5. Identify the target file(s)
Determine whether the design maps to:
- An existing page or component that should be updated, or
- A new file that should be created

Prefer editing existing files over creating new ones.

### 6. Implement faithfully, adapted to the project
Translate the Figma design into the project's actual stack and conventions:
- **Colors**: use exact hex values from Figma, not approximations
- **Typography**: match font family, size, weight, tracking, and line-height from the design. If the Figma uses a font not yet loaded (e.g. `Doto`), add it to the font import in `index.html` or the equivalent entry point
- **Layout**: replicate section heights, spacing, and alignment intent. Convert fixed px values from a 1920px Figma frame to responsive equivalents (`min-h-[Xvh]`, `clamp(...)`, etc.)
- **Section structure**: implement every section in the design, in order, with the correct background color and content
- **Micro-details**: labels (e.g. `PROCESS`, `READY?`), border separators between sections, decorative elements — match these from the design
- Follow the project's existing component patterns (reusable primitives, class naming, file structure)
- Do not install new dependencies unless strictly necessary

While writing React code, apply the rules from `.claude/skills/react-best-practices/SKILL.md`. Read that file now if you haven't already, then use its guidelines to inform component structure, rendering patterns, and any data fetching.

### 7. Verify
Run `npm run build` (or the project's equivalent) to confirm the implementation compiles without errors. Report any issues and fix them before finishing.
