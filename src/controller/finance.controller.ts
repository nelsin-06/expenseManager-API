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

    const returnUpdate = await FinanceModel.findByIdAndUpdate({ _id: walletId }, { $push: { fixedCosts: fixedCostUpload } }, { rawResult: true }).where('income').gte(Number(fixedCostUpload.total))

    if (returnUpdate.lastErrorObject?.updatedExisting) {
      res.json({ ok: true, message: 'Gasto agregado exitosamente' })
    } else {
      res.json({ ok: false, message: 'Los gastos no deberian superar los ingresos.' })
    }
  } catch (e: any) {
    next(e)
  }
}

export const saving = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // AWAUI SE VA A HACER LA OPERACION DE AHORRO Y SE VA A DECIR CUANTO QUIERE AHORRAR Y EN CUENTOS MESES y se hace el calculo
    const { walletId } = req.auth

    const { time, totalSaving } = req.body
    const savingReal = Number(totalSaving) / Number(time)

    await FinanceModel.findByIdAndUpdate({ _id: walletId }, { saving: Math.round(savingReal) })

    res.status(201).json({ ok: true, message: 'El ahorro se establecio correctamente.' })
  } catch (e: any) {
    next(e)
  }
}
