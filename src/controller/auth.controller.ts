import { Request, Response, NextFunction } from 'express'
import { ValidationError } from '../middleware/ErrorsManager'
import { EMAIL_DIPLICATE } from '../utils/listErrors'
import UserModel from '../models/auth.model'

export const registerWhitEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body

    const checkEmail = await UserModel.emailExist(email)

    if (checkEmail) throw new ValidationError(EMAIL_DIPLICATE, 400)

    const newUser = new UserModel({
      username, email, password, typeRegister: 'CO'
    })

    await newUser.save()

    res.json({ ok: true, message: 'Registro exitoso', token: 'asd123' })
  } catch (e: any) {
    next(e)
  }
}

export const loginWhitEmail = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json('RUTA LOGIN')
  } catch (e: any) {
    next(e)
  }
}

export const resetPass = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json('RUTA RESET PASS')
  } catch (e: any) {
    next(e)
  }
}

export const changePass = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json('RUTA CHANGE PASS')
  } catch (e: any) {
    next(e)
  }
}
