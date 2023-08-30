import { NestFactory } from '@nestjs/core';
import { type NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';

import { AppModule } from './app.module';

declare const module: {
  hot?: {
    accept(): void;
    dispose(fn: () => Promise<void>): void;
  };
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    cors: true,
  });

  // issue conflicts with apollo
  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'));
  app.enableVersioning();

  await app.listen(3000);

  // webpack-hmr
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

void bootstrap();
