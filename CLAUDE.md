# Pendolo Forge Studio

## Brand colours

These are the canonical colours for this project. Always use these exact hex values — do not approximate with Tailwind defaults or similar shades.

| Name   | Hex       | Usage                        |
|--------|-----------|------------------------------|
| Cream  | `#fef7ee` | Light sections, hero bg      |
| Teal   | `#43ccbc` | Accent sections              |
| Orange | `#fe7b02` | CTA / statement sections     |
| Purple | `#575ecf` | Statement sections           |
| Footer | `#292929` | Footer background            |
| Black  | `#000000` | Dark statement sections      |

## Typography

The display font for large statement text is **Doto** (Google Fonts). It is already imported in `index.html`. Use it with `font-variation-settings: 'ROND' 0` for the square, angular style.

```css
font-family: 'Doto', sans-serif;
font-variation-settings: 'ROND' 0;
```

Body and UI copy uses **Inter** (already loaded).

## Figma MCP tools

The Figma desktop MCP tools (`mcp__figma-desktop__get_design_context`, `mcp__figma-desktop__get_screenshot`) are **deferred** — their schemas are not loaded by default. Always call `ToolSearch` with `query: "select:mcp__figma-desktop__get_design_context,mcp__figma-desktop__get_screenshot"` before using them, or the call will fail with an `InputValidationError`.

## Layout

- Figma frames are 1920px wide. Convert fixed `px` heights to `min-h-[Xvh]` and fixed font sizes to `clamp()` or responsive Tailwind classes.
- The global `Footer` component is suppressed on `/about` — that page renders its own inline footer.
- Section separators use `border-t border-[#292929]`.

## React best practices

When writing React components, apply `.claude/skills/react-best-practices/SKILL.md`.
