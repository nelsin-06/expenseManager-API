/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import JWT from 'jsonwebtoken'
import { TOKEN_ACCES_WORD } from '../config/index'
import { ErrorApp } from '../middleware/ErrorsManager'
import { SECRET_WORD_JWT_UNDEFINED } from '../utils/listErrors'

if (!TOKEN_ACCES_WORD) { throw new ErrorApp(SECRET_WORD_JWT_UNDEFINED, 404) }

export const generateJWToken = async (username: string, userId: string): Promise<string> => {
  const Token = JWT.sign({ userId, username }, TOKEN_ACCES_WORD ?? '12345')
  return Token
}
