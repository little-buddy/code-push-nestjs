import './nest.polyfill';

import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 15 * 60 * 1000,
      limit: 100,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
