import { Pool } from 'pg';
import dotenv from 'dotenv';

const debug = require('debug')('db');

dotenv.config();

const dbConfig = {
  staging: process.env.DATABASE_URL,
  development: process.env.DEV_DATABASE_URL,
  production: process.env.DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
};

const currentEnv = process.env.NODE_ENV;
debug(`NODE_ENV: "${currentEnv}"`);

export const DB_URL = dbConfig[currentEnv];

const client = new Pool({
  connectionString: DB_URL,
});

client.on('connect', () => {
  // debug('CONNECTED TO DATABASE');
  console.log('CONNECTED TO DATABASE');
});

export default client;
