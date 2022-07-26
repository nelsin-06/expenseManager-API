import express from 'express'
import cors from 'cors'
import routesApp from './allRouters'
import morgan from 'morgan'
import database from './database/indexDB'
import errorManager from './middleware/ErrorsManager'

const app = express()
void database

app.use(express.json())
app.use(cors())

app.use(morgan('dev'))

const PORT = 3000

app.use('/v1', routesApp)
app.use(errorManager)

app.listen(PORT, () => {
  console.log({
    timeStart: new Date().toLocaleString(),
    message: 'Server inciado.',
    port: PORT
  })
})
