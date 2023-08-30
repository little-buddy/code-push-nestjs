import { NestFactory } from '@nestjs/core';
import { type NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

import { AppModule } from './app.module';

declare const module: {
  hot?: {
    accept(): void;
    dispose(fn: () => Promise<void>): void;
  };
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // issue conflicts with apollo
  app.use(helmet());
  // app.use(rateLimit({

  // }))
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

void bootstrap();
