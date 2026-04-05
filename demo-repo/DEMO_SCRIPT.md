# Live Demo Script — Multi-Agent VS Code

Estimated time: 12–15 minutes
Repo: this project (`multiagent-demo`)

---

## Setup (before the talk)

1. Open this repo in VS Code
2. Have two VS Code windows ready side-by-side — one for the "main" workspace, one to show a background worktree
3. Make sure GitHub Copilot is signed in and Agent Mode is enabled
4. Pre-open the model picker so the audience can see Claude / GPT / Gemini options
5. Be ready to show the root `.github/agents/` folder and `demo-repo/src/` side by side

---

## Demo 1 — Chat Mode vs Agent Mode (Slide 4)

**Narration:** "Let me show you the difference between Chat and Agent Mode in 60 seconds."

**Chat Mode:**
1. Open Copilot Chat (Ctrl+Alt+I)
2. Ask: `"What does the createTodo function do?"`
3. Show the response — it explains, but touches nothing

**Agent Mode:**
1. Switch to Agent Mode in the chat panel (click the mode selector)
2. Ask: `"Add a dueDate optional field to the Todo interface and update the service and tests"`
3. Let it run — show it opening multiple files (todo.ts, todoService.ts, test file) autonomously
4. Point out: it ran without you clicking through each file

**Key line to say:** *"Chat Mode answers. Agent Mode acts."*

---

## Demo 2 — The copilot-instructions.md in Action (Slide 13)

**Narration:** "Now watch what the instructions file actually does."

1. Open `.github/copilot-instructions.md` — show it to the audience briefly
2. In Agent Mode, ask: `"Add a priority field — high, medium, low — to todos"`
3. As it runs, call out:
   - It used `const` not `let` (style rule)
   - It added a test automatically (testing rule)
   - It didn't touch `package.json` (scope rule)
4. Highlight: *"Without this file, it would have guessed every one of those decisions."*

---

## Demo 3 — Parent Agent And Subagents

**Narration:** "This repo is not just using one agent. It is showing how to structure parent and subagent responsibilities."

1. Open `.github/agents/orchestrator.agent.md`
2. Explain: this is the parent agent that plans phases and delegates by file ownership
3. Open `.github/agents/planner.agent.md`
4. Explain: this agent turns a request into steps, dependencies, and file assignments
5. Open `model-coder.agent.md`, `service-coder.agent.md`, and `test-coder.agent.md`
6. Explain: these are narrow subagents with hard ownership boundaries
7. Key line: *"The important pattern is not more agents. The important pattern is clearer ownership."*

---

## Demo 4 — Background Agent (Slide 6 / 7)

**Narration:** "Now I want to show tasks running in parallel while I keep working."

1. In VS Code, open the Command Palette → `Copilot: New Background Task`
2. Paste this spec as the task:
   ```
   Add a GET /todos?completed=true filter endpoint.
   Scope: src/routes/todos.ts, src/controllers/todoController.ts, src/__tests__/
   Follow copilot-instructions.md conventions.
   Return a draft PR.
   ```
3. Hit send — show it spinning up in the background (Agent Sessions panel)
4. Say: *"It's working in an isolated worktree. My files are untouched."*
5. Switch back to your main workspace — make a small unrelated edit to show you're not blocked
6. When the agent finishes, click in to review the diff
7. Show the diff — highlight: clean, well-structured, matches your style

---

## Demo 5 — MCP: Agent Sees & Fixes Its Own Output (Slide 10)

**Narration:** "The last piece — giving the agent tools to validate its own work."

1. Open `.vscode/mcp.json` — show the three servers (Playwright, GitHub, Fetch)
2. In Agent Mode, ask: `"Write a test that calls the /todos endpoint and check the response shape using Playwright"`
3. Show the agent:
   - Writing the test
   - Calling the terminal MCP to run `npm test`
   - Reading the failure
   - Self-correcting and re-running
4. Key line: *"It didn't stop at writing. It ran, saw the failure, and fixed it. That loop used to be you."*

---

## Wrap-Up Line

*"What you just saw — shared instructions, parent and subagent boundaries, background work, and MCP tool loops — this is a pattern you can set up in your real repo this afternoon. The files are all in here."*

Point to the repo.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Agent Mode not available | Check Copilot version — needs latest VS Code Insiders or stable ≥1.96 |
| Background tasks not showing | Enable in Settings → Copilot → Background Agents |
| MCP servers not loading | Reload VS Code window after editing mcp.json |
| Agents editing too much at once | Narrow the task spec and list files in scope explicitly |
