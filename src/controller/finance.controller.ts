import { Request, Response, NextFunction } from 'express'
import FinanceModel from '../models/finance.model'

export const income = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { walletId } = req.auth

    const { income } = req.body
    await FinanceModel.findByIdAndUpdate({ _id: walletId }, { income })
    res.json('RUTA INCOME / INGRESOS')
  } catch (e: any) {
    next(e)
  }
}
