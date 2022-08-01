import { Request, Response, NextFunction } from 'express'
import FinanceModel from '../models/finance.model'

export const income = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { walletId } = req.auth
    const { income } = req.body

    await FinanceModel.findByIdAndUpdate({ _id: walletId }, { income })

    res.json({ ok: true, message: 'Ingresos establecidos correctamente.' })
  } catch (e: any) {
    next(e)
  }
}
