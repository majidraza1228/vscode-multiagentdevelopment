import { randomUUID } from 'crypto'
import { Todo, CreateTodoDto, UpdateTodoDto } from '../models/todo'

// In-memory store — swap for a real DB in production
const todos: Map<string, Todo> = new Map()

function normalizeTitle(title: string): string {
  const normalizedTitle = title.trim()
  if (normalizedTitle === '') {
    throw new Error('Title is required')
  }
  return normalizedTitle
}

export function getAllTodos(): Todo[] {
  return Array.from(todos.values())
}

export function getTodoById(id: string): Todo | undefined {
  return todos.get(id)
}

export function createTodo(dto: CreateTodoDto): Todo {
  const todo: Todo = {
    id: randomUUID(),
    title: normalizeTitle(dto.title),
    completed: false,
    createdAt: new Date(),
  }
  todos.set(todo.id, todo)
  return todo
}

export function updateTodo(id: string, dto: UpdateTodoDto): Todo | undefined {
  const existing = todos.get(id)
  if (!existing) return undefined

  const updatedTitle = dto.title === undefined ? existing.title : normalizeTitle(dto.title)
  const updatedCompleted = dto.completed ?? existing.completed

  const updated: Todo = {
    id: existing.id,
    title: updatedTitle,
    completed: updatedCompleted,
    createdAt: existing.createdAt,
  }
  todos.set(id, updated)
  return updated
}

export function deleteTodo(id: string): boolean {
  return todos.delete(id)
}

// Test helper — reset store between tests
export function resetTodoStore(): void {
  todos.clear()
}
