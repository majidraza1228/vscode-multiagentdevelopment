import { describe, it, expect, beforeEach } from 'vitest'
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  resetTodoStore,
} from '../services/todoService'

describe('todoService', () => {
  beforeEach(() => {
    resetTodoStore()
  })

  describe('createTodo', () => {
    it('creates a todo with the given title', () => {
      const todo = createTodo({ title: 'Buy milk' })
      expect(todo.title).toBe('Buy milk')
      expect(todo.completed).toBe(false)
      expect(todo.id).toBeDefined()
      expect(todo.createdAt).toBeInstanceOf(Date)
    })

    it('trims whitespace from the title', () => {
      const todo = createTodo({ title: '  Buy eggs  ' })
      expect(todo.title).toBe('Buy eggs')
    })

    it('throws if title is empty', () => {
      expect(() => createTodo({ title: '' })).toThrow('Title is required')
    })

    it('throws if title is only whitespace', () => {
      expect(() => createTodo({ title: '   ' })).toThrow('Title is required')
    })
  })

  describe('getAllTodos', () => {
    it('returns empty array when no todos exist', () => {
      expect(getAllTodos()).toEqual([])
    })

    it('returns all created todos', () => {
      createTodo({ title: 'Todo 1' })
      createTodo({ title: 'Todo 2' })
      expect(getAllTodos()).toHaveLength(2)
    })
  })

  describe('getTodoById', () => {
    it('returns the todo when found', () => {
      const created = createTodo({ title: 'Find me' })
      expect(getTodoById(created.id)).toEqual(created)
    })

    it('returns undefined for unknown id', () => {
      expect(getTodoById('nonexistent')).toBeUndefined()
    })
  })

  describe('updateTodo', () => {
    it('marks a todo as completed', () => {
      const todo = createTodo({ title: 'Do the thing' })
      const updated = updateTodo(todo.id, { completed: true })
      expect(updated?.completed).toBe(true)
      expect(updated?.title).toBe('Do the thing')
      expect(updated?.createdAt).toBe(todo.createdAt)
    })

    it('updates and trims title', () => {
      const todo = createTodo({ title: 'Original' })
      const updated = updateTodo(todo.id, { title: '  Updated title  ' })
      expect(updated?.title).toBe('Updated title')
      expect(updated?.completed).toBe(false)
      expect(updated?.createdAt).toBe(todo.createdAt)
    })

    it('throws if updated title is empty', () => {
      const todo = createTodo({ title: 'Do the thing' })
      expect(() => updateTodo(todo.id, { title: '   ' })).toThrow('Title is required')
    })

    it('returns undefined for unknown id', () => {
      expect(updateTodo('ghost', { completed: true })).toBeUndefined()
    })
  })

  describe('deleteTodo', () => {
    it('deletes an existing todo and returns true', () => {
      const todo = createTodo({ title: 'Delete me' })
      expect(deleteTodo(todo.id)).toBe(true)
      expect(getTodoById(todo.id)).toBeUndefined()
    })

    it('returns false for unknown id', () => {
      expect(deleteTodo('ghost')).toBe(false)
    })
  })
})
