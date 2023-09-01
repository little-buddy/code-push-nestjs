/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { isNil } from 'lodash';
import * as qiniu from 'qiniu';

import { StorageType } from '@/constants';

const {
  QINIU_ACCESS_KEY: accessKey,
  QINIU_SECRET_KEY: secretKey,
  QINIU_BUCKET: bucket,
  STORAGE_TYPE,
} = process.env as ObjectValue<string>;

const isActive =
  [accessKey, secretKey, bucket].every((value: string) => !isNil(value)) &&
  StorageType.QINIU === (STORAGE_TYPE as StorageType);

// go

const qiniuConfig = new qiniu.conf.Config();

let qiniuManager: qiniu.rs.BucketManager;
let qiniuMac: qiniu.auth.digest.Mac;

if (isActive) {
  qiniuMac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  qiniuManager = new qiniu.rs.BucketManager(qiniuMac, qiniuConfig);
}

const createScope = (key: string) => `${bucket}:${key}`;

const getUploadTokenQiniu = (key: string) => {
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: createScope(key),
  });

  return putPolicy.uploadToken(qiniuMac);
};

const statQiuniu = (key: string): Promise<string | boolean> =>
  new Promise((resolve, reject) => {
    qiniuManager.stat(
      bucket,
      key,
      (respErr, respBody: ResBody, respInfo: ResInfo) => {
        if (respErr) {
          reject(respErr);

          return;
        }

        if (respInfo.statusCode === 200) {
          resolve(respBody.hash);
        } else if (respInfo.statusCode === 612) {
          resolve(false);
        } else {
          reject(new Error(`qiniu stat service error: ${respInfo.statusCode}`));
        }
      },
    );
  });

export const uploadFileToQiniu = async (
  key: string,
  filePath: string,
): Promise<string> => {
  if (!isActive) {
    throw new Error('QINIU environment variable does not set');
  }

  const hash = await statQiuniu(key);

  if (hash) {
    return hash as string;
  }

  return new Promise((resolve, reject) => {
    const formUploader = new qiniu.form_up.FormUploader(
      new qiniu.conf.Config(),
    );
    const putExtra = new qiniu.form_up.PutExtra();
    formUploader.putFile(
      getUploadTokenQiniu(key),
      key,
      filePath,
      putExtra,
      (respErr, respBody: ResBody, respInfo: ResInfo) => {
        if (respErr) {
          reject(respErr);

          return;
        }

        if (respInfo.statusCode !== 200) {
          reject(
            new Error(`qiniu upload service error: ${respInfo.statusCode}`),
          );
        }

        resolve(respBody.hash);
      },
    );
  });
};
