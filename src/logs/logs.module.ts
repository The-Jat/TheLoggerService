import { Module } from '@nestjs/common';

import { LogsService }
from './application/logs.service';

import { PgLogRepository }
from './infrastructure/pg-log.repository';

import { LogsConsumer }
from './consumers/logs.consumer';

import { DatabaseModule }
from 'src/database/database.module';

import { EventsModule }
from 'src/core/events/events.module';

@Module({
  imports: [
    DatabaseModule,
    EventsModule,
  ],

  providers: [
    LogsService,

    LogsConsumer,

    {
      provide: 'LogRepository',

      useClass:
        PgLogRepository,
    },
  ],
})
export class LogsModule {}