# Subagent Demo Runbook

This runbook shows how to demonstrate parent/subagent collaboration in this repository.

## Prerequisites

1. Open the repository root:
   - `/Users/syedraza/vscode-multiagentdevelopment`
2. Ensure the demo agent files exist:
   - `.github/agents/demo-orchestrator.agent.md`
   - `.github/agents/demo-planner.agent.md`

## Demo Goal

Show a full collaboration loop:

1. Parent agent creates a plan
2. Subagents implement by ownership
3. Test agent validates behavior changes
4. Reviewer confirms integration quality

## Suggested Demo Prompt

Use this in Copilot Chat:

```text
Use Demo Orchestrator to coordinate subagents and implement one small Todo API change end-to-end with tests. Keep edits scoped and show phase-by-phase ownership.
```

## Recommended Demo Script

1. Ask the Demo Orchestrator to start.
2. Show the Planner output first (implementation steps + ownership).
3. Show one implementation subagent response (Model/Service/API/Test).
4. Show Reviewer output at the end.
5. Highlight:
   - non-overlapping file scopes
   - phase sequencing
   - validation handoff

## What “Good” Looks Like

- The parent agent delegates to specialized subagents.
- Each subagent edits only its owned files.
- Tests are updated when behavior changes.
- Reviewer flags scope drift or missing validation before completion.
