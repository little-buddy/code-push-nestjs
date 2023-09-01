import * as os from 'node:os';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TempDir = os.tmpdir();

export enum StorageType {
  AWS_S3 = 's3',
  OSS = 'oss',
  QINIU = 'qiniu',
  UPYUN = 'upyun',
  TENCENT_CLOUD = 'tencentcloud',
}
