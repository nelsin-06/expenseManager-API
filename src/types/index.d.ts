export { }

declare global {
  namespace Express {
    interface Request {
      auth: { userId: string, walletId: string }
    }
  }
}
