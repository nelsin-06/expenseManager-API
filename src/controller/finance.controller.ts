import { Request, Response, NextFunction } from 'express'
import FinanceModel from '../models/finance.model'
import { uploadImage } from '../utils/cloudinary'

export const income = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { walletId } = req.auth
    const { income } = req.body

    const data = await uploadImage(req.files?.img.tempFilePath)
    console.log(data)

    await FinanceModel.findByIdAndUpdate({ _id: walletId }, { income })

    res.json({ ok: true, message: 'Ingresos establecidos correctamente.' })
  } catch (e: any) {
    next(e)
  }
}

export const fixedCosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.json({ ok: true, message: 'Ingresos establecidos correctamente.' })
  } catch (e: any) {
    next(e)
  }
}
