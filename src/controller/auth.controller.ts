/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response, NextFunction } from 'express'
import { ErrorApp } from '../middleware/ErrorsManager'
import { EMAIL_DIPLICATE, WRONG_LOGIN, USERNAME_DIPLICATE } from '../utils/listErrors'
import UserModel from '../models/auth.model'
import { generateJWToken } from '../helpers/generateTokenJWT'

export const registerWhitEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body

    const checkEmail = await UserModel.emailExist(email)
    if (checkEmail) throw new ErrorApp(EMAIL_DIPLICATE, 400)

    const checkUsername = await UserModel.usernameExist(username)
    if (checkUsername) throw new ErrorApp(USERNAME_DIPLICATE, 400)

    const newUser = new UserModel({
      username, email, password, typeRegister: 'CO'
    })

    await newUser.save()

    const accessToken = await generateJWToken(username, newUser._id)

    res.status(200).json({ ok: true, message: 'Registro exitoso', accessToken })
  } catch (e: any) {
    next(e)
  }
}

export const loginWhitEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userOrEmail, password } = req.body

    const userApp = await UserModel.findOne({ $or: [{ email: userOrEmail }, { username: userOrEmail }] })
    if (!userApp) throw new ErrorApp(WRONG_LOGIN, 404)

    const checkPassword = await UserModel.isCorrectPassword(password, userApp.password)

    if (checkPassword) {
      const accessToken = await generateJWToken(userApp.email, userApp._id)

      res.status(200).json({ ok: true, message: 'Login exitoso', accessToken })
    } else {
      throw new ErrorApp(WRONG_LOGIN, 404)
    }
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
