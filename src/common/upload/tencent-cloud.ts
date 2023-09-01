/* eslint-disable @typescript-eslint/naming-convention */
import COS from 'cos-nodejs-sdk-v5';

const {
  TXC_ACCESS_KEY_ID: SecretId,
  TXC_SECRET_ACCESS_KEY: SecretKey,
  TXC_BUCKET_NAME: Bucket,
  TXC_REGION: Region,
} = process.env as ObjectValue<string>;

export const uploadFileToTencentCloud = (
  key: string,
  filePath: string,
): Promise<string> =>
  new Promise((resolve, reject) => {
    new COS({
      SecretId,
      SecretKey,
    }).sliceUploadFile(
      {
        Bucket,
        Region,
        Key: key,
        FilePath: filePath,
      },
      (err: COS.CosError, data: COS.SliceUploadFileResult) => {
        if (err) {
          reject(new Error(`TencentCloud Sever Error: ${err.message}`));
        } else {
          if (data.statusCode === 200) {
            resolve(key);
          } else {
            reject(new Error(`TencentCloud Upload Error: ${data.statusCode}`));
          }
        }
      },
    );
  });
