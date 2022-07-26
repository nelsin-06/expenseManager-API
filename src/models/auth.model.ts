/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getModelForClass, prop, ReturnModelType, pre } from '@typegoose/typegoose'
import { compare, hash } from 'bcrypt'

@pre<User>('save', async function (next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const passHash: string = await hash(this.password, 10)
      this.password = passHash
    } else {
      void next()
    }
  } catch (e: any) {
    void next(e)
  }
})
class User {
  @prop({ type: String, required: true })
  username!: string

  @prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  email!: string

  @prop({ type: String, required: true })
  typeRegister!: 'GL' | 'FB' | 'CO'

  @prop({ type: String, required: true })
  password!: string

  /**
   * @param this Parametro para poder acceder a metodo .findOne.
   * @param email Email que vamos a verificar.
   * @returns Boolean.
   */
  static async emailExist (this: ReturnModelType<typeof User>, email: string): Promise<boolean> {
    const checkEmail = await this.findOne({ email }, { email: 1 })
    if (checkEmail == null) {
      return false
    } return true
  }

  /**
   * @param password Password que el user ingreso.
   * @param hashSaved Hash almacenado en la DB que se obtiene en la consulta.
   * @returns Boolean.
   */
  static async isCorrectPassword (password: string, hashSaved: string): Promise<boolean> {
    try {
      const matchPass = await compare(password, hashSaved)
      return matchPass
    } catch (e: any) {
      return false
    }
  }
}

const userModel = getModelForClass(User, { schemaOptions: { versionKey: false } })
export default userModel
