export { }

declare global {
  namespace Express {
    interface Request {
      auth: { userId: string, walletId: string }
    }
  }
}
export interface FixedCostType {
  description: string
  total: number
  imgBill: undefined | string
}
