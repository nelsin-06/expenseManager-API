/*********************
 *    AUTH ERROR LIST
 *********************/

export const EMAIL_DIPLICATE = {
  message: 'El email con el cual te intentas registrar ya existe.',
  code: 1001
}

export const WRONG_LOGIN = {
  message: 'Error al loguearse, Ingrese un email o username y password valido.',
  code: 1002
}

export const SECRET_WORD_JWT_UNDEFINED = {
  message: 'La palabra necesaria para crear el token no esta definida.',
  code: 1003
}

export const USERNAME_DIPLICATE = {
  message: 'El username con el cual te intentas registrar ya existe.',
  code: 1004
}

export const WRONG_PASSWORD = {
  message: 'La password antigua es incorrecta.',
  code: 1005
}
