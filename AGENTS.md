# AGENTS.md

- To regenerate the JavaScript SDK, run `./packages/sdk/js/script/build.ts`.
- ALWAYS USE PARALLEL TOOLS WHEN APPLICABLE.
- The default branch in this repo is `dev`.
- Local `main` ref may not exist; use `dev` or `origin/dev` for diffs.
- Prefer automation: execute requested actions without confirmation unless blocked by missing info or safety/irreversibility.
- This is a fork of [anomalyco/opencode](https://github.com/anomalyco/opencode) that builds the desktop app (`.deb`) for Ubuntu 22.04. The upstream remote is `upstream`.

## Project Structure

- **Monorepo** managed with Bun workspaces + Turborepo
- `packages/opencode` — Core CLI, business logic, and server (TypeScript/Bun)
- `packages/app` — Shared web UI components (SolidJS)
- `packages/desktop` — Native desktop app (Tauri/Rust wrapping `packages/app`)
- `packages/plugin` — Source for `@opencode-ai/plugin`
- `packages/sdk/js` — JavaScript SDK
- `.github/workflows/` — Fork-specific CI for Ubuntu 22.04 desktop builds

## Build & Dev Commands

```bash
# Install dependencies (from repo root)
bun install

# Development
bun dev                    # Run TUI (targets packages/opencode)
bun dev <directory>        # Run TUI against a specific directory
bun dev .                  # Run TUI against repo root
bun dev serve              # Start headless API server (port 4096)
bun dev serve --port 8080  # Custom port
bun dev web                # Start server + open web interface

# Web app dev (requires server running first)
bun run --cwd packages/app dev

# Desktop app dev
bun run --cwd packages/desktop tauri dev

# Type checking
bun turbo typecheck        # All packages
bun typecheck              # From a package directory (e.g. packages/opencode)

# Build standalone CLI binary
./packages/opencode/script/build.ts --single

# Regenerate SDK after API/server changes
./script/generate.ts
```

## Testing

```bash
# NEVER run tests from repo root — it will fail by design (bunfig.toml guard)
# Always cd into a package directory first:

cd packages/opencode
bun test                          # Run all tests
bun test path/to/file.test.ts     # Run a single test file
bun test --filter "pattern"       # Run tests matching pattern
```

- Avoid mocks as much as possible
- Test actual implementation, do not duplicate logic into tests
- Use `bun test` (Bun's built-in test runner), not Jest/Vitest

## Formatting & Linting

- **Prettier** configured in root `package.json`: `semi: false`, `printWidth: 120`
- **EditorConfig**: 2-space indent, UTF-8, LF line endings, final newline
- No semicolons
- No trailing commas enforcement — follow existing patterns

## Style Guide

### General Principles

- Keep things in one function unless composable or reusable
- Avoid `try`/`catch` where possible; prefer `.catch(...)` on promises
- Avoid using the `any` type — reach for precise types
- Prefer single word variable names where possible
- Use Bun APIs when possible (`Bun.file()`, `Bun.write()`, `Bun.spawn()`)
- Rely on type inference; avoid explicit type annotations unless necessary for exports or clarity
- Prefer functional array methods (`flatMap`, `filter`, `map`) over for loops; use type guards on `filter` to maintain type inference downstream
- Use `path.join`/`path.resolve` for path construction

### Naming

Prefer single word names for variables and functions. Multi-word names only when a single word would be ambiguous.

```ts
// Good
const foo = 1
function journal(dir: string) {}

// Bad
const fooBar = 1
function prepareJournal(dir: string) {}
```

Good short names: `pid`, `cfg`, `err`, `opts`, `dir`, `root`, `child`, `state`, `timeout`.

Reduce variable count by inlining values used only once:

```ts
// Good
const journal = await Bun.file(path.join(dir, "journal.json")).json()

// Bad
const journalPath = path.join(dir, "journal.json")
const journal = await Bun.file(journalPath).json()
```

### Destructuring

Avoid unnecessary destructuring. Use dot notation to preserve context.

```ts
// Good
obj.a
obj.b

// Bad
const { a, b } = obj
```

### Variables

Prefer `const` over `let`. Use ternaries or early returns instead of reassignment.

```ts
// Good
const foo = condition ? 1 : 2

// Bad
let foo
if (condition) foo = 1
else foo = 2
```

### Control Flow

Avoid `else` statements. Prefer early returns.

```ts
// Good
function foo() {
  if (condition) return 1
  return 2
}

// Bad
function foo() {
  if (condition) return 1
  else return 2
}
```

### Imports

- Use ES module imports (`import`/`export`), never CommonJS
- The project is `"type": "module"`
- Bun-specific APIs are available globally (no import needed for `Bun.*`)
- Use `node:` prefix for Node.js built-ins (e.g. `import fs from "node:fs/promises"`)

### File I/O

- Use `Bun.file(path)` for reading files (`.text()`, `.json()`, `.exists()`, `.arrayBuffer()`)
- Use `Bun.write(dest, input)` for writing files
- Use `node:fs/promises` only for directory operations (`mkdir`, `readdir`)
- Use `Bun.Glob` + `Array.fromAsync(glob.scan(...))` for file scanning
- Check `Bun.file(...).exists()` before reading

### Schema Definitions (Drizzle)

Use snake_case for field names so column names don't need to be redefined as strings.

```ts
// Good
const table = sqliteTable("session", {
  id: text().primaryKey(),
  project_id: text().notNull(),
  created_at: integer().notNull(),
})

// Bad
const table = sqliteTable("session", {
  id: text("id").primaryKey(),
  projectID: text("project_id").notNull(),
  createdAt: integer("created_at").notNull(),
})
```

### Error Handling

- Prefer `.catch(...)` over `try`/`catch`
- Avoid swallowing errors silently
- Use typed error returns or Effect patterns where the codebase already uses them
