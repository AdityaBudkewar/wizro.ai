import dotenv from 'dotenv';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from 'pg';

dotenv.config();

// eslint-disable-next-line max-lines-per-function
const main = async () => {
  // eslint-disable-next-line no-underscore-dangle
  const __filenameLocal = fileURLToPath(import.meta.url),
    // eslint-disable-next-line no-underscore-dangle
    __dirnameLocal = path.dirname(__filenameLocal),
    baseDirectory = path.join(__dirnameLocal, '../database_schema'),
    dbConfig = {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
    },
    getNumericPrefix = (filename) => {
      const match = filename.match(/^(?:\d+)_/u);

      return match ? parseInt(match[0], 10) : Number.MAX_SAFE_INTEGER;
    },
    schemaDirectories = ['tables', 'functions', 'views'],
    applyFile = async (client, dirName, fileName) => {
      const filePath = path.join(baseDirectory, dirName, fileName),
        sqlContent = await fs.readFile(filePath, 'utf8');

      await client.query(sqlContent);
    },
    applyDirectory = async (client, dirName) => {
      const dirPath = path.join(baseDirectory, dirName);

      try {
        await fs.access(dirPath);
      } catch {
        return;
      }

      const files = (await fs.readdir(dirPath))
        .filter((fileName) => fileName.endsWith('.sql'))
        .sort(
          (fileA, fileB) => getNumericPrefix(fileA) - getNumericPrefix(fileB),
        );

      for (const file of files) {
        // eslint-disable-next-line no-await-in-loop
        await applyFile(client, dirName, file);
      }
    },
    client = new Client(dbConfig);

  try {
    await client.connect();

    for (const dir of schemaDirectories) {
      // eslint-disable-next-line no-await-in-loop
      await applyDirectory(client, dir);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('❌ Migration failed:', err.message);
  } finally {
    await client.end();
  }
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error:', err);
});
