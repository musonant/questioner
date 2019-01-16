

import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
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
    console.log('CONNECTING TO DATABASE: DATABASE URL', DB_URL);
    this.connection.on('connect', () => {
      console.log('CONNECTED TO DATABASE');
    });
    const queryText = `
      DROP TABLE IF EXISTS rsvps;
      DROP TABLE IF EXISTS questions;
      DROP TABLE IF EXISTS meetups;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS users;
      
      CREATE TABLE IF NOT EXISTS users (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "firstname" varchar(20) NOT NULL,
        "lastname" varchar(20) NOT NULL,
        "othername" varchar(20),
        "email" varchar(100) NOT NULL,
        "phoneNumber" varchar(20),
        "username" varchar(40),
        "isAdmin" BOOLEAN NOT NULL,
        "password" varchar(100) NOT NULL,
        "registered" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS tags (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "name" varchar(100) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS meetups (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "createdBy" INT REFERENCES users(id) NOT NULL,
        "location" varchar(100),
        "images" TEXT [],
        "topic" varchar(100) NOT NULL,
        "happeningOn" TIMESTAMPTZ,
        "tags" TEXT [],
        "description" varchar(400),
        "createdOn" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedOn" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS questions (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "createdBy" INT NOT NULL REFERENCES users(id),
        "meetup" INT REFERENCES meetups(id) NOT NULL,
        "title" varchar(100),
        "body" varchar(1000),
        "upVoters" TEXT [],
        "downVoters" TEXT [],
        "createdOn" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedOn" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS rsvps (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "meetup" INT REFERENCES meetups(id) NOT NULL,
        "user" INT REFERENCES users(id) NOT NULL,
        "response" BOOLEAN NOT NULL
      );
    `;

    await this.connection.query(queryText);
    this.seedTables();
  }

  /**
   * seedTables
   */
  async seedTables() {
    const saltRounds = 10;
    const queryText = `
      INSERT INTO users (firstname, lastname, othername, email, "phoneNumber", username, "isAdmin", password) VALUES ('Emmanuel', 'Osuh', 'Cheng', 'mrmusonant@gmail.com', 08091497695, 'musonant', 'true', '${bcrypt.hashSync('emmanuel', saltRounds)}');
      INSERT INTO users (firstname, lastname, email, "phoneNumber", username, "isAdmin", password) VALUES ('Johnny', 'Drille', 'johnnydrille@gmail.com', '09055545221', 'driller', 'false', '${bcrypt.hashSync('johnny', saltRounds)}');
      INSERT INTO users (firstname, lastname, email, "phoneNumber", username, "isAdmin", password) VALUES ('Steve', 'Jobs', 'stevejobs@gmail.com', '09055545221', 'steve', 'false', '${bcrypt.hashSync('steve', saltRounds)}');
    
      INSERT INTO tags (name) VALUES ('Software Engineering');
      INSERT INTO tags (name) VALUES ('Finding Solutions');
      INSERT INTO tags (name) VALUES ('Andela');

      INSERT INTO meetups ("createdBy", location, topic, description, tags) VALUES (1, '235, Ikorodu Road', 'Project Management, Andela', 'any new thing worth learning should be learned', '{1, 3}');
      INSERT INTO meetups ("createdBy", location, topic, description) VALUES (1, '5, West Drive, California', 'Calibrating our globe', 'any new thing worth learning should be learned');
      INSERT INTO meetups ("createdBy", location, topic, description) VALUES (1, 'EPIC Tower', 'Andela Bootcamp', 'any new thing worth learning should be learned');
      
      INSERT INTO questions ("createdBy", meetup, title, body) VALUES (2, 1, 'concerning the progress of the project', 'Are there any things I need to learn first?');
      INSERT INTO questions ("createdBy", meetup, title, body) VALUES (2, 2, 'concerning the progress of the project', 'Are there any things I need to learn first?');
      
      INSERT INTO rsvps ("meetup", "user", "response") VALUES (1, 2, true);
      INSERT INTO rsvps ("meetup", "user", "response") VALUES (1, 3, true);
    `;

    await this.connection.query(queryText);
    await this.connection.end();
  }
}

const db = new DB();


db.createTables();
