import { Pool } from 'pg';
import { loadEnvFile } from 'node:process';

loadEnvFile();

//pool settings for test db
// export const pool = new Pool({
//   host: process.env.DB_HOST, // or wherever the db is hosted
//   user: process.env.DB_USER,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT // The default port
// });

export const pool = new Pool ({
  connectionString: process.env.DATABASE_URL
});
