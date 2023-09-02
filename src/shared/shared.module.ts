import { Global, Module, type Provider } from '@nestjs/common';

import { FileService } from './services/file.service';

const providers: Provider[] = [FileService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
