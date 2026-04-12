# Agent Prompts Guide

This folder contains the prompt files that define the parent agent and its subagents for this repository.

These files are not application code. They are operating instructions for agents.

## How To Read This Folder

Read these files in this order:

1. [../copilot-instructions.md](../copilot-instructions.md)
   Shared global rules for all agents.
2. [orchestrator.agent.md](./orchestrator.agent.md)
   The parent agent.
3. [planner.agent.md](./planner.agent.md)
   The planning subagent.
4. The ownership-based coding agents.
5. [reviewer.agent.md](./reviewer.agent.md)
   The final review layer.

## Why These Files Exist

In a multi-agent repo, the main problem is not "how do I get more agents?"

The main problem is:
- how do I keep agents from overlapping
- how do I make their output predictable
- how do I ensure each agent edits the right files

These prompt files solve that by making responsibilities explicit.

## Agent Roles

- [orchestrator.agent.md](./orchestrator.agent.md)
  Parent agent. It plans the work sequence, assigns file-scoped tasks, and coordinates validation.

- [planner.agent.md](./planner.agent.md)
  Planning subagent. It studies the repo and converts a request into steps, file assignments, dependencies, and validation needs.

- [model-coder.agent.md](./model-coder.agent.md)
  Owns model-layer files. See canonical ownership map in `demo-repo/ARCHITECTURE.md`.

- [service-coder.agent.md](./service-coder.agent.md)
  Owns service-layer files. See canonical ownership map in `demo-repo/ARCHITECTURE.md`.

- [api-coder.agent.md](./api-coder.agent.md)
  Owns API-layer files. See canonical ownership map in `demo-repo/ARCHITECTURE.md`.

- [test-coder.agent.md](./test-coder.agent.md)
  Owns test files. See canonical ownership map in `demo-repo/ARCHITECTURE.md`.

- [reviewer.agent.md](./reviewer.agent.md)
  Checks final completeness, validation status, and scope drift.

- [coder.agent.md](./coder.agent.md)
  Fallback implementation agent for work that does not fit the specialized ownership model cleanly.

## Demo Agents

- [demo-orchestrator.agent.md](./demo-orchestrator.agent.md)
  Lightweight parent agent for live collaboration demos.

- [demo-planner.agent.md](./demo-planner.agent.md)
  Short, presentation-focused planner for demo runs.

- [demo-flow.md](./demo-flow.md)
  Quick script for showing end-to-end subagent coordination.

## Design Principles

This repo uses a strict approach:
- one parent agent
- a few narrow subagents
- file ownership over personality
- validation before completion

That is intentional. For a small codebase, broad agent freedom usually creates collisions. Clear file boundaries create better results.

## Example Request

Request:
"Add an optional dueDate field to todos and update tests."

Expected flow:
1. Orchestrator asks Planner for a plan.
2. Planner assigns model, service, and test work to separate owners.
3. Model Coder updates `demo-repo/src/models/todo.ts`.
4. Service Coder updates `demo-repo/src/services/todoService.ts`.
5. Test Coder updates `demo-repo/src/__tests__/todoService.test.ts`.
6. Reviewer checks completeness and validation.

That is the working definition of agent/subagent behavior in this repository.
