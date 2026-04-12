# VS Code Multi-Agent Development

This repository is a teaching repo for developers who want to understand how to structure a codebase for agent and subagent workflows in VS Code.

It has two jobs:
- show the application code that agents work on
- show the instruction files that control how agents should behave

The important idea is simple: this repo does not treat "multi-agent" as magic. It treats it as disciplined task decomposition, file ownership, and shared instructions.

## How To Read This Repo

Read the repository in this order:

1. [README.md](./README.md)
   This file explains the full repo and how the pieces fit together.
2. [.github/copilot-instructions.md](./.github/copilot-instructions.md)
   This is the shared contract for all agents.
3. [.github/agents/README.md](./.github/agents/README.md)
   This explains the parent agent and the specialized subagents.
4. [demo-repo/ARCHITECTURE.md](./demo-repo/ARCHITECTURE.md)
   This explains the application boundaries inside the sample Todo API.
5. [demo-repo/DEMO_SCRIPT.md](./demo-repo/DEMO_SCRIPT.md)
   This shows how to demo or teach the pattern live.

After that, read the code under `demo-repo/src/`.

## What Multi-Agent Means In This Repo

In this repository, a multi-agent system means:
- one parent agent decides how to break work down
- subagents own narrow file scopes
- shared instructions keep all agents aligned
- validation happens before the work is considered complete

The goal is not to have many agents. The goal is to have the minimum number of agents with clear ownership.

For this repo, the ownership model is:
- model changes -> model subagent
- business logic changes -> service subagent
- route/controller changes -> API subagent
- test changes -> test subagent
- integration review -> reviewer subagent

That is safer than a single generic coder editing everything at once.

## Parent/Subagent Flow

```text
Developer Request
       |
       v
Orchestrator Agent
       |
       v
Planner Agent
       |
       v
Execution Phases
       |
       +-------------------+-------------------+-------------------+
       |                   |                   |                   |
       v                   v                   v                   v
Model Coder         Service Coder         API Coder          Test Coder
src/models/**       src/services/**       src/routes/**      src/__tests__/**
                                          src/controllers/**
                                          src/index.ts
       \                   |                   |                  /
        \                  |                   |                 /
         \                 |                   |                /
          +---------------------------------------------------+
                              |
                              v
                        Reviewer Agent
                              |
                              v
                        Final Validated Result
```

The important design rule is that each subagent should own a narrow file boundary. The orchestrator should only run subagents in parallel when their write scopes do not overlap.

## Repository Layout

```text
.
├── .github/
│   ├── copilot-instructions.md
│   └── agents/
│       ├── README.md
│       ├── orchestrator.agent.md
│       ├── planner.agent.md
│       ├── model-coder.agent.md
│       ├── service-coder.agent.md
│       ├── api-coder.agent.md
│       ├── test-coder.agent.md
│       ├── reviewer.agent.md
│       └── coder.agent.md
├── demo-repo/
│   ├── .vscode/
│   │   └── mcp.json
│   ├── ARCHITECTURE.md
│   ├── DEMO_SCRIPT.md
│   ├── package.json
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── models/
│       ├── services/
│       ├── __tests__/
│       └── index.ts
└── README.md
```

## What Each Markdown File Does

### Root docs

- [README.md](./README.md)
  The top-level guide. It explains the repo structure, the multi-agent pattern, and the reading order for new developers.

- [.github/copilot-instructions.md](./.github/copilot-instructions.md)
  The global rules file for all agents. It defines project layout, commands, architecture boundaries, coding conventions, testing expectations, and scope limits.

- [.github/agents/README.md](./.github/agents/README.md)
  The guide to the agent prompt files. It explains what each specialized agent is responsible for and when it should be used.

### Agent prompt files

- [.github/agents/orchestrator.agent.md](./.github/agents/orchestrator.agent.md)
  The parent agent. It plans, phases work, delegates to subagents, prevents file conflicts, and ensures review happens.

- [.github/agents/planner.agent.md](./.github/agents/planner.agent.md)
  The planning agent. It reads the repo, identifies affected files, and turns a request into an execution plan.

- [.github/agents/model-coder.agent.md](./.github/agents/model-coder.agent.md)
  Owns `demo-repo/src/models/**`.

- [.github/agents/service-coder.agent.md](./.github/agents/service-coder.agent.md)
  Owns `demo-repo/src/services/**`.

- [.github/agents/api-coder.agent.md](./.github/agents/api-coder.agent.md)
  Owns `demo-repo/src/routes/**`, `demo-repo/src/controllers/**`, and `demo-repo/src/index.ts`.

- [.github/agents/test-coder.agent.md](./.github/agents/test-coder.agent.md)
  Owns `demo-repo/src/__tests__/**`.

- [.github/agents/reviewer.agent.md](./.github/agents/reviewer.agent.md)
  Reviews the final result for correctness, scope drift, missing validation, and integration risk.

- [.github/agents/coder.agent.md](./.github/agents/coder.agent.md)
  A fallback implementation agent. Use it only when the task does not fit a narrower ownership-based subagent.

### App docs

- [demo-repo/ARCHITECTURE.md](./demo-repo/ARCHITECTURE.md)
  The application architecture. It explains the Router -> Controller -> Service -> Store flow and tells agents where business logic belongs.

- [demo-repo/DEMO_SCRIPT.md](./demo-repo/DEMO_SCRIPT.md)
  A guided walkthrough for teaching or demoing the repo in VS Code.

## Why The Root `.github` Exists

The root `.github/` folder is the instruction layer for the whole repository.

It should stay at the root because:
- this is the actual Git repository root
- the agent prompts apply to the whole repo
- `demo-repo/` is the sample application inside the repo, not a separate repository

There should not be a separate `demo-repo/.github/` unless `demo-repo/` becomes its own standalone Git repository later.

## How A Developer Should Use This Repo

If you are new to multi-agent development, use this mental model:

1. The application code lives in `demo-repo/src/`.
2. The rules for all agents live in `.github/copilot-instructions.md`.
3. The behavior of each agent role lives in `.github/agents/*.agent.md`.
4. The parent agent should split work by file ownership, not by vague skill labels.
5. Small, scoped tasks are the default.

Example:

If the request is "add a dueDate field to todos":
- planner identifies affected files
- model coder updates the model types
- service coder updates business logic
- test coder updates tests
- reviewer checks that the change is complete and validated

That is the core multi-agent pattern this repo is designed to teach.

## Developer Workflow

From `demo-repo/`:

```bash
npm install
npm test
npm run lint
```

When assigning work to an agent:
- give a narrow task
- list files in scope
- avoid asking one agent to restructure the project
- require tests when behavior changes

## Current Scope Of This Repo

This repository currently focuses on:
- local and background agent workflows in VS Code
- shared agent instructions
- parent/subagent decomposition
- MCP-based tooling for agent workflows

It does not currently include an active GitHub Actions automation workflow in the checked-in root `.github/` folder. If you want cloud-triggered agents, that can be added later as a separate documented layer.

## Summary

This repo is easiest to understand if you treat it as two connected systems:
- `demo-repo/` is the code agents change
- `.github/` is the control plane that tells agents how to work

That separation is the main lesson for developers adopting multi-agent workflows in a real project.
