# VS Code Multi-Agent Development

A demo repository for the **"Multi-Agent Development in VS Code"** talk — showing how to build a massively parallel, GitHub-native AI workflow using GitHub Copilot, git worktrees, MCP servers, and GitHub Actions.

> **Talk resources:** [Presentation slides](./DEMO_SCRIPT.md) · [Live demo script](./DEMO_SCRIPT.md)

---

## What This Repo Demonstrates

| Pattern | File | What it shows |
|---|---|---|
| Agent instructions | `.github/copilot-instructions.md` | The single file that makes every Copilot agent follow your project's rules |
| PR conventions | `.github/PULL_REQUEST_TEMPLATE.md` | Enforces consistent PR descriptions automatically |
| GitHub Actions trigger | `.github/workflows/copilot-agent.yml` | Label an issue `agent-task` → Copilot raises a draft PR autonomously |
| MCP servers | `.vscode/mcp.json` | Playwright, GitHub, and Fetch tools wired up for agents |
| Demo codebase | `src/` | A TypeScript Todo API for agents to work on live |
| Architecture guide | `ARCHITECTURE.md` | Scope boundaries so agents edit the right files |
| Demo walkthrough | `DEMO_SCRIPT.md` | Step-by-step script with exact prompts to use on stage |

---

## Getting Started

### Prerequisites

- [VS Code](https://code.visualstudio.com/) with [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension
- Node.js 20+
- A GitHub account with Copilot access

### Setup

```bash
git clone https://github.com/majidraza1228/vscode-multiagentdevelopment.git
cd vscode-multiagentdevelopment
npm install
```

### Run the tests

```bash
npm test
```

### Run linting

```bash
npm run lint
```

---

## Key Concepts

### 1. The `copilot-instructions.md` File

The most important file in this repo. Located at `.github/copilot-instructions.md`, it gives every Copilot agent a shared briefing before it touches your code — covering stack, style rules, testing conventions, scope limits, and PR format.

**Without it:** agents guess your conventions.
**With it:** every agent, every developer, follows the same rules automatically.

### 2. Agent Mode vs Chat Mode

| | Chat Mode | Agent Mode | Agent + MCP |
|---|---|---|---|
| **What it does** | Answers questions | Edits files, runs commands | Full autonomous loop |
| **Best for** | Explaining code | Implementing features | Zero-touch workflows |
| **Activates** | Default | Mode selector in Copilot panel | `.vscode/mcp.json` configured |

### 3. Git Worktree Isolation

Background agents spin up in isolated git worktrees — they can't break your open workspace. If an agent produces bad output, you simply discard the worktree. Main branch is always stable.

### 4. MCP Servers

The `.vscode/mcp.json` file wires up three Model Context Protocol servers:

- **Playwright MCP** — browser control + screenshots for visual validation
- **GitHub MCP** — read issues, create branches, raise PRs
- **Fetch MCP** — read documentation and web pages

This gives agents the ability to run, see, and fix their own output — turning code generation into a self-correcting loop.

### 5. GitHub Actions as a Cloud Agent

Add the `agent-task` label to any GitHub issue and the workflow in `.github/workflows/copilot-agent.yml` fires — Copilot picks up the issue body as its spec, implements the change in an isolated worktree, and opens a draft PR for human review. No VS Code required.

---

## Project Structure

```
.
├── .github/
│   ├── copilot-instructions.md      # Agent briefing file — start here
│   ├── PULL_REQUEST_TEMPLATE.md     # Enforces PR conventions
│   └── workflows/
│       └── copilot-agent.yml        # GitHub Actions agent trigger
├── .vscode/
│   └── mcp.json                     # MCP server configuration
├── src/
│   ├── models/
│   │   └── todo.ts                  # TypeScript interfaces
│   ├── services/
│   │   └── todoService.ts           # Business logic (agents edit here)
│   └── __tests__/
│       └── todoService.test.ts      # Vitest test suite
├── ARCHITECTURE.md                  # Scope guide for agents
├── DEMO_SCRIPT.md                   # Live demo walkthrough
└── package.json
```

---

## Live Demo Tasks

These are the exact tasks shown in the live demo. You can run them yourself in Agent Mode:

**Task 1 — Add a field:**
```
Add an optional dueDate field (ISO date string) to the Todo interface.
Update the service and tests. Follow copilot-instructions.md conventions.
```

**Task 2 — Add a filter endpoint:**
```
Add a GET /todos?completed=true filter to the todos route.
Scope: src/routes/, src/controllers/, src/__tests__/
Return a draft PR.
```

**Task 3 — Add priority:**
```
Add a priority field (high | medium | low, default medium) to the Todo model.
Update createTodo to accept priority. Add tests for all three values.
```

---

## Model Selection Guide

GitHub Copilot in VS Code gives you access to multiple models via the model picker. A rough guide for this repo:

| Task | Recommended Model |
|---|---|
| Quick questions, explaining code | GPT-4.1 / Gemini Flash |
| Feature implementation, test writing | Claude Sonnet 4.6 |
| Architecture decisions, complex refactoring | Claude Opus 4.6 / o3 |

---

## Talk: Multi-Agent Development in VS Code

This repo accompanies the developer community talk covering:

- Why single-threaded AI assistance no longer scales
- The three execution environments: Local, Background, Cloud
- Git worktree isolation for parallel agents
- Context cleansing with sub-agents
- MCP servers for iterative autonomy
- GitHub Actions as fire-and-forget cloud agents
- Scaling multi-agent workflows across a team

---

## License

MIT
