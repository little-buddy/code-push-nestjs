import { Global, Module, type Provider } from '@nestjs/common';

const providers: Provider[] = [];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
