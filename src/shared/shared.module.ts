import { Global, Module, type Provider } from '@nestjs/common';

import { AliyunSerice } from './services/aliyun.service';

const providers: Provider[] = [AliyunSerice];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
