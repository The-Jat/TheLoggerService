import { Module } from '@nestjs/common';

import { EventsModule }
from 'src/core/events/events.module';

import { SystemLogConsumer }
from './consumers/system-log.consumer';

@Module({
  imports: [EventsModule],

  providers: [
    SystemLogConsumer,
  ],
})
export class LogsModule {}