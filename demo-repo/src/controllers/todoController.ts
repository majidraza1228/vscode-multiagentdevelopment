import { Request, Response } from 'express'
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from '../services/todoService'

export function listTodos(_req: Request, res: Response): void {
  res.status(200).json(getAllTodos())
}

export function getTodo(req: Request, res: Response): void {
  const todo = getTodoById(req.params.id)
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' })
    return
  }
  res.status(200).json(todo)
}

export function createTodoHandler(req: Request, res: Response): void {
  const body = req.body as { title?: unknown }
  if (typeof body.title !== 'string') {
    res.status(400).json({ error: 'Title is required' })
    return
  }

  try {
    const todo = createTodo({ title: body.title })
    res.status(201).json(todo)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Invalid request'
    res.status(400).json({ error: message })
  }
}

export function updateTodoHandler(req: Request, res: Response): void {
  const body = req.body as { title?: unknown; completed?: unknown }
  const update: { title?: string; completed?: boolean } = {}

  if (body.title !== undefined) {
    if (typeof body.title !== 'string') {
      res.status(400).json({ error: 'Title must be a string' })
      return
    }
    update.title = body.title
  }

  if (body.completed !== undefined) {
    if (typeof body.completed !== 'boolean') {
      res.status(400).json({ error: 'Completed must be a boolean' })
      return
    }
    update.completed = body.completed
  }

  try {
    const updated = updateTodo(req.params.id, update)
    if (!updated) {
      res.status(404).json({ error: 'Todo not found' })
      return
    }
    res.status(200).json(updated)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Invalid request'
    res.status(400).json({ error: message })
  }
}

export function deleteTodoHandler(req: Request, res: Response): void {
  const deleted = deleteTodo(req.params.id)
  if (!deleted) {
    res.status(404).json({ error: 'Todo not found' })
    return
  }
  res.status(204).send()
}
