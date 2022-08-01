/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { income } from '../controller/finance.controller'

const router = Router()

router.post('/income', income)
router.post('/saving')
router.post('/fixedCosts')

export default router
