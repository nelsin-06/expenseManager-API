import { Router } from 'express'
import { registerWhitEmail, changePass, loginWhitEmail, resetPass } from '../controller/auth.controller'
import { validatorErrors } from '../helpers/validateErrors'
import { RegisterUserCheck } from '../validators/expressValidator'

const router = Router()

router.post('/register', RegisterUserCheck, validatorErrors, registerWhitEmail)
router.get('/login', loginWhitEmail)
router.get('/reset-pass', resetPass)
router.get('/change-pass', changePass)

export default router
