/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fs from 'node:fs';
import * as path from 'node:path';

import { type HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import * as qiniu from 'qiniu';

import { getUploadTokenQiniu, QINIU_BUCKET_MANAGER } from './utils/qiniu';

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);

  constructor(private readonly httpService: HttpService) {}

  uploadFileToStorage(key: string, filePath: string) {
    switch (process.env.STORAGE_TYPE) {
      case 's3': {
        this.uploadFileToS3(key, filePath);
        break;
      }

      case 'oss': {
        this.uploadFileToOSS(key, filePath);
        break;
      }

      case 'qiniu': {
        void this.uploadFileToQiniu(key, filePath);
        break;
      }

      case 'upyun': {
        this.uploadFileToUpyun(key, filePath);
        break;
      }

      case 'tencentcloud': {
        this.uploadFileToTencentCloud(key, filePath);
        break;
      }

      default: {
        this.uploadFileToLocal(key, filePath);
      }
    }
  }

  uploadFileToLocal(key: string, filePath: string): string {
    if (key.length < 3) {
      throw new Error(`generate key ${key} is too short.`);
    }

    if (!fs.statSync(filePath).isFile()) {
      throw new Error(`${filePath} must be file`);
    }

    const storageDir = process.env.STORAGE_DIR;

    if (!storageDir) {
      throw new Error('Please set local storageDir');
    }

    // check Stroage Dir
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir);
      this.logger.debug(`StorageDir mkdir:${storageDir}`);
    } else if (fs.statSync(storageDir).isFile()) {
      fs.unlinkSync(storageDir);
      fs.mkdirSync(storageDir);
      this.logger.debug(`StorageDir mkdir:${storageDir}`);
    }

    const subDir = key.slice(0, 2).toLowerCase();
    const finalDir = path.join(storageDir, subDir);
    const fileName = path.join(finalDir, key);

    if (fs.existsSync(fileName)) {
      return key;
    }

    if (!fs.existsSync(`${finalDir}`)) {
      fs.mkdirSync(`${finalDir}`);
      this.logger.debug(`uploadFileToLocal mkdir:${finalDir}`);
    }

    fs.copyFileSync(filePath, fileName);
    this.logger.debug(`uploadFileToLocal copy file ${key} success.`);

    return key;
  }

  uploadFileToS3(key: string, filePath: string) {
    return 's3';
  }

  uploadFileToOSS(key: string, filePath: string) {}

  // 3 statsu error true false
  qiniuStat(key: string): Promise<string | void> {
    const bucket = process.env.QINIU_BUCKET_NAME as string;

    return new Promise((resolve, reject) => {
      QINIU_BUCKET_MANAGER.stat(
        bucket,
        key,
        (respErr?: Error, respBody?: ResBody, respInfo?: ResInfo) => {
          if (respErr) {
            reject(
              new Error(`uploadFileToQiniu file stat: ${respErr.message}`),
            );

            return;
          }

          this.logger.debug(
            `uploadFileToQiniu file stat\n respBody: ${JSON.stringify(
              respBody,
            )}\n respInfo: ${JSON.stringify(respInfo)}`,
          );

          if (respInfo?.statusCode === 200) {
            resolve(respBody?.hash);
          } else if (respInfo?.statusCode === 612) {
            /* file not exist */
            resolve(void 0);
          } else {
            reject(
              new Error(`uploadFileToQiniu file stat: ${respInfo?.statusCode}`),
            );
          }
        },
      );
    });
  }

  qiniuUpload(key: string, filePath: string): Promise<string | void> {
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
        (respErr?: Error, respBody?: ResBody, respInfo?: ResInfo) => {
          if (respErr) {
            reject(new Error(`uploadFileToQiniu putFile: ${respErr.message}`));

            return;
          }

          if ((respInfo as ResInfo).statusCode === 200) {
            this.logger.debug(
              `uploadFileToQiniu putFile\n respBody: ${JSON.stringify(
                respBody,
              )}\n respInfo: ${JSON.stringify(respInfo)}`,
            );

            resolve(respBody?.hash);

            return;
          }

          reject(
            new Error(`Qiniu upload response error: ${respInfo?.statusCode}`),
          );
        },
      );
    });
  }

  async uploadFileToQiniu(
    key: string,
    filePath: string,
  ): Promise<string | void> {
    try {
      const fileStat = await this.qiniuStat(key);

      if (fileStat) {
        return fileStat;
      }

      const filekey = await this.qiniuUpload(key, filePath);

      if (filekey) {
        return filekey;
      }
    } catch {
      this.logger.error('Qiniu upload file failed.');
    }
  }

  uploadFileToUpyun(key: string, filePath: string) {}

  uploadFileToTencentCloud(key: string, filePath: string) {}

  // temp
  do() {
    this.httpService.get('https://asdfasfd');
  }
}
