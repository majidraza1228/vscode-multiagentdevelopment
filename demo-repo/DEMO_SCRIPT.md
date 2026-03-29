# Live Demo Script — Multi-Agent VS Code

Estimated time: 12–15 minutes
Repo: this project (`multiagent-demo`)

---

## Setup (before the talk)

1. Open this repo in VS Code
2. Have two VS Code windows ready side-by-side — one for the "main" workspace, one to show a background worktree
3. Make sure GitHub Copilot is signed in and Agent Mode is enabled
4. Pre-open the model picker so the audience can see Claude / GPT / Gemini options
5. Have the GitHub repo open in a browser tab (for the Actions demo)

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

## Demo 3 — Background Agent (Slide 6 / 7)

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

## Demo 4 — MCP: Agent Sees & Fixes Its Own Output (Slide 10)

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

## Demo 5 — GitHub Actions Trigger (Slide 14)

**Narration:** "Finally — triggering an agent from a GitHub event. No VS Code open required."

1. Go to the GitHub repo in your browser
2. Create a new issue with this body:
   ```
   ## Task
   Add a DELETE /todos/:id endpoint.

   ## Files in scope
   src/routes/todos.ts, src/controllers/todoController.ts, src/__tests__/

   ## Acceptance criteria
   - Returns 204 on success
   - Returns 404 for unknown id
   - Test coverage for both cases
   ```
3. Add the `agent-task` label
4. Show the Actions tab — the workflow fires
5. Say: *"A developer filed an issue. No one touched VS Code. A draft PR will appear."*
6. (If time allows) show the draft PR that was opened

---

## Wrap-Up Line

*"What you just saw — parallel agents, shared instructions, MCP tool loops, GitHub-triggered PRs — this is not a demo project. This is a pattern you can set up in your real repo this afternoon. The files are all in here."*

Point to the repo.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Agent Mode not available | Check Copilot version — needs latest VS Code Insiders or stable ≥1.96 |
| Background tasks not showing | Enable in Settings → Copilot → Background Agents |
| MCP servers not loading | Reload VS Code window after editing mcp.json |
| GitHub Actions not firing | Check that the workflow YAML uses the correct label name exactly |
