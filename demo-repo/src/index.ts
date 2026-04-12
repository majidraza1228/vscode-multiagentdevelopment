import express, { Express } from 'express'
import { todoRouter } from './routes/todoRoutes'

export function createApp(): Express {
  const app = express()
  app.use(express.json())
  app.use('/api', todoRouter)
  return app
}

export const app: Express = createApp()

if (require.main === module) {
  const port = Number(process.env.PORT ?? 3000)
  app.listen(port, () => {
    console.log(`Todo API listening on port ${port}`)
  })
}
