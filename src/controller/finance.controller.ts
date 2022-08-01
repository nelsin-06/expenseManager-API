import { Request, Response, NextFunction } from 'express'

export const income = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json('RUTA INCOME / INGRESOS')
  } catch (e: any) {
    next(e)
  }
}
