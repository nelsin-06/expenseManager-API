import { checkSchema, Meta } from 'express-validator'

export const RegisterUserCheck = checkSchema({
  email: {
    exists: { errorMessage: 'Debe existir el campo "email" en el formulario.', bail: true },
    isEmail: { errorMessage: 'El email ingresado no es valido.' },
    notEmpty: { errorMessage: 'El email no puede estar vacio.' },
    toLowerCase: true
  },
  username: {
    exists: { errorMessage: 'Debe existir el campo "username" en el formulario.', bail: true },
    notEmpty: { errorMessage: 'El username no puede estar vacio.' },
    isLength: { options: { min: 5 }, errorMessage: 'El username debe tener como minimo 5 caracteres.' }
  },
  password: {
    exists: { errorMessage: 'Debe existir el campo "password" en el formulario.', bail: true },
    notEmpty: { errorMessage: 'La password no puede estar vacia.', bail: true },
    isString: { errorMessage: 'El formato de la password no es válido.', bail: true },
    isStrongPassword: {
      options: { minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 0 },
      errorMessage: 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y 8 caracteres.',
      bail: true
    }
  },
  confirmPassword: {
    exists: { errorMessage: 'Debe existir el campo "confirmPassword" en el formulario.', bail: true },
    isString: { errorMessage: 'El formato de la contraseña no es válido.', bail: true },
    notEmpty: { errorMessage: 'La confirmacion de la password no puede estar vacia.', bail: true },
    custom: {
      if: (value: string, { req }: Meta) => value !== req.body.password,
      errorMessage: 'Las contraseñas no coinciden.'
    }
  }
}, ['body'])
