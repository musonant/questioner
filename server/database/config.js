
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { DB_URL } from '../../db';

const debug = require('debug')('config');

dotenv.config();

// debug('NODE_ENV', process.env.NODE_ENV);
console.log('NODE_ENV', process.env.NODE_ENV);

/**
 * class DB
 */
class DB {
  /**
   * construtor
   */
  constructor() {
    this.connection = new Pool({
      connectionString: DB_URL,
    });
  }

  /**
   * createTables
   */
  async createTables() {
    debug('CONNECTING TO DATABASE: DATABASE URL', DB_URL);
    this.connection.on('connect', () => {
      debug('CONNECTED TO DATABASE');
    });
    const queryText = `
    DROP TABLE IF EXISTS questions;
      DROP TABLE IF EXISTS meetups;
      DROP TABLE IF EXISTS tags;

      CREATE TABLE IF NOT EXISTS meetups (
        id SERIAL PRIMARY KEY NOT NULL,
        createdBy INT NOT NULL REFERENCES users(id),
        location varchar(100),
        images TEXT [],
        topic varchar(100) NOT NULL,
        happeningOn TIMESTAMPTZ,
        tags TEXT [],
        description varchar(400),
        createdOn TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(100) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY NOT NULL,
        createdBy INT NOT NULL,
        meetup INT REFERENCES meetups(id) NOT NULL,
        authorName varchar(100),
        title varchar(100),
        body varchar(1000),
        upVoters TEXT [],
        downVoters TEXT [],
        createdOn TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY NOT NULL,        
        firstname varchar(20),
        lastname varchar(20),
        othername varchar(20),
        email varchar(100),
        phoneNumber INT,
        username varchar(40),
        isAdmin BOOLEAN NOT NULL,
        password varchar(100),
        registered TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

    `;

    await this.connection.query(queryText);
    this.seedTables();
  }

  /**
   * seedTables
   */
  async seedTables() {
    const queryText = `
    `;
    await this.connection.query(queryText);
    await this.connection.end();
  }
}

const db = new DB();

db.createTables();
