import {
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

import {
  connect,
  ChannelWrapper,
  AmqpConnectionManager,
} from 'amqp-connection-manager';

import type {
  ConfirmChannel,
} from 'amqplib';
import { DOMAIN_EXCHANGE } from './constants';

@Injectable()
export class RabbitMQConnection
  implements OnModuleInit {

  private connection:
    AmqpConnectionManager;

  private channel:
    ChannelWrapper;

  async onModuleInit() {

    this.connection = connect([
      process.env.RABBITMQ_URL ||
      'amqp://localhost:5672',
    ]);

    this.channel =
      this.connection.createChannel({
        setup: async (
          channel: ConfirmChannel,
        ) => {

          await channel.assertExchange(
            DOMAIN_EXCHANGE,
            'topic',
            {
              durable: true,
            },
          );
        },
      });

    console.log(
      '✅ RabbitMQ connected',
    );
  }

  getChannel() {
    return this.channel;
  }
}