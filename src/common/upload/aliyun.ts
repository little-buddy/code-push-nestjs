// update aliyun-sdk -> ali-oss
// by stream upload
import fs from 'node:fs';
import path from 'node:path';

import OSS from 'ali-oss';
import { isNil } from 'lodash';

import { StorageType } from '@/constants';

let oss: OSS;

const {
  OSS_ACCESS_KEY_ID: accessKeyId,
  OSS_SECRET_ACCESS_KEY: accessKeySecret,
  OSS_REGION: region,
  OSS_PREFIX: bucket,
  OSS_BUCKET_NAME: prefix,
  STORAGE_TYPE,
} = process.env as ObjectValue<string>;

const isActive: boolean =
  [accessKeyId, accessKeySecret, region, bucket].every(
    (value: string) => !isNil(value),
  ) && StorageType.OSS === (STORAGE_TYPE as StorageType);

if (isActive) {
  oss = new OSS({
    accessKeyId,
    accessKeySecret,
    region,
    bucket,
  });
}

// TODO: 返回值处理有待确定
export const uploadFileToOss = async (
  key: string,
  filePath: string,
): Promise<string> => {
  if (!isActive) {
    throw new Error('OSS environment variable does not set');
  }

  const res = await oss.put(
    path.resolve(prefix, key),
    fs.createReadStream(filePath),
  );

  return res.url;
};
