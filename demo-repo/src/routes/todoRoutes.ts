import { Router } from 'express'
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodo,
  listTodos,
  updateTodoHandler,
} from '../controllers/todoController'

export const todoRouter: Router = Router()

todoRouter.get('/todos', listTodos)
todoRouter.get('/todos/:id', getTodo)
todoRouter.post('/todos', createTodoHandler)
todoRouter.patch('/todos/:id', updateTodoHandler)
todoRouter.delete('/todos/:id', deleteTodoHandler)
