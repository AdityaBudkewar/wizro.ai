import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const dbConfig = {
    database: 'postgres',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
  },
  targetDatabase = process.env.DB_NAME,
  dropDatabase = async () => {
    const client = new Client(dbConfig);

    try {
      await client.connect();

      await client.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = '${targetDatabase}' AND pid <> pg_backend_pid();
    `);

      await client.query(`DROP DATABASE IF EXISTS ${targetDatabase};`);

      await client.query(`CREATE DATABASE ${targetDatabase};`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      await client.end();
    }
  };

dropDatabase();
