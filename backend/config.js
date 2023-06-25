import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT //8080
const STRCNX = process.env.STRCNX
const DB = process.env.DB
const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD

export default {
  PORT,
  STRCNX,
  DB,
  GMAIL_USER,
  GMAIL_PASSWORD
}
