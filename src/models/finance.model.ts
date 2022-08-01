/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getModelForClass, prop } from '@typegoose/typegoose'

class Finance {
  @prop({ type: Number, required: true, trim: true })
  income: number | undefined // Ingresos

  @prop({ type: Number, trim: true })
  fixedCosts: number | undefined // Gastos fijos

  @prop({ type: Number, trim: true })
  saving: number | undefined // Ahorro

  @prop({ type: Number, trim: true })
  moneyRemaining: number | undefined // Dinero restante

  @prop({ type: Number, trim: true })
  nonFixedExpenses: number | undefined // Gastos hormiga

  @prop({ type: String, trim: true })
  userId: string | undefined // Gastos hormiga
}

const financeModel = getModelForClass(Finance, { schemaOptions: { versionKey: false } })
export default financeModel
