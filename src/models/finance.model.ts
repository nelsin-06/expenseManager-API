/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getModelForClass, prop } from '@typegoose/typegoose'

class Finance {
  @prop({ type: Number, required: true })
  income: number | undefined // Ingresos

  @prop({ type: Array })
  fixedCosts: Array<{
    description: string
    total: number
    imgBill?: string
  }> | undefined // Gastos fijos

  @prop({ type: Number })
  saving: number | undefined // Ahorro

  @prop({ type: Number })
  moneyRemaining: number | undefined // Dinero restante

  @prop({ type: Number })
  nonFixedExpenses: number | undefined // Gastos hormiga

  @prop({ type: String, trim: true })
  userId: string | undefined // userId
}

const financeModel = getModelForClass(Finance, { schemaOptions: { versionKey: false } })
export default financeModel
