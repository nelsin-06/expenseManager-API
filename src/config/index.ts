import { config } from 'dotenv'

config()

const env = {
  ENV: process.env.ENVIRONMENT,
  PORT: process.env.PORT,
  TOKEN_ACCES_WORD: process.env.SECRET_WORD_JWT,
  MONGODB: {
    MONGO_DB_NAME: process.env.MONGONAMEDB,
    MONGO_USER: process.env.MONGOUSER,
    MONGO_PASS: process.env.MONGOPASS,
    MONGO_CLUSTER: process.env.MONGOCLUSTER
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_NAMECLOUD,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET
  }
  // URL_BASE: 'https://new-you.herokuapp.com/v1'
}

export = env
