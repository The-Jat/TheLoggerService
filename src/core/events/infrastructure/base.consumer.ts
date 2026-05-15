import {
  OnModuleInit,
} from '@nestjs/common';

import { RabbitMQConnection }
from './rabbitmq.connection';
import { DOMAIN_EXCHANGE } from './constants';

export abstract class BaseConsumer
  implements OnModuleInit {

  protected abstract queue: string;

  protected abstract routingKeys:
    string[];

  constructor(
    protected rabbit:
      RabbitMQConnection,
  ) {}

  async onModuleInit() {

    const channel =
      this.rabbit.getChannel();

    await channel.addSetup(
      async (ch) => {

        await ch.assertQueue(
          this.queue,
          {
            durable: true,
          },
        );

        for (
          const key
          of this.routingKeys
        ) {
          await ch.bindQueue(
            this.queue,
            DOMAIN_EXCHANGE,
            key,
          );
        }

        await ch.consume(
          this.queue,
          async (msg) => {

            if (!msg) return;

            const payload =
              JSON.parse(
                msg.content.toString(),
              );

            await this.handle(
              payload,
            );

            ch.ack(msg);
          },
        );

        console.log(
          `📥 Consumer listening: ${this.queue}`,
        );
      },
    );
  }

  protected abstract handle(
    payload: any,
  ): Promise<void>;
}