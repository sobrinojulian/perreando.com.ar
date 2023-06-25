import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT //8080
const STRCNX = process.env.STRCNX
const DB = process.env.DB

export default {
  PORT,
  STRCNX,
  DB
}
