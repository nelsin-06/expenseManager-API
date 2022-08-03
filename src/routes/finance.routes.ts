/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { income } from '../controller/finance.controller'
import path from 'path'
import fileUpload from 'express-fileupload'

const router = Router()

router.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'uploads')
}))

router.post('/income', income)
router.post('/saving')
router.post('/fixedCosts')

export default router
