import { Request, Response, NextFunction } from 'express'
import { ErrorApp } from '../middleware/ErrorsManager'
import { EMAIL_DIPLICATE } from '../utils/listErrors'
import UserModel from '../models/auth.model'
import { generateJWToken } from '../helpers/generateTokenJWT'

export const registerWhitEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body

    const checkEmail = await UserModel.emailExist(email)

    if (checkEmail) throw new ErrorApp(EMAIL_DIPLICATE, 400)

    const newUser = new UserModel({
      username, email, password, typeRegister: 'CO'
    })

    await newUser.save()

    const asd = await generateJWToken('nelsonGallego', 'asdf1234')

    console.log(asd)

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
