import 'reflect-metadata';
import { createRouter } from './http/router';
import * as pino from 'pino';

async function main() {
  const logger = pino({ level: 'info' });

  const router = createRouter(logger);
  await router.listen(3000, '0.0.0.0');
}

main();
