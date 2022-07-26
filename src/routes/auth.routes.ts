import { Router } from 'express'
import { registerWhitEmail, changePass, loginWhitEmail, resetPass } from '../controller/auth.controller'

const router = Router()

router.post('/register', registerWhitEmail)
router.get('/login', loginWhitEmail)
router.get('/reset-pass', resetPass)
router.get('/change-pass', changePass)

export default router
