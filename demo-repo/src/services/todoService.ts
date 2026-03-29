import { randomUUID } from 'crypto'
import { Todo, CreateTodoDto, UpdateTodoDto } from '../models/todo'

// In-memory store — swap for a real DB in production
const todos: Map<string, Todo> = new Map()

export function getAllTodos(): Todo[] {
  return Array.from(todos.values())
}

export function getTodoById(id: string): Todo | undefined {
  return todos.get(id)
}

export function createTodo(dto: CreateTodoDto): Todo {
  if (!dto.title || dto.title.trim() === '') {
    throw new Error('Title is required')
  }
  const todo: Todo = {
    id: randomUUID(),
    title: dto.title.trim(),
    completed: false,
    createdAt: new Date(),
  }
  todos.set(todo.id, todo)
  return todo
}

export function updateTodo(id: string, dto: UpdateTodoDto): Todo | undefined {
  const existing = todos.get(id)
  if (!existing) return undefined
  const updated: Todo = { ...existing, ...dto }
  todos.set(id, updated)
  return updated
}

export function deleteTodo(id: string): boolean {
  return todos.delete(id)
}

// Test helper — reset store between tests
export function _resetStore(): void {
  todos.clear()
}
