/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { connection, connect } from 'mongoose'
import { MONGODB } from '../config/index'

if (MONGODB == null || MONGODB === undefined) { throw new Error('Error al obtener las credenciales de la base de datos.') }

const db = connection
const URI = `mongodb+srv://${MONGODB.MONGO_USER}:${MONGODB.MONGO_PASS}@${MONGODB.MONGO_CLUSTER}/${MONGODB.MONGO_DB_NAME}?retryWrites=true&w=majority&ssl=true`

export default (async () => {
  try {
    await connect(URI)
  } catch (err) {
    console.log(`ERROR AL CORRER BASE DE DATOS >>>>>>> ${err}`)
  }
})()

db.on('open', () => { console.log('CONECTADO A LA DB') })

db.on('error', (err) => {
  console.log('ERROR EN LA BASE DE DATOS')
  console.log('------------------------------------------------------------------------------')
  console.log(err)
  console.log('------------------------------------------------------------------------------')
})

db.on('disconnected', () => { console.log('DESCONECTADO DE LA DB') })

process.on('SIGINT', async () => {
  await connection.close()
  process.exit(0)
})
