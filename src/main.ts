import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

declare const module: {
  hot?: {
    accept(): void;
    dispose(fn: () => Promise<void>): void;
  };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

void bootstrap();
