import fs from 'node:fs';
import { type Stream } from 'node:stream';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import {
  uploadFileToLocal,
  uploadFileToOss,
  uploadFileToQiniu,
  uploadFileToS3,
  uploadFileToTencentCloud,
  uploadFileToUpyun,
} from '@/common/upload';
import { StorageType } from '@/constants';

import { ApiConfigService } from './api-config.service';

@Injectable()
export class FileService {
  constructor(
    private configService: ApiConfigService,
    private httpService: HttpService,
  ) {}

  async uploadFileToStorage(key: string, filePath: string): Promise<string> {
    let res;
    const { storageType } = this.configService;

    switch (storageType) {
      case StorageType.AWS_S3: {
        res = await uploadFileToS3(key, filePath);

        break;
      }

      case StorageType.OSS: {
        res = await uploadFileToOss(key, filePath);

        break;
      }

      case StorageType.QINIU: {
        res = await uploadFileToQiniu(key, filePath);

        break;
      }

      case StorageType.UPYUN: {
        res = await uploadFileToUpyun(key, filePath);

        break;
      }

      case StorageType.TENCENT_CLOUD: {
        res = await uploadFileToTencentCloud(key, filePath);

        break;
      }

      default: {
        res = uploadFileToLocal(key, filePath);
      }
    }

    return res as string;
  }

  async createFileFromRequest(url: string, filePath: string): Promise<void> {
    if (fs.existsSync(filePath)) {
      throw new Error(`File has existed for ${filePath}`);
    }

    const response = await this.httpService.axiosRef.get(url, {
      responseType: 'stream',
    });
    const stream = fs.createWriteStream(filePath);
    (response.data as Stream).pipe(stream);
    await new Promise((resolve, reject) => {
      stream.on('close', resolve);
      stream.on('error', (e: Error) => reject(e));
    });
  }
}
