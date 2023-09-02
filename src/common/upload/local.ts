import fs from 'node:fs';
import path from 'node:path';

import { isNil } from 'lodash';
import shellJs from 'shelljs';

const { STORAGE_DIR } = process.env as ObjectValue<string>;

const isActive = !isNil(STORAGE_DIR);

export const uploadFileToLocal = (key: string, filePath: string): string => {
  if (!isActive) {
    throw new Error('Local storage  environment variable does not set');
  }

  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR);
  } else if (!fs.statSync(STORAGE_DIR).isDirectory()) {
    shellJs.rm('-rf', STORAGE_DIR);
    fs.mkdirSync(STORAGE_DIR);
  }

  const subDir = key.slice(0, 2).toLowerCase();
  const finalDir = path.resolve(STORAGE_DIR, subDir);
  const localPath = path.resolve(finalDir, key);

  if (!fs.existsSync(finalDir)) {
    fs.mkdirSync(finalDir);
  }

  if (fs.existsSync(localPath)) {
    fs.cpSync(filePath, localPath);
  }

  return key;
};
