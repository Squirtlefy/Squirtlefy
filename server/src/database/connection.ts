import 'dotenv/config'
import { Pool } from 'pg'
// console.log('process env: ', process.env.PG_URI);
const pool = new Pool({
  connectionString: process.env.PG_URI,
})

export default pool;