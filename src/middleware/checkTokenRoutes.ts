/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response, NextFunction } from 'express'
import { expressjwt } from 'express-jwt'
import { TOKEN_ACCES_WORD } from '../config/index'
import { SECRET_WORD_JWT_UNDEFINED, UNAUTHORIZED } from '../utils/listErrors'
import { ErrorApp } from './ErrorsManager'

if (!TOKEN_ACCES_WORD) { throw new ErrorApp(SECRET_WORD_JWT_UNDEFINED, 404) }

export const middlewareJWT = expressjwt({
  secret: TOKEN_ACCES_WORD,
  algorithms: ['HS256']
}).unless({
  path: ['/v1/register', '/v1/login']
})

export const checkToken = (err: Error, _req: Request, _res: Response, next: NextFunction): void => {
  if (err.name === 'UnauthorizedError') {
    throw new ErrorApp(UNAUTHORIZED, 401)
    // res.status(401).json({
    //   mesagge: 'TOKEN INVALIDO INICIE SESION NUEVAMENTE',
    //   code: 401
    // })
  } else {
    next(err)
  }
}
