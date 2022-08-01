import express from 'express'
import cors from 'cors'
import routesApp from './allRouters'
import morgan from 'morgan'
import database from './database/indexDB'
import errorManager from './middleware/ErrorsManager'
import { checkToken, middlewareJWT } from './middleware/checkTokenRoutes'
import { PORT } from './config/index'

const app = express()

// START MONGODB
void database

/*********************
 *    MIDLEWARES
 *********************/
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

/*********************
 *        JWT
 *********************/
app.use(middlewareJWT, checkToken)

/*********************
 *    ROUTES
 *********************/
app.use('/v1', routesApp)
app.use(errorManager)

app.listen(PORT, () => {
  console.log({
    timeStart: new Date().toLocaleString(),
    message: 'Server inciado.',
    port: PORT
  })
})
