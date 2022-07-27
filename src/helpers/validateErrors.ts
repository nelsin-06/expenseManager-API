import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

interface ErrorExpressValidatorError {
  msg: string
  param: string
  location: string
}

export const validatorErrors = (req: Request, res: Response, next: NextFunction): any => {
  try {
    validationResult(req).throw()
    return next()
  } catch (e: any) {
    const listErrors = e.array().map((error: ErrorExpressValidatorError) => {
      return {
        msg: error.msg,
        paramsError: error.param
      }
    })

    res.status(400).json({
      ok: false,
      listErrors,
      dataError: {
        message: 'Verifique los campos del formulario e intentelo nuevamente.',
        code: 1000
      }
    })
  }
}
