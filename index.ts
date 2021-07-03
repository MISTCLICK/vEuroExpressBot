import client, { setupClient } from './client';
import logger from './util/logger';
import { token } from './config.json';
import { version } from './package.json';

logger.info(`vEuroExpress Bot v${version}`);
setupClient();
client.login(token);

process.on('uncaughtException', (err) => logger.error(err));
process.on('unhandledRejection', (err) => logger.error(err));