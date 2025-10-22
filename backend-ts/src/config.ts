import dotenv from 'dotenv'
import path from 'path'

console.log("cwd:", process.cwd());
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || '',
    refreshSecret: process.env.JWT_REFRESH_SECRET || '',
    accessExpiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN || 900),
    refreshExpiresInDays: Number(process.env.JWT_REFRESH_EXPIRES_IN || 7)
  },
  bcrypt: {
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 12)
  }
}

if (!config.jwt.accessSecret || !config.jwt.refreshSecret) {
  // eslint-disable-next-line no-console
  console.warn('[WARN] JWT Secrets fehlen. Bitte .env konfigurieren!')
}

console.log("ACCESS_SECRET:", process.env.JWT_ACCESS_SECRET)
console.log("REFRESH_SECRET:", process.env.JWT_REFRESH_SECRET)