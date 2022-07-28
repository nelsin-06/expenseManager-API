import { Router } from 'express'
import { registerWhitEmail, changePass, loginWhitEmail, resetPass } from '../controller/auth.controller'
import { validatorErrors } from '../helpers/validateErrors'
import { RegisterUserCheck, LoginUserCheck, changePasswordUserCheck } from '../validators/expressValidator'

const router = Router()

router.post('/register', RegisterUserCheck, validatorErrors, registerWhitEmail)
router.post('/login', LoginUserCheck, validatorErrors, loginWhitEmail)
router.get('/reset-pass', resetPass)
router.put('/change-pass', changePasswordUserCheck, validatorErrors, changePass)

export default router
