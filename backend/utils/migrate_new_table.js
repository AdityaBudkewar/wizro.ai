import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const main = async () => {
  const [, , arg] = process.argv,
    timestamp = Math.floor(Date.now() / 1000),
    baseName = arg.endsWith('.sql') ? arg.slice(0, -4) : arg,
    fileName = `${timestamp}_${baseName}.sql`,
    filePath = resolve(process.cwd(), 'database_schema/tables', fileName);

  await writeFile(filePath, '-- SQL file generated\n');
};

// eslint-disable-next-line no-console
main().catch(console.error);
