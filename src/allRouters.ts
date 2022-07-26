import routerAuth from './routes/auth.routes'

import express from 'express'
const app = express()

app.use(routerAuth)

export default app
