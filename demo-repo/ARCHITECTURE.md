# Architecture Overview

## Stack
- **Language**: TypeScript (strict)
- **Runtime**: Node.js 20
- **HTTP**: Express 4
- **Tests**: Vitest
- **Linting**: ESLint

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

Canonical ownership map:
- Model Coder → `src/models/**`
- Service Coder → `src/services/**`
- API Coder → `src/routes/**`, `src/controllers/**`, `src/index.ts`
- Test Coder → `src/__tests__/**`

Responsibility matrix:
- Type/interface shapes and DTO fields → Model Coder
- Input validation and business rules → Service Coder
- HTTP request/response mapping and status codes → API Coder
- Behavior verification and coverage → Test Coder

Do **not** ask agents to restructure the entire project in one task — break it into focused PRs.

## Relation To The Agent Prompts

The root `.github/agents/` folder should map directly to these application boundaries:

- `model-coder.agent.md` -> `src/models/`
- `service-coder.agent.md` -> `src/services/`
- `api-coder.agent.md` -> `src/routes/`, `src/controllers/`, and app wiring
- `test-coder.agent.md` -> `src/__tests__/`

That mapping is the key multi-agent idea in this repo: subagents should be aligned to code ownership boundaries, not just generic roles.
