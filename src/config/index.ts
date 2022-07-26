import { config } from 'dotenv'

config()

const env = {
  ENV: process.env.ENVIRONMENT,
  PORT: process.env.PORT,
  // TOKEN_ACCES_WORD: process.env.ACCESS_TOKEN_SECRET_WORD,
  // GOOGLE: {
  //   CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  //   CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
  // },
  // SALT_BCRYP: (process.env.SALT_BCRYPT != null) || 10,
  // BASE_URL: process.env.BASE_URL,
  MONGODB: {
    MONGO_DB_NAME: process.env.MONGONAMEDB,
    MONGO_USER: process.env.MONGOUSER,
    MONGO_PASS: process.env.MONGOPASS,
    MONGO_CLUSTER: process.env.MONGOCLUSTER
  }
  // URL_BASE: 'https://new-you.herokuapp.com/v1'
}

export = env
