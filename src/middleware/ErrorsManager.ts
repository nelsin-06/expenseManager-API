import { NextFunction, Request, Response } from 'express'
// import { ENV } from '../config/index'
const ENV = 'DEV'
interface ErrorType {
  message: string
  code: number
}

interface errorReturnData {
  ok: false
  dataError: ErrorType
  realError?: string
  realErrorMsg?: string
}

export class ValidationError extends Error {
  private readonly appError: ErrorType
  private readonly httpCode: number

  private readonly realError: string | undefined

  constructor (errorData: ErrorType, httpCode: number, realError?: Error) {
    super(errorData.message)
    this.appError = errorData
    this.httpCode = httpCode
    this.realError = realError?.name
  }

  public getErrorData (): ErrorType { return this.appError }

  public getHttpCodeData (): number { return this.httpCode }

  public getRealError (): string | undefined { return this.realError }
}

export default (err: any, req: Request, res: Response, _next: NextFunction): any => {
  let httpCodeStatus: number = 500

  const errorReturn: errorReturnData = {
    ok: false,
    dataError: {
      message: 'Error desconocido. revise el realError o informe al back.',
      code: 5000
    }
  }

  if (err instanceof ValidationError) {
    httpCodeStatus = err.getHttpCodeData()
    errorReturn.dataError = err.getErrorData()
    errorReturn.realError = err.getRealError()
  } else if (err instanceof Error) {
    console.error('-----------------------------------------------------')
    console.error('TIME:', new Date().toLocaleString(), '| ROUTE:', req.method, req.url)

    if (ENV === 'DEV') console.error(err)

    errorReturn.realError = err.name
    errorReturn.realErrorMsg = err.message
  } else {
    console.error('-----------------------------------------------------')
    console.error('TIME:', new Date().toLocaleString(), '| ROUTE:', req.method, req.url)

    if (ENV === 'DEV') console.error(err)

    errorReturn.realError = err.name
    errorReturn.realErrorMsg = err.message
  }
  return res.status(httpCodeStatus).json(errorReturn)
}

// throw ValidationError("Property not found: name")

// try {
//   validateForm() // code that throws a ValidationError
// } catch (e) {
//   if (e instanceof ValidationError)
//   // do something
//   else
//   // do something else
// }
