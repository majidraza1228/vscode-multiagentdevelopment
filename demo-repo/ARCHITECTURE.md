# Architecture Overview

## Stack
- **Language**: TypeScript (strict)
- **Runtime**: Node.js 20
- **HTTP**: Express 4
- **Tests**: Vitest
- **Linting**: ESLint + Prettier

## Layers

```
Request → Router → Controller → Service → (Store/DB)
```

**Router** (`src/routes/`) — defines HTTP paths, no logic
**Controller** (`src/controllers/`) — parses request, calls service, formats response
**Service** (`src/services/`) — all business logic lives here — this is what agents should edit
**Model** (`src/models/`) — TypeScript interfaces only, no logic

## Key Decisions

- **In-memory store**: The current `todoService.ts` uses a `Map` as a store.
  To swap in a real database, replace the Map operations in `todoService.ts` only —
  no other files should change.

- **No ORM**: Kept simple intentionally for demo clarity.

- **No auth**: Out of scope for this demo.

## Agent Task Scope

When assigning tasks to Copilot agents, scope them to:
- Adding fields to the `Todo` interface → update `models/todo.ts` + `services/todoService.ts` + tests
- New endpoints → add to `routes/` + `controllers/` + tests
- Validation logic → `services/todoService.ts` + tests

Do **not** ask agents to restructure the entire project in one task — break it into focused PRs.

## Relation To The Agent Prompts

The root `.github/agents/` folder should map directly to these application boundaries:

- `model-coder.agent.md` -> `src/models/`
- `service-coder.agent.md` -> `src/services/`
- `api-coder.agent.md` -> `src/routes/`, `src/controllers/`, and app wiring
- `test-coder.agent.md` -> `src/__tests__/`

That mapping is the key multi-agent idea in this repo: subagents should be aligned to code ownership boundaries, not just generic roles.
