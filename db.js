import { Pool } from 'pg';
import dotenv from 'dotenv';

const debug = require('debug')('database');

dotenv.config();

const dbConfig = {
  staging: process.env.DATABASE_URL,
  development: process.env.DEV_DATABASE_URL,
  production: process.env.DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
};

const currentEnv = process.env.NODE_ENV;

export const DB_URL = dbConfig[currentEnv];

debug(`NODE_ENV: "${currentEnv}"`);

const client = new Pool({
  connectionString: DB_URL,
});

client.on('connect', () => {
  // debug('CONNECTED TO DATABASE');
  console.log('CONNECTED TO DATABASE');
});

export default client;
