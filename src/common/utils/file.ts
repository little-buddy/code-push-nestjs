import fs from 'node:fs';

import extractZip from 'extract-zip';
import fsExtra from 'fs-extra';
import jschardet from 'jschardet';

export const detectIsTextFile = (filePath: string): boolean => {
  const buffer = Buffer.alloc(4096);
  const fd: number = fs.openSync(filePath, 'r');
  fs.readSync(fd, buffer, 0, 4096, 0);
  fs.closeSync(fd);
  // detect text
  const rs: jschardet.IDetectedMap = jschardet.detect(buffer);

  return rs.confidence === 1;
};

export const createEmptyFolder = (folderPath: string) => {
  if (fs.existsSync(folderPath)) {
    fsExtra.removeSync(folderPath);
  }

  fs.mkdirSync(folderPath);
};

export const upzipFile = async (zipFile: string, outputPath: string) => {
  try {
    fs.accessSync(zipFile, fs.constants.R_OK);
    await extractZip(zipFile, { dir: outputPath });

    return true;
  } catch {
    return false;
  }
};
