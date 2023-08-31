// update aliyun-sdk -> ali-oss
// by stream upload
import fs from 'node:fs';
import path from 'node:path';

import { Injectable } from '@nestjs/common';
import OSS from 'ali-oss';

import { ApiConfigService } from './api-config.service';

@Injectable()
export class AliyunSerice {
  private readonly oss: OSS;

  private readonly prefix: string;

  constructor(public configService: ApiConfigService) {
    const { accessKeyId, accessKeySecret, region, bucket, prefix } =
      configService.aliyunOssConfig;

    this.prefix = prefix;
    this.oss = new OSS({
      accessKeyId,
      accessKeySecret,
      region,
      bucket,
    });
  }

  async uploadFile(key: string, filePath: string): Promise<string> {
    const res = await this.oss.put(
      path.resolve(this.prefix, key),
      fs.createReadStream(filePath),
    );

    return res.url;
  }
}
