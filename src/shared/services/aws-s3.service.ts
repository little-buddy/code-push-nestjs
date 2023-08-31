/* eslint-disable */
// update aws-sdk -> @aws-sdk/client-v3
// by stream upload
import fs from 'node:fs';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export {};

const Bucket = process.env.AWS_BUCKET_NAME;

export const uploadFileToS3 = (
  key: string,
  filePath: string,
): Promise<string> => {
  const Body = fs.readFileSync(filePath);

  // @ts-ignore
  return new S3Client({}).send(
    new PutObjectCommand({
      Bucket,
      Key: key,
      Body,
    }),
  );

  // if (!AwsClient) {
  //   AWS.config.update({
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //     sessionToken: process.env.AWS_SESSION_TOKEN,
  //     region: process.env.AWS_REGIN,
  //   });
  //   AwsClient = new AWS.S3({
  //     params: { Bucket: process.env.AWS_BUCKET_NAME },
  //   });
  // }

  // return new Promise((resolve, reject) => {

  //   AwsClient.upload(
  //     {
  //       Key: key,
  //       Body: data,
  //       ACL: 'public-read',
  //     },
  //     (err, response) => {
  //       if (err) {
  //         reject(new AppError(JSON.stringify(err)));
  //       } else {
  //         resolve(response.ETag);
  //       }
  //     },
  //   );
  // });
};
