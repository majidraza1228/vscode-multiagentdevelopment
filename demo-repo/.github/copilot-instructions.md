# GitHub Copilot Instructions

## Project Overview
This is a TypeScript REST API for a Todo application built with Express.
- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js 20+
- **Framework**: Express 4.x
- **Testing**: Vitest with coverage thresholds (80% minimum)
- **Linting**: ESLint + Prettier

## Code Style
- Use `const` over `let` wherever possible
- Always type function parameters and return values explicitly — no implicit `any`
- Use `async/await` — never raw `.then()` chains
- File names: `camelCase.ts` for modules, `PascalCase.ts` for classes/controllers
- Export named exports only — no default exports

## Project Structure
```
src/
  controllers/   ← Route handlers (thin, delegate to services)
  services/      ← Business logic
  models/        ← Type definitions and interfaces
  routes/        ← Express router definitions
  __tests__/     ← Test files mirroring src structure
```

## Testing Rules
- Every new function in `services/` **must** have a corresponding test in `__tests__/`
- Test file naming: `<module>.test.ts`
- Use `describe` blocks to group related tests
- Mock all external dependencies — never hit real I/O in unit tests
- Run: `npm test` — coverage threshold is **80%** lines

## What Agents Should NOT Do
- Do not modify `package.json` or `package-lock.json` without explicit instruction
- Do not add new npm dependencies without asking
- Do not touch `.env` or any environment configuration files
- Do not change the Express router structure without approval
- Scope your changes to the files mentioned in the task spec

## PR Conventions
- Title format: `<type>(<scope>): <short description>`
  - Types: `feat`, `fix`, `refactor`, `test`, `chore`
  - Example: `feat(todos): add priority field to todo model`
- Body must include: What changed, Why, How to test
- Always include test coverage in the PR
