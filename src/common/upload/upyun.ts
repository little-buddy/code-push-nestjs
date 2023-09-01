import fs from 'node:fs';
import path from 'node:path';

import { isNil } from 'lodash';
import Upyun from 'upyun';

import { StorageType } from '@/constants';

const {
  UPYUN_SERVICE_NAME: serviceName,
  UPYUN_OPERATOR_NAME: operatorName,
  UPYUN_OPERATOR_PASS: operatorPass,
  UPYUN_STORAGE_DIR: storageDir,
  STORAGE_DIR,
} = process.env as ObjectValue<string>;

let upClient: Upyun.Client;

const isActive =
  [serviceName, operatorName, operatorPass, storageDir].every(
    (value: string) => !isNil(value),
  ) && StorageType.UPYUN === (STORAGE_DIR as StorageType);

if (isActive) {
  upClient = new Upyun.Client(
    new Upyun.Service(serviceName, operatorName, operatorPass),
  );
}

export const uploadFileToUpyun = async (key: string, filePath: string) => {
  if (!isActive) {
    throw new Error('Upyun environment variable does not set');
  }

  await upClient.makeDir(storageDir);
  const remotePath = path.join(storageDir, key);
  // TODO: 是否㤇选择分片处理
  const data = await upClient.putFile(
    remotePath,
    fs.createReadStream(filePath),
  );

  // boolean -> file/info -> image
  if (data) {
    return key;
  }
};
