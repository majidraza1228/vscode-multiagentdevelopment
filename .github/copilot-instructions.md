# GitHub Copilot Instructions

## Repository Layout

This is a teaching repository for multi-agent development in VS Code. It has two distinct layers:

- **Root** — Documentation and agent control files: `README.md`, `.github/`, and supporting repo-level materials
- **`demo-repo/`** — The sample TypeScript Todo API that agents work on

All application code, tests, and local tooling live under `demo-repo/`.

The root `.github/` folder is the shared instruction layer for the whole repository.
Do not create a second `.github/` under `demo-repo/` unless `demo-repo/` becomes a separate Git repository.

When working on the application, `cd demo-repo` first.

## Commands (run from `demo-repo/`)

```bash
npm install          # Install dependencies
npm test             # Run full test suite with coverage
npm run test:watch   # Watch mode (Vitest interactive)
npm run lint         # Lint TypeScript source
npm run lint:fix     # Auto-fix lint issues
npm run build        # Compile TypeScript
npm run dev          # Start dev server (ts-node)
```

**Run a single test file:**
```bash
npx vitest run src/__tests__/todoService.test.ts
```

**Run a single test by name:**
```bash
npx vitest run src/__tests__/todoService.test.ts -t "creates a todo"
```

Coverage threshold is **80% lines** — `npm test` will fail below this.

## Architecture

Use `demo-repo/ARCHITECTURE.md` as the canonical source for layer boundaries, ownership, and task scoping.

## Code Conventions

- Use `const` over `let` wherever possible
- Explicitly type all function parameters and return values — no implicit `any`
- Use `async/await` — never raw `.then()` chains
- File naming: `camelCase.ts` for modules, `PascalCase.ts` for classes/controllers
- Named exports only — no default exports

## Testing Conventions

- Every new function in `services/` requires a corresponding test in `__tests__/`
- Test file naming: `<module>.test.ts`
- Group related tests with `describe` blocks
- Mock all external dependencies — never hit real I/O in unit tests
- Use `resetTodoStore()` in `beforeEach` to reset in-memory state between tests

## PR Conventions

Title format: `<type>(<scope>): <short description>`  
Types: `feat`, `fix`, `refactor`, `test`, `chore`  
Example: `feat(todos): add priority field to todo model`

PR body must include: what changed, why, and how to test it.

## Agent Scope Limits

- Do not modify `package.json` or `package-lock.json` without explicit instruction
- Do not add npm dependencies without asking
- Do not touch `.env` or environment configuration
- Do not restructure Express routing without approval
- Scope changes to files mentioned in the task spec
- Prefer ownership-based delegation using the prompts in `.github/agents/`

Typical task scopes are documented in `demo-repo/ARCHITECTURE.md`.

## Agent Structure

This repo uses a parent/subagent pattern:

- `orchestrator.agent.md` is the parent agent
- `planner.agent.md` creates the execution plan
- `model-coder.agent.md` owns model files
- `service-coder.agent.md` owns service files
- `api-coder.agent.md` owns route/controller/server files
- `test-coder.agent.md` owns tests
- `reviewer.agent.md` checks final completeness
- `coder.agent.md` is a fallback only

## Model Selection

| Task | Recommended Model |
|---|---|
| Quick questions, explaining code | GPT-4.1 / Gemini Flash |
| Feature implementation, test writing | Claude Sonnet 4.6 |
| Architecture decisions, complex refactoring | Claude Opus 4.6 / o3 |

## Agent Response Format

All coding subagents should use this response format:

```md
Summary:
Files changed:
Tests run:
Assumptions:
Blockers:
```

## Chronicle and Session-History Guidance

- Before relying on `/chronicle`, ensure experimental features are enabled (`/experimental on` in interactive sessions, or start CLI with `--experimental`).
- When querying session history, scope to this repository/workspace first; if no rows are returned, retry with reasonable cwd/repository variants, then explicitly report that history is insufficient.
- Do not infer or fabricate "recurring" issues from sparse history. Treat a pattern as recurring only if it appears in at least two separate sessions.

## MCP Servers (`.vscode/mcp.json`)

Three servers are pre-configured in `demo-repo/.vscode/mcp.json`:
- **Playwright** — browser control and screenshots
- **GitHub MCP** — read issues, create branches, raise PRs
- **Fetch MCP** — read documentation and web pages
