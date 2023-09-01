// update aws-sdk -> @aws-sdk/client-v3
// by stream upload
import fs from 'node:fs';

import {
  type CompleteMultipartUploadCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { isNil } from 'lodash';

import { StorageType } from '@/constants';

let s3Client: S3Client;

const {
  AWS_S3_SECRET_ACCESS_KEY: secretAccessKey,
  AWS_S3_ACCESS_KEY_ID: accessKeyId,
  AWS_S3_BUCKET_REGION: region,
  AWS_BUCKET_NAME: bucket,
  STORAGE_TYPE,
} = process.env as ObjectValue<string>;

const isActive =
  [secretAccessKey, accessKeyId, region, bucket].every(
    (value: string) => !isNil(value),
  ) && (STORAGE_TYPE as StorageType) === StorageType.AWS_S3;

if (isActive) {
  s3Client = new S3Client({
    region,
    credentials: {
      secretAccessKey,
      accessKeyId,
    },
  });
}

export const uploadFileToS3 = async (
  key: string,
  filePath: string,
): Promise<string> => {
  if (!isActive) {
    throw new Error('AWS environment variable does not set');
  }

  const body = fs.readFileSync(filePath);

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucket,
      Key: key,
      Body: body,
    },
  });

  const res: CompleteMultipartUploadCommandOutput = await upload.done();

  return res.Location as string;
};
