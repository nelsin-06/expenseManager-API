/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from 'express'
import FinanceModel from '../models/finance.model'
import { uploadImage } from '../utils/cloudinary'
import { FixedCostType } from '../types/index'
import { UploadedFile } from 'express-fileupload'

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

export const fixedCosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { walletId } = req.auth

    const fixedCostUpload: FixedCostType = {
      description: req.body.description,
      total: Number(req.body.total),
      imgBill: undefined
    }

    if (req.files!) {
      const files = req.files.imgBill as UploadedFile
      const { secure_url: urlImg } = await uploadImage(files.tempFilePath)
      fixedCostUpload.imgBill = urlImg
    }

    await FinanceModel.findByIdAndUpdate({ _id: walletId }, { $push: { fixedCosts: fixedCostUpload } })

    res.json({ ok: true, message: 'Gasto agregado exitosamente' })
  } catch (e: any) {
    next(e)
  }
}
