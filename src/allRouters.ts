import routerAuth from './routes/auth.routes'
import routerFinances from './routes/finance.routes'

import express from 'express'
const app = express()

app.use(routerAuth)
app.use(routerFinances)

export default app
