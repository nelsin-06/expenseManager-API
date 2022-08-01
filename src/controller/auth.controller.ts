/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response, NextFunction } from 'express'
import { ErrorApp } from '../middleware/ErrorsManager'
import { EMAIL_DIPLICATE, WRONG_LOGIN, USERNAME_DIPLICATE, WRONG_PASSWORD } from '../utils/listErrors'
import UserModel from '../models/auth.model'
import FinanceModel from '../models/finance.model'
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

    const newFinanceUser = new FinanceModel({
      income: 0,
      userId: newUser._id
    })

    await newUser.save()
    await newFinanceUser.save()

    const accessToken = await generateJWToken(newUser._id, newFinanceUser._id)

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
      const walletUser = await FinanceModel.findOne({ userId: userApp._id })

      if (!walletUser) throw new ErrorApp(WRONG_LOGIN, 404)

      const accessToken = await generateJWToken(userApp._id, walletUser._id)

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

export const changePass = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { oldPassword, newPassword } = req.body

    const userApp = await UserModel.findById('62e2b97e6ba0bfafeb0b978c')
    // TODO: CREAR UN ERROR ESPECIAL PARA UN USUARIO QUE NO SE ENCUENTRA CON EL FINDBYID. ERROR DE TOKEN O ALGO ASI
    if (!userApp) throw new ErrorApp(WRONG_LOGIN, 400)

    const checkOldPassword = await UserModel.isCorrectPassword(oldPassword, userApp.password)

    if (!checkOldPassword) throw new ErrorApp(WRONG_PASSWORD, 400)

    const userUpdate = await UserModel.findByIdAndUpdate({ _id: '62e2b97e6ba0bfafeb0b978c' }, { password: newPassword })

    console.log(userUpdate)

    res.json('all good')
  } catch (e: any) {
    next(e)
  }
}
